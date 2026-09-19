# Virtual Store - E-Commerce Frontend Application

Virtual Store is a modern, feature-rich e-commerce frontend application built with Next.js 15, React 19, and TypeScript. This application provides a complete shopping experience with product browsing, cart management, admin dashboard, and more.

## Features

### Customer-Facing Features
- **Product Catalog**: Browse products organized by categories
- **Product Search**: Advanced search functionality with real-time suggestions
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add/remove products, adjust quantities
- **Wishlist/Comparison**: Save products for later comparison
- **Checkout Process**: Streamlined checkout experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: User preference for light/dark theme
- **Multi-language Support**: Product descriptions in multiple languages
- **AI Chatbot**: Intelligent customer support assistant

### Admin Features
- **Dashboard**: Overview of products, inventory, and sales metrics
- **Product Management**: Add, edit, delete, and manage product visibility
- **Category Management**: Organize products into categories
- **Order Management**: View and process customer orders
- **User Management**: Manage customer accounts and permissions
- **Analytics**: Sales reports and performance metrics

## Technology Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Build Tools**: ESLint, PostCSS
- **Deployment**: Vercel (optimized for Next.js)

## Key Components

### Core Pages
- Home Page with featured products and promotions
- Product Listing and Category Pages
- Individual Product Detail Pages
- Shopping Cart and Checkout
- User Account Management
- Admin Dashboard with full product management

### Custom Components
- Product Cards with ratings and pricing
- Responsive Navigation Header and Footer
- Interactive Search with Suggestions
- AI Chatbot for Customer Support
- Dark Mode Toggle
- Language Switcher for Product Descriptions

### Context Providers
- **Products Context**: Centralized product data management
- **Cart Context**: Shopping cart state management
- **Admin Context**: Authentication and admin state
- **Comparison Context**: Product comparison functionality
- **Product Translation Context**: Multi-language product descriptions

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/virtualstore.git

# Navigate to project directory
cd virtualstore

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Project Structure
```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── context/          # React context providers
├── data/             # Mock data and utilities
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Key Features Implementation

### Product Management
- Products are stored in localStorage with fallback to mock data
- Featured products highlighted on homepage
- Category-based filtering and navigation
- Search functionality with smart matching

### Admin Functionality
- Secure admin login system
- Full CRUD operations for products
- Product visibility toggling
- Inventory management
- Sales analytics dashboard

### User Experience
- Responsive design for all screen sizes
- Dark/light mode toggle with localStorage persistence
- Product comparison feature
- AI-powered chatbot assistance
- Multi-language product descriptions

## Acknowledgments
- Product images sourced from Unsplash
- Icons provided by Lucide React
- Built with Next.js and Tailwind CSS