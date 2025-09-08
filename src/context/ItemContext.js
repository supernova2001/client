import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { itemService } from '../services/itemService';

const ItemContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  hasNextPage: false,
  totalItems: 0,
  searchMode: false,
  filters: {
    category: null,
    priceRange: null,
    inStock: null
  },
  sortBy: 'relevance'
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        currentPage: action.payload.pagination.currentPage,
        hasNextPage: action.payload.pagination.hasNextPage,
        totalItems: action.payload.pagination.totalItems,
        loading: false,
        error: null
      };
    
    case 'APPEND_ITEMS':
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        currentPage: action.payload.pagination.currentPage,
        hasNextPage: action.payload.pagination.hasNextPage,
        loading: false,
        error: null
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SEARCH_MODE':
      return { ...state, searchMode: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    
    case 'CLEAR_ITEMS':
      return { ...state, items: [], currentPage: 1, hasNextPage: false, totalItems: 0 };
    
    default:
      return state;
  }
};

export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  const loadItems = useCallback(async (page = 1, append = false, sortBy = state.sortBy) => {
    if (state.loading) return; // Prevent multiple simultaneous requests
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await itemService.getItems(page, 10, sortBy);
      
      if (append) {
        dispatch({ type: 'APPEND_ITEMS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: response.data });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.loading, state.sortBy]);

  const searchItems = useCallback(async (query, page = 1, append = false, filters = state.filters, sortBy = state.sortBy) => {
    if (state.loading) return; // Prevent multiple simultaneous requests
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await itemService.searchItems(query, page, 10, filters, sortBy);
      
      if (append) {
        dispatch({ type: 'APPEND_ITEMS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: response.data });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.loading, state.filters, state.sortBy]);

  const handleSearch = useCallback((query) => {
    // Only update if the query actually changed
    if (state.searchQuery === query) return;
    
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    dispatch({ type: 'CLEAR_ITEMS' });
    
    if (query.trim() === '') {
      dispatch({ type: 'SET_SEARCH_MODE', payload: false });
      // Don't load all items when search is cleared - keep items empty
    } else {
      dispatch({ type: 'SET_SEARCH_MODE', payload: true });
      searchItems(query, 1);
    }
  }, [state.searchQuery, searchItems]);

  const loadMore = () => {
    if (state.loading || !state.hasNextPage) return;
    
    const nextPage = state.currentPage + 1;
    
    if (state.searchMode) {
      searchItems(state.searchQuery, nextPage, true, state.filters, state.sortBy);
    } else {
      loadItems(nextPage, true, state.sortBy);
    }
  };

  // Load initial items only once when not in search mode
  useEffect(() => {
    if (state.items.length === 0 && !state.loading && !state.searchMode) {
      loadItems(1);
    }
  }, [loadItems, state.items.length, state.loading, state.searchMode]);

  const updateFilters = useCallback((newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
    dispatch({ type: 'CLEAR_ITEMS' });
    
    if (state.searchMode) {
      searchItems(state.searchQuery, 1, false, newFilters, state.sortBy);
    } else {
      loadItems(1, false, state.sortBy);
    }
  }, [state.searchMode, state.searchQuery, state.sortBy, searchItems, loadItems]);

  const updateSortBy = useCallback((newSortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: newSortBy });
    dispatch({ type: 'CLEAR_ITEMS' });
    
    if (state.searchMode) {
      searchItems(state.searchQuery, 1, false, state.filters, newSortBy);
    } else {
      loadItems(1, false, newSortBy);
    }
  }, [state.searchMode, state.searchQuery, state.filters, searchItems, loadItems]);

  const value = {
    ...state,
    loadItems,
    searchItems,
    handleSearch,
    loadMore,
    updateFilters,
    updateSortBy
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};
