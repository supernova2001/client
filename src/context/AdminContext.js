import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AdminContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Check for existing admin session on mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      // Simple token validation - in a real app, you'd verify with backend
      dispatch({ type: 'LOGIN_SUCCESS' });
    }
  }, []);

  const login = async (username, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simple hardcoded admin credentials for demo
      // In a real app, this would be a backend API call
      if (username === 'admin' && password === 'admin123') {
        const token = 'admin_token_' + Date.now();
        localStorage.setItem('adminToken', token);
        dispatch({ type: 'LOGIN_SUCCESS' });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
