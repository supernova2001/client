import React from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaSort } from 'react-icons/fa';
import ItemCard from './ItemCard';
import LoadingSpinner from './LoadingSpinner';
import { useItems } from '../context/ItemContext';

const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #dc3545;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const ResultsCount = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ItemList = () => {
  const { items, loading, error, loadMore, hasNextPage, totalItems, searchMode, searchQuery, sortBy, updateSortBy } = useItems();

  const handleSortChange = (e) => {
    updateSortBy(e.target.value);
  };

  if (error) {
    return (
      <ErrorState>
        <ErrorIcon>Error</ErrorIcon>
        <ErrorTitle>Oops! Something went wrong</ErrorTitle>
        <ErrorText>{error}</ErrorText>
      </ErrorState>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon>🔍</EmptyStateIcon>
        <EmptyStateTitle>No items found</EmptyStateTitle>
        <EmptyStateText>
          Try adjusting your search terms or browse all items
        </EmptyStateText>
      </EmptyState>
    );
  }

  return (
    <>
      <ResultsHeader>
        <ResultsCount>
          {loading ? (
            'Loading...'
          ) : searchMode ? (
            totalItems > 0 ? (
              `Found ${totalItems} item${totalItems !== 1 ? 's' : ''} for "${searchQuery}"`
            ) : (
              `No items found for "${searchQuery}"`
            )
          ) : (
            totalItems > 0 ? (
              `Showing ${totalItems} item${totalItems !== 1 ? 's' : ''}`
            ) : (
              'No items to display'
            )
          )}
        </ResultsCount>
        <SortContainer>
          <FaSort />
          <SortSelect value={sortBy} onChange={handleSortChange}>
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="newest">Newest First</option>
          </SortSelect>
        </SortContainer>
      </ResultsHeader>

      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        endMessage={
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
            <p>You've reached the end! No more items to load.</p>
          </div>
        }
      >
        <ItemListContainer>
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ItemListContainer>
      </InfiniteScroll>
    </>
  );
};

export default ItemList;
