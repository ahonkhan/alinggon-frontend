"use client";

import { useState, useMemo } from "react";
import { Minus, Plus, ShoppingCart, Zap, CheckCircle, ShieldCheck, Truck, Phone, PhoneForwarded, Facebook, Twitter, MessageCircle, PlayCircle, Star, Image as ImageIcon, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Product, products } from "@/data/dummyData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductDetailsClientProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showToast("Added to bag successfully", "success");
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        // navigation to checkout usually handled by user or we could auto redirect
    };

    const relatedProducts = useMemo(() => {
        return products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    }, [product]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Gallery */}
                <div className="lg:col-span-5 space-y-4">
                    <div
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group overflow-hidden cursor-crosshair"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            const magnifier = e.currentTarget.querySelector('.magnifier-overlay') as HTMLElement;
                            if (magnifier) {
                                magnifier.style.display = 'block';
                                magnifier.style.backgroundPosition = `${x}% ${y}%`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            const magnifier = e.currentTarget.querySelector('.magnifier-overlay') as HTMLElement;
                            if (magnifier) magnifier.style.display = 'none';
                        }}
                    >
                        {product.discount && (
                            <span className="absolute top-4 left-4 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                                {product.discount}
                            </span>
                        )}
                        <img src={selectedImage} className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" alt={product.name} />

                        {/* Magnifier Overlay */}
                        <div
                            className="magnifier-overlay absolute inset-0 z-20 pointer-events-none border-2 border-red-400/20 rounded-lg shadow-2xl transition-opacity hidden"
                            style={{
                                backgroundImage: `url(${selectedImage})`,
                                backgroundSize: '250%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.gallery.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(img)}
                                className={`bg-white p-2 border-2 rounded-lg transition-all ${selectedImage === img ? 'border-red-400 shadow-sm' : 'border-gray-200 hover:border-red-400'}`}
                            >
                                <img src={img} className="w-full h-auto object-cover rounded" alt={`Gallery ${i}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Middle: Product Info */}
                <div className="lg:col-span-4 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium text-gray-500 font-sans">Category : <span className="text-red-400 font-bold">{product.category}</span></span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-red-500 font-sans">৳ {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through font-sans">৳ {product.originalPrice.toFixed(2)}</span>
                        )}
                        {product.discount && (
                            <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded shadow-sm">{product.discount}</span>
                        )}
                    </div>

                    <div className="space-y-4 py-6 border-y border-gray-100 uppercase tracking-wide text-xs font-semibold text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Availability: <span className="text-green-600 font-bold font-sans">In Stock ({product.stock} items)</span></span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden h-12 bg-white shadow-sm">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-4 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-200 flex items-center justify-center active:bg-gray-200"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <input type="number" value={quantity} readOnly className="w-14 text-center text-sm font-bold focus:outline-none bg-white font-sans" />
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-4 bg-gray-50 hover:bg-gray-100 transition-colors border-l border-gray-200 flex items-center justify-center active:bg-gray-200"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold h-12 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest text-sm"
                        >
                            <ShoppingCart className="w-5 h-5" /> ADD TO CART
                        </button>
                    </div>

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest text-sm"
                    >
                        <Zap className="w-5 h-5" /> BUY NOW
                    </button>

                    {/* Trust Info */}
                    <div className="grid grid-cols-2 gap-4 text-[10px] md:text-xs font-medium font-not-not-sans-serif">
                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span>১০১% আসল প্রোডাক্ট এর নিশ্চয়তা</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <Truck className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
                        </div>
                    </div>

                    {/* Call Support */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="tel:+8801568324268" className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5">
                            <Phone className="w-5 h-5" /> +8801568324268
                        </a>
                        <a href="tel:01568-324268" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5">
                            <PhoneForwarded className="w-5 h-5" /> 01568-324268
                        </a>
                    </div>
                </div>

                {/* Right: Secondary Info */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-black rounded-xl overflow-hidden relative aspect-video shadow-md group">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="Video Placeholder" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                            <PlayCircle className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform cursor-pointer" />
                            <span className="text-xs font-bold uppercase tracking-widest">Play with Sound</span>
                        </div>
                    </div>

                    {relatedProducts.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-fit">
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-xs uppercase tracking-tight">Recommended</h3>
                            <div className="space-y-4">
                                {relatedProducts.map((p) => (
                                    <Link key={p.id} href={`/product/${p.id}`} className="flex gap-3 group">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 group-hover:shadow-sm transition-shadow">
                                            <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[10px] font-bold text-gray-700 group-hover:text-red-500 line-clamp-2 leading-tight">{p.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-red-500 text-xs font-bold font-sans">৳ {p.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Description & Feedback */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-sm uppercase font-not-not-sans-serif">এই পণ্য সম্পর্কে মতামত</h3>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-inner"><User className="w-6 h-6" /></div>
                            <div className="flex gap-1 text-yellow-400">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                            </div>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); showToast("Comment submitted for review", "success"); }}>
                            <textarea placeholder="Write your comment..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 h-32 transition-all resize-none" required></textarea>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-red-50 hover:border-red-200 transition-all group">
                                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-red-400 transition-colors" />
                                <span className="text-xs text-gray-500 font-medium">Upload images (Optional)</span>
                            </div>
                            <input type="text" placeholder="আপনার নাম *" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400" required />
                            <button type="submit" className="w-full bg-red-400 hover:bg-red-500 text-white font-black py-4 rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-lg active:scale-95">কমেন্ট সাবমিট করুন</button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-6 bg-gray-50/50">
                        <button className="text-xs font-black text-red-500 border-b-2 border-red-500 pb-4 -mb-4 uppercase tracking-widest">Description</button>
                        <button className="text-xs font-black text-gray-400 hover:text-gray-600 pb-4 -mb-4 uppercase tracking-widest">Specifications</button>
                    </div>
                    <div className="p-8 text-sm text-gray-600 leading-relaxed space-y-6">
                        <div className="font-black text-slate-900 text-xl tracking-tighter uppercase">{product.name}</div>
                        <p className="text-gray-500 leading-loose">{product.description}</p>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h4 className="font-black text-slate-800 mb-4 uppercase text-[10px] tracking-widest">Key Attributes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-400 font-bold uppercase text-[9px] tracking-tighter">{spec.label}</span>
                                        <span className="text-slate-800 font-black font-sans">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link href="/shop" className="bg-red-50/50 rounded-2xl p-8 flex items-center justify-between border-2 border-dashed border-red-100 group">
                            <div>
                                <p className="text-red-400 font-black mb-1 uppercase tracking-tighter">Premium Collection</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Explore more objects like this</p>
                            </div>
                            <ChevronRight className="w-8 h-8 text-red-200 group-hover:text-red-400 group-hover:translate-x-2 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
