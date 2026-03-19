"use client";

import { Star, Quote, CheckCircle2, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useGetSiteReviewsQuery, useSubmitSiteReviewMutation } from "@/store/api/frontendApi";
import { useToast } from "@/context/ToastContext";

export default function ReviewsPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        rating: 5,
        comment: "",
        avatar: null as File | null,
        review_images: [] as File[],
    });

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const imagesInputRef = useRef<HTMLInputElement>(null);

    const { data: reviewsResponse, isLoading, isError } = useGetSiteReviewsQuery();
    const [submitReview, { isLoading: isSubmitting }] = useSubmitSiteReviewMutation();
    const { showToast } = useToast();

    const reviews = reviewsResponse?.success ? reviewsResponse.data : [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, avatar: file });
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setFormData({ ...formData, review_images: [...formData.review_images, ...files] });

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('rating', formData.rating.toString());
        data.append('comment', formData.comment);
        if (formData.avatar) data.append('avatar', formData.avatar);
        formData.review_images.forEach((file) => {
            data.append('review_images[]', file);
        });

        try {
            const res = await submitReview(data).unwrap();
            if (res.success) {
                showToast(res.message || "Review submitted successfully!", "success");
                setIsModalOpen(false);
                setFormData({ name: "", role: "", rating: 5, comment: "", avatar: null, review_images: [] });
                setAvatarPreview(null);
                setImagePreviews([]);
            }
        } catch (err: any) {
            showToast(err.data?.message || "Something went wrong", "error");
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfdfd] pt-10 pb-24">
            {/* Review Submission Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 z-[101] shadow-sm group"
                        >
                            <X className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                        </button>


                        <div className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Write Your Review</h3>
                                <p className="text-slate-700 font-medium text-sm mt-2">Share your experience with the Alinggon community</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col items-center mb-8">
                                    <div
                                        onClick={() => avatarInputRef.current?.click()}
                                        className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-red-400 transition-colors overflow-hidden relative group"
                                    >
                                        {avatarPreview ? (
                                            <img src={avatarPreview} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-red-400" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-[12px] font-black uppercase tracking-widest">Change</span>
                                        </div>
                                    </div>
                                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-800 mt-2">Your Photo</span>
                                    <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 transition-all font-medium"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">Designation / Role</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 transition-all font-medium"
                                            placeholder="e.g. Travel Blogger"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">Star Rating</label>
                                    <div className="flex gap-2 p-4 bg-slate-50 rounded-2xl w-fit">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                onClick={() => setFormData({ ...formData, rating: s })}
                                                className={`w-6 h-6 cursor-pointer transition-all ${s <= formData.rating ? "fill-red-500 text-red-500 scale-110" : "text-slate-200 hover:text-red-200"}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">Your Story</label>
                                    <textarea
                                        required
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-red-500/20 transition-all font-medium min-h-[150px]"
                                        placeholder="How was your experience with Alinggon?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">Showcase Images (max 4)</label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {imagePreviews.map((pre, i) => (
                                            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-50 relative group">
                                                <img src={pre} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
                                                        setFormData(prev => ({ ...prev, review_images: prev.review_images.filter((_, idx) => idx !== i) }));
                                                    }}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        {imagePreviews.length < 4 && (
                                            <div
                                                onClick={() => imagesInputRef.current?.click()}
                                                className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-red-400 transition-colors group"
                                            >
                                                <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-red-400" />
                                            </div>
                                        )}
                                    </div>
                                    <input type="file" multiple ref={imagesInputRef} className="hidden" accept="image/*" onChange={handleImagesChange} />
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-red-600 text-white font-black text-[13px] uppercase tracking-[0.4em] py-6 rounded-3xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <span>Submit Chronicle</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Enhanced Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500 overflow-hidden"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute top-10 right-10 z-[100000]">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="bg-white/10 hover:bg-red-500 hover:text-white text-white p-4 rounded-3xl backdrop-blur-2xl border border-white/20 transition-all active:scale-90 group shadow-2xl"
                        >
                            <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    <div
                        className="relative max-w-6xl w-full max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Review Preview"
                            className="max-w-full max-h-full rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] object-contain border-8 border-white/10"
                        />
                        <div className="absolute -inset-10 bg-red-600/10 rounded-[5rem] -z-10 blur-[100px] opacity-50"></div>
                    </div>
                </div>
            )}


            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100 animate-bounce-slow">
                        <CheckCircle2 className="w-3 h-3 text-red-500" />
                        <span className="text-red-600 text-[13px] font-black uppercase tracking-widest">10,000+ Happy Explorers</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.9] max-w-4xl">
                        ALINGGON  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">CUSTOMER</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">REVIEWS</span>
                    </h1>
                    <p className="max-w-xl text-slate-700 text-sm md:text-base font-medium leading-relaxed opacity-80 uppercase tracking-widest px-4 md:px-0">
                        Real stories from real travelers who chose <span className="font-black text-slate-900">Alinggon</span> for their curated lifestyle needs.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                        <p className="text-slate-800 font-black uppercase tracking-[0.3em] text-[13px]">Retrieving Stories...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
                        <p className="text-red-600 font-black uppercase tracking-widest text-sm">Failed to load chronicles.</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-[13px] font-black underline uppercase text-red-400 tracking-widest hover:text-red-600">Try Again</button>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100">
                        <p className="text-slate-800 font-black uppercase tracking-[0.4em] text-xs">No chronicles shared yet.</p>
                    </div>
                ) : (
                    /* Main Reviews Layout with Custom Scroll/Masonry Feel */
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-2 md:px-0">
                        {reviews.map((review) => (
                            <div key={review.id} className="break-inside-avoid bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group relative">
                                {/* Verified Badge */}
                                {review.is_verified && (
                                    <div className="absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                                        <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter">Verified</span>
                                    </div>
                                )}

                                <Quote className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-50 opacity-[0.03] group-hover:text-red-50 group-hover:opacity-[1] transition-all" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-0.5">{review.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-2.5 h-2.5 ${i < review.rating ? "fill-red-500 text-red-500" : "text-slate-100"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{formatDate(review.created_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium font-sans">
                                    "{review.comment}"
                                </p>

                                {/* Review Images Grid */}
                                {review.images && review.images.length > 0 && (
                                    <div className={`grid ${review.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6 relative`}>
                                        {review.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-zoom-in group/img"
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Review ${idx}`}
                                                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                                                    <ImageIcon className="text-white w-6 h-6 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <span className="text-[13px] font-black text-red-500 uppercase tracking-[0.2em] bg-red-50/50 px-3 py-1 rounded-lg">
                                        {review.role || "Verified Buyer"}
                                    </span>
                                    <button className="text-[13px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors">Helpful?</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Dynamic CTA Section - Minimalized */}
                <div className="mt-20 relative px-4">
                    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -ml-32 -mt-32"></div>

                        <div className="relative z-10 space-y-6 max-w-xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tight">
                                YOUR STORY <span className="text-red-500 italic">MATTERS.</span>
                            </h2>
                            <p className="text-white/40 text-[11px] md:text-sm font-medium leading-relaxed uppercase tracking-[0.2em]">
                                Join the Alinggon community and share your chronicle.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="relative group/btn overflow-hidden bg-red-600 hover:bg-white text-white hover:text-slate-900 font-black text-[12px] uppercase tracking-[0.3em] px-10 py-4 rounded-2xl transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(239,68,68,0.4)] active:scale-95"
                                >
                                    <span className="relative z-10">Write Your Review</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
