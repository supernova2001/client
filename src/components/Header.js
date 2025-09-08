import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaCloudUploadAlt, FaBook } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #0071dc 0%, #004c91 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LogoIcon = styled(FaShoppingCart)`
  font-size: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
  margin-top: 0.2rem;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon />
          <div>
            <Title>Walmart Assessment</Title>
            <Subtitle>Search UI Application</Subtitle>
          </div>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SearchIcon />
            <span>Search & Discover Items</span>
          </Link>
          <span style={{ opacity: 0.5 }}>|</span>
          <Link to="/upload" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCloudUploadAlt />
            <span>Upload Items</span>
          </Link>
          <span style={{ opacity: 0.5 }}>|</span>
          <Link to="/documentation" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaBook />
            <span>Documentation</span>
          </Link>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
