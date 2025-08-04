'use client'
import React, { useState } from 'react'
import BlogCard from '../Card/BlogCard'
import useBlogApi from '@/hooks/useBlogApi';
import Loader from '../Loader/Loader';

const CardList = () => {
    const [activeCategory, setActiveCategory] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const { data: blogs, loading, error } = useBlogApi();

    const categories = [
        'All',
        'Technology',
        'Travel',
        'Food',
        'Lifestyle',
        'Health',
        'Business',
        'Education',
        'Coding'
    ];

    // Constants for pagination
    const CARDS_PER_PAGE = 12;
    const CARDS_PER_ROW = 3;

    // Filter blogs based on active category
    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs?.filter(blog => blog.category === activeCategory);

    // Pagination calculations
    const totalItems = filteredBlogs?.length || 0;
    const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const paginatedBlogs = filteredBlogs?.slice(startIndex, startIndex + CARDS_PER_PAGE);

    // Group blogs into rows of 3 cards each
    const groupedBlogs = [];
    if (paginatedBlogs) {
        for (let i = 0; i < paginatedBlogs.length; i += CARDS_PER_ROW) {
            groupedBlogs.push(paginatedBlogs.slice(i, i + CARDS_PER_ROW));
        }
    }

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page when category changes
    };

    if (loading) return <Loader/>
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className='w-[70%] mx-auto mb-24 py-8'>
            <div className='flex flex-col items-center gap-8 mb-12'>
                <h1 className='text-4xl font-extrabold text-center'>Recent Posts</h1>

                {/* Category Filter */}
                <div className='flex flex-wrap gap-4 justify-center'>
                    {categories?.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                                ${activeCategory === category
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Cards Grid */}
            {groupedBlogs?.length > 0 ? (
                <div className='space-y-8'> {/* Vertical gap between rows */}
                    {groupedBlogs.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {row.map((item) => (
                                <BlogCard key={item.id} item={item} />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    No posts found in this category
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-black text-white' : 'bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default CardList