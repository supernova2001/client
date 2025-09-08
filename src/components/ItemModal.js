import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaShoppingCart, FaStar, FaHeart, FaShare } from 'react-icons/fa';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ImageSection = styled.div`
  flex: 1;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 500px;
`;

const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #6c757d;
  font-size: 4rem;
  border-radius: 8px;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 1001;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Category = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ItemName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0071dc;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffc107;
  font-size: 1.1rem;
`;

const RatingText = styled.span`
  color: #6c757d;
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
`;

const Description = styled.div`
  margin-bottom: 2rem;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const DescriptionText = styled.p`
  color: #6c757d;
  line-height: 1.6;
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
`;

const PrimaryButton = styled.button`
  background: #0071dc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SecondaryButton = styled.button`
  flex: 1;
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #e9ecef;
    color: #333;
  }
`;

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    console.log('Add to cart:', item.name);
    // Add to cart functionality would go here
  };

  const handleWishlist = () => {
    console.log('Add to wishlist:', item.name);
    // Wishlist functionality would go here
  };

  const handleShare = () => {
    console.log('Share:', item.name);
    // Share functionality would go here
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <ImageSection>
          {item.image ? (
            <ItemImage src={item.image} alt={item.name} />
          ) : (
            <ImagePlaceholder>Item Image</ImagePlaceholder>
          )}
        </ImageSection>

        <DetailsSection>
          <Category>{item.category}</Category>
          <ItemName>{item.name}</ItemName>
          
          <PriceContainer>
            <Price>${item.price.toFixed(2)}</Price>
            <Rating>
              <FaStar />
              <span>{item.rating?.toFixed(1) || '4.5'}</span>
              <RatingText>({item.reviews || '0'} reviews)</RatingText>
            </Rating>
          </PriceContainer>

          <StockStatus inStock={item.inStock}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </StockStatus>

          <Description>
            <DescriptionTitle>Description</DescriptionTitle>
            <DescriptionText>{item.description}</DescriptionText>
          </Description>

          <ActionButtons>
            <PrimaryButton 
              onClick={handleAddToCart}
              disabled={!item.inStock}
            >
              <FaShoppingCart />
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </PrimaryButton>
            
            <SecondaryButtons>
              <SecondaryButton onClick={handleWishlist}>
                <FaHeart />
                Wishlist
              </SecondaryButton>
              <SecondaryButton onClick={handleShare}>
                <FaShare />
                Share
              </SecondaryButton>
            </SecondaryButtons>
          </ActionButtons>
        </DetailsSection>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ItemModal;
