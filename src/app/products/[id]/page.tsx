'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share, Plus, Minus, ArrowLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductsContext';
import { ProductTranslationProvider, useProductTranslation } from '@/context/ProductTranslationContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import AIChatbot from '@/components/ui/AIChatbot';
import ProductLanguageSwitcher from '@/components/ui/ProductLanguageSwitcher';

const ProductDetailContent: React.FC = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { getProductById, products } = useProducts();
  const product = getProductById(productId);
  const { addToCart, isInCart, getCartItemQuantity, updateQuantity } = useCart();
  const { t, isRTL } = useProductTranslation();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('productPageDarkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('productPageDarkMode', newMode.toString());
  };

  // Function to translate product content
  const translateProductContent = (englishContent: string, contentType: 'name' | 'description'): string => {
    if (!isRTL) return englishContent;
    
    // Define translations for common product content
    const translations: { [key: string]: string } = {
      // Product names
      'Ceramic Coffee Mug Set': 'مجموعه فنجان قهوه سرامیکی',
      'Wireless Headphones': 'هدفون بی‌سیم',
      'Smart Watch': 'ساعت هوشمند',
      'Gaming Laptop': 'لپ تاپ گیمینگ',
      'Bluetooth Speaker': 'بلندگو بلوتوث',
      'Premium Leather Wallet': 'کیف پول چرمی پریمیوم',
      'Fitness Tracker': 'ردیاب تناسب اندام',
      'Running Shoes': 'کفش ورزشی',
      'Organic Coffee Beans': 'دانه قهوه ارگانیک',
      'Smartphone Case': 'قاب گوشی هوشمند',
      
      // Product descriptions
      'Set of 4 handcrafted ceramic coffee mugs with elegant design.': 'مجموعه ای از 4 فنجان قهوه سرامیکی دست ساز با طراحی زیبا.',
      'High-quality wireless headphones with noise cancellation.': 'هدفون بی‌سیم با کیفیت بالا و قابلیت حذف نویز.',
      'Advanced fitness tracker with heart rate monitor.': 'دستگاه پیشرفته ردیاب تناسب با مانیتور ضربان قلب.',
      'Powerful gaming laptop with dedicated graphics card.': 'لپ تاپ قدرتمند گیمینگ با کارت گرافیک اختصاصی.',
      'Portable Bluetooth speaker with premium sound quality.': 'بلندگوی قابل حمل بلوتوث با کیفیت صوت پریمیوم.',
      'Premium leather wallet with multiple card slots.': 'کیف پول چرمی پریمیوم با جای کارت متعدد.',
      'Advanced fitness tracker for health monitoring.': 'ردیاب پیشرفته تناسب اندام برای نظارت بر سلامت.',
      'Comfortable running shoes for all terrains.': 'کفش ورزشی راحت برای همه نوع زمین‌ها.',
      'Premium organic coffee beans for perfect brew.': 'دانه قهوه ارگانیک پریمیوم برای دم آوری عالی.',
      'Protective case for smartphones with drop protection.': 'قاب محافظ گوشی هوشمند با حفاظت در برابر افتادن.'
    };
    
    return translations[englishContent] || englishContent;
  };

  if (!product) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 py-8">
          {/* Controls */}
          <div className={`flex justify-between items-center mb-4 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <ProductLanguageSwitcher isDarkMode={isDarkMode} />
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={isDarkMode ? t('darkMode.switchToLight') : t('darkMode.switchToDark')}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="text-center">
            <h1 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{t('product.notFound')}</h1>
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{t('product.notFoundDesc')}</p>
            <Link href="/products">
              <Button isDarkMode={isDarkMode}>
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t('button.back')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuantity = getCartItemQuantity(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 transition-colors duration-300 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : isDarkMode ? 'text-gray-600' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Provide fallback image for empty strings
  const defaultImage = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
  const images = product.images && product.images.length > 0 ? product.images : [product.image || defaultImage];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    } ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className={`flex justify-between items-center mb-4 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <ProductLanguageSwitcher isDarkMode={isDarkMode} />
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={isDarkMode ? t('darkMode.switchToLight') : t('darkMode.switchToDark')}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className={`flex items-center space-x-2 text-sm ${
          isRTL ? 'flex-row-reverse space-x-reverse' : ''
        }`}>
          <Link href="/" className={`transition-colors duration-300 ${
            isDarkMode 
              ? 'text-gray-300 hover:text-blue-400' 
              : 'text-gray-600 hover:text-blue-600'
          }`}>{t('nav.home')}</Link>
          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
          <Link href="/products" className={`transition-colors duration-300 ${
            isDarkMode 
              ? 'text-gray-300 hover:text-blue-400' 
              : 'text-gray-600 hover:text-blue-600'
          }`}>{t('nav.products')}</Link>
          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
          <Link href={`/categories/${product.category}`} className={`capitalize transition-colors duration-300 ${
            isDarkMode 
              ? 'text-gray-300 hover:text-blue-400' 
              : 'text-gray-600 hover:text-blue-600'
          }`}>
            {product.category}
          </Link>
          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            {translateProductContent(product.name, 'name')}
          </span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className={`relative aspect-square overflow-hidden rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <Image
              src={images[selectedImage] && images[selectedImage].trim() !== '' ? images[selectedImage] : defaultImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                {t('product.sale')}
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">{t('product.outOfStock')}</span>
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image && image.trim() !== '' ? image : defaultImage}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {translateProductContent(product.name, 'name')}
            </h1>
            
            {/* Rating */}
            <div className={`flex items-center mb-4 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}>
              <div className={`flex items-center ${
                isRTL ? 'ml-3' : 'mr-3'
              }`}>
                {renderStars(product.rating)}
              </div>
              <span className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.rating.toFixed(1)} ({product.reviews} {t('product.reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
              <span className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className={`text-xl line-through ml-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className={`px-2 py-1 rounded text-sm font-medium ml-3 transition-colors duration-300 ${
                  isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                }`}>
                  {t('product.save')} {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{t('product.description')}</h3>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {translateProductContent(product.description, 'description')}
            </p>
          </div>

          {/* Tags */}
          {product.tags && (
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{t('product.tags')}</h3>
              <div className={`flex flex-wrap gap-2 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}>
                {product.tags.map((tag, index) => {
                  // Translate tags to Farsi
                  const tagTranslations: { [key: string]: string } = {
                    'ceramic': 'سرامیکی',
                    'handcrafted': 'دست‌ساز', 
                    'set': 'مجموعه',
                    'coffee': 'قهوه',
                    'mug': 'فنجان',
                    'elegant': 'زیبا',
                    'premium': 'پریمیوم',
                    'modern': 'مدرن',
                    'classic': 'کلاسیک',
                    'wireless': 'بی‌سیم',
                    'bluetooth': 'بلوتوث',
                    'smart': 'هوشمند',
                    'gaming': 'گیمینگ',
                    'laptop': 'لپ‌تاپ',
                    'speaker': 'بلندگو',
                    'headphones': 'هدفون',
                    'watch': 'ساعت',
                    'fitness': 'تناسب',
                    'tracker': 'ردیاب',
                    'leather': 'چرمی',
                    'wallet': 'کیف پول',
                    'shoes': 'کفش',
                    'running': 'ورزشی',
                    'organic': 'ارگانیک',
                    'beans': 'دانه',
                    'smartphone': 'گوشی هوشمند',
                    'case': 'قاب',
                    'protective': 'محافظ'
                  };
                  
                  const translatedTag = isRTL ? (tagTranslations[tag.toLowerCase()] || tag) : tag;
                  
                  return (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {translatedTag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('product.quantity')}
              </label>
              <div className={`flex items-center space-x-3 ${
                isRTL ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`p-2 border rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className={`text-lg font-medium min-w-[3rem] text-center transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className={`p-2 border rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={`flex space-x-4 ${
              isRTL ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
                size="lg"
                isDarkMode={isDarkMode}
              >
                <ShoppingCart className={`w-5 h-5 ${
                  isRTL ? 'ml-2' : 'mr-2'
                }`} />
                {isInCart(product.id) ? t('product.addMoreToCart') : t('product.addToCart')}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="p-3" 
                isDarkMode={isDarkMode}
                title={t('button.wishlist')}
              >
                <Heart className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="p-3" 
                isDarkMode={isDarkMode}
                title={t('button.share')}
              >
                <Share className="w-5 h-5" />
              </Button>
            </div>

            {currentQuantity > 0 && (
              <div className={`border rounded-lg p-4 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-green-900 border-green-700'
                  : 'bg-green-50 border-green-200'
              }`}>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-green-200' : 'text-green-800'
                }`}>
                  {t('product.inCart').replace('{count}', currentQuantity.toString())}
                </p>
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className={`border-t pt-6 transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`flex items-center ${
              isRTL ? 'flex-row-reverse' : ''
            }`}>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isRTL ? 'ml-2' : 'mr-2'
              } ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('product.availability')}
              </span>
              <span className={`text-sm font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.inStock ? t('product.inStock') : t('product.outOfStock')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className={`text-2xl font-bold mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{t('related.title')}</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
            isRTL ? 'rtl' : 'ltr'
          }`}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className={`transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 rounded-lg p-4' : ''
              }`}>
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* AI Chatbot */}
      <AIChatbot currentProduct={product} />
      </div>
    </div>
  );
};

// Main component that wraps with translation provider
const ProductDetailPage: React.FC = () => {
  return (
    <ProductTranslationProvider>
      <ProductDetailContent />
    </ProductTranslationProvider>
  );
};

export default ProductDetailPage;