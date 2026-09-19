import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Users, 
  Globe, 
  Cookie, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  AlertTriangle,
  Check,
  Settings,
  Share2
} from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = "September 5, 2025";

  const dataTypes = [
    {
      icon: Users,
      title: "Personal Information",
      description: "Information you provide directly to us",
      examples: [
        "Name and contact information",
        "Billing and shipping addresses",
        "Payment information (processed securely)",
        "Account credentials",
        "Communication preferences"
      ]
    },
    {
      icon: Globe,
      title: "Usage Information",
      description: "Information collected automatically when you use our service",
      examples: [
        "IP address and device information",
        "Browser type and version",
        "Pages visited and time spent",
        "Search queries and interactions",
        "Referral sources"
      ]
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      description: "Technologies used to enhance your experience",
      examples: [
        "Essential cookies for site functionality",
        "Performance analytics cookies",
        "Personalization preferences",
        "Marketing and advertising cookies",
        "Third-party service cookies"
      ]
    }
  ];

  const dataUses = [
    {
      icon: Check,
      title: "Service Delivery",
      description: "To provide and improve our e-commerce services",
      purposes: [
        "Process orders and payments",
        "Deliver products and services",
        "Provide customer support",
        "Maintain account security",
        "Improve website functionality"
      ]
    },
    {
      icon: Mail,
      title: "Communication",
      description: "To keep you informed about your orders and our services",
      purposes: [
        "Order confirmations and updates",
        "Customer service responses",
        "Marketing communications (with consent)",
        "Security alerts and notifications",
        "Policy updates and changes"
      ]
    },
    {
      icon: Settings,
      title: "Personalization",
      description: "To customize your shopping experience",
      purposes: [
        "Product recommendations",
        "Customized content and offers",
        "Saved preferences and settings",
        "Wishlist and comparison features",
        "Targeted advertising (with consent)"
      ]
    }
  ];

  const userRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "Request access to your personal data we hold"
    },
    {
      icon: FileText,
      title: "Right to Rectification",
      description: "Correct inaccurate or incomplete personal data"
    },
    {
      icon: AlertTriangle,
      title: "Right to Erasure",
      description: "Request deletion of your personal data"
    },
    {
      icon: Settings,
      title: "Right to Portability",
      description: "Receive your data in a portable format"
    },
    {
      icon: Lock,
      title: "Right to Restriction",
      description: "Limit how we process your personal data"
    },
    {
      icon: Share2,
      title: "Right to Object",
      description: "Object to certain types of processing"
    }
  ];

  const securityMeasures = [
    "SSL/TLS encryption for all data transmission",
    "Secure payment processing with PCI DSS compliance",
    "Regular security audits and vulnerability assessments",
    "Access controls and employee training",
    "Data backup and disaster recovery procedures",
    "Incident response and breach notification protocols"
  ];

  const cookieCategories = [
    {
      name: "Strictly Necessary",
      description: "Essential for website functionality",
      required: true,
      examples: "Shopping cart, user authentication, security"
    },
    {
      name: "Performance",
      description: "Help us understand how visitors use our site",
      required: false,
      examples: "Google Analytics, page load times, error tracking"
    },
    {
      name: "Functionality",
      description: "Remember your preferences and settings",
      required: false,
      examples: "Language preferences, location settings, customizations"
    },
    {
      name: "Marketing",
      description: "Used to deliver relevant advertisements",
      required: false,
      examples: "Ad targeting, social media integration, remarketing"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-blue-100 mb-4">
              Your privacy matters to us. Learn how we protect and use your information.
            </p>
            <p className="text-blue-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Privacy Commitment</h2>
              <p className="text-blue-800 mb-4">
                At Virtual Store, we are committed to protecting your privacy and ensuring the security of your 
                personal information. This Privacy Policy explains how we collect, use, share, and protect 
                your information when you visit our website or use our services.
              </p>
              <p className="text-blue-800">
                By using our services, you agree to the collection and use of information in accordance 
                with this policy. We encourage you to read this policy carefully and contact us if you 
                have any questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure by Design</h3>
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect your data.
                </p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Transparent Practices</h3>
                <p className="text-gray-600">
                  We clearly explain how we collect, use, and share your information.
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Settings className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Control</h3>
                <p className="text-gray-600">
                  You have rights and choices about how your data is used.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Information We Collect</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {dataTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <type.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                      <p className="text-gray-600 text-sm">{type.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start">
                        <Database className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How We Use Your Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {dataUses.map((use, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <use.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{use.title}</h3>
                      <p className="text-gray-600 text-sm">{use.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {use.purposes.map((purpose, purposeIndex) => (
                      <li key={purposeIndex} className="flex items-start">
                        <Check className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{purpose}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cookie Policy</h2>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Cookie className="w-8 h-8 text-orange-600 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">What are Cookies?</h3>
                  <p className="text-gray-600">
                    Cookies are small text files stored on your device that help us provide a better experience.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cookieCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.required 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {category.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <p className="text-gray-500 text-xs">Examples: {category.examples}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Your Privacy Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRights.map((right, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <right.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{right.title}</h3>
                  <p className="text-gray-600 text-sm">{right.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                To exercise any of these rights, please contact our privacy team.
              </p>
              <Link 
                href="mailto:privacy@virtualstore.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Privacy Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Lock className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-300 text-lg">
                We implement comprehensive security measures to protect your personal information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityMeasures.map((measure, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg">
                  <Shield className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-200">{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Retention</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold">Retention Periods</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Account data: Retained while account is active</li>
                    <li>• Order history: 7 years for tax and legal compliance</li>
                    <li>• Marketing data: Until consent is withdrawn</li>
                    <li>• Analytics data: 26 months maximum</li>
                    <li>• Support tickets: 3 years for quality assurance</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                    <h3 className="text-lg font-semibold">Deletion Process</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Secure deletion from all systems</li>
                    <li>• Backup purging within 90 days</li>
                    <li>• Legal hold exceptions when required</li>
                    <li>• Anonymization for statistical purposes</li>
                    <li>• Confirmation provided upon request</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">International Data Transfers</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start mb-6">
                <Globe className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cross-Border Data Processing</h3>
                  <p className="text-gray-600 mb-4">
                    Your information may be transferred to and processed in countries other than your country of 
                    residence. We ensure appropriate safeguards are in place for all international transfers.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Safeguards Include:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Adequacy decisions by regulatory authorities</li>
                    <li>• Standard contractual clauses</li>
                    <li>• Binding corporate rules</li>
                    <li>• Certification schemes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Rights Apply:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Same privacy rights regardless of location</li>
                    <li>• Right to object to international transfers</li>
                    <li>• Access to transfer safeguards documentation</li>
                    <li>• Complaint mechanisms available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Changes to This Policy</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Policy Updates</h3>
                  <p className="text-yellow-800 mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    technology, legal requirements, or other factors.
                  </p>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• We will notify you of material changes via email or website notice</li>
                    <li>• Changes become effective 30 days after notification</li>
                    <li>• Continued use constitutes acceptance of updated policy</li>
                    <li>• Previous versions available upon request</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Privacy Questions?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-semibold">Email Our Privacy Team</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  For privacy-related questions, requests, or concerns
                </p>
                <Link 
                  href="mailto:privacy@virtualstore.com"
                  className="inline-flex items-center px-4 py-2 bg-white !text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  privacy@virtualstore.com
                </Link>
              </div>
              <div className="bg-blue-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-semibold">Call Our Privacy Line</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Speak directly with our privacy specialists
                </p>
                <Link 
                  href="tel:+1-555-PRIVACY"
                  className="inline-flex items-center px-4 py-2 bg-white !text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  +1 (555) PRIVACY
                </Link>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-blue-100">
                Response time: We aim to respond to all privacy inquiries within 30 days
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;