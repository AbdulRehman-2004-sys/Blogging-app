import Button from 'daisyui/components/button'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ item }) => {
    return (
        <div key={item._id} className="card bg-base-100 w-[20vw] h-[50vh] shadow-md mb-4 overflow-hidden">
            <figure className='w-full h-40'>
                <img
                    src={item.img}
                    alt="image" />
            </figure>
            <div className="card-body bg-white shadow-md ">
                <h2 className="card-title truncate w-[200px]">
                    {item.title}
                </h2>
                <p className='truncate w-[200px]'>{item.desc}</p>

                <div className="flex justify-between items-center">
                    <button className="px-4 py-1 rounded-full text-white bg-pink-600">{item.category}</button>
                    <Link href={`/blog/${item._id}`}>
                        <button className="badge bg-purple-950 text-white py-4">Read Blog</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default BlogCard
