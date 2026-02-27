import { useState, useMemo } from "react";
import { Minus, Plus, ShoppingCart, Zap, CheckCircle, ShieldCheck, Truck, Phone, PhoneForwarded, Facebook, Twitter, MessageCircle, PlayCircle, Star, Image as ImageIcon, User, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductDetailsResponse, useSubmitReviewMutation, useToggleLikeReviewMutation } from "@/store/api/frontendApi";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type APIProduct = ProductDetailsResponse['data'];

interface ProductDetailsClientProps {
    product: APIProduct;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

    // Initialize variations to the first available option for each variation type
    const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        if (product.variations && product.variations.length > 0) {
            product.variations.forEach(v => {
                if (v.options && v.options.length > 0) {
                    initial[v.name] = v.options[0];
                }
            });
        }
        return initial;
    });

    const { addToCart } = useCart();
    const { showToast } = useToast();

    // Derived active combination
    const activeCombination = useMemo(() => {
        if (!product.combinations || product.combinations.length === 0) return null;

        return product.combinations.find(c => {
            if (!c.combination) return false;
            return Object.entries(selectedVariations).every(([key, value]) => {
                const comboVal = c.combination[key];
                if (!comboVal) return false;

                // If exact match
                if (comboVal === value) return true;

                // If comma-separated match (Single Common Option type)
                const possibleValues = comboVal.split(',').map((s: string) => s.trim());
                return possibleValues.includes(value);
            });
        });
    }, [product.combinations, selectedVariations]);

    // Derived displays
    const displayPrice = activeCombination?.final_price
        ? parseFloat(activeCombination.final_price)
        : (activeCombination?.offer_price
            ? parseFloat(activeCombination.offer_price)
            : (activeCombination?.regular_price ? parseFloat(activeCombination.regular_price) : product.price));

    const displayOriginalPrice = activeCombination?.regular_price
        ? parseFloat(activeCombination.regular_price)
        : product.originalPrice;

    const displayDiscount = displayOriginalPrice && displayOriginalPrice > displayPrice
        ? `${Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)}% OFF`
        : product.discount;

    const displayStock = activeCombination ? activeCombination.stock : (product.stock_quantity ?? 0);

    // Track active image from combination if exists, otherwise fallback to generic switching logic
    useMemo(() => {
        if (activeCombination?.featured_image) {
            const imgPath = activeCombination.featured_image.startsWith('http') ? activeCombination.featured_image : `http://localhost:8000/storage/${activeCombination.featured_image}`;
            setSelectedImage(imgPath);
        }
    }, [activeCombination]);

    const handleAddToCart = () => {
        const cartProduct = {
            ...product,
            price: displayPrice,
            originalPrice: displayOriginalPrice,
        };
        addToCart(
            cartProduct,
            quantity,
            activeCombination?.id,
            activeCombination?.combination,
            true
        );
        showToast("Added to bag successfully", "success");
    };

    const handleBuyNow = () => {
        const cartProduct = {
            ...product,
            price: displayPrice,
            originalPrice: displayOriginalPrice,
        };
        addToCart(
            cartProduct,
            quantity,
            activeCombination?.id,
            activeCombination?.combination,
            true
        );
    };

    const reviews = product.reviews || [];
    const relatedProducts = product.related_products || [];

    const [reviewForm, setReviewForm] = useState({
        rating: 0,
        comment: '',
        images: [] as string[]
    });

    const [submitReview, { isLoading: isSubmitting }] = useSubmitReviewMutation();
    const [toggleLike] = useToggleLikeReviewMutation();

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submitReview({
                product_id: product.id,
                ...reviewForm
            }).unwrap();
            showToast("Review submitted successfully! It will be visible after approval.", "success");
            setReviewForm({ rating: 0, comment: '', images: [] });
        } catch (err: any) {
            showToast(err.data?.message || "Failed to submit review", "error");
        }
    };

    // Format gallery images
    const galleryImages: string[] = product.gallery && product.gallery.length > 0
        ? product.gallery.map((g: any) => g.image_path.startsWith('http') ? g.image_path : `http://localhost:8000/storage/${g.image_path}`)
        : [product.image];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Gallery */}
                <div className="lg:col-span-5 space-y-4">
                    <div
                        className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl shadow-slate-100/50 relative group overflow-hidden cursor-crosshair"
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
                        {displayDiscount && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full z-10 shadow-lg uppercase tracking-widest">
                                {displayDiscount}
                            </span>
                        )}
                        <img src={selectedImage} className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" alt={product.name} />

                        {/* Magnifier Overlay */}
                        <div
                            className="magnifier-overlay absolute inset-0 z-20 pointer-events-none border-2 border-red-400/20 rounded-2xl shadow-2xl transition-opacity hidden"
                            style={{
                                backgroundImage: `url(${selectedImage})`,
                                backgroundSize: '250%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    </div>

                    {/* Thumbnail Slider */}
                    <div className="px-2">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={12}
                            slidesPerView={4}
                            navigation
                            className="thumbnail-swiper"
                        >
                            {galleryImages.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <button
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-full bg-white p-1 border-2 rounded-2xl transition-all duration-300 ${selectedImage === img ? 'border-red-400 shadow-lg shadow-red-100' : 'border-gray-100 hover:border-red-200'}`}
                                    >
                                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                                            <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                        </div>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Middle: Product Info */}
                <div className="lg:col-span-4 space-y-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category: <span className="text-red-500">{product.category}</span></span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-red-500 font-sans tracking-tighter">৳{displayPrice.toFixed(0)}</span>
                        {displayOriginalPrice && (
                            <span className="text-lg text-gray-300 line-through font-sans font-bold">৳{displayOriginalPrice.toFixed(0)}</span>
                        )}
                        {displayDiscount && (
                            <span className="bg-red-50 text-red-500 text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">{displayDiscount}</span>
                        )}
                    </div>

                    <div className="space-y-4 py-6 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Availability: <span className="text-green-600 font-black">In Stock ({displayStock} items)</span></span>
                        </div>
                    </div>

                    {/* Variations Grid */}
                    {product.type === 'variable' && product.variations && product.variations.length > 0 && (
                        <div className="space-y-6 py-4 border-b border-gray-100">
                            {product.variations.map((v) => (
                                <div key={v.id}>
                                    <h4 className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-1">
                                        Select {v.name}: <span className="text-red-500">*</span>
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {v.options.map((opt: string) => (
                                            <button
                                                key={opt}
                                                onClick={() => setSelectedVariations(prev => ({ ...prev, [v.name]: opt }))}
                                                className={`min-w-[48px] px-5 py-2.5 text-xs font-black rounded-xl border transition-all active:scale-95 uppercase tracking-widest ${selectedVariations[v.name] === opt
                                                    ? 'bg-red-500 text-white border-red-500 shadow-xl shadow-red-200'
                                                    : 'bg-white text-slate-900 border-gray-100 hover:border-red-100'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        <div className="flex border-2 border-gray-200 rounded-2xl overflow-hidden h-14 bg-gray-50/50 shadow-inner">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-5 hover:bg-white text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center active:scale-90"
                            >
                                <Minus className="w-4 h-4" strokeWidth={3} />
                            </button>
                            <input type="number" value={quantity} readOnly className="w-14 text-center text-sm font-black focus:outline-none bg-transparent text-slate-900 font-sans" />
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-5 hover:bg-white text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center active:scale-90"
                            >
                                <Plus className="w-4 h-4" strokeWidth={3} />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black h-14 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-100 active:scale-95 uppercase tracking-widest text-xs"
                        >
                            <ShoppingCart className="w-5 h-5" /> ADD TO CART
                        </button>
                    </div>

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-slate-900 hover:bg-black text-white font-black h-14 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs"
                    >
                        <Zap className="w-5 h-5" /> BUY NOW
                    </button>

                    {/* Trust Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                            <div className="bg-red-50 p-2 rounded-xl"><ShieldCheck className="w-5 h-5 text-red-400" /></div>
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-tight">১০১% আসল প্রোডাক্ট</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                            <div className="bg-blue-50 p-2 rounded-xl"><Truck className="w-5 h-5 text-blue-400" /></div>
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-tight">সারা দেশে ডেলিভারি</span>
                        </div>
                    </div>

                    {/* Call Support */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="tel:+8801568324268" className="flex-1 bg-white border border-gray-100 hover:border-green-100 hover:bg-green-50 text-slate-800 flex items-center justify-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm transition-all hover:-translate-y-1">
                            <div className="bg-green-500 text-white p-1.5 rounded-lg"><Phone className="w-4 h-4" /></div>
                            +8801568324268
                        </a>
                    </div>
                </div>

                {/* Right: Secondary Info */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-slate-900 rounded-[2rem] overflow-hidden relative aspect-video shadow-2xl group border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Video Placeholder" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform cursor-pointer border border-white/30">
                                <PlayCircle className="w-8 h-8 text-white fill-white" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Demonstration</span>
                        </div>
                    </div>

                    <Link href="/shop" className="block bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-[2rem] text-white shadow-xl shadow-red-100 hover:shadow-red-200 transition-all hover:-translate-y-1 group">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Exclusive Offer</p>
                        <h4 className="text-xl font-black uppercase leading-tight">Explore More Trends</h4>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                            Shop Now <ChevronRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>



            {/* Description & Feedback (FULL WIDTH TABS) */}
            <div className="mt-20 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl shadow-slate-100/50 overflow-hidden">
                <div className="border-b border-gray-50 px-10 pt-8 flex items-center gap-10 bg-gray-50/30">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`text-xs font-black pb-6 -mb-[2px] uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'description' ? 'text-red-500 border-red-500' : 'text-gray-300 border-transparent hover:text-slate-600'}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('specifications')}
                        className={`text-xs font-black pb-6 -mb-[2px] uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'specifications' ? 'text-red-500 border-red-500' : 'text-gray-300 border-transparent hover:text-slate-600'}`}
                    >
                        Specifications
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`text-xs font-black pb-6 -mb-[2px] uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'reviews' ? 'text-red-500 border-red-500' : 'text-gray-300 border-transparent hover:text-slate-600'}`}
                    >
                        Reviews ({reviews.length})
                    </button>
                </div>

                <div className="p-10">
                    {activeTab === 'description' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="max-w-4xl space-y-6">
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{product.name}</h2>
                                <div
                                    className="text-gray-500 text-base leading-relaxed prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                                <div className="h-px bg-gray-50 w-full my-8" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="bg-red-50/30 p-8 rounded-[2rem] border border-red-50">
                                        <h4 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-4">Quality Promise</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">Each object in our collection undergoes rigorous quality inspection to ensure premium craftsmanship.</p>
                                    </div>
                                    <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                                        <h4 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-4">Official Warranty</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">Full coverage for manufacturing defects and guaranteed replacement options.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                                {product.attributes && Array.isArray(product.attributes) && product.attributes.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <tbody>
                                            {product.attributes.map((attr, i) => (
                                                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/30 w-1/3">{attr.name || attr.label}</td>
                                                    <td className="py-5 px-8 text-sm font-bold text-slate-800 font-sans">{attr.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-10 text-center text-gray-400 italic font-medium">No detailed specifications available.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Customer Feedbacks</h3>
                                        {reviews.length > 0 && (
                                            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl text-yellow-600 font-black text-xs">
                                                <Star className="w-4 h-4 fill-current" /> {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} Rating
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {reviews.length > 0 ? reviews.map((r) => (
                                            <div key={r.id} className="bg-gray-50/50 p-8 rounded-[2.5rem] border-2 border-slate-100 group">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100 p-0.5">
                                                            <img
                                                                src={r.user?.profile_photo ? (r.user.profile_photo.startsWith('http') ? r.user.profile_photo : `http://localhost:8000/storage/${r.user.profile_photo}`) : `https://ui-avatars.com/api/?name=${r.user?.name}&background=random`}
                                                                alt={r.user?.name}
                                                                className="w-full h-full object-cover rounded-[14px]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{r.user?.name}</div>
                                                            <div className="flex gap-0.5 text-yellow-400 mt-1">
                                                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(r.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">"{r.comment}"</p>

                                                {r.images && r.images.length > 0 && (
                                                    <div className="flex gap-3 mt-6">
                                                        {r.images.map((img, idx) => (
                                                            <div key={idx} className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-white">
                                                                <img src={img.startsWith('http') ? img : `http://localhost:8000/storage/${img}`} className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {r.admin_reply && (
                                                    <div className="mt-6 bg-white p-6 rounded-3xl border-2 border-red-100 shadow-sm relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                            <ShieldCheck className="w-3.5 h-3.5" /> Admin Hub Reply
                                                        </div>
                                                        <p className="text-sm text-slate-600 font-bold leading-relaxed">{r.admin_reply}</p>
                                                    </div>
                                                )}

                                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6">
                                                    <button
                                                        onClick={() => toggleLike(r.id)}
                                                        className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors group/like"
                                                    >
                                                        <Heart className="w-4 h-4 group-hover/like:fill-red-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{r.likes_count} Helpful</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-20 bg-gray-50/30 rounded-[3rem] border-2 border-dashed border-gray-100">
                                                <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No reviews yet. Be the first to share!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="lg:col-span-5">
                                    <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-200 sticky top-24">
                                        <h3 className="font-black text-slate-900 mb-8 text-sm uppercase tracking-widest text-center border-b border-gray-50 pb-6">এই পণ্য সম্পর্কে মতামত দিন</h3>
                                        <form className="space-y-6" onSubmit={handleReviewSubmit}>
                                            <div className="flex justify-center gap-3 mb-8">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))}
                                                        className={`transition-all hover:scale-110 active:scale-90 ${reviewForm.rating >= s ? 'text-yellow-400' : 'text-gray-100'}`}
                                                    >
                                                        <Star className={`w-10 h-10 ${reviewForm.rating >= s ? 'fill-current' : 'fill-gray-100'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                            <textarea
                                                value={reviewForm.comment}
                                                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                                                placeholder="আপনার মূল্যবান মন্তব্য লিখুন..."
                                                className="w-full p-6 bg-gray-50 border-2 border-slate-200 rounded-[2rem] text-sm focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-400 h-40 transition-all resize-none font-bold"
                                                required
                                            ></textarea>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="border-2 border-slate-200 rounded-[2rem] p-8 text-center cursor-pointer hover:bg-red-50/30 hover:border-red-100 transition-all group relative overflow-hidden">
                                                    <ImageIcon className="w-8 h-8 text-gray-200 mx-auto mb-2 group-hover:text-red-400 transition-all" />
                                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">ছবির অ্যালবাম যুক্ত করুন</span>
                                                    <p className="text-[8px] text-gray-300 mt-2 uppercase">Max 5 photos, 2MB each</p>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900 hover:bg-black disabled:opacity-50 text-white font-black py-6 rounded-[2rem] transition-all text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
                                            >
                                                {isSubmitting ? "সাবমিট হচ্ছে..." : "কমেন্ট সাবমিট করুন"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* Related Products Slider */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Matching Trends</span>
                            <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 border-b-4 border-slate-100 pb-2">Related Products</h2>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        navigation
                        className="!pb-12"
                    >
                        {relatedProducts.map((p: any) => (
                            <SwiperSlide key={p.id}>
                                <div className="h-full px-2">
                                    <ProductCard {...p} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
