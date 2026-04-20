"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogDetailsQuery } from "@/store/api/frontendApi";
import Loader from "@/components/Loader";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogDetails() {
    const { slug } = useParams();
    const { data: blogDetails, isLoading } = useGetBlogDetailsQuery(slug as string);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50/50">
                <Loader variant="brand" size="lg" />
            </div>
        );
    }

    if (!blogDetails?.success || !blogDetails.data.blog) {
        return (
            <div className="flex flex-col justify-center items-center h-screen space-y-4 bg-gray-50/50">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Article Not Found</h2>
                <Link href="/blog" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Back to Blog</Link>
            </div>
        );
    }

    const { blog, related_blogs } = blogDetails.data;
    const tags = blog.tags ? blog.tags.split(/[ ,#]+/).filter(tag => tag.length > 0) : [];

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation Header */}
            <nav className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
                <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors group mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm font-medium">Back to Articles</span>
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-4">
                {/* Article Header */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                        {blog.title}
                    </h1>
                    
                    <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-xl border border-slate-200">
                                {blog.author?.charAt(0) || "A"}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-900">{blog.author || "Admin"}</span>
                                <div className="flex items-center text-sm text-slate-500 space-x-2">
                                    <span>{format(new Date(blog.created_at), "MMMM d, yyyy")}</span>
                                    <span>•</span>
                                    <span>{blog.view_count} views</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {['facebook', 'twitter', 'linkedin'].map((platform) => (
                                <button key={platform} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                    <i className={`ti ti-brand-${platform} text-xl`}></i>
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {blog.featured_image && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-sm border border-slate-100">
                        <Image 
                            src={blog.featured_image} 
                            alt={blog.title} 
                            fill 
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Blog Content */}
                <article className="max-w-3xl mx-auto">
                    <div 
                        className="prose prose-lg md:prose-xl max-w-none prose-slate prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-red-600 prose-strong:text-slate-900 prose-img:rounded-2xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Gallery Section */}
                    {blog.images && blog.images.length > 0 && (
                        <div className="mt-16 space-y-8 py-8 border-t border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery</h3>
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 2 }
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                className="pb-12"
                            >
                                {blog.images.map((img) => (
                                    <SwiperSlide key={img.id}>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                                            <Image 
                                                src={img.image_path} 
                                                alt="gallery" 
                                                fill 
                                                className="object-cover" 
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-slate-100">
                            {tags.map((tag, i) => (
                                <span key={i} className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-xs font-medium border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author Bio Bottom */}
                    <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-3xl font-bold flex-shrink-0">
                            {blog.author?.charAt(0) || "A"}
                        </div>
                        <div className="text-center md:text-left space-y-2">
                            <h4 className="text-xl font-bold text-slate-900">Written by {blog.author || "Admin"}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                                Alinggon editorial team contributor. Sharing professional insights, health tips, and lifestyle updates for our community.
                            </p>
                            <Link href="/blog" className="inline-block text-red-600 font-bold text-sm mt-2 hover:underline">View all articles</Link>
                        </div>
                    </div>
                </article>
            </main>

            {/* Related Articles Section */}
            {related_blogs.length > 0 && (
                <section className="bg-slate-50 border-t border-slate-100 mt-20 py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">More from Alinggon Blog</h3>
                            <Link href="/blog" className="text-sm font-bold text-red-600 hover:underline">See all</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related_blogs.slice(0, 3).map((rBlog) => (
                                <Link href={`/blog/${rBlog.slug}`} key={rBlog.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                    <div className="relative aspect-video overflow-hidden">
                                        {rBlog.featured_image ? (
                                            <Image src={rBlog.featured_image} alt={rBlog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100"></div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">
                                            {format(new Date(rBlog.created_at), "MMM d, yyyy")}
                                        </span>
                                        <h5 className="text-lg font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">{rBlog.title}</h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom Banner */}
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">Upgrade Your Lifestyle</h3>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">Discover premium products curated just for you at Alinggon Shop.</p>
                        <Link href="/shop" className="inline-block bg-white text-slate-900 px-10 py-4 rounded-xl font-bold tracking-tight hover:bg-slate-100 transition-all">Shop Now</Link>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>

    );
}
