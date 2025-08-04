import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'

const Globe = ({ pos }) => {
    const globeRef = useRef();
    useFrame((state, delta) => {
        globeRef.current.rotation.y += delta*0.5
    })

    const text = useTexture('/img3.webp')
    return (
        <mesh ref={globeRef}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial 
            map={text} 
                emissive="#ffffff" // Glow color
                emissiveIntensity={1} // Adjust glow strength (0-1)
                emissiveMap={text} 
                />
        </mesh>
    );
}

export default Globe
