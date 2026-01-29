import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { products } from "@/data/dummyData";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
    const { id } = await params;

    // Simulate fetching data from a database or API (SSR)
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    // Get related products (same category)
    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id);

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

                {/* More Favorites (Related Products) */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-400 pl-3 uppercase">Related Products</h2>
                            <Link href="/shop" className="text-sm font-bold text-red-400 hover:underline uppercase">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {relatedProducts.map(rel => (
                                <ProductCard key={rel.id} {...rel} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Also show some featured if no related */}
                {relatedProducts.length === 0 && (
                    <section className="mt-16">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-400 pl-3 uppercase">More Favorites</h2>
                            <Link href="/shop" className="text-sm font-bold text-red-400 hover:underline uppercase">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {products.slice(0, 6).map(p => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
