'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Grid, List, SortDesc } from 'lucide-react';
import { mockCategories, getProductsByCategory } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const { slug } = React.use(params);
  
  // Find the category
  const category = mockCategories.find(cat => cat.slug === slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
        <Link
          href="/categories"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white">
            <nav className="mb-4">
              <Link
                href="/categories"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                All Categories
              </Link>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{category.description}</p>
            
            <div className="mt-4 flex items-center space-x-6">
              <div className="text-white/80">
                <span className="font-semibold text-white">{products.length}</span> Products
              </div>
              <div className="text-white/80">
                <span className="font-semibold text-white">
                  {products.filter(p => p.inStock).length}
                </span> In Stock
              </div>
              {products.some(p => p.originalPrice) && (
                <div className="text-white/80">
                  <span className="font-semibold text-white">
                    {products.filter(p => p.originalPrice && p.originalPrice > p.price).length}
                  </span> On Sale
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                Showing {products.length} products
              </span>
              
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <SortDesc className="w-4 h-4 mr-2" />
                Sort by: Featured
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-8">
              We don't have any products in this category yet. Check back soon!
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;