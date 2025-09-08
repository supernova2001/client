import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes, FaImage, FaFilter } from 'react-icons/fa';
import { useItems } from '../context/ItemContext';
import { itemService } from '../services/itemService';

const SearchContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SearchTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
`;


const SearchInput = styled.input`
  flex: 1;
  padding: 0.875rem 3rem 0.875rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071dc;
    box-shadow: 0 0 0 2px rgba(0, 113, 220, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e1e5e9;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SuggestionText = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const SuggestionCategory = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: ${props => props.active ? '#0071dc' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#0071dc' : '#e1e5e9'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1rem;
  color: #6c757d;
  font-size: 1.2rem;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 3rem;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;


const ImageUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8f9fa;
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;

  &:hover {
    background: #e9ecef;
    border-color: #0071dc;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 1rem;
`;

const ImageSearchContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef(null);
  const suggestionRef = useRef(null);
  const { handleSearch, updateFilters, filters, loadItems } = useItems();

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (query.length < 2) return [];
    
    const commonSearches = [
      'electronics', 'clothing', 'home', 'kitchen', 'sports', 'books',
      'toys', 'beauty', 'automotive', 'garden', 'furniture', 'jewelry'
    ];
    
    const priceRanges = [
      'under $25', 'under $50', 'under $100', 'under $200', 'under $500'
    ];
    
    return [
      ...commonSearches.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({ text: item, type: 'category' })),
      ...priceRanges.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({ text: item, type: 'price' }))
    ].slice(0, 5);
  };

  // Debounce search and suggestions
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      handleSearch(''); // Clear search
      return;
    }

    // Generate suggestions
    const newSuggestions = generateSuggestions(searchQuery);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);

    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // Reduced debounce time for better UX

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, handleSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? null : value
    };
    updateFilters(newFilters);
  };


  const clearAllFilters = () => {
    updateFilters({
      category: null,
      priceRange: null,
      inStock: null
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      
      // Fallback to filename search
      const filename = file.name.toLowerCase();
      const searchTerms = filename.replace(/\.[^/.]+$/, '').split(/[-_\s]+/);
      const searchQuery = searchTerms.join(' ');
      setSearchQuery(searchQuery);
      handleSearch(searchQuery);
    }
  };


  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseAll = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    loadItems(1);
  };

  return (
    <SearchContainer>
      <SearchTitle>Search Items</SearchTitle>
      
      <SearchInputContainer ref={suggestionRef}>
        <SearchInput
          type="text"
          placeholder="Search by name, description, price, or category..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
        />
        {searchQuery && (
          <ClearButton onClick={handleClear}>
            <FaTimes />
          </ClearButton>
        )}
        <SearchIcon />
        <ImageUploadButton>
          <FaImage />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </ImageUploadButton>
        
        {showSuggestions && suggestions.length > 0 && (
          <SearchSuggestions>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <SuggestionText>{suggestion.text}</SuggestionText>
                <SuggestionCategory>
                  {suggestion.type === 'category' ? 'Category' : 'Price Range'}
                </SuggestionCategory>
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        )}
      </SearchInputContainer>

      <FiltersContainer>
        <FilterButton
          active={filters.category === 'electronics'}
          onClick={() => handleFilterChange('category', 'electronics')}
        >
          <FaFilter /> Electronics
        </FilterButton>
        <FilterButton
          active={filters.category === 'clothing'}
          onClick={() => handleFilterChange('category', 'clothing')}
        >
          <FaFilter /> Clothing
        </FilterButton>
        <FilterButton
          active={filters.category === 'home'}
          onClick={() => handleFilterChange('category', 'home')}
        >
          <FaFilter /> Home
        </FilterButton>
        <FilterButton
          active={filters.priceRange === 'under-50'}
          onClick={() => handleFilterChange('priceRange', 'under-50')}
        >
          <FaFilter /> Under $50
        </FilterButton>
        <FilterButton
          active={filters.inStock === true}
          onClick={() => handleFilterChange('inStock', true)}
        >
          <FaFilter /> In Stock
        </FilterButton>
        {(filters.category || filters.priceRange || filters.inStock) && (
          <FilterButton onClick={clearAllFilters}>
            <FaTimes /> Clear
          </FilterButton>
        )}
        <FilterButton onClick={handleBrowseAll}>
          <FaSearch /> Browse All Items
        </FilterButton>
      </FiltersContainer>

      {imageFile && (
        <ImageSearchContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Searching by image: {imageFile.name}</span>
            <button onClick={clearImage} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
              <FaTimes />
            </button>
          </div>
          <ImagePreview src={imagePreview} alt="Search preview" />
        </ImageSearchContainer>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
