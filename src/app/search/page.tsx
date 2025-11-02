'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Product } from '@/types';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = searchProducts(query);
      setSearchResults(results);
      setIsLoading(false);
    };

    performSearch();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // relevance
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Button type="submit" size="lg" className="!px-6 !font-semibold">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results Header */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {query ? (
                  <>
                    Search Results for &quot;{query}&quot;
                    {!isLoading && (
                      <span className="text-base font-normal text-gray-600 ml-2">
                        ({searchResults.length} {searchResults.length === 1 ? 'result' : 'results'})
                      </span>
                    )}
                  </>
                ) : (
                  'Search Products'
                )}
              </h1>
              {isLoading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              )}
            </div>
            
            {searchResults.length > 0 && (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {!query ? (
            // Welcome state
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <Search className="w-24 h-24 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Product</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Search through our extensive catalog of products to find exactly what you&apos;re looking for.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
                <button
                  onClick={() => setSearchQuery('headphones')}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Headphones
                </button>
                <button
                  onClick={() => setSearchQuery('clothing')}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clothing
                </button>
                <button
                  onClick={() => setSearchQuery('electronics')}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Electronics
                </button>
                <button
                  onClick={() => setSearchQuery('fitness')}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fitness
                </button>
              </div>
            </div>
          ) : isLoading ? (
            // Loading state
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for products...</p>
            </div>
          ) : searchResults.length > 0 ? (
            // Results found
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-6`}>
              {sortedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // No results found
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <Search className="w-24 h-24 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any products matching &quot;{query}&quot;. Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
                <Button>
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Suggestions Section */}
      {query && searchResults.length === 0 && !isLoading && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Popular Searches</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['wireless headphones', 'smart watch', 'cotton t-shirt', 'yoga mat', 'coffee mug'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
      <SearchPageContent />
    </Suspense>
  );
}