"use client";

import { useState } from "react";
import Image from "next/image";

interface CdnImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none";
  sizes?: string;
  onClick?: () => void;
  fallbackSrc?: string;
}

export function CdnImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  objectFit = "cover",
  sizes,
  onClick,
  fallbackSrc = "/images/work_img_1.jpeg"
}: CdnImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Apply automatic Cloudinary transformation parameters (f_auto, q_auto)
  const getOptimizedUrl = (url: string) => {
    if (!url) return fallbackSrc;
    if (url.includes("res.cloudinary.com") && !url.includes("/f_auto,q_auto/")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

  const finalSrc = getOptimizedUrl(error ? fallbackSrc : imgSrc);

  // If usingNextImage is suitable
  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""} ${className}`} onClick={onClick}>
      <img
        src={finalSrc}
        alt={alt || "Zolvex Deep Clean"}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => {
          setError(true);
          setImgSrc(fallbackSrc);
        }}
        onLoad={() => setLoading(false)}
        className={`transition-all duration-300 ${
          loading ? "blur-xs scale-105 opacity-70" : "blur-0 scale-100 opacity-100"
        } ${fill ? "absolute inset-0 w-full h-full" : ""} ${
          objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "object-fill"
        }`}
      />
    </div>
  );
}
