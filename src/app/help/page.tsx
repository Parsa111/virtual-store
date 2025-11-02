'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  ChevronDown,
  ChevronRight,
  Package,
  CreditCard,
  Truck,
  Shield,
  RefreshCw,
  User,
  Settings,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    {
      id: 'orders',
      name: 'Orders & Shipping',
      icon: Package,
      color: 'bg-blue-500',
      description: 'Track orders, shipping info, and delivery'
    },
    {
      id: 'payments',
      name: 'Payments & Billing',
      icon: CreditCard,
      color: 'bg-green-500',
      description: 'Payment methods, billing, and refunds'
    },
    {
      id: 'returns',
      name: 'Returns & Exchanges',
      icon: RefreshCw,
      color: 'bg-orange-500',
      description: 'Return policy, exchanges, and warranties'
    },
    {
      id: 'account',
      name: 'Account & Profile',
      icon: User,
      color: 'bg-purple-500',
      description: 'Account settings, profile, and security'
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: Settings,
      color: 'bg-red-500',
      description: 'Website issues, app problems, and bugs'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: Shield,
      color: 'bg-gray-500',
      description: 'Data protection, privacy, and security'
    }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and going to "My Orders" section. You\'ll receive a tracking number via email once your order ships. You can also use the tracking number on our shipping partner\'s website.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What are your shipping options and costs?',
      answer: 'We offer several shipping options: Standard (3-5 business days, $5.99), Express (1-2 business days, $12.99), and Overnight ($24.99). Free shipping is available on orders over $75. International shipping is available to select countries.'
    },
    {
      id: 3,
      category: 'orders',
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter processing and cannot be changed. Contact customer service immediately if you need to make changes.'
    },
    {
      id: 4,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Buy Now Pay Later options through Klarna and Afterpay.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption and are PCI DSS compliant. We never store your complete credit card information on our servers. All payments are processed through secure, certified payment processors.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'When will I be charged for my order?',
      answer: 'Your payment method is charged when your order is confirmed and processed. For pre-orders, you\'ll be charged when the item ships. Buy Now Pay Later options have different billing schedules.'
    },
    {
      id: 7,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused, in original packaging, and with tags attached. Some items like personalized products, perishables, and intimate items are not returnable.'
    },
    {
      id: 8,
      category: 'returns',
      question: 'How do I start a return?',
      answer: 'Log into your account, go to "My Orders," find the order you want to return, and click "Return Items." Follow the prompts to print a prepaid return label. You can also contact customer service for assistance.'
    },
    {
      id: 9,
      category: 'returns',
      question: 'How long does it take to process a refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will appear on your original payment method within 3-5 business days after processing.'
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" in the top right corner of our website. You can create an account using your email address or sign up with Google/Facebook. You\'ll need to verify your email address to complete registration.'
    },
    {
      id: 11,
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Check your spam folder if you don\'t see the email within a few minutes.'
    },
    {
      id: 12,
      category: 'technical',
      question: 'The website is not loading properly. What should I do?',
      answer: 'Try clearing your browser cache and cookies, disable browser extensions, or try a different browser. Make sure you have a stable internet connection. If the problem persists, contact technical support.'
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with a customer service representative',
      availability: 'Mon-Fri: 8AM-8PM EST',
      action: 'Call (555) 123-4567',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'bg-purple-500'
    }
  ];

  const quickLinks = [
    { title: 'Order Status', href: '/account', icon: Package },
    { title: 'Shipping Info', href: '/shipping', icon: Truck },
    { title: 'Return Policy', href: '/returns', icon: RefreshCw },
    { title: 'Size Guide', href: '/size-guide', icon: FileText },
    { title: 'Terms of Service', href: '/terms', icon: FileText },
    { title: 'Privacy Policy', href: '/privacy', icon: Shield }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (faqId: number) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Help Center</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to your questions and get the support you need
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <span className="font-semibold text-2xl text-gray-900">99.9%</span>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <span className="font-semibold text-2xl text-gray-900">&lt; 2min</span>
                <p className="text-gray-600">Average Response Time</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <span className="font-semibold text-2xl text-gray-900">24/7</span>
                <p className="text-gray-600">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-left p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
                  selectedCategory === category.id ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-start">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Clear Filter Button */}
          {selectedCategory !== 'all' && (
            <div className="text-center mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Show All Categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search or browse different categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaq === faq.id;
                  return (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Still Need Help? Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="text-sm text-gray-500 mb-4 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {option.availability}
                  </div>
                  <button className="w-full bg-blue-600 !text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <link.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                    {link.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;