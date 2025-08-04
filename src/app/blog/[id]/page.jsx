'use client'
import Comment from '@/component/Comment/Comment'
import useBlogApi from '@/hooks/useBlogApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import DOMPurify from 'dompurify';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore: Ignore missing types warning
import GLOBE from "vanta/dist/vanta.globe.min";
import useCommentApi from '@/hooks/useCommentApi'
import Loader from '@/component/Loader/Loader'

const page = ({ params }) => {


    const { id } = React.use(params);
    const { data: blogs, loading, error } = useBlogApi();
    const singleElement = blogs?.filter(elem => elem._id === id)
    console.log(singleElement[0]?._id)
    // Memoize blogId to avoid re-filtering on every render
    // const blog = React.useMemo(() => blogs?.find((elem) => elem._id === id), [blogs, id])
    // const blogId = blog?._id || null

    // Always call useCommentApi unconditionally
    // const { data: comments, loading: isLoading, error: isError } = useCommentApi(blogId)

    // If blog is not yet available
    if (loading) return <Loader/>
    if (error) return <div>Error loading blog: {error}</div>

    return (
        <div className="min-h-screen mb-36">
            <div className='w-full h-[55vh] '>
                <Hero />
            </div>
            <div className="w-full -mt-40 lg:w-[70%] mx-auto  rounded-lg  overflow-hidden">

                {/* Blog Image */}
                <div className="w-[60%] m-auto aspect-video relative overflow-hidden">
                    <Image
                        src={singleElement[0]?.img}
                        alt="Blog Featured Image"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Blog Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-6 px-4">
                    {singleElement[0]?.title}
                </h1>

                {/* Author Section */}
                <div className="flex flex-col items-center mt-6">
                    {/* Author Image */}
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                            src={singleElement[0]?.authorImg}
                            alt="Author"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Author Name */}
                    <p className="mt-2 text-gray-600 font-medium">{singleElement[0]?.author}</p>
                    {/* Date */}
                    <p className="text-sm text-gray-400">{`Published ${singleElement[0]?.date}`}</p>
                </div>

                {/* Blog Content */}
                <div
                    className="prose prose-sm sm:prose-base max-w-none px-6 py-8"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(singleElement[0]?.desc) }}
                >
                </div>

            </div>
            <div className="flex space-x-4 ml-56">
                <Link href="#" className="text-black hover:text-pink-600 transition-colors">
                    <FaTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-black hover:text-pink-600 transition-colors">
                    <FaFacebookF className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-black hover:text-pink-600 transition-colors">
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-black hover:text-pink-600 transition-colors">
                    <FaLinkedinIn className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
            </div>
            <Comment blogId={singleElement[0]?._id} />
        </div>

    )
}

export default page


const Hero = () => {
    const vantaRef = useRef(null);

    useEffect(() => {

        const vantaEffect = GLOBE({
            el: vantaRef.current,
            THREE,
            minHeight: 200.0,
            minwidth: 200.0,
            highlightColor: 0xffc300,
            midtoneColor: 0xff1f00,
            lowlightColor: 0x2d00ff,
            baseColor: 0xffebeb,
            blurFactor: 0.6,
            zoom: 1,
            speed: 1

        })
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <div ref={vantaRef} className="w-full h-full">
        </div>
    );
};