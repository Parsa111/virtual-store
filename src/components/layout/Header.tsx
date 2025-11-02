'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, GitCompare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useComparison } from '@/context/ComparisonContext';
import { cn } from '@/lib/utils';
import { searchProducts } from '@/data/mockData';
import SearchSuggestions from '@/components/ui/SearchSuggestions';

import { Product } from '@/types';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { comparisonCount } = useComparison();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/search', label: 'Search' },
    { href: '/compare', label: 'Compare' },
    { href: '/sales', label: 'Sales', highlight: true },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  // Handle search input changes with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.trim()) {
      setShowSuggestions(true);
      searchTimeoutRef.current = setTimeout(() => {
        const suggestions = searchProducts(value).slice(0, 5);
        setSearchSuggestions(suggestions);
      }, 300);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionSelect = (product: Product) => {
    setShowSuggestions(false);
    window.location.href = `/products/${product.id}`;
  };

  const handleQuerySelect = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleMobileSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      // If no query, just go to search page
      window.location.href = '/search';
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Parsa Store
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div ref={searchRef} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <SearchSuggestions
                suggestions={searchSuggestions}
                isVisible={showSuggestions}
                onSelectSuggestion={handleSuggestionSelect}
                onSelectQuery={handleQuerySelect}
                query={searchQuery}
              />
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Search icon - Mobile */}
            <button 
              onClick={handleMobileSearch}
              className="md:hidden p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-gray-300 hover:border-blue-600"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* User account */}
            <Link href="/account" className="p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-gray-300 hover:border-blue-600">
              <User className="w-6 h-6" />
            </Link>

            {/* Comparison */}
            <Link href="/compare" className="relative p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-gray-300 hover:border-blue-600">
              <GitCompare className="w-6 h-6" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {comparisonCount}
                </span>
              )}
            </Link>

            {/* Shopping cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-gray-300 hover:border-blue-600">
              <ShoppingCart className="w-6 h-6" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-gray-300 hover:border-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex space-x-2 py-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 ${
                    link.highlight 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg relative'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-600'
                  }`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-2 bg-white text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                      SALE
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <nav className={cn(
          "md:hidden border-t border-gray-200 transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <ul className="py-4 space-y-3 px-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm ${
                    link.highlight
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                      SALE
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;