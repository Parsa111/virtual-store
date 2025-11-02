import React from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Product } from '@/types';

interface SearchSuggestionsProps {
  suggestions: Product[];
  isVisible: boolean;
  onSelectSuggestion: (product: Product) => void;
  onSelectQuery: (query: string) => void;
  query: string;
  selectedIndex?: number;
  onKeyNavigation?: (direction: 'up' | 'down' | 'enter') => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  isVisible,
  onSelectSuggestion,
  onSelectQuery,
  query
}) => {
  if (!isVisible || (!suggestions.length && !query)) {
    return null;
  }

  const popularSearches = [
    'wireless headphones',
    'smart watch', 
    'cotton t-shirt',
    'yoga mat',
    'coffee mug'
  ];

  const filteredPopular = query 
    ? popularSearches.filter(search => 
        search.toLowerCase().includes(query.toLowerCase())
      )
    : popularSearches.slice(0, 3);

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {/* Product Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b dark:border-gray-600">
            Products
          </div>
          {suggestions.slice(0, 5).map((product) => (
            <button
              key={product.id}
              onClick={() => onSelectSuggestion(product)}
              className="w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0 flex items-center justify-center">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {product.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  ${product.price} • {product.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Popular Searches */}
      {filteredPopular.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
            {query ? 'Suggested Searches' : 'Popular Searches'}
          </div>
          {filteredPopular.map((search) => (
            <button
              key={search}
              onClick={() => onSelectQuery(search)}
              className="w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors text-left"
            >
              <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{search}</span>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {suggestions.length === 0 && query && (
        <div className="px-4 py-6 text-center text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No products found for &quot;{query}&quot;</p>
          <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;