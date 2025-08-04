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


export default Dashboard;