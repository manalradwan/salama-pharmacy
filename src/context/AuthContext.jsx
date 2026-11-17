import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('salama_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('salama_user');
      }
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
  }, [user]);

  const login = (email, password, rememberMe = true) => {
    const simulatedUser = {
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      loginTime: new Date().toISOString()
    };
    setUser(simulatedUser);
    addToast(`Welcome back, ${simulatedUser.name}!`, 'success');
    return { success: true, user: simulatedUser };
  };

  const register = ({ fullName, email, phone, password }) => {
    const newUser = {
      name: fullName,
      email: email,
      phone: phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      joinDate: new Date().toLocaleDateString()
    };
    setUser(newUser);
    addToast(`Account created successfully! Welcome to Salama Pharmacy, ${fullName}`, 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    addToast('You have been safely logged out.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
