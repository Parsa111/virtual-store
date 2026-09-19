'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Truck, Headphones, Award, Users, Zap, Moon, Sun } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('aboutPageDarkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('aboutPageDarkMode', newMode.toString());
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? '!text-white' : '!text-gray-900'
        }`}>
          About Virtual Store
        </h1>
        <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
          isDarkMode ? '!text-gray-300' : '!text-gray-600'
        }`}>
          We're passionate about bringing you the best products at great prices, 
          with exceptional service that puts our customers first.
        </p>
      </div>

      {/* Mission Section */}
      <div className={`rounded-xl p-8 mb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Our Mission</h2>
            <p className={`mb-4 transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              At Virtual Store, we believe shopping should be simple, enjoyable, and accessible to everyone. 
              Our mission is to provide a seamless online shopping experience that connects customers 
              with high-quality products from trusted brands.
            </p>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              We're committed to offering competitive prices, fast shipping, and outstanding 
              customer service that exceeds expectations every time.
            </p>
          </div>
          <div className={`rounded-lg p-8 shadow-md transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2018</div>
              <div className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Founded</div>
              <div className="text-2xl font-bold text-green-600 mb-2">100K+</div>
              <div className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Happy Customers</div>
              <div className="text-2xl font-bold text-purple-600 mb-2">10K+</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? '!text-gray-300' : '!text-gray-600'
              }`}>Products</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
          isDarkMode ? '!text-white' : '!text-gray-900'
        }`}>Why Choose Virtual Store?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Secure & Safe</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              Your security is our priority. We use advanced encryption and secure payment processing.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Fast Delivery</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              Get your orders quickly with our efficient shipping network and tracking system.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
            }`}>
              <Headphones className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>24/7 Support</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              Our dedicated support team is always ready to help you with any questions or concerns.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'
            }`}>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Quality Products</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              We carefully curate our selection to ensure you get only the best quality products.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-red-900' : 'bg-red-100'
            }`}>
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Customer First</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              Everything we do is designed with our customers' satisfaction and convenience in mind.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'
            }`}>
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? '!text-white' : '!text-gray-900'
            }`}>Innovation</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? '!text-gray-300' : '!text-gray-600'
            }`}>
              We continuously improve our platform to provide the best shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 !text-white">Join Our Community</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto !text-blue-100">
          Become part of our growing community of satisfied customers who trust Virtual Store 
          for all their shopping needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors !font-semibold !text-blue-600 !whitespace-nowrap"
          >
            Start Shopping
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-colors !font-semibold !text-white hover:!text-blue-600 !whitespace-nowrap"
          >
            Contact Us
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutPage;