"use client"; // If using App Router

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore: Ignore missing types warning
import GLOBE from "vanta/dist/vanta.globe.min";

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
        <div ref={vantaRef} className="w-full h-screen">
            <div className="text-white w-full h-screen flex items-center px-16">
                <h1 className="text-7xl .roboto-text">Fill The Space <br /> With Your Story</h1>
            </div>
        </div>
    );
};

export default Hero;
