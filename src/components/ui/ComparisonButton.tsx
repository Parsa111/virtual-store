'use client';

import React from 'react';
import { GitCompare, Check } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { Product } from '@/types';
import Button from '@/components/ui/Button';

interface ComparisonButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  showText?: boolean;
  className?: string;
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({
  product,
  size = 'md',
  variant = 'outline',
  showText = true,
  className = ''
}) => {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const inComparison = isInComparison(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <Button
      size={size}
      variant={inComparison ? 'primary' : variant}
      onClick={handleClick}
      className={`!font-semibold transition-all duration-200 ${
        inComparison 
          ? '!bg-blue-600 !text-white hover:!bg-blue-700' 
          : '!border-gray-300 !text-gray-700 hover:!bg-blue-600 hover:!text-white'
      } ${className}`}
      title={inComparison ? 'Remove from comparison' : 'Add to comparison'}
    >
      <div className="flex items-center gap-2">
        {inComparison ? (
          <Check className="w-4 h-4" />
        ) : (
          <GitCompare className="w-4 h-4" />
        )}
        {showText && (
          <span className="!text-inherit whitespace-nowrap">
            {inComparison ? 'In Comparison' : 'Compare'}
          </span>
        )}
      </div>
    </Button>
  );
};

export default ComparisonButton;