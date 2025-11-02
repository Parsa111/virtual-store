'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Headphones, Moon, Sun } from 'lucide-react';
import { mockCategories } from '@/data/mockData';
import { useProducts } from '@/context/ProductsContext';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import AIChatbot from '@/components/ui/AIChatbot';

export default function Home() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('homePageDarkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('homePageDarkMode', newMode.toString());
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="relative z-10">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Discover Amazing Products
              </h1>
              <p className="text-lg sm:text-xl mb-6 md:mb-8 text-blue-100 max-w-lg mx-auto lg:mx-0">
                Shop the latest trends with the best prices
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" isDarkMode={isDarkMode}>
                  <Link href="/products" className="flex items-center justify-center w-full">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="!border-2 !border-white !bg-transparent !text-white hover:!bg-white/10 !font-semibold min-w-[140px] w-full sm:w-auto" isDarkMode={isDarkMode}>
                  <Link href="/about" className="flex items-center justify-center w-full px-2">
                    <span className="!whitespace-nowrap !text-white">Learn More</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <Link href="/sales" className="block group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center mx-auto max-w-sm hover:bg-white/15 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                  <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-yellow-200 transition-colors">50%</div>
                  <div className="text-base md:text-lg mb-2 md:mb-4 group-hover:text-yellow-200 transition-colors">OFF</div>
                  <div className="text-xs md:text-sm text-blue-100 group-hover:text-yellow-100 transition-colors">On selected items</div>
                  <div className="mt-3 text-xs text-blue-200 group-hover:text-yellow-100 transition-colors font-medium">
                    Click to shop deals →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-12 md:py-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-4">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <Truck className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className={`text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? '!text-white' : '!text-gray-900'
              }`}>Free Shipping</h3>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Free shipping on orders over $50</p>
            </div>
            <div className="text-center p-4">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <Shield className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className={`text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? '!text-white' : '!text-gray-900'
              }`}>Secure Payment</h3>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Your payment information is safe</p>
            </div>
            <div className="text-center p-4 sm:col-span-2 lg:col-span-1">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
              }`}>
                <Headphones className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className={`text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? '!text-white' : '!text-gray-900'
              }`}>24/7 Support</h3>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Removed */}

      {/* Featured Products */}
      <section className={`py-12 md:py-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Featured Products</h2>
            <p className={`max-w-2xl mx-auto text-sm md:text-base px-4 transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              Check out our handpicked selection of premium products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className={`transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 rounded-lg p-2' : ''
              }`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="w-full sm:w-auto" isDarkMode={isDarkMode}>
              <Link href="/products" className="flex items-center justify-center">
                Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 !text-white">Newsletter</h2>
            <p className="text-blue-100 mb-6 md:mb-8 text-sm md:text-base px-4 !text-blue-100">
              Subscribe to get updates on new products and offers
            </p>
            <form className="flex flex-col gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base !text-gray-900"
              />
              <Button variant="secondary" size="lg" className="w-full" isDarkMode={isDarkMode}>
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
