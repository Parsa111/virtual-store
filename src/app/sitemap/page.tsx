import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  ShoppingBag, 
  Grid3X3, 
  Search, 
  ShoppingCart, 
  GitCompare, 
  User, 
  Info, 
  Mail, 
  Tag, 
  FileText, 
  Shield, 
  Cookie,
  Eye,
  MapPin
} from 'lucide-react';

const SitemapPage: React.FC = () => {
  const sitemapSections = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { href: "/", label: "Home", description: "Welcome page and featured products" },
        { href: "/products", label: "All Products", description: "Browse our complete product catalog" },
        { href: "/categories", label: "Categories", description: "Shop by product categories" },
        { href: "/search", label: "Search", description: "Find specific products" },
        { href: "/sales", label: "Sales & Deals", description: "Special offers and discounted items" }
      ]
    },
    {
      title: "Product Categories",
      icon: Grid3X3,
      links: [
        { href: "/categories/electronics", label: "Electronics", description: "Phones, laptops, gadgets" },
        { href: "/categories/clothing", label: "Clothing", description: "Fashion and apparel" },
        { href: "/categories/shoes", label: "Shoes", description: "Footwear for all occasions" },
        { href: "/categories/home", label: "Home & Garden", description: "Home improvement and garden supplies" },
        { href: "/categories/books", label: "Books", description: "Literature, educational, and reference books" },
        { href: "/categories/sports", label: "Sports & Outdoors", description: "Fitness and outdoor equipment" }
      ]
    },
    {
      title: "Shopping & Account",
      icon: ShoppingBag,
      links: [
        { href: "/cart", label: "Shopping Cart", description: "Review and checkout your items" },
        { href: "/compare", label: "Product Comparison", description: "Compare selected products" },
        { href: "/account", label: "My Account", description: "Manage your profile and orders" },
        { href: "/account/orders", label: "Order History", description: "View past purchases" },
        { href: "/account/wishlist", label: "Wishlist", description: "Save items for later" },
        { href: "/account/addresses", label: "Addresses", description: "Manage shipping addresses" }
      ]
    },
    {
      title: "Customer Support",
      icon: Mail,
      links: [
        { href: "/contact", label: "Contact Us", description: "Get in touch with our support team" },
        { href: "/help", label: "Help Center", description: "Frequently asked questions and guides" },
        { href: "/shipping", label: "Shipping Information", description: "Delivery options and policies" },
        { href: "/returns", label: "Returns & Exchanges", description: "Return policy and process" },
        { href: "/track-order", label: "Track Your Order", description: "Monitor your shipment status" },
        { href: "/size-guide", label: "Size Guide", description: "Sizing charts for clothing and shoes" }
      ]
    },
    {
      title: "Company Information",
      icon: Info,
      links: [
        { href: "/about", label: "About Us", description: "Learn about Virtual Store" },
        { href: "/careers", label: "Careers", description: "Join our team" },
        { href: "/press", label: "Press", description: "Media resources and news" },
        { href: "/sustainability", label: "Sustainability", description: "Our environmental commitment" },
        { href: "/blog", label: "Blog", description: "Latest news and updates" },
        { href: "/investors", label: "Investor Relations", description: "Financial information for investors" }
      ]
    },
    {
      title: "Legal & Policies",
      icon: FileText,
      links: [
        { href: "/terms", label: "Terms of Service", description: "Terms and conditions of use" },
        { href: "/privacy", label: "Privacy Policy", description: "How we handle your personal data" },
        { href: "/cookies", label: "Cookie Policy", description: "Information about cookies we use" },
        { href: "/accessibility", label: "Accessibility", description: "Our commitment to web accessibility" },
        { href: "/sitemap", label: "Sitemap", description: "Complete site navigation map" },
        { href: "/security", label: "Security", description: "How we protect your information" }
      ]
    }
  ];

  const featuredProducts = [
    { id: 1, name: "Premium Wireless Headphones" },
    { id: 2, name: "Smart Fitness Watch" },
    { id: 3, name: "Organic Cotton T-Shirt" },
    { id: 4, name: "Professional Camera Lens" },
    { id: 5, name: "Ergonomic Office Chair" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Site Map</h1>
            </div>
            <p className="text-xl text-blue-100 mb-4">
              Navigate through all pages and sections of Virtual Store
            </p>
            <p className="text-blue-200">
              Find exactly what you're looking for with our complete site navigation
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link href="/" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                <Home className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Home</span>
              </Link>
              <Link href="/products" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                <ShoppingBag className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Products</span>
              </Link>
              <Link href="/categories" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                <Grid3X3 className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Categories</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                <ShoppingCart className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Cart</span>
              </Link>
              <Link href="/account" className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group">
                <User className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Account</span>
              </Link>
              <Link href="/contact" className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group">
                <Mail className="w-8 h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sitemap */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sitemapSections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <section.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          href={link.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {link.label}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {link.description}
                              </p>
                            </div>
                            <span className="text-gray-400 group-hover:text-blue-600 transition-colors ml-2">
                              →
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Products</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProducts.map((product) => (
                  <Link 
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Products
                  <ShoppingBag className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Search</h3>
                <p className="text-gray-600 mb-4">Can't find what you're looking for? Use our search function.</p>
                <Link href="/search" className="text-blue-600 hover:text-blue-700 font-medium">
                  Search Products →
                </Link>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">Our customer support team is here to assist you.</p>
                <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
                  Contact Support →
                </Link>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Policies</h3>
                <p className="text-gray-600 mb-4">Read our terms, privacy policy, and other important information.</p>
                <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                  View Policies →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Complete Site Navigation</h3>
            <p className="text-gray-300">
              This sitemap provides a comprehensive overview of all pages and sections available on Virtual Store. 
              If you can't find what you're looking for, please contact our support team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;