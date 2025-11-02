import { Product, Category } from '@/types';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    originalPrice: 399.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
    visible: true,
    tags: ["wireless", "noise-cancelling", "premium"]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    price: 24.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 89,
    inStock: true,
    featured: true,
    visible: true,
    tags: ["organic", "cotton", "sustainable"]
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS.",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 204,
    inStock: true,
    featured: true,
    visible: true,
    tags: ["fitness", "smart", "gps"]
  },
  {
    id: 4,
    name: "Designer Sneakers",
    description: "Premium designer sneakers with superior comfort and style.",
    price: 149.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    visible: true,
    tags: ["designer", "comfort", "style"]
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs with elegant design.",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"
    ],
    rating: 4.6,
    reviews: 73,
    inStock: true,
    visible: true,
    tags: ["ceramic", "handcrafted", "set"]
  },
  {
    id: 6,
    name: "Professional Camera Lens",
    description: "High-performance camera lens for professional photography.",
    price: 599.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 92,
    inStock: false,
    visible: true,
    tags: ["professional", "photography", "lens"]
  },
  {
    id: 7,
    name: "Luxury Leather Wallet",
    description: "Premium genuine leather wallet with RFID protection.",
    price: 49.99,
    originalPrice: 99.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 67,
    inStock: true,
    featured: true,
    visible: true,
    tags: ["leather", "luxury", "rfid"]
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse with RGB lighting.",
    price: 39.99,
    originalPrice: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 145,
    inStock: true,
    visible: true,
    tags: ["gaming", "wireless", "rgb"]
  },
  {
    id: 9,
    name: "Premium Yoga Mat",
    description: "Eco-friendly premium yoga mat with superior grip and comfort.",
    price: 29.99,
    originalPrice: 59.99,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    visible: true,
    tags: ["yoga", "eco-friendly", "premium"]
  }
];

// Mock categories with proper images
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "https://plus.unsplash.com/premium_photo-1673968280716-ca0c00bd8d8a?w=600&h=400&fit=crop",
    description: "Latest gadgets, smartphones, laptops, and cutting-edge technology"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    description: "Trendy fashion, casual wear, and premium apparel for every style"
  },
  {
    id: 3,
    name: "Shoes",
    slug: "shoes",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop",
    description: "Premium sneakers, formal shoes, and comfortable footwear"
  },
  {
    id: 4,
    name: "Home & Garden",
    slug: "home",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
    description: "Beautiful home decor, furniture, and garden essentials"
  },
  {
    id: 5,
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
    description: "Stylish watches, jewelry, bags, and premium accessories"
  },
  {
    id: 6,
    name: "Fitness",
    slug: "fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    description: "Fitness equipment, yoga gear, and wellness products"
  }
];

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase().trim();
  const searchTerms = lowercaseQuery.split(' ').filter(term => term.length > 0);
  
  return mockProducts.filter(product => {
    const searchableText = [
      product.name.toLowerCase(),
      product.description.toLowerCase(),
      product.category.toLowerCase(),
      ...(product.tags?.map(tag => tag.toLowerCase()) || [])
    ].join(' ');
    
    // Check if all search terms are found in the searchable text
    return searchTerms.every(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Sort by relevance: featured products first, then by name
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
};

export const getDiscountedProducts = (): Product[] => {
  return mockProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const getProductsWithDiscount = (minDiscountPercent: number = 0): Product[] => {
  return mockProducts.filter(product => {
    if (!product.originalPrice) return false;
    const discountPercent = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    return discountPercent >= minDiscountPercent;
  });
};