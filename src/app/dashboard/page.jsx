'use client'
import { useState } from 'react';
import { FiMenu, FiX, FiPlus, FiList, FiUsers, FiArrowLeft, FiLogOut } from 'react-icons/fi';
import CreateBlog from './CareateBlog/CreateBlog';
import BlogList from './BlogList.jsx/BlogList';
import Subscription from './Subscription/Subscription';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('create');

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Tab content rendering
    const renderContent = () => {
        switch (activeTab) {
            case 'create':
                return <CreateBlog />;
            case 'list':
                return <BlogList />;
            case 'subscriptions':
                return <Subscription />;
            default:
                return <CreateBlog />;
        }
    };

    return (
        <div className='h-screen overflow-hidden'>
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-16 shadow-sm">
                    {/* Mobile menu button */}
                    <button
                        onClick={toggleSidebar}
                        className="rounded p-2 text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
                    >
                        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>

                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="ml-2 text-2xl font-semibold text-gray-800">Blog-Tube</h1>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center text-sm text-gray-600 hover:text-purple-900"
                        >
                            <FiArrowLeft className="mr-1" />
                            <span className="whitespace-nowrap">Back to Website</span>
                        </Link>
                        <div className="navbar-end">
                            <SignedOut>
                                <SignInButton />
                                <SignUpButton>
                                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-4 cursor-pointer">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton/>
                            </SignedIn>
                        </div>
                    </div>
                </header>
            </div>

            <div className="flex h-screen bg-gray-100">
                {/* Mobile sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-30 w-64 h-screen transform bg-white shadow-lg transition duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex h-full flex-col">

                        {/* Sidebar links */}
                        <aside className="flex-1 overflow-y-auto px-4 py-4">
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => {
                                            setActiveTab('create');
                                            setSidebarOpen(false);
                                        }}
                                        className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors ${activeTab === 'create'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <FiPlus className="mr-3" />
                                        <span>Create Blog</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setActiveTab('list');
                                            setSidebarOpen(false);
                                        }}
                                        className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors ${activeTab === 'list'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <FiList className="mr-3" />
                                        <span>Blog List</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setActiveTab('subscriptions');
                                            setSidebarOpen(false);
                                        }}
                                        className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors ${activeTab === 'subscriptions'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <FiUsers className="mr-3" />
                                        <span>Subscriptions</span>
                                    </button>
                                </li>
                            </ul>
                        </aside>

                    </div>
                </div>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 mb-12">
                    {renderContent()}
                </main>
            </div>
        </div >
    );
};

// Placeholder components for the different tabs
// const CreateBlog = () => (
//     <div className="rounded-lg bg-white p-6 shadow">
//         <h2 className="mb-4 text-xl font-semibold">Create New Blog Post</h2>
//         <div className="space-y-4">
//             <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
//                 <input
//                     type="text"
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     placeholder="Enter blog title"
//                 />
//             </div>
//             <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
//                 <textarea
//                     rows={8}
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     placeholder="Write your blog content here..."
//                 ></textarea>
//             </div>
//             <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                 Publish Blog
//             </button>
//         </div>
//     </div>
// );

// const BlogList = () => {
//     const blogs = [
//         { id: 1, title: 'Getting Started with React', date: '2023-05-15', views: 1245 },
//         { id: 2, title: 'Tailwind CSS Tips', date: '2023-06-22', views: 892 },
//         { id: 3, title: 'Building Responsive Layouts', date: '2023-07-10', views: 567 },
//     ];

//     return (
//         <div className="rounded-lg bg-white p-6 shadow">
//             <h2 className="mb-4 text-xl font-semibold">Your Blog Posts</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                 Title
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                 Date
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                 Views
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 bg-white">
//                         {blogs.map((blog) => (
//                             <tr key={blog.id}>
//                                 <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
//                                     {blog.title}
//                                 </td>
//                                 <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                                     {blog.date}
//                                 </td>
//                                 <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                                     {blog.views.toLocaleString()}
//                                 </td>
//                                 <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                                     <button className="mr-2 text-blue-600 hover:text-blue-800">Edit</button>
//                                     <button className="text-red-600 hover:text-red-800">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const Subscriptions = () => {
//     const subscribers = [
//         { id: 1, email: 'user1@example.com', date: '2023-04-12' },
//         { id: 2, email: 'user2@example.com', date: '2023-05-18' },
//         { id: 3, email: 'user3@example.com', date: '2023-06-25' },
//     ];

//     return (
//         <div className="rounded-lg bg-white p-6 shadow">
//             <h2 className="mb-4 text-xl font-semibold">Subscribers</h2>
//             <div className="space-y-4">
//                 <div className="flex justify-between">
//                     <p className="text-sm text-gray-600">
//                         Total subscribers: {subscribers.length}
//                     </p>
//                     <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
//                         Export CSV
//                     </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                     Email
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                                     Subscribed On
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200 bg-white">
//                             {subscribers.map((sub) => (
//                                 <tr key={sub.id}>
//                                     <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
//                                         {sub.email}
//                                     </td>
//                                     <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                                         {sub.date}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default Dashboard;