'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { useProducts } from '@/context/ProductsContext';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  DollarSign, 
  Tag, 
  FileText, 
  Image as ImageIcon,
  Star,
  Check,
  AlertCircle
} from 'lucide-react';

const EditProductPage: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const { products, updateProduct } = useProducts();
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    images: [] as string[],
    rating: 4.5,
    reviews: 0,
    inStock: true,
    featured: false,
    visible: true,
    tags: ''
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [isDragging, setIsDragging] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Shoes',
    'Home & Garden',
    'Books',
    'Sports & Outdoors',
    'Beauty & Health',
    'Automotive',
    'Toys & Games',
    'Food & Beverages'
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    // Find the product to edit
    const product = products.find(p => p.id === productId);
    if (!product) {
      setError('Product not found');
      return;
    }

    // Populate form with existing product data
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      image: product.image,
      images: product.images || [],
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
      featured: product.featured || false,
      visible: product.visible !== undefined ? product.visible : true,
      tags: product.tags?.join(', ') || ''
    });

    // Set image previews if product has images
    if (product.images && product.images.length > 0) {
      setImagePreviews(product.images);
      setUploadMethod('file');
    } else if (product.image) {
      setImagePreviews([product.image]);
      // Determine upload method based on image URL
      if (product.image.startsWith('data:')) {
        setUploadMethod('file');
      } else {
        setUploadMethod('url');
      }
    }
  }, [isAuthenticated, products, productId, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/admin/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md !text-white bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate file count (max 5 images)
      if (imagePreviews.length + files.length > 5) {
        alert('Maximum 5 images allowed');
        return;
      }

      Array.from(files).forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not a valid image file`);
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Max size is 5MB`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target?.result as string;
          
          setImagePreviews(prev => {
            const newPreviews = [...prev, imageDataUrl];
            setFormData(prevForm => ({
              ...prevForm,
              images: newPreviews,
              image: newPreviews[0] || '' // Set first image as main image
            }));
            return newPreviews;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      setFormData(prevForm => ({
        ...prevForm,
        images: newPreviews,
        image: newPreviews[0] || '' // Update main image
      }));
      return newPreviews;
    });
  };

  const setMainImage = (index: number) => {
    const mainImage = imagePreviews[index];
    if (mainImage) {
      // Move selected image to first position
      setImagePreviews(prev => {
        const newPreviews = [mainImage, ...prev.filter((_, i) => i !== index)];
        setFormData(prevForm => ({
          ...prevForm,
          images: newPreviews,
          image: mainImage
        }));
        return newPreviews;
      });
    }
  };

  const clearAllImages = () => {
    setImagePreviews([]);
    setFormData(prev => ({
      ...prev,
      image: '',
      images: []
    }));
    // Reset file input
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Validate file count (max 5 images)
      if (imagePreviews.length + files.length > 5) {
        alert('Maximum 5 images allowed');
        return;
      }

      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          if (file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageDataUrl = event.target?.result as string;
              
              setImagePreviews(prev => {
                const newPreviews = [...prev, imageDataUrl];
                setFormData(prevForm => ({
                  ...prevForm,
                  images: newPreviews,
                  image: newPreviews[0] || ''
                }));
                return newPreviews;
              });
            };
            reader.readAsDataURL(file);
          } else {
            alert(`${file.name} is too large. Max size is 5MB`);
          }
        } else {
          alert(`${file.name} is not a valid image file`);
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category,
        image: formData.image || '/images/placeholder-product.jpg',
        images: formData.images.length > 0 ? formData.images : undefined,
        rating: formData.rating,
        reviews: formData.reviews,
        inStock: formData.inStock,
        featured: formData.featured,
        visible: formData.visible,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      // Update product
      updateProduct(productId, productData);
      
      setSuccess(true);

      // Show success message and redirect after delay
      setTimeout(() => {
        setSuccess(false);
        router.push('/admin/products');
      }, 2000);

    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Updated Successfully!</h2>
          <p className="text-gray-600 mb-4">The product has been updated in your store.</p>
          <p className="text-sm text-gray-500">Redirecting to products page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/admin/products"
                className="mr-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Products
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="Enter product description"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="e.g., new, popular, sale"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                    Original Price (optional)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="originalPrice"
                      id="originalPrice"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Media
              </h3>
              
              {/* Upload Method Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image Upload Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="url"
                      checked={uploadMethod === 'url'}
                      onChange={(e) => {
                        setUploadMethod('url');
                        clearAllImages();
                      }}
                      className="mr-2"
                    />
                    Image URL
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="file"
                      checked={uploadMethod === 'file'}
                      onChange={(e) => {
                        setUploadMethod('file');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="mr-2"
                    />
                    Upload from Computer
                  </label>
                </div>
              </div>

              {uploadMethod === 'url' ? (
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Main Product Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter a URL for the main product image. If left empty, a placeholder image will be used.
                  </p>
                </div>
              ) : (
                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
                    Upload Product Images (Max 5)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                    <div 
                      className={`space-y-1 text-center w-full ${
                        isDragging ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="imageFile"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB each (Max 5 images)
                      </p>
                      <p className="text-xs text-blue-500">
                        {imagePreviews.length}/5 images uploaded
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Image Previews ({imagePreviews.length}/5)
                    </label>
                    <button
                      type="button"
                      onClick={clearAllImages}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative">
                          <img
                            src={preview}
                            alt={`Product preview ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => setMainImage(index)}
                          />
                          {index === 0 && (
                            <div className="absolute -top-2 -left-2 bg-blue-500 !text-white rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap">
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 !text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 whitespace-nowrap"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          {index === 0 ? 'Main Image' : `Image ${index + 1}`}
                        </p>
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => setMainImage(index)}
                            className="text-xs text-blue-600 hover:text-blue-800 block mx-auto mt-1"
                          >
                            Set as Main
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Click on an image to set it as the main product image. The main image will be displayed first.
                  </p>
                </div>
              )}

              {/* Single URL Image Preview */}
              {uploadMethod === 'url' && formData.image && imagePreviews.length === 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="relative inline-block">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Product Settings
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      id="rating"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
                      Number of Reviews
                    </label>
                    <input
                      type="number"
                      name="reviews"
                      id="reviews"
                      min="0"
                      value={formData.reviews}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="inStock"
                      name="inStock"
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured Product
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="visible"
                      name="visible"
                      type="checkbox"
                      checked={formData.visible}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="visible" className="ml-2 block text-sm text-gray-900">
                      Visible to Customers
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md !text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Product...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProductPage;