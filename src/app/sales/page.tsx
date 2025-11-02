'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProductsWithDiscount } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import { ChevronDown, Filter, Grid, List } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SalesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('discount');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get products with significant discounts (20% or more)
  const discountedProducts = getProductsWithDiscount(20);

  const calculateDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const sortedProducts = [...discountedProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        const discountA = calculateDiscountPercent(a.price, a.originalPrice);
        const discountB = calculateDiscountPercent(b.price, b.originalPrice);
        return discountB - discountA;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6">
              <div className="text-4xl md:text-6xl font-bold mb-2">UP TO 50%</div>
              <div className="text-xl md:text-2xl mb-2">OFF</div>
              <div className="text-sm md:text-base text-red-100">On selected items</div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Limited Time Sale
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
              Don&apos;t miss out on these incredible deals! Save big on your favorite products.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {sortedProducts.length} Products on Sale
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="discount">Highest Discount</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
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
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {sortedProducts.length > 0 ? (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-6`}>
              {sortedProducts.map((product) => (
                <div key={product.id} className="relative">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {calculateDiscountPercent(product.price, product.originalPrice)}% OFF
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products on sale</h3>
              <p className="text-gray-600">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Don&apos;t Miss Out!
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These deals won&apos;t last forever. Shop now and save big on premium products.
          </p>
          <Button size="lg">
            <Link href="/products" className="flex items-center">
              Shop All Products
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}