"use client";

import Link from "next/link";

export default function AdsSection() {
    const ads = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600",
            link: "/shop?category=Electronics",
            alt: "Electronics Sale"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
            link: "/shop?category=Fashion",
            alt: "Fashion Clearance"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600",
            link: "/shop?category=Beauty",
            alt: "Beauty Essentials"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1556906781-9a412961d289?auto=format&fit=crop&q=80&w=600",
            link: "/shop?category=Home",
            alt: "Home Decor"
        }
    ];

    return (
        <section className="max-w-[1600px] mx-auto px-4 ">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ads.map((ad) => (
                    <Link
                        key={ad.id}
                        href={ad.link}
                        className="group overflow-hidden rounded-lg relative h-[150px] shadow-lg hover:shadow-xl transition-shadow border border-gray-100 block"
                    >
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                            src={ad.image}
                            alt={ad.alt}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                Shop Now
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
