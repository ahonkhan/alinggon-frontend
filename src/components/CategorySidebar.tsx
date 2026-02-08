"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data for categories with subcategories
const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Smartphones",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200",
                items: ["Apple", "Samsung", "Xiaomi", "Google Pixel"]
            },
            {
                name: "Laptops",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200",
                items: ["MacBook", "Dell", "HP", "Lenovo"]
            },
            {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&q=80&w=200",
                items: ["Cases", "Chargers", "Headphones"]
            }
        ]
    },
    {
        id: 2,
        name: "Fashion",
        icon: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Men",
                image: "https://images.unsplash.com/photo-1488161628813-99c97485ce11?auto=format&fit=crop&q=80&w=200",
                items: ["Shirts", "Pants", "Shoes", "Watches"]
            },
            {
                name: "Women",
                image: "https://images.unsplash.com/photo-1503341455253-b2e723099de5?auto=format&fit=crop&q=80&w=200",
                items: ["Dresses", "Tops", "Shoes", "Bags"]
            },
            {
                name: "Kids",
                image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=200",
                items: ["Boys", "Girls", "Toys"]
            }
        ]
    },
    {
        id: 3,
        name: "Home & Living",
        icon: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Furniture",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=200",
                items: ["Living Room", "Bedroom", "Office"]
            },
            {
                name: "DÃ©cor",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=200",
                items: ["Vases", "Wall Art", "Lighting"]
            }
        ]
    },
    {
        id: 4,
        name: "Beauty & Health",
        icon: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Makeup",
                image: "https://images.unsplash.com/photo-1522335789203-abd6523f7216?auto=format&fit=crop&q=80&w=200",
                items: ["Face", "Eyes", "Lips"]
            },
            {
                name: "Skincare",
                image: "https://images.unsplash.com/photo-1556228720-1957be83e536?auto=format&fit=crop&q=80&w=200",
                items: ["Moisturizers", "Serums", "Cleansers"]
            }
        ]
    },
    {
        id: 5,
        name: "Groceries",
        icon: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Fruits & Veg",
                image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200",
                items: ["Fresh Fruits", "Vegetables"]
            },
            {
                name: "Beverages",
                image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=200",
                items: ["Juices", "Coffee", "Tea"]
            }
        ]
    },
    {
        id: 6,
        name: "Sports & Outdoors",
        icon: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=50",
        subcategories: [
            {
                name: "Fitness",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200",
                items: ["Weights", "Yoga", "Cardio"]
            }
        ]
    },
    {
        id: 7,
        name: "Automotive",
        icon: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=50",
        subcategories: []
    },
    {
        id: 8,
        name: "Books & Stationery",
        icon: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=50",
        subcategories: []
    }
];

export default function CategorySidebar() {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <div className="relative h-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 flex flex-col">
            <div className="p-5 border-b border-gray-50 bg-gray-50/30 rounded-t-[2rem]">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Main Categories</h3>
            </div>

            <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group"
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <Link
                            href={`/shop?category=${category.name}`}
                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors relative"
                        >
                            <img src={category.icon} alt={category.name} className="w-6 h-6 object-contain rounded-full bg-gray-50 p-0.5 border border-gray-100" />
                            <span className="flex-1 text-xs font-bold text-slate-700 group-hover:text-red-500 uppercase tracking-wide">{category.name}</span>
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-400" />
                            )}
                        </Link>

                        {/* Mega Menu */}
                        {category.subcategories && category.subcategories.length > 0 && hoveredCategory === category.id && (
                            <div className="absolute left-full top-0 w-[600px] min-h-full bg-white border border-gray-100 shadow-2xl rounded-r-[2rem] z-50 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-left-2 duration-200">
                                {category.subcategories.map((sub, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <img src={sub.image} alt={sub.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">{sub.name}</h4>
                                        </div>
                                        <ul className="space-y-2 pl-2 border-l-2 border-gray-50">
                                            {sub.items.map((item, i) => (
                                                <li key={i}>
                                                    <Link href={`/shop?category=${item}`} className="text-xs text-gray-500 hover:text-red-400 font-medium block py-0.5 transition-colors">
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f8fafc;
                    border-radius: 0 0 2rem 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e2e8f0;
                    border-radius: 20px;
                    border: 1px solid #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
