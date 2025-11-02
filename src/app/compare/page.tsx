'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, X, ArrowLeft, GitCompare } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

export default function ComparePage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (comparisonList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <GitCompare className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Products to Compare</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add products to your comparison list to see how they stack up against each other.
            </p>
            <Button>
              <Link href="/products" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Product Comparison ({comparisonList.length})
              </h1>
            </div>
            
            <Button
              variant="outline"
              onClick={clearComparison}
              className="!font-semibold !text-red-600 hover:!bg-red-50 hover:!border-red-600"
            >
              Clear All
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-48">
                      Product
                    </th>
                    {comparisonList.map((product) => (
                      <th key={product.id} className="px-6 py-4 text-center min-w-64">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors z-10"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          <div className="relative aspect-square rounded-lg mb-3 overflow-hidden bg-gray-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="200px"
                            />
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200">
                  {/* Price Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Price
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Rating
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-gray-500">({product.reviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Category Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Category
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Stock Status Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Availability
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Description Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Description
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        <p className="text-sm text-gray-600 text-center">
                          {product.description}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                      Actions
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className="space-y-3">
                          <Button
                            size="sm"
                            disabled={!product.inStock}
                            onClick={() => handleAddToCart(product)}
                            className="w-full !font-semibold !bg-blue-600 !text-white hover:!bg-blue-700 disabled:!bg-gray-300"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              <span className="!text-white">Add to Cart</span>
                            </div>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full !font-semibold"
                          >
                            <Link 
                              href={`/products/${product.id}`}
                              className="!text-gray-700 hover:!text-blue-600"
                            >
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Deciding?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Compare the features, prices, and ratings above to make an informed decision. 
            You can add more products to compare or contact our support team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Link href="/products">Add More Products</Link>
            </Button>
            <Button>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}