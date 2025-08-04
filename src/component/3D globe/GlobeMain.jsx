import React from 'react'
import Globe from './Globe'
import { Canvas } from '@react-three/fiber'
import { Cloud, Html, OrbitControls, Sky, Stars } from '@react-three/drei'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';

const GlobeMain = () => {
    return (
        <div>
            <Canvas>
                {/* Controls */}
                <OrbitControls />
                {/* <Stars/> */}
                {/* <Cloud /> */}
                {/* <Sky/> */}
                {/* Light */}
                <ambientLight intensity={2} />
                {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}
                {/* Object */}
                <Globe />

                <EffectComposer>
                    <Bloom mipmapBlur intensity={4.0} luminanceThreshold={20} luminanceSmoothing={0.2} />
                    <ToneMapping adaptive />
                </EffectComposer>
                {/* <Html position={[15,0,0]} style={{position:"fixed"}}>
                    <div className="space-y-6 border absolute w-[40vw] border-red-500">
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
                    </div>
                </Html> */}
            </Canvas>

        </div>
    )
}

export default GlobeMain
