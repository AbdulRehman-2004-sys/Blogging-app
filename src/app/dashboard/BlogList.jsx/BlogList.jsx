import EditBlog from '@/component/EditBlog/EditBlog';
import useBlogApi from '@/hooks/useBlogApi';
import Link from 'next/link';
import { useState } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BlogList = () => {
  // Sample blog data
  // const data = [
  //   {
  //     id: 1,
  //     title: 'Getting Started with React Hooks',
  //     category: 'Technology',
  //     date: '2023-10-15',
  //     views: 1245,
  //     status: 'Published',
  //   },
  //   {
  //     id: 2,
  //     title: 'The Ultimate Guide to Tailwind CSS',
  //     category: 'Web Development',
  //     date: '2023-11-02',
  //     views: 892,
  //     status: 'Published',
  //   },
  //   {
  //     id: 3,
  //     title: 'Building REST APIs with Node.js',
  //     category: 'Backend',
  //     date: '2023-11-18',
  //     views: 567,
  //     status: 'Draft',
  //   },
  //   {
  //     id: 4,
  //     title: 'Modern JavaScript ES6+ Features',
  //     category: 'Programming',
  //     date: '2023-12-05',
  //     views: 1342,
  //     status: 'Published',
  //   },
  //   {
  //     id: 5,
  //     title: 'Responsive Design Principles',
  //     category: 'Web Design',
  //     date: '2023-12-12',
  //     views: 723,
  //     status: 'Published',
  //   },
  // ];
  const { data } = useBlogApi();
  console.log(data)
  const [blogs, setBlogs] = useState(data);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;
  console.log(blogs)
  // Filter blogs based on search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  console.log(currentBlogs)
  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const res = await fetch(`http://localhost:3000/api/blogList/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (data.success) {
        alert('Blog deleted successfully!')
        // Optionally redirect:
        // router.push('/blogs')
      } else {
        alert(data.message || 'Delete failed')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred')
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleData = () => {
    setSelectedBlog(null)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden space-y-16">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Manage Blog Posts</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="truncate w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.length > 0 ? (
                  data?.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{blog.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{blog.date}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          <FiEdit2 className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <FiTrash2 className="inline mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No blogs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBlogs.length > blogsPerPage && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstBlog + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastBlog, filteredBlogs.length)}
                </span>{' '}
                of <span className="font-medium">{filteredBlogs.length}</span> blogs
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <FiChevronLeft className="inline" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1 rounded-md border ${currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <FiChevronRight className="inline" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {
        selectedBlog && <EditBlog blogId={selectedBlog._id} initialData={selectedBlog} handleData={handleData} />
      }
    </>
  );
};

export default BlogList;