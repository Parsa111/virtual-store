'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { mockProducts } from '@/data/mockData';

// Utility function to safely handle localStorage operations
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Check localStorage available space
const getLocalStorageSize = (): number => {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    return 0;
  }
};

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductVisibility: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: string) => Product[];
  getVisibleProducts: () => Product[];
  clearStorage: () => void;
  getStorageInfo: () => { size: number; itemCount: number };
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initialize with mock data and any stored products
    const storedProducts = safeLocalStorage.getItem('parsastore_products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        // Validate that parsedProducts is an array and contains valid product objects
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          // Ensure all products have required fields and default visible to true
          const validProducts = parsedProducts.filter(product => 
            product && 
            typeof product.id === 'number' && 
            typeof product.name === 'string' && 
            typeof product.price === 'number'
          ).map(product => ({
            ...product,
            visible: product.visible !== undefined ? product.visible : true,
            // Restore default image if none exists
            image: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
            images: product.images || []
          }));
          setProducts(validProducts.length > 0 ? validProducts : mockProducts);
        } else {
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error parsing stored products:', error);
        // Clear corrupted data and use mock products
        safeLocalStorage.removeItem('parsastore_products');
        setProducts(mockProducts);
      }
    } else {
      setProducts(mockProducts);
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage with error handling and size limits
    try {
      const productsToStore = products.map(product => {
        // Create a copy without potentially large image data for storage
        const { images, ...productWithoutImages } = product;
        return {
          ...productWithoutImages,
          // Keep only the main image URL, remove base64 images to save space
          image: product.image?.startsWith('data:') ? '' : product.image,
          // Store only first image if it's not base64, otherwise omit images array
          images: product.images?.filter(img => !img.startsWith('data:')).slice(0, 1)
        };
      });
      
      const dataToStore = JSON.stringify(productsToStore);
      
      // Check if data size is reasonable (less than 4MB to be safe)
      if (dataToStore.length < 4 * 1024 * 1024) {
        const success = safeLocalStorage.setItem('parsastore_products', dataToStore);
        if (!success) {
          console.warn('Failed to store products, trying with essential data only');
          const essentialData = products.map(({ id, name, price, category, inStock, visible, featured }) => 
            ({ id, name, price, category, inStock, visible, featured, image: '', images: [] })
          );
          safeLocalStorage.setItem('parsastore_products', JSON.stringify(essentialData));
        }
      } else {
        console.warn('Product data too large for localStorage, storing basic info only');
        // Store only essential product data
        const essentialData = products.map(({ id, name, price, category, inStock, visible, featured }) => 
          ({ id, name, price, category, inStock, visible, featured, image: '', images: [] })
        );
        safeLocalStorage.setItem('parsastore_products', JSON.stringify(essentialData));
      }
    } catch (error) {
      console.error('Failed to save products to localStorage:', error);
      // Try to clear localStorage and save essential data only
      safeLocalStorage.removeItem('parsastore_products');
      const essentialData = products.map(({ id, name, price, category, inStock, visible, featured }) => 
        ({ id, name, price, category, inStock, visible, featured, image: '', images: [] })
      );
      safeLocalStorage.setItem('parsastore_products', JSON.stringify(essentialData));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      visible: productData.visible !== undefined ? productData.visible : true
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const toggleProductVisibility = (id: number) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, visible: !product.visible }
          : product
      )
    );
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured && product.visible !== false);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase() &&
      product.visible !== false
    );
  };

  const getVisibleProducts = (): Product[] => {
    return products.filter(product => product.visible !== false);
  };

  const clearStorage = (): void => {
    safeLocalStorage.removeItem('parsastore_products');
    setProducts(mockProducts);
    console.log('Storage cleared and reset to mock products');
  };

  const getStorageInfo = (): { size: number; itemCount: number } => {
    try {
      const stored = safeLocalStorage.getItem('parsastore_products');
      return {
        size: stored ? stored.length : 0,
        itemCount: products.length
      };
    } catch (error) {
      return { size: 0, itemCount: products.length };
    }
  };

  const value: ProductsContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory,
    getVisibleProducts,
    clearStorage,
    getStorageInfo
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};