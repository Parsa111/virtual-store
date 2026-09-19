import React from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Ear, 
  MousePointer, 
  Keyboard, 
  Monitor, 
  Smartphone, 
  Settings, 
  Heart,
  Check,
  Globe,
  Volume2,
  ZoomIn,
  Users,
  Mail,
  Phone
} from 'lucide-react';

const AccessibilityPage: React.FC = () => {
  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      description: "Features for users with visual impairments",
      features: [
        "High contrast color schemes",
        "Scalable text up to 200% without loss of functionality",
        "Alternative text for all images",
        "Clear visual focus indicators",
        "Color is not the only means of conveying information"
      ]
    },
    {
      icon: Ear,
      title: "Auditory Accessibility",
      description: "Support for users with hearing impairments",
      features: [
        "Captions for all video content",
        "Visual indicators for audio alerts",
        "Text alternatives for audio information",
        "Sign language interpretation when available",
        "No auto-playing audio content"
      ]
    },
    {
      icon: MousePointer,
      title: "Motor Accessibility",
      description: "Navigation options for users with motor disabilities",
      features: [
        "Full keyboard navigation support",
        "Large click targets (minimum 44px)",
        "No time limits on user actions",
        "Drag and drop alternatives",
        "Voice control compatibility"
      ]
    },
    {
      icon: Keyboard,
      title: "Keyboard Navigation",
      description: "Complete keyboard accessibility",
      features: [
        "Tab order follows logical sequence",
        "All interactive elements are keyboard accessible",
        "Skip navigation links available",
        "Visible focus indicators",
        "Standard keyboard shortcuts supported"
      ]
    }
  ];

  const wcagGuidelines = [
    {
      level: "A",
      title: "Level A Compliance",
      description: "Basic accessibility features",
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      level: "AA",
      title: "Level AA Compliance",
      description: "Enhanced accessibility features (our target)",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      level: "AAA",
      title: "Level AAA Features",
      description: "Premium accessibility features where possible",
      color: "bg-purple-100 text-purple-800 border-purple-200"
    }
  ];

  const assistiveTechnologies = [
    {
      icon: Volume2,
      name: "Screen Readers",
      description: "JAWS, NVDA, VoiceOver, TalkBack",
      support: "Full Support"
    },
    {
      icon: ZoomIn,
      name: "Screen Magnifiers",
      description: "ZoomText, Windows Magnifier, macOS Zoom",
      support: "Full Support"
    },
    {
      icon: Keyboard,
      name: "Voice Recognition",
      description: "Dragon NaturallySpeaking, Windows Speech Recognition",
      support: "Compatible"
    },
    {
      icon: MousePointer,
      name: "Switch Navigation",
      description: "Single-switch, dual-switch devices",
      support: "Compatible"
    }
  ];

  const keyboardShortcuts = [
    { keys: "Tab", action: "Navigate to next interactive element" },
    { keys: "Shift + Tab", action: "Navigate to previous interactive element" },
    { keys: "Enter", action: "Activate buttons and links" },
    { keys: "Space", action: "Activate buttons, checkboxes" },
    { keys: "Arrow Keys", action: "Navigate within menus and lists" },
    { keys: "Esc", action: "Close dialogs and menus" },
    { keys: "Alt + S", action: "Skip to main content" },
    { keys: "/", action: "Focus search field" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Eye className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Accessibility</h1>
            </div>
            <p className="text-xl text-blue-100 mb-4">
              Our commitment to making Virtual Store accessible to everyone
            </p>
            <p className="text-blue-200">
              We believe shopping should be accessible to all users, regardless of ability
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Accessibility Commitment</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Virtual Store is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone, and applying the relevant 
                accessibility standards to ensure we provide equal access to all of our users.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Inclusive Design</h3>
                <p className="text-gray-600">
                  We design with accessibility in mind from the ground up, ensuring everyone can shop with confidence.
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User-Centered</h3>
                <p className="text-gray-600">
                  We listen to our users and continuously improve based on feedback from the accessibility community.
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Standards Compliance</h3>
                <p className="text-gray-600">
                  We follow WCAG 2.1 guidelines and work toward achieving AA level compliance across our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WCAG Compliance */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">WCAG 2.1 Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wcagGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 border ${guideline.color}`}>
                    Level {guideline.level}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{guideline.title}</h3>
                  <p className="text-gray-600">{guideline.description}</p>
                  {guideline.level === 'AA' && (
                    <div className="mt-4 flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-2" />
                      <span className="font-medium">Current Target</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Accessibility Features</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {accessibilityFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assistive Technology Support */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Assistive Technology Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assistiveTechnologies.map((tech, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <tech.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          tech.support === 'Full Support' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {tech.support}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Keyboard Shortcuts</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded font-semibold !text-gray-800">
                      {shortcut.keys}
                    </span>
                    <span className="text-gray-700 text-sm ml-4">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Settings and Customization */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Accessibility Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Browser Settings
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Adjust font size in your browser settings</li>
                    <li>• Enable high contrast mode in your operating system</li>
                    <li>• Use browser zoom up to 200%</li>
                    <li>• Enable reduced motion preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Device Settings
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Screen reader compatibility</li>
                    <li>• Voice control support</li>
                    <li>• Switch navigation compatibility</li>
                    <li>• Mobile accessibility features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback and Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Accessibility Feedback</h2>
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <p className="text-lg text-gray-700 mb-6">
                We welcome your feedback on the accessibility of Virtual Store. Please let us know if you 
                encounter accessibility barriers or have suggestions for improvement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600 mb-4">Send accessibility feedback or questions</p>
                  <Link 
                    href="mailto:accessibility@virtualstore.com"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    accessibility@virtualstore.com
                  </Link>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600 mb-4">Speak with our accessibility team</p>
                  <Link 
                    href="tel:+1-555-ACCESS"
                    className="inline-flex items-center px-4 py-2 bg-green-600 !text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    +1 (555) ACCESS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Improvements */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ongoing Improvements</h2>
            <p className="text-gray-300 mb-6">
              Accessibility is an ongoing effort. We regularly audit our website, gather user feedback, 
              and implement improvements to ensure the best possible experience for all users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Contact Support
              </Link>
              <Link 
                href="/help"
                className="inline-flex items-center px-6 py-3 border border-white !text-white font-semibold rounded-lg hover:bg-white hover:!text-gray-900 transition-colors whitespace-nowrap"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccessibilityPage;