'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import GlobeMain from '../3D globe/GlobeMain';
import useBlogApi from '@/hooks/useBlogApi';

const Footer = () => {
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
        <footer className="bg-gray-900 h-[60vh] text-white sm:px-6 lg:px-8">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Section - Logo and Info */}
            <div className="space-y-6 flex flex-col justify-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-purple-950 px-3 py-1 rounded mr-2">B</span>
                <span className="text-2xl font-bold">Blog-Tube</span>
              </div>

              <p className="text-gray-300 max-w-md">
                Discover insightful articles, creative stories, and practical advice on technology, lifestyle, business, and more.
              </p>

              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebookF className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedinIn className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-800 mt-6">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} BlogHub. All rights reserved.
                </p>
              </div>
            </div>

            {/* Right Section - Subscription */}
            {/* <div className="space-y-6">
          <h3 className="text-lg font-semibold">Subscribe to our newsletter</h3>
          <p className="text-gray-300">
            Get the latest posts delivered right to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md outline text-gray-300 outline-gray-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-purple-950 rounded-md font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>

          <div className="pt-4 border-t border-gray-800 mt-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BlogHub. All rights reserved.
            </p>
          </div>
        </div> */}

            <GlobeMain />
          </div>
        </footer>
      }
    </>
  );
};

export default Footer;