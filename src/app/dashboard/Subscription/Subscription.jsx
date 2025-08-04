import { useState } from 'react';
import { FiSearch, FiMail, FiUser, FiCalendar, FiDownload } from 'react-icons/fi';

const Subscription = () => {
  // Sample subscription data
  const initialSubscribers = [
    { id: 1, email: 'john.doe@example.com', name: 'John Doe', date: '2023-10-15' },
    { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith', date: '2023-10-18' },
    { id: 3, email: 'alex.wilson@example.com', name: 'Alex Wilson', date: '2023-10-22' },
    { id: 4, email: 'sarah.johnson@example.com', name: 'Sarah Johnson', date: '2023-11-05' },
    { id: 5, email: 'michael.brown@example.com', name: 'Michael Brown', date: '2023-11-12' },
    { id: 6, email: 'emily.davis@example.com', name: 'Emily Davis', date: '2023-11-15' },
    { id: 7, email: 'david.miller@example.com', name: 'David Miller', date: '2023-11-20' },
    { id: 8, email: 'lisa.wilson@example.com', name: 'Lisa Wilson', date: '2023-12-01' },
  ];

  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 5;

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSub = currentPage * subscribersPerPage;
  const indexOfFirstSub = indexOfLastSub - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstSub, indexOfLastSub);
  const totalPages = Math.ceil(filteredSubscribers.length / subscribersPerPage);

  // Export to CSV
  const handleExport = () => {
    const headers = ['Email', 'Name', 'Subscription Date'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map((sub) => [sub.email, sub.name, sub.date].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Email Subscribers</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors"
            >
              <FiDownload className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <FiMail className="inline mr-1" />
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <FiUser className="inline mr-1" />
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <FiCalendar className="inline mr-1" />
                  Subscription Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSubscribers.length > 0 ? (
                currentSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subscriber.date}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSubscribers.length > subscribersPerPage && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstSub + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastSub, filteredSubscribers.length)}
              </span>{' '}
              of <span className="font-medium">{filteredSubscribers.length}</span> subscribers
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;