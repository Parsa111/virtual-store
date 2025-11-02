'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, GitCompare, Eye } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import Button from '@/components/ui/Button';

const ComparisonBar: React.FC = () => {
  const { comparisonList, removeFromComparison, clearComparison, comparisonCount } = useComparison();

  if (comparisonCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-lg z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Product count and items */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-blue-600" />
              <span className="!font-semibold !text-gray-900 !whitespace-nowrap">
                Compare ({comparisonCount}/4)
              </span>
            </div>
            
            {/* Product thumbnails */}
            <div className="flex gap-2 overflow-x-auto max-w-md">
              {comparisonList.map((product) => (
                <div
                  key={product.id}
                  className="relative flex-shrink-0 group"
                >
                  <div className="relative w-12 h-12 bg-gray-100 rounded-lg border overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove from comparison"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="!font-semibold !text-gray-700 hover:!text-red-600 hover:!border-red-600 !whitespace-nowrap"
            >
              Clear All
            </Button>
            
            <Button
              size="md"
              className="!font-semibold !bg-blue-600 !text-white hover:!bg-blue-700"
            >
              <Link href="/compare" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="!text-white whitespace-nowrap">View Comparison</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;