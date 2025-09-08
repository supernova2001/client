import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import ProtectedUploadPage from './components/ProtectedUploadPage';
import DocumentationPage from './pages/DocumentationPage';
import { ItemProvider } from './context/ItemContext';
import { AdminProvider } from './context/AdminContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  const handleDataUpdated = () => {
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <ItemProvider>
        <AdminProvider>
          <AppContainer>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={(<><SearchBar /><ItemList /></>)} />
                <Route path="/upload" element={<ProtectedUploadPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </AdminProvider>
      </ItemProvider>
    </BrowserRouter>
  );
}

export default App;
