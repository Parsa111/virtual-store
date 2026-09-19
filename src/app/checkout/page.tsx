'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  FileText, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Lock,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  DollarSign
} from 'lucide-react';
import { CartItem } from '@/types';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  method: 'card' | 'paypal' | 'applePay';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  saveCard: boolean;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 5.99,
      icon: Package
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 12.99,
      icon: Truck
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 24.99,
      icon: Calendar
    }
  ];

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: FileText },
    { id: 4, name: 'Complete', icon: CheckCircle }
  ];

  const subtotal = cart.total;
  const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const tax = subtotal * 0.13; // 13% tax
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newOrderId = 'PS' + Date.now().toString().slice(-6);
      setOrderId(newOrderId);
      setOrderCompleted(true);
      clearCart();
      setCurrentStep(4);
    } catch (error) {
      console.error('Order processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link 
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Virtual Store
            </Link>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center ${
                  step.id <= currentStep 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.id <= currentStep 
                    ? 'border-blue-600 bg-blue-600 text-white' 
                    : 'border-gray-300'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="ml-2 font-medium hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-2" />
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.apartment}
                      onChange={(e) => setShippingInfo({...shippingInfo, apartment: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Shipping Methods */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label key={option.id} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={shippingMethod === option.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3"
                          />
                          <option.icon className="w-5 h-5 text-gray-600 mr-3" />
                          <div className="flex-grow">
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${option.price.toFixed(2)}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center justify-center"
                  >
                    Continue to Payment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <CreditCard className="w-6 h-6 mr-2" />
                    Payment Information
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentInfo.method === 'card'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value as 'card'})}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium">Credit Card</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentInfo.method === 'paypal'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value as 'paypal'})}
                          className="mr-3"
                        />
                        <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium">PayPal</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="applePay"
                          checked={paymentInfo.method === 'applePay'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value as 'applePay'})}
                          className="mr-3"
                        />
                        <Phone className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium">Apple Pay</span>
                      </label>
                    </div>
                  </div>

                  {paymentInfo.method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={paymentInfo.saveCard}
                          onChange={(e) => setPaymentInfo({...paymentInfo, saveCard: e.target.checked})}
                          className="mr-2"
                        />
                        <label htmlFor="saveCard" className="text-sm text-gray-700">
                          Save card for future purchases
                        </label>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center justify-center"
                  >
                    Review Order
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Order Review
                  </h2>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </button>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cart.items.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p>{shippingInfo.address}</p>
                      {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.country}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium capitalize">{paymentInfo.method}</p>
                      {paymentInfo.method === 'card' && (
                        <p className="text-sm text-gray-600">
                          **** **** **** {paymentInfo.cardNumber.slice(-4)}
                        </p>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleOrderSubmit}>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full px-6 py-3 bg-green-600 !text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing Order...
                        </>
                      ) : (
                        <>
                          Place Order - ${total.toFixed(2)}
                          <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {currentStep === 4 && orderCompleted && (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. Your order number is <strong>{orderId}</strong>
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    We've sent a confirmation email to {shippingInfo.email}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/account/orders"
                      className="px-6 py-3 bg-blue-600 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Track Order
                    </Link>
                    <Link
                      href="/products"
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {currentStep < 4 && (
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 mr-2" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;