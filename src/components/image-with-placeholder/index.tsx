import React, { useState } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  className,
}: ImageWithPlaceholderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 animate-pulse">
          {/* Tailwind spinner or custom loader */}
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>{" "}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
