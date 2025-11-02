import { useState, useEffect } from 'react';
import { searchProducts } from '@/data/mockData';
import { Product } from '@/types';

interface UseSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isLoading: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

export const useSearch = (initialQuery: string = ''): UseSearchResult => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const results = searchProducts(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Auto-search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== initialQuery) {
        performSearch(searchQuery);
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, initialQuery]);

  // Initial search on mount
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    performSearch,
    clearSearch,
  };
};

export default useSearch;