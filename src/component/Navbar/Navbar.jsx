'use client'
import useBlogApi from '@/hooks/useBlogApi'
import { SignedOut, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const { isSignedIn } = useUser();

    const pathname = usePathname();
    // Hide on these routes
    const hiddenPath1 = ['/editblog'];
    const hiddenPath2 = ['/dashboard'];

    if (hiddenPath1.includes(pathname)) {
        return null;
    }
    if (hiddenPath2.includes(pathname)) {
        return null;
    }

    const { loading } = useBlogApi();
    return (
        <>

            {!loading &&
                <nav className="navbar px-20 shadow-sm absolute top-0 left-0 z-50 w-full text-white">
                    <div className="navbar-start h-16">
                        <Link href={"/"}>
                            <button className="text-2xl font-bold">Blog-Tube</button>
                        </Link>
                    </div>

                    <div className="navbar-end">
                        {
                            isSignedIn ?

                                <Link href={"/dashboard"}>
                                    <div className='outline outline-pink-600 text-pink-600 hover:text-pink-500 transition-colors px-6 py-3 rounded-xl'>
                                        <h1 className='text-md'>Dashboard</h1>
                                    </div>
                                </Link> :

                                <div>
                                    <SignedOut>
                                        <SignInButton />
                                        <SignUpButton>
                                            <button className="bg-pink-600 text-white rounded-full font-medium text-sm h-10 px-4 cursor-pointer ml-4">
                                                Sign Up
                                            </button>
                                        </SignUpButton>
                                    </SignedOut>
                                    {/* <SignedIn>
                                <UserButton />
                            </SignedIn> */}
                                </div>
                        }
                    </div>
                </nav>
            }
        </>
    )
}

export default Navbar