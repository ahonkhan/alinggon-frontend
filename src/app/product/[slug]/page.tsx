"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { useGetProductDetailsQuery } from "@/store/api/frontendApi";
import { use } from "react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
    const { slug } = use(params);
    const { data: response, isLoading, error } = useGetProductDetailsQuery(slug);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading product...</div>;
    }

    if (error || !response || !response.success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
                <Link href="/shop" className="text-red-500 hover:text-red-600 underline">Return to Shop</Link>
            </div>
        );
    }

    const product = response.data;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-medium text-gray-500 whitespace-nowrap overflow-x-auto">
                    <Link href="/" className="hover:text-red-500">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <Link href="/shop" className="hover:text-red-500">{product.category}</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-gray-900 truncate">{product.name}</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Client Component for interactive parts */}
                <ProductDetailsClient product={product} />

                {/* Related products can be fetched via another endpoint or same endpoint later. Skipping for now. */}
            </main>
        </div>
    );
}
