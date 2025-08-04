'use client';

import { useEffect, useState } from 'react';
import { FiUpload, FiChevronDown, FiUser, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';

const EditBlog = ({ blogId, initialData, handleData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    authorName: '',
    authorImage: null,
    authorImagePreview: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.desc || '',
        category: initialData.category || '',
        authorName: initialData.author || '',
        authorImage: null,
        authorImagePreview: null,
      });
      setIsPublished(initialData.isPublished ?? true);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          authorImage: file,
          authorImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('desc', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('author', formData.authorName);
      formDataToSend.append('isPublished', isPublished);
      if (selectedImage) formDataToSend.append('coverImg', selectedImage);
      if (formData.authorImage) formDataToSend.append('authorImage', formData.authorImage);

      const response = await fetch(`http://localhost:3000/api/blogList/${blogId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update blog');
      }

      toast.success('✅ Blog updated successfully!');
      handleData();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error updating blog');
      toast.error('❌ An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Technology',
    'Travel',
    'Food',
    'Lifestyle',
    'Health',
    'Business',
    'Education',
    'Coding',
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Edit Blog Cover Image</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {previewImage ? (
            <div className="relative group">
              <img src={previewImage} alt="Blog preview" className="max-h-64 mx-auto rounded-lg mb-4" />
              <button
                type="button"
                onClick={() => { setSelectedImage(null); setPreviewImage(null); }}
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
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <p className="text-xs text-gray-500 mt-2">Recommended size: 1200x630 pixels (JPG, PNG)</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <h2 className="text-xl font-semibold">Blog Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Description</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
            className="border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none pr-10"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Author Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Image</label>
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
                    onClick={() => setFormData((prev) => ({ ...prev, authorImage: null, authorImagePreview: null }))}
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
                <input type="file" accept="image/*" onChange={handleAuthorImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200 pixels (JPG, PNG)</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
