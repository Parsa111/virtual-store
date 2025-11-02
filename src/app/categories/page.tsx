'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Package, ShoppingBag } from 'lucide-react';
import { mockCategories, getProductsByCategory } from '@/data/mockData';
import AIChatbot from '@/components/ui/AIChatbot';

const CategoriesPage: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [forceGradients, setForceGradients] = useState(false);

  // Auto-fallback to gradients after 3 seconds if images haven't loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceGradients(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageError = (categoryId: number) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }));
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600', 
      'from-pink-500 to-rose-600',
      'from-yellow-500 to-orange-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our diverse range of categories and discover amazing products across different collections.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockCategories.map((category, index) => {
          const productsCount = getProductsByCategory(category.slug).length;
          
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getGradientColors(index)}`}>
                <div className={`w-full h-full bg-gradient-to-br ${getGradientColors(index)} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold !text-white">{category.name}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-800">
                      {productsCount} items
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">Browse Collection</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Categories Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {mockCategories.length}
            </h3>
            <p className="text-gray-600">{mockCategories.length} Product Categories</p>
          </div>
          
          <div>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {mockCategories.reduce((total, category) => {
                return total + getProductsByCategory(category.slug).length;
              }, 0)}
            </h3>
            <p className="text-gray-600">Total Products</p>
          </div>
          
          <div>
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {mockCategories.reduce((total, category) => {
                const products = getProductsByCategory(category.slug);
                return total + products.filter(p => p.inStock).length;
              }, 0)}
            </h3>
            <p className="text-gray-600">In Stock</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse all our products or use our search functionality to find exactly what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 !text-white !font-semibold rounded-lg hover:bg-blue-700 transition-colors !whitespace-nowrap"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 !font-semibold rounded-lg hover:bg-gray-50 transition-colors !whitespace-nowrap"
          >
            Advanced Search
          </Link>
        </div>
      </div>
      
      {/* AI Chatbot */}
      <AIChatbot />
      </div>
    </div>
  );
};

export default CategoriesPage;