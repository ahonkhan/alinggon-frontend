import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", width, height, circle = false }) => {
  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`bg-slate-100 animate-pulse ${circle ? "rounded-full" : "rounded-md"} ${className}`}
      style={style}
    ></div>
  );
};

export default Skeleton;

export const ProductSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex flex-col h-full animate-pulse">
        <div className="aspect-[4/3] bg-gray-50 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-50 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-50 rounded w-1/2 mb-4"></div>
        <div className="mt-auto flex gap-2">
            <div className="h-8 bg-gray-50 rounded flex-1"></div>
            <div className="h-8 bg-gray-50 rounded w-9"></div>
        </div>
    </div>
);

export const SliderSkeleton = () => (
    <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-slate-50 border border-gray-100 animate-pulse overflow-hidden flex flex-col justify-center px-12 space-y-4">
        <div className="h-6 w-32 bg-gray-100 rounded-full"></div>
        <div className="h-12 w-1/2 bg-gray-100 rounded-xl"></div>
        <div className="h-4 w-1/3 bg-gray-100 rounded-lg"></div>
        <div className="h-10 w-28 bg-gray-100 rounded-xl"></div>
    </div>
);
