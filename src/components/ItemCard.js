import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import ItemModal from './ItemModal';

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
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

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffc107;
  font-size: 0.9rem;
`;

const StarIcon = styled(FaStar)`
  font-size: 0.9rem;
`;

const RatingText = styled.span`
  color: #6c757d;
  margin-left: 0.25rem;
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
  border-radius: 6px;
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

const PrimaryButton = styled(Button)`
  background: #0071dc;
  color: white;

  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e1e5e9;

  &:hover:not(:disabled) {
    background: #e9ecef;
    color: #333;
  }
`;

const ItemCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart functionality would go here
    console.log('Add to cart:', item.name);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <Price>${item.price.toFixed(2)}</Price>
            <Rating>
              <StarIcon />
              <span>{item.rating?.toFixed(1) || '4.5'}</span>
              <RatingText>({item.reviews || '0'})</RatingText>
            </Rating>
          </PriceContainer>
          
          <ActionButtons>
            <PrimaryButton 
              onClick={handleAddToCart}
              disabled={!item.inStock}
            >
              <FaShoppingCart />
              Add to Cart
            </PrimaryButton>
            <SecondaryButton onClick={handleViewDetails}>
              <FaEye />
              View
            </SecondaryButton>
          </ActionButtons>
        </CardContent>
      </CardContainer>

      <ItemModal 
        item={item} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default ItemCard;
