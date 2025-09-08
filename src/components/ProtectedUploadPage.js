import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import AdminLogin from './AdminLogin';
import UploadItemsPage from '../pages/UploadItemsPage';
import { useAdmin } from '../context/AdminContext';

const ProtectedContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const AdminHeader = styled.div`
  background: #6c757d;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContentArea = styled.div`
  padding: 2rem;
`;

const ProtectedUploadPage = () => {
  const { isAuthenticated, isLoading, logout, login } = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      setShowLoginModal(false);
    }
    return success;
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  if (isLoading) {
    return (
      <ProtectedContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#6c757d'
        }}>
          Loading...
        </div>
      </ProtectedContainer>
    );
  }

  return (
    <ProtectedContainer>
      {isAuthenticated ? (
        <>
          <AdminHeader>
            <AdminInfo>
              <FaShieldAlt />
              Admin Panel - Upload Management
            </AdminInfo>
            <LogoutButton onClick={logout}>
              <FaSignOutAlt />
              Logout
            </LogoutButton>
          </AdminHeader>
          <ContentArea>
            <UploadItemsPage />
          </ContentArea>
        </>
      ) : (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h2 style={{ color: '#6c757d', margin: 0 }}>Upload Management</h2>
            <p style={{ color: '#6c757d', margin: 0 }}>Admin access required</p>
            <button
              onClick={() => setShowLoginModal(true)}
              style={{
                background: '#0071dc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Admin Login
            </button>
          </div>
        </>
      )}

      {showLoginModal && (
        <AdminLogin onLogin={handleLogin} onClose={handleCloseModal} />
      )}
    </ProtectedContainer>
  );
};

export default ProtectedUploadPage;
