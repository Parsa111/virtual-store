'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fa';

interface ProductTranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const ProductTranslationContext = createContext<ProductTranslationContextType | undefined>(undefined);

// Translation keys for the product page
const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      back: 'Back',
    },
    product: {
      notFound: 'Product Not Found',
      notFoundDesc: "The product you're looking for doesn't exist.",
      reviews: 'reviews',
      description: 'Description',
      tags: 'Tags',
      quantity: 'Quantity',
      addToCart: 'Add to Cart',
      addMoreToCart: 'Add More to Cart',
      inCart: 'You have {count} of this item in your cart',
      availability: 'Availability:',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      save: 'Save',
      sale: 'Sale',
    },
    button: {
      wishlist: 'Add to Wishlist',
      share: 'Share',
      back: 'Back to Products',
    },
    related: {
      title: 'Related Products',
    },
    darkMode: {
      switchToLight: 'Switch to Light Mode',
      switchToDark: 'Switch to Dark Mode',
    },
    language: {
      english: 'English',
      farsi: 'فارسی',
    },
  },
  fa: {
    nav: {
      home: 'خانه',
      products: 'محصولات',
      back: 'بازگشت',
    },
    product: {
      notFound: 'محصول یافت نشد',
      notFoundDesc: 'محصولی که دنبال آن می‌گردید وجود ندارد.',
      reviews: 'نظر',
      description: 'توضیحات',
      tags: 'برچسب‌ها',
      quantity: 'تعداد',
      addToCart: 'افزودن به سبد خرید',
      addMoreToCart: 'اضافه کردن به سبد خرید',
      inCart: 'شما {count} عدد از این محصول در سبد خرید دارید',
      availability: 'موجودی:',
      inStock: 'موجود',
      outOfStock: 'ناموجود',
      save: 'صرفه‌جویی',
      sale: 'حراج',
    },
    button: {
      wishlist: 'افزودن به علاقه‌مندی‌ها',
      share: 'اشتراک‌گذاری',
      back: 'بازگشت به محصولات',
    },
    related: {
      title: 'محصولات مرتبط',
    },
    darkMode: {
      switchToLight: 'تغییر به حالت روز',
      switchToDark: 'تغییر به حالت شب',
    },
    language: {
      english: 'English',
      farsi: 'فارسی',
    },
  },
};

interface ProductTranslationProviderProps {
  children: React.ReactNode;
}

export const ProductTranslationProvider: React.FC<ProductTranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa'); // Default to Farsi
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('productPageLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fa')) {
      setLanguage(savedLanguage);
    } else {
      // If no saved language, default to Farsi
      setLanguage('fa');
      localStorage.setItem('productPageLanguage', 'fa');
    }
    setIsInitialized(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('productPageLanguage', lang);
  };

  const t = (key: string): string => {
    if (!isInitialized) {
      // Return Farsi translation during initialization
      const keys = key.split('.');
      let value: any = translations['fa'];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      if (value !== undefined && value !== null) {
        return value;
      }
    }
    
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // If translation not found, return the key as fallback
    if (value === undefined || value === null) {
      // Fallback to English if not found in current language
      if (language !== 'en') {
        let fallbackValue: any = translations['en'];
        for (const k of keys) {
          fallbackValue = fallbackValue?.[k];
        }
        if (fallbackValue) {
          return fallbackValue;
        }
      }
      return key;
    }
    
    return value;
  };

  const isRTL = language === 'fa';

  return (
    <ProductTranslationContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t, 
        isRTL 
      }}
    >
      {children}
    </ProductTranslationContext.Provider>
  );
};

export const useProductTranslation = () => {
  const context = useContext(ProductTranslationContext);
  if (context === undefined) {
    throw new Error('useProductTranslation must be used within a ProductTranslationProvider');
  }
  return context;
};