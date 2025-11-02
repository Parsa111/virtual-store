'use client';

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { mockCategories } from '@/data/mockData';
import { useProducts } from '@/context/ProductsContext';
import { Product, ProductFilters } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

const ProductsPage: React.FC = () => {
  const { getVisibleProducts } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [showFilters, setShowFilters] = useState(false);

  const products = getVisibleProducts();

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...products];

    // Filter by category
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => product.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(
        product => 
          product.price >= filters.priceRange![0] && 
          product.price <= filters.priceRange![1]
      );
    }

    // Filter by rating
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating!);
    }

    // Filter by stock
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.inStock === filters.inStock);
    }

    // Sort products
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        let compareValue = 0;
        
        switch (filters.sortBy) {
          case 'price':
            compareValue = a.price - b.price;
            break;
          case 'rating':
            compareValue = a.rating - b.rating;
            break;
          case 'name':
            compareValue = a.name.localeCompare(b.name);
            break;
          case 'newest':
            compareValue = a.id - b.id; // Assuming higher ID means newer
            break;
          default:
            compareValue = 0;
        }

        return filters.sortOrder === 'desc' ? -compareValue : compareValue;
      });
    }

    return filteredProducts;
  }, [products, filters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">
          Discover our complete collection of amazing products
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [typeof filters.sortBy, typeof filters.sortOrder];
              handleFilterChange({ sortBy, sortOrder });
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="newest-desc">Newest First</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} products
          </span>
          <div className="flex border rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} md:block`}>
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleFilterChange({ category: undefined })}
                  className="mr-2"
                />
                All Categories
              </label>
              {mockCategories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.slug}
                    onChange={() => handleFilterChange({ category: category.slug })}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={!filters.priceRange}
                  onChange={() => handleFilterChange({ priceRange: undefined })}
                  className="mr-2"
                />
                All Prices
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 0 && filters.priceRange?.[1] === 50}
                  onChange={() => handleFilterChange({ priceRange: [0, 50] })}
                  className="mr-2"
                />
                Under $50
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 50 && filters.priceRange?.[1] === 100}
                  onChange={() => handleFilterChange({ priceRange: [50, 100] })}
                  className="mr-2"
                />
                $50 - $100
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 100 && filters.priceRange?.[1] === 500}
                  onChange={() => handleFilterChange({ priceRange: [100, 500] })}
                  className="mr-2"
                />
                $100 - $500
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 500 && filters.priceRange?.[1] === 1000}
                  onChange={() => handleFilterChange({ priceRange: [500, 1000] })}
                  className="mr-2"
                />
                Over $500
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => handleFilterChange({ rating })}
                    className="mr-2"
                  />
                  {rating}+ Stars
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={!filters.rating}
                  onChange={() => handleFilterChange({ rating: undefined })}
                  className="mr-2"
                />
                All Ratings
              </label>
            </div>
          </div>

          {/* Stock Filter */}
          <div>
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock === true}
                  onChange={(e) => handleFilterChange({ inStock: e.target.checked ? true : undefined })}
                  className="mr-2"
                />
                In Stock Only
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;