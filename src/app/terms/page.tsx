import React from 'react';
import { Shield, FileText, Users, CreditCard, Truck, AlertTriangle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using the Virtual Store website and services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use the service."
      ]
    },
    {
      icon: FileText,
      title: "Use License",
      content: [
        "Permission is granted to temporarily download one copy of the materials on Virtual Store's website for personal, non-commercial transitory viewing only.",
        "This is the grant of a license, not a transfer of title, and under this license you may not:",
        "• Modify or copy the materials",
        "• Use the materials for any commercial purpose or for any public display",
        "• Attempt to reverse engineer any software contained on the website",
        "• Remove any copyright or other proprietary notations from the materials"
      ]
    },
    {
      icon: Shield,
      title: "Privacy and Data Protection",
      content: [
        "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.",
        "By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.",
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
      ]
    },
    {
      icon: CreditCard,
      title: "Purchase Terms",
      content: [
        "All purchases are subject to product availability. We reserve the right to limit quantities or refuse service.",
        "Prices are subject to change without notice. We are not responsible for pricing errors.",
        "Payment must be received by us before we process your order.",
        "We accept various payment methods including credit cards, debit cards, and digital payment systems."
      ]
    },
    {
      icon: Truck,
      title: "Shipping and Delivery",
      content: [
        "We will arrange for shipment of products to you according to the shipping method you select during checkout.",
        "Delivery times are estimates and not guaranteed. We are not liable for delays in delivery.",
        "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
        "You are responsible for providing accurate shipping information."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Returns and Refunds",
      content: [
        "Items may be returned within 30 days of purchase in original condition.",
        "Return shipping costs are the responsibility of the customer unless the item was defective or incorrect.",
        "Refunds will be processed within 5-10 business days after we receive the returned item.",
        "Some items may not be eligible for return due to hygiene or safety reasons."
      ]
    }
  ];

  const additionalTerms = [
    {
      title: "Account Registration",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities under your account."
    },
    {
      title: "Prohibited Uses",
      content: "You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction when using our service."
    },
    {
      title: "Intellectual Property",
      content: "The service and its original content, features, and functionality are and will remain the exclusive property of Virtual Store and its licensors."
    },
    {
      title: "Limitation of Liability",
      content: "In no case shall Virtual Store, its directors, employees, or agents be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind."
    },
    {
      title: "Governing Law",
      content: "These terms shall be interpreted and governed by the laws of the jurisdiction in which Virtual Store operates, without regard to its conflict of law provisions."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-blue-100 mb-4">
              Please read these terms carefully before using our services
            </p>
            <p className="text-blue-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                Welcome to Virtual Store. These Terms of Service ("Terms") govern your use of our website 
                located at our domain and our service operated by Virtual Store.
              </p>
              <p className="text-gray-600">
                Our Privacy Policy also governs your use of the Service and explains how we collect, 
                safeguard and disclose information that results from your use of our web pages.
              </p>
            </div>

            {/* Main Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <section.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Terms */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalTerms.map((term, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{term.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{term.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">By Email:</h3>
                  <p className="text-gray-300">support@virtualstore.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">By Mail:</h3>
                  <p className="text-gray-300">
                    Virtual Store<br />
                    123 Commerce Street<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Acknowledgment</h3>
                  <p className="text-blue-800">
                    By using our service, you acknowledge that you have read these Terms of Service 
                    and agree to be bound by them. If you do not agree to these terms, please do not 
                    use our service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;