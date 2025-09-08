import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaDatabase, FaTrash, FaCheck } from 'react-icons/fa';
import { itemService } from '../services/itemService';

const AdminContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const AdminTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AdminIcon = styled(FaDatabase)`
  color: #0071dc;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
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

const SuccessButton = styled(Button)`
  background: #28a745;
  color: white;

  &:hover:not(:disabled) {
    background: #218838;
  }
`;

const DangerButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover:not(:disabled) {
    background: #c82333;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  padding: 0.75rem 1.5rem;
  background: #6c757d;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background: #5a6268;
  }
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled(StatusMessage)`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(StatusMessage)`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

const LoadingMessage = styled(StatusMessage)`
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
`;

const AdminPanel = ({ onDataUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSeedDatabase = async () => {
    setLoading(true);
    try {
      const response = await itemService.seedDatabase();
      showMessage(`Successfully seeded database with ${response.data.count} items!`, 'success');
      if (onDataUpdated) onDataUpdated();
    } catch (error) {
      showMessage(`Error seeding database: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('Are you sure you want to clear all items from the database?')) {
      return;
    }

    setLoading(true);
    try {
      await itemService.clearDatabase();
      showMessage('Database cleared successfully!', 'success');
      if (onDataUpdated) onDataUpdated();
    } catch (error) {
      showMessage(`Error clearing database: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      const items = JSON.parse(text);
      
      if (!Array.isArray(items)) {
        throw new Error('File must contain an array of items');
      }

      const response = await itemService.uploadItems(items);
      showMessage(`Successfully uploaded ${response.data.count} items!`, 'success');
      if (onDataUpdated) onDataUpdated();
    } catch (error) {
      showMessage(`Error uploading file: ${error.message}`, 'error');
    } finally {
      setLoading(false);
      event.target.value = ''; // Reset file input
    }
  };

  return (
    <AdminContainer>
      <AdminTitle>
        <AdminIcon />
        Database Management
      </AdminTitle>
      
      <ButtonGroup>
        <PrimaryButton 
          onClick={handleSeedDatabase}
          disabled={loading}
        >
          <FaDatabase />
          Seed Sample Data
        </PrimaryButton>
        
        <FileLabel>
          <FaUpload />
          Upload JSON File
          <FileInput
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            disabled={loading}
          />
        </FileLabel>
        
        <DangerButton 
          onClick={handleClearDatabase}
          disabled={loading}
        >
          <FaTrash />
          Clear Database
        </DangerButton>
      </ButtonGroup>

      {message && (
        <>
          {messageType === 'success' && (
            <SuccessMessage>
              <FaCheck />
              {message}
            </SuccessMessage>
          )}
          {messageType === 'error' && (
            <ErrorMessage>
              ⚠️ {message}
            </ErrorMessage>
          )}
          {messageType === 'loading' && (
            <LoadingMessage>
              ⏳ {message}
            </LoadingMessage>
          )}
        </>
      )}
    </AdminContainer>
  );
};

export default AdminPanel;
