'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useProductTranslation, Language } from '@/context/ProductTranslationContext';

interface LanguageSwitcherProps {
  isDarkMode?: boolean;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  isDarkMode = false, 
  className = '' 
}) => {
  const { language, setLanguage, t } = useProductTranslation();

  const languages: { code: Language; label: string; nativeLabel: string }[] = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'fa', label: 'فارسی', nativeLabel: 'فارسی' },
  ];

  return (
    <div className={`relative group ${className}`}>
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        title={t('language.switchLanguage') || 'Change Language'}
        aria-label="Language Switcher"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">
          {languages.find(l => l.code === language)?.nativeLabel || 'English'}
        </span>
      </button>
      
      <div className={`absolute top-full right-0 mt-1 min-w-[120px] rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
        isDarkMode
          ? 'bg-gray-700 border-gray-600'
          : 'bg-white border-gray-200'
      }`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-600'
                : isDarkMode
                ? 'text-gray-300 hover:bg-gray-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.nativeLabel}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;