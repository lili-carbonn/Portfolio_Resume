"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import ImageWithFallback from "./ImageWithFallback";

const HeroSection = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = (ev) => {
    if (!isHovering) return;
    const rect = ev.currentTarget.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 100;
    const y = ((ev.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="pattern-bg default-fade"
        style={{
          opacity: isHovering ? 0 : 0.3,
          transition: "opacity 0.5s ease-in-out",
        }}
      ></div>
      <div
        className="pattern-bg"
        style={{
          WebkitMask: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,  rgb(15 23 42) 0%, transparent 35%)`,
          mask: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,  rgb(15 23 42) 0%, transparent 35%)`,
          opacity: isHovering ? 0.3 : 0,
        }}
      ></div>
      <div className="opacity-10">
        <div className="absolute top-0 right-0 sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-primary-700/50 rounded-full blur-3xl"></div>
        <div className="absolute top-4 right-4 sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-primary-500/60 rounded-full blur-2xl"></div>
        <div className="absolute top-8 right-8 sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-primary-400/70 rounded-full blur-xl"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-light">
            <TypeAnimation
              sequence={[
                'Leala Carbonneau',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={0}
              cursor={false}
            />
            <span className="block text-primary-600">
              <TypeAnimation
                sequence={[
                  500, // Delay before starting
                  'Data and Computer Science',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={0}
                cursor={false}
              />
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-8">
            <TypeAnimation
              sequence={[
                1500, // Delay before starting
                'Creative Solutions to Complex Problems | Exploring AI and Machine Learning',
                1000,
              ]}
              wrapper="span"
              speed={70}
              repeat={0}
              cursor={false}
            />
          </p>
        </div>
        <div className="relative overflow-hidden rounded-full border-4 border-primary-500 shadow-lg animate-photo-container w-64 h-80 md:w-80 md:h-96">
          <ImageWithFallback
            src="/20241225_160255.jpg"
            alt="Leala Carbonneau portrait"
            width={400}
            height={500}
            className="object-cover w-128 h-160 md:w-80 md:h-96 animate-photo"
            style={{ width: 'auto', height: 'auto', objectPosition: '70% 33%', transform: 'scale(1.5)' }}
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-primary-500/20 animate-photo-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
