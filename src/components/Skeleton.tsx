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
    <div className="relative w-full h-full bg-slate-100 animate-pulse overflow-hidden flex flex-col justify-center px-6 md:px-12 space-y-3 md:space-y-4">
        {/* Decorative background pulse elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/30 skew-x-12 -translate-y-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/10 rounded-full blur-3xl"></div>
        
        {/* Content placeholders */}
        <div className="relative z-10 space-y-4">
            <div className="h-5 md:h-6 w-24 md:w-32 bg-slate-50 rounded-full"></div>
            <div className="space-y-2">
                <div className="h-8 md:h-12 w-3/4 md:w-1/2 bg-slate-50 rounded-xl"></div>
                <div className="h-8 md:h-12 w-1/2 md:w-1/3 bg-slate-50 rounded-xl opacity-60"></div>
            </div>
            <div className="h-4 md:h-5 w-2/3 md:w-1/3 bg-slate-50 rounded-lg"></div>
            <div className="pt-4">
                <div className="h-10 md:h-12 w-32 md:w-40 bg-slate-50 rounded-xl"></div>
            </div>
        </div>
        
        {/* Slider dots indicator skeleton */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full bg-slate-50 ${i === 1 ? 'w-8' : 'w-4'}`}></div>
            ))}
        </div>
    </div>
);
