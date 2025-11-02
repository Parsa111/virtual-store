import React from 'react';
import Link from 'next/link';
import { 
  Cookie, 
  Settings, 
  Eye, 
  BarChart3, 
  Target, 
  Globe, 
  Shield, 
  Clock,
  Info,
  Check,
  X,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  Trash2,
  RefreshCw
} from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  const lastUpdated = "September 5, 2025";

  const cookieTypes = [
    {
      icon: Shield,
      title: "Strictly Necessary Cookies",
      description: "Essential for website functionality and cannot be disabled",
      purpose: "Enable core website features",
      duration: "Session or up to 1 year",
      canDisable: false,
      examples: [
        "Shopping cart contents",
        "User authentication",
        "Security and fraud prevention",
        "Load balancing",
        "CSRF protection tokens"
      ],
      thirdParty: false
    },
    {
      icon: BarChart3,
      title: "Performance Cookies",
      description: "Help us understand how visitors interact with our website",
      purpose: "Analyze website performance and usage",
      duration: "Up to 26 months",
      canDisable: true,
      examples: [
        "Google Analytics",
        "Page load times",
        "Error tracking",
        "User journey analysis",
        "A/B testing data"
      ],
      thirdParty: true
    },
    {
      icon: Settings,
      title: "Functionality Cookies",
      description: "Remember your preferences and provide enhanced features",
      purpose: "Personalize your experience",
      duration: "Up to 2 years",
      canDisable: true,
      examples: [
        "Language preferences",
        "Currency selection",
        "Theme settings",
        "Recently viewed products",
        "Wishlist items"
      ],
      thirdParty: false
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaigns",
      purpose: "Show personalized ads and measure effectiveness",
      duration: "Up to 13 months",
      canDisable: true,
      examples: [
        "Facebook Pixel",
        "Google Ads",
        "Remarketing tags",
        "Affiliate tracking",
        "Social media integration"
      ],
      thirdParty: true
    }
  ];

  const cookieManagement = [
    {
      icon: Eye,
      title: "View Active Cookies",
      description: "See all cookies currently stored by our website",
      action: "Cookie Scanner"
    },
    {
      icon: Settings,
      title: "Manage Preferences",
      description: "Choose which types of cookies you want to allow",
      action: "Preference Center"
    },
    {
      icon: Trash2,
      title: "Clear Cookies",
      description: "Remove all cookies from your browser",
      action: "Browser Settings"
    },
    {
      icon: RefreshCw,
      title: "Reset Consent",
      description: "Update your cookie consent choices",
      action: "Consent Manager"
    }
  ];

  const browserInstructions = [
    {
      browser: "Chrome",
      steps: [
        "Click the three dots menu → Settings",
        "Go to Privacy and security → Cookies and other site data",
        "Choose your preferred cookie settings",
        "Manage exceptions for specific sites"
      ]
    },
    {
      browser: "Firefox",
      steps: [
        "Click the menu button → Settings",
        "Select Privacy & Security",
        "Under Cookies and Site Data, choose your settings",
        "Use 'Manage Data' to remove specific cookies"
      ]
    },
    {
      browser: "Safari",
      steps: [
        "Safari menu → Preferences",
        "Click the Privacy tab",
        "Choose your cookie and tracking settings",
        "Use 'Manage Website Data' for specifics"
      ]
    },
    {
      browser: "Edge",
      steps: [
        "Click the three dots menu → Settings",
        "Select Cookies and site permissions",
        "Choose your cookie preferences",
        "Manage or clear stored data"
      ]
    }
  ];

  const thirdPartyCookies = [
    {
      provider: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      cookies: "_ga, _gid, _gat",
      duration: "Up to 26 months",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      provider: "Facebook",
      purpose: "Social media integration and advertising",
      cookies: "_fbp, fr",
      duration: "Up to 90 days",
      optOut: "https://www.facebook.com/settings/?tab=ads"
    },
    {
      provider: "Google Ads",
      purpose: "Advertising and remarketing",
      cookies: "IDE, DSID, NID",
      duration: "Up to 540 days",
      optOut: "https://adssettings.google.com"
    },
    {
      provider: "Hotjar",
      purpose: "User behavior analytics",
      cookies: "_hjid, _hjSessionUser",
      duration: "Up to 365 days",
      optOut: "https://www.hotjar.com/legal/compliance/opt-out"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-xl text-orange-100 mb-4">
              Understanding how we use cookies to enhance your shopping experience
            </p>
            <p className="text-orange-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better, faster, and more personalized shopping experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Info className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">What They Do</h3>
                <p className="text-gray-600">
                  Remember your preferences, keep you logged in, and help us understand how you use our site.
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">How Long They Last</h3>
                <p className="text-gray-600">
                  Some expire when you close your browser, others stay longer to remember your preferences.
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Control</h3>
                <p className="text-gray-600">
                  You can control which cookies are set and delete them at any time through your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start mb-6">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <type.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          type.canDisable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {type.canDisable ? 'Optional' : 'Required'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Purpose:</span>
                      <p className="text-gray-600">{type.purpose}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Duration:</span>
                      <p className="text-gray-600">{type.duration}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-medium text-gray-700 text-sm">Examples:</span>
                    <ul className="mt-2 space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {type.thirdParty ? 'Third-party cookies' : 'First-party cookies'}
                    </span>
                    <div className="flex items-center">
                      {type.canDisable ? (
                        <Check className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <X className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {type.canDisable ? 'Can disable' : 'Always active'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Manage Your Cookie Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cookieManagement.map((option, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <option.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-orange-600 !text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap">
                    Open {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Third-Party Cookies</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We work with trusted partners who may set cookies on our website to provide enhanced functionality 
              and help us understand how our site is used.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Provider</th>
                    <th className="px-6 py-4 text-left font-semibold">Purpose</th>
                    <th className="px-6 py-4 text-left font-semibold">Cookies</th>
                    <th className="px-6 py-4 text-left font-semibold">Duration</th>
                    <th className="px-6 py-4 text-left font-semibold">Opt-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {thirdPartyCookies.map((provider, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{provider.provider}</td>
                      <td className="px-6 py-4 text-gray-600">{provider.purpose}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-sm">{provider.cookies}</td>
                      <td className="px-6 py-4 text-gray-600">{provider.duration}</td>
                      <td className="px-6 py-4">
                        <Link 
                          href={provider.optOut}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-blue-600 !text-white font-semibold text-sm rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Opt Out
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Settings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browser Cookie Settings</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              You can control cookies through your browser settings. Here's how to manage cookies in popular browsers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {browserInstructions.map((browser, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Globe className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{browser.browser}</h3>
                  </div>
                  <ol className="space-y-2">
                    {browser.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Cookie className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your Cookie Consent</h2>
            <p className="text-blue-100 mb-8 text-lg">
              We respect your privacy choices. You can withdraw or modify your consent at any time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Current Consent Status</h3>
                <div className="space-y-2 text-blue-100">
                  <div className="flex justify-between">
                    <span>Necessary Cookies:</span>
                    <span className="text-green-300">✓ Accepted</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Cookies:</span>
                    <span className="text-yellow-300">? Check Settings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Functionality Cookies:</span>
                    <span className="text-yellow-300">? Check Settings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing Cookies:</span>
                    <span className="text-yellow-300">? Check Settings</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Update Preferences</h3>
                <p className="text-blue-100 mb-4">
                  Change your cookie settings or withdraw consent completely.
                </p>
                <button className="w-full px-4 py-2 bg-white !text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Open Cookie Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact of Disabling */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-8">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-yellow-900 mb-4">Impact of Disabling Cookies</h2>
                  <p className="text-yellow-800 mb-4">
                    While you can disable cookies, doing so may affect your experience on our website:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Without Performance Cookies:</h3>
                      <ul className="space-y-1 text-yellow-800">
                        <li>• We can't improve site performance</li>
                        <li>• Limited error detection</li>
                        <li>• No usage analytics</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Without Functionality Cookies:</h3>
                      <ul className="space-y-1 text-yellow-800">
                        <li>• Settings won't be remembered</li>
                        <li>• No personalized experience</li>
                        <li>• Limited feature availability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Updates */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Questions About Cookies?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-semibold">Email Support</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Questions about our cookie policy or need help with settings?
                </p>
                <Link 
                  href="mailto:cookies@parsastore.com"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 !text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
                >
                  cookies@parsastore.com
                </Link>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-semibold">Policy Updates</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  We'll notify you of any changes to this cookie policy.
                </p>
                <Link 
                  href="/privacy"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  View Privacy Policy
                </Link>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-300">
                This cookie policy was last updated on {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;