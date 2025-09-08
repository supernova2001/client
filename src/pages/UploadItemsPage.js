import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaPlus, FaUpload, FaTrash } from 'react-icons/fa';
import UploadItemCard from '../components/UploadItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { itemService } from '../services/itemService';
import { storageService } from '../services/storageService';

const Page = styled.div``;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #0071dc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 100%;
  max-width: 720px;
  border-radius: 12px;
  padding: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Secondary = styled.button`
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  color: #333;
  padding: 0.6rem 1rem;
  border-radius: 8px;
`;

const Primary = styled.button`
  background: #0071dc;
  border: none;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 8px;
`;

const Preview = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
`;

export default function UploadItemsPage() {
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', inStock: true });
    setImageFile(null);
    setImagePreview('');
  };

  const uploadJsonFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const items = JSON.parse(text);
      await itemService.uploadItems(items);
      await load(1, false);
      alert(`Uploaded ${items.length} items`);
    } catch (e) {
      console.error(e);
      alert('Invalid JSON file');
    } finally {
      event.target.value = '';
    }
  };

  const clearDatabase = async () => {
    if (!window.confirm('Clear all items?')) return;
    await itemService.clearDatabase();
    await load(1, false);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(prev => prev.map(item => 
      item._id === updatedItem._id ? updatedItem : item
    ));
  };

  const handleDeleteItem = (deletedItemId) => {
    setItems(prev => prev.filter(item => item._id !== deletedItemId));
  };

  const load = async (next = 1, append = false) => {
    const res = await itemService.getItems(next, limit);
    const data = res.data;
    setItems(prev => append ? [...prev, ...data.items] : data.items);
    setPage(data.pagination.currentPage);
    setHasMore(data.pagination.hasNextPage);
  };

  useEffect(() => {
    load(1, false);
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const onSubmit = async () => {
    try {
      setUploading(true);
      let imageUrl = 'https://via.placeholder.com/300x200?text=No+Image';
      
      if (imageFile) {
        // Upload image to Firebase Storage
        imageUrl = await storageService.uploadImage(imageFile);
      }
      
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        image: imageUrl,
        imageName: imageFile ? imageFile.name : 'placeholder',
        imageLabels: [],
        category: form.category.trim(),
        inStock: !!form.inStock,
      };
      
      await itemService.createItem(payload);
      setShowModal(false);
      resetForm();
      await load(1, false);
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.error || e.message || 'Failed to create item. Please check fields.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Page>
      <Actions>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#6c757d', color: '#fff', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <FaUpload /> Upload JSON File
            <input type="file" accept="application/json" onChange={uploadJsonFile} style={{ display: 'none' }} />
          </label>
          <ActionButton onClick={clearDatabase} style={{ background: '#dc3545' }}>
            <FaTrash /> Clear Database
          </ActionButton>
        </div>
        <ActionButton onClick={() => setShowModal(true)}>
          <FaPlus /> Upload Item
        </ActionButton>
      </Actions>

      <InfiniteScroll
        dataLength={items.length}
        next={() => load(page + 1, true)}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        <Grid>
          {items.map((it) => (
            <UploadItemCard 
              key={it._id} 
              item={it} 
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </Grid>
      </InfiniteScroll>

      {showModal && (
        <ModalBackdrop onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem' }}>Upload Item</h2>
            <FormRow>
              <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </FormRow>
            <FormRow>
              <Input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} />
                In Stock
              </label>
            </FormRow>
            <TextArea rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <FaUpload /> Choose Image
                <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
              </label>
            </div>
            {imagePreview && <Preview src={imagePreview} alt="preview" />}

            <ModalActions>
              <Secondary onClick={() => setShowModal(false)}>Cancel</Secondary>
              <Primary onClick={onSubmit} disabled={uploading}>{uploading ? 'Uploading...' : 'Create Item'}</Primary>
            </ModalActions>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Page>
  );
}


