'use client'
import { useState } from 'react';
import { FiUpload, FiChevronDown, FiUser, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css"
const CreateBlog = () => {

  // Quill modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    authorName: '',
    authorImage: null,
    authorImagePreview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection for blog cover
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type
      if (!file.type.match('image.*')) {
        setError('Please upload a valid image file');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Handle author image selection
  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type
      if (!file.type.match('image.*')) {
        setError('Please upload a valid author image');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          authorImage: file,
          authorImagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Update the description handler for ReactQuill
  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value
    });
  };
  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate required fields
    if (!selectedImage || !formData.authorImage) {
      setError('Please upload both blog cover image and author image');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('desc', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('author', formData.authorName);

      // Append blog cover image
      formDataToSend.append('image', selectedImage);

      // Append author image (required)
      formDataToSend.append('authorImage', formData.authorImage);
      // // Method 2: Convert to object (for simple debugging)
      // const formDataObject = {};
      // formDataToSend.forEach((value, key) => {
      //   formDataObject[key] = value;
      // });
      // console.log('FormData as object:', formDataObject);

      // Send to API endpoint
      const response = await fetch('http://localhost:3000/api/blog', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit blog');
      }

      const result = await response.json();
      console.log('Success:', result);

      // Reset form
      setSelectedImage(null);
      setPreviewImage(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        authorName: '',
        authorImage: null,
        authorImagePreview: null,
      });

      alert('Blog published successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error publishing blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Blog categories
  const categories = [
    'Technology',
    'Travel',
    'Food',
    'Lifestyle',
    'Health',
    'Business',
    'Education',
    'Coding'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Image Upload Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Blog Cover Image</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {previewImage ? (
            <div className="relative group">
              <img
                src={previewImage}
                alt="Blog preview"
                className="max-h-64 mx-auto rounded-lg mb-4"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewImage(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <FiUpload className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500">Drag and drop your image here</p>
              <p className="text-gray-400 text-sm">or</p>
            </div>
          )}
          <label className="inline-block mt-2">
            <span className="px-4 py-2 bg-purple-950 text-white rounded-lg cursor-pointer hover:bg-purple-900 transition-colors">
              Browse Files
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Recommended size: 1200x630 pixels (JPG, PNG)
          </p>
        </div>
      </div>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Blog Details</h2>

        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Description *
          </label>
          {/* <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Write your blog description here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          /> */}
          <ReactQuill
            theme="snow" // or "bubble" for a cleaner look
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
            className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            style={{ minHeight: '200px' }}
          />
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500 pr-10"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Author Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Author Information</h3>

          {/* Author Name */}
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
              Author Name *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Author Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Image *
            </label>
            <div className="flex items-center space-x-4">
              {formData.authorImagePreview ? (
                <div className="relative">
                  <img
                    src={formData.authorImagePreview}
                    alt="Author preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        authorImage: null,
                        authorImagePreview: null,
                      })
                    }
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <label className="flex-1">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors inline-block">
                  {formData.authorImage ? 'Change Image' : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAuthorImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 200x200 pixels (JPG, PNG)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;