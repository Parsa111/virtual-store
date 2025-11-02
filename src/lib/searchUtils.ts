import { Product } from '@/types';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  categories: string[];
  priceRange: { min: number; max: number };
}

export const filterProducts = (
  products: Product[],
  filters: SearchFilters
): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }
    
    if (filters.rating !== undefined && product.rating < filters.rating) {
      return false;
    }
    
    return true;
  });
};

export const getSearchAnalytics = (products: Product[]): SearchResult => {
  const categories = [...new Set(products.map(p => p.category))];
  const prices = products.map(p => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
  
  return {
    products,
    totalCount: products.length,
    categories,
    priceRange
  };
};

export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
};

export const getSearchSuggestions = (query: string): string[] => {
  const suggestions = [
    'wireless headphones',
    'smart watch',
    'cotton t-shirt',
    'yoga mat',
    'coffee mug',
    'designer sneakers',
    'premium products',
    'electronics',
    'clothing',
    'fitness gear'
  ];
  
  if (!query.trim()) return suggestions.slice(0, 5);
  
  const filtered = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );
  
  return filtered.slice(0, 5);
};