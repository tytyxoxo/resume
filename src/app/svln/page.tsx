"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/img/aii.jpg",
    name: "Aii",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/feb.jpg",
    name: "Feb",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/imy.jpg",
    name: "Imy",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/meily.jpg",
    name: "Meily",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/mio.jpg",
    name: "Mio",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/munin.jpg",
    name: "Munin",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
  {
    src: "/img/tormai.jpg",
    name: "Tormai",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
  },
];

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.54V6.79a4.85 4.85 0 0 1-1.02-.1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Svln() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-base-100 min-h-full">
      <div
        className="flex w-full overflow-hidden"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {slides.map((slide, i) => {
          const active = current === i;
          return (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className="relative cursor-pointer overflow-hidden bg-base-300"
              style={{
                flex: active ? "5 0 0%" : "1 0 0%",
                transition: "flex 0.5s ease-in-out",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.name}
                fill
                className="object-cover transition-all duration-700 ease-in-out"
                style={{ filter: active ? "grayscale(0)" : "grayscale(60%)" }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: active ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.45)",
                }}
              />

              {/* Slide number on inactive */}
              {/* <div
                className="absolute bottom-4 left-0 right-0 flex justify-center transition-all duration-500"
                style={{ opacity: active ? 0 : 0.7 }}
              >
                <span className="text-white text-xs font-semibold">
                  {i + 1}
                </span>
              </div> */}

              {/* Info on active */}
              <div
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-16 flex flex-col gap-2 transition-all duration-500"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(12px)",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 60%, transparent)",
                }}
              >
                <p className="text-white text-xl font-bold leading-none">
                  {slide.name}
                </p>
                <div
                  className="flex gap-3 mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={slide.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href={slide.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={slide.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <TiktokIcon />
                  </a>
                  <a
                    href={slide.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <XIcon />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
