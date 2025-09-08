import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import ItemModal from './ItemModal';
import EditItemModal from './EditItemModal';
import { itemService } from '../services/itemService';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #6c757d;
  font-size: 3rem;
`;

const Badge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${props => props.inStock ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemDescription = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0071dc;
`;

const Category = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditButton = styled(Button)`
  background: #ffc107;
  color: #212529;

  &:hover:not(:disabled) {
    background: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover:not(:disabled) {
    background: #c82333;
  }
`;

const ViewButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
  }
`;

const UploadItemCard = ({ item, onUpdate, onDelete }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleView = (e) => {
    e.stopPropagation();
    setShowViewModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await itemService.deleteItem(item._id);
      onDelete(item._id);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = (updatedItem) => {
    onUpdate(updatedItem);
    setShowEditModal(false);
  };

  return (
    <>
      <CardContainer>
        <ImageContainer>
          {item.image ? (
            <ItemImage src={item.image} alt={item.name} />
          ) : (
            <ImagePlaceholder>Item Image</ImagePlaceholder>
          )}
          <Badge inStock={item.inStock}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </ImageContainer>
        
        <CardContent>
          <Category>{item.category}</Category>
          <ItemName>{item.name}</ItemName>
          <ItemDescription>{item.description}</ItemDescription>
          
          <PriceContainer>
            <Price>${item.price?.toFixed(2) || '0.00'}</Price>
          </PriceContainer>
          
          <ActionButtons>
            <ViewButton onClick={handleView}>
              <FaEye />
              View
            </ViewButton>
            <EditButton onClick={handleEdit}>
              <FaEdit />
              Edit
            </EditButton>
            <DeleteButton onClick={handleDelete} disabled={isDeleting}>
              <FaTrash />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </DeleteButton>
          </ActionButtons>
        </CardContent>
      </CardContainer>

      {showViewModal && (
        <ItemModal 
          item={item} 
          isOpen={showViewModal} 
          onClose={() => setShowViewModal(false)} 
        />
      )}

      {showEditModal && (
        <EditItemModal
          item={item}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default UploadItemCard;
