import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaUpload, FaImage } from 'react-icons/fa';
import { storageService } from '../services/storageService';
import { itemService } from '../services/itemService';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071dc;
    box-shadow: 0 0 0 2px rgba(0, 113, 220, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071dc;
    box-shadow: 0 0 0 2px rgba(0, 113, 220, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  margin: 0;
`;

const ImageUploadContainer = styled.div`
  margin-bottom: 1rem;
`;

const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    color: #333;
  }

  input {
    display: none;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 0.5rem;
`;

const ModalActions = styled.div`
  padding: 1rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  border-top: 1px solid #e1e5e9;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #0071dc;
  color: white;

  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

const SecondaryButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  border: 1px solid #f5c6cb;
`;

const EditItemModal = ({ item, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price?.toString() || '',
        category: item.category || '',
        inStock: item.inStock || true
      });
      setImagePreview(item.image || '');
      setImageFile(null);
      setError('');
    }
  }, [item, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUpdating(true);

    try {
      let imageUrl = item.image; // Keep existing image if no new one uploaded

      if (imageFile) {
        // Upload new image
        imageUrl = await storageService.uploadImage(imageFile);
      }

      const updatedItem = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageUrl,
        imageName: imageFile ? imageFile.name : item.imageName || 'placeholder'
      };

      await itemService.updateItem(item._id, updatedItem);
      onUpdate(updatedItem);
      onClose();
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.response?.data?.error || 'Failed to update item. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    if (!isUpdating) {
      onClose();
    }
  };

  if (!isOpen || !item) return null;

  return (
    <ModalBackdrop onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Item</ModalTitle>
          <CloseButton onClick={handleClose} disabled={isUpdating}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="name">Item Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isUpdating}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description *</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={isUpdating}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
                disabled={isUpdating}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category *</Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={isUpdating}
              />
            </FormGroup>

            <FormGroup>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                />
                <Label htmlFor="inStock" style={{ margin: 0 }}>
                  In Stock
                </Label>
              </CheckboxContainer>
            </FormGroup>

            <ImageUploadContainer>
              <Label>Item Image</Label>
              <ImageUploadButton>
                <FaUpload />
                Choose New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUpdating}
                />
              </ImageUploadButton>
              {imagePreview && (
                <ImagePreview src={imagePreview} alt="Preview" />
              )}
            </ImageUploadContainer>
          </ModalBody>

          <ModalActions>
            <SecondaryButton type="button" onClick={handleClose} disabled={isUpdating}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Item'}
            </PrimaryButton>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EditItemModal;
