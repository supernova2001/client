import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const itemService = {
  // Get all items with pagination and sorting
  getItems: async (page = 1, limit = 10, sortBy = 'relevance') => {
    const response = await api.get(`/items?page=${page}&limit=${limit}&sortBy=${sortBy}`);
    return response;
  },

  // Search items with advanced filtering and sorting
  searchItems: async (query, page = 1, limit = 10, filters = {}, sortBy = 'relevance') => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      sortBy
    });

    // Add filters to params
    if (filters.category) params.append('category', filters.category);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.inStock !== null) params.append('inStock', filters.inStock.toString());

    const response = await api.get(`/items/search?${params.toString()}`);
    return response;
  },

  // Get single item
  getItem: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response;
  },

  // Create new item
  createItem: async (itemData) => {
    const response = await api.post('/items', itemData);
    return response;
  },

  // Update item
  updateItem: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response;
  },

  // Delete item
  deleteItem: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response;
  },

  // Upload multiple items
  uploadItems: async (items) => {
    const response = await api.post('/items/upload', { items });
    return response;
  },

  // Seed database with sample data
  seedDatabase: async () => {
    const response = await api.post('/items/seed');
    return response;
  },

  // Clear all items
  clearDatabase: async () => {
    const response = await api.delete('/items/clear');
    return response;
  },

  // Get all items
  getAllItems: async () => {
    const response = await api.get('/items/all');
    return response;
  },

  // Update an item
  updateItem: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response;
  },

  // Delete an item
  deleteItem: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response;
  }
};
