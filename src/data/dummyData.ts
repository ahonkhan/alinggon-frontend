export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    category: string;
    brand?: string;
    stock: number;
    description: string;
    specs: { label: string; value: string }[];
    gallery: string[];
}

export const products: Product[] = [
    {
        id: "bundle-1",
        name: "৫ পিস প্রিমিয়াম কম্বো প্যাকেইজ (ঘড়ি, সানগ্লাস, মানিব্যাগ, বেল্ট, আতর)",
        price: 1090,
        originalPrice: 1590,
        discount: "BEST OFFER",
        image: "https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg",
        category: "Bundle",
        brand: "Alinggon Exclusive",
        stock: 50,
        description: "Everything you need in one premium package.",
        specs: [{ label: "Items", value: "5 pieces" }],
        gallery: ["https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg"]
    },
    {
        id: "1",
        name: "Hand Fan cute handheld mini fan",
        price: 500,
        originalPrice: 700,
        discount: "-25% Off!",
        image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80&w=400",
        category: "Gadget",
        brand: "Next Gadget",
        stock: 120,
        description: "Stay cool anywhere with this ultra-portable, rechargeable mini fan. Features three speed settings and a long-lasting battery.",
        specs: [
            { label: "Material", value: "Premium Plastic" },
            { label: "Battery", value: "2000mAh" },
            { label: "Charging", value: "USB-C" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80&w=600",
            "https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg",
            "https://sc04.alicdn.com/kf/Hb55a73095304416194db4f2e912e750bu.jpg"
        ]
    },
    {
        id: "2",
        name: "Lotto Slide Sandal for Men",
        price: 400,
        originalPrice: 800,
        discount: "-50% Off!",
        image: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=400",
        category: "Man",
        brand: "Lotto",
        stock: 50,
        description: "Classic Lotto slide sandals designed for maximum comfort. Perfect for home or casual outdoor activities.",
        specs: [
            { label: "Sole", value: "EVA" },
            { label: "Type", value: "Slide" }
        ],
        gallery: ["https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "3",
        name: "Colorful Golf Interactive Ball",
        price: 100,
        originalPrice: 200,
        discount: "-50% Off!",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400",
        category: "Gadget",
        stock: 200,
        description: "Fun and durable interactive ball for pets and kids. Bright colors make it easy to track.",
        specs: [
            { label: "Size", value: "Standard Golf Size" }
        ],
        gallery: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "4",
        name: "Adjustable Hand Grips Strength",
        price: 222,
        originalPrice: 333,
        discount: "-30%",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp",
        category: "Gadget",
        stock: 85,
        description: "Improve your forearm and grip strength with these high-quality adjustable hand grips.",
        specs: [
            { label: "Resistance", value: "10kg - 60kg" }
        ],
        gallery: ["https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp"]
    },
    {
        id: "5",
        name: "Smart Hand Fan cute handheld cooling Rechargeable",
        price: 300,
        originalPrice: 500,
        discount: "40% OFF",
        image: "https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg",
        category: "Gadget",
        brand: "Next Gadget",
        stock: 135,
        description: "Enhanced cooling performance with a sleek design. This smart fan is a must-have for hot days.",
        specs: [
            { label: "Model", value: "HF-E88" },
            { label: "Speed", value: "3 Levels" }
        ],
        gallery: [
            "https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg",
            "https://sc04.alicdn.com/kf/Hb55a73095304416194db4f2e912e750bu.jpg",
            "https://sc04.alicdn.com/kf/H59013c7aeb7e492293ce141d1d5d5d5dA.jpg"
        ]
    },
    {
        id: "6",
        name: "Premium Leather Wallet for Men",
        price: 850,
        originalPrice: 1200,
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400",
        category: "Man",
        brand: "Alinggon Exclusive",
        stock: 45,
        description: "Handcrafted genuine leather wallet with multiple card slots and a sleek finish.",
        specs: [
            { label: "Material", value: "Genuine Leather" },
            { label: "Slots", value: "8 Cards + 2 Cash" }
        ],
        gallery: ["https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "7",
        name: "Luxury Wrist Watch - Silver Edition",
        price: 2500,
        originalPrice: 3500,
        discount: "৳1000 OFF",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400",
        category: "Accessories",
        brand: "Curren",
        stock: 20,
        description: "A premium silver-toned watch that combines elegance with precision. Perfect for formal occasions.",
        specs: [
            { label: "Movement", value: "Quartz" },
            { label: "Waterproof", value: "3 ATM" }
        ],
        gallery: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "8",
        name: "Organic Honey Nut Mix",
        price: 650,
        originalPrice: 750,
        image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=400",
        category: "Food",
        brand: "Alinggon Organic",
        stock: 300,
        description: "A healthy mix of premium nuts infused with pure organic honey. Great for energy boosting.",
        specs: [
            { label: "Weight", value: "500g" },
            { label: "Organic", value: "Yes" }
        ],
        gallery: ["https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "9",
        name: "Women's Designer Handbag",
        price: 1800,
        originalPrice: 2200,
        discount: "HOT DEAL",
        image: "https://images.unsplash.com/photo-1584917033904-4c92bb14806b?auto=format&fit=crop&q=80&w=400",
        category: "Women",
        brand: "StyleIcon",
        stock: 15,
        description: "Chic and spacious designer handbag for modern women. Available in multiple colors.",
        specs: [
            { label: "Type", value: "Tote" },
            { label: "Material", value: "PU Leather" }
        ],
        gallery: ["https://images.unsplash.com/photo-1584917033904-4c92bb14806b?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: "10",
        name: "Retro Pixel Art Mobile Skins",
        price: 250,
        originalPrice: 350,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
        category: "Mobile",
        brand: "WrapCity",
        stock: 400,
        description: "High-quality textured skins for your mobile phone with unique retro pixel art designs.",
        specs: [
            { label: "Fit", value: "Universal/Cut-to-size" }
        ],
        gallery: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"]
    }
];

export const categories = [
    "Gadget", "Food", "Mobile", "Man", "Women", "Tshirt", "Organic", "Accessories"
];
