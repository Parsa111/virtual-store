'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface ComparisonContextType {
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
  comparisonCount: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

interface ComparisonProviderProps {
  children: React.ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  // Load comparison list from localStorage on mount
  useEffect(() => {
    const savedComparison = localStorage.getItem('comparisonList');
    if (savedComparison) {
      try {
        setComparisonList(JSON.parse(savedComparison));
      } catch (error) {
        console.error('Error loading comparison list:', error);
      }
    }
  }, []);

  // Save comparison list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (product: Product) => {
    setComparisonList(prev => {
      // Check if product is already in comparison
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      
      // Limit to maximum 4 products for better comparison view
      if (prev.length >= 4) {
        // Remove the oldest item and add the new one
        return [...prev.slice(1), product];
      }
      
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: number) => {
    setComparisonList(prev => prev.filter(product => product.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (productId: number) => {
    return comparisonList.some(product => product.id === productId);
  };

  const value: ComparisonContextType = {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    comparisonCount: comparisonList.length,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};