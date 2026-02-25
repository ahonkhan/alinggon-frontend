import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    category: string;
    reviews?: Review[];
    related_products?: Product[];
}

export interface FlashSaleProduct {
    id: number;
    flash_sale_id: number;
    product_id: number;
    price: number;
    quantity: number;
    sold_count: number;
    product_data: Product;
}

export interface FlashSale {
    id: number;
    name: string;
    slug: string;
    start_date: string;
    end_date: string;
    status: boolean;
    image: string | null;
    products: FlashSaleProduct[];
}

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    images?: string[];
    status: 'pending' | 'approved' | 'rejected';
    admin_reply?: string;
    likes_count: number;
    user?: {
        id: number;
        name: string;
        profile_photo?: string;
    };
    created_at: string;
}

export interface FeaturedProductsResponse {
    success: boolean;
    data: {
        twelve_months_products: Product[];
        new_arrivals: Product[];
        special_offers: Product[];
        todays_deals: Product[];
    }
}

export interface ProductDetailsResponse {
    success: boolean;
    data: Product & {
        description: string;
        short_description: string;
        type: string;
        is_digital: boolean;
        stock_quantity: number;
        sku: string;
        weight: number | null;
        category_id: number;
        brand_id: number;
        vendor_id: number;
        brand: any;
        vendor: any;
        gallery: any[];
        variations: any[];
        combinations: any[];
        attributes: any;
    };
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface CategoryData {
    id: number;
    name: string;
    slug: string;
    image?: string;
    count?: number;
    children?: CategoryData[];
    latest_products?: Product[];
}

export interface CategoriesResponse {
    success: boolean;
    data: CategoryData[];
}

export interface BrandData {
    id: number;
    name: string;
    slug: string;
    logo?: string;
}

export interface BrandsResponse {
    success: boolean;
    data: BrandData[];
}

// Ensure base URL matches the backend API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://alinggon-admin.rangpurit.com/api';
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const frontendApi = createApi({
    reducerPath: 'frontendApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('alinggon_token') : null;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFeaturedProducts: builder.query<FeaturedProductsResponse, void>({
            query: () => '/featured-products',
        }),
        getProductDetails: builder.query<ProductDetailsResponse, string>({
            query: (slug) => `/product/${slug}`,
        }),
        getProducts: builder.query<ProductsResponse, Record<string, string>>({
            query: (params) => {
                const searchParams = new URLSearchParams(params);
                return `/products?${searchParams.toString()}`;
            },
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/categories',
        }),
        getBrands: builder.query<BrandsResponse, void>({
            query: () => '/brands',
        }),
        placeOrder: builder.mutation<any, any>({
            query: (orderData) => ({
                url: '/orders',
                method: 'POST',
                body: orderData,
            }),
        }),
        getMyOrders: builder.query<any, void>({
            query: () => '/orders/my-orders',
        }),
        getOrderDetails: builder.query<any, string>({
            query: (orderNumber) => `/orders/${orderNumber}`,
        }),
        register: builder.mutation<any, any>({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation<any, any>({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
        }),
        trackOrder: builder.query<any, { orderNumber?: string, phone: string }>({
            query: ({ orderNumber, phone }) => {
                let url = `/orders/track?phone=${phone}`;
                if (orderNumber) url += `&order_number=${orderNumber}`;
                return url;
            },
        }),
        getProductReviews: builder.query<any, string>({
            query: (productId) => `/products/${productId}/reviews`,
        }),
        submitReview: builder.mutation<any, any>({
            query: (data) => ({
                url: '/reviews',
                method: 'POST',
                body: data,
            }),
        }),
        toggleLikeReview: builder.mutation<any, number>({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}/like`,
                method: 'POST',
            }),
        }),
        getMyReviews: builder.query<any, void>({
            query: () => '/my-reviews',
        }),
        getActiveFlashSale: builder.query<{ success: boolean; data: FlashSale }, void>({
            query: () => '/flash-sale/active',
        }),
    }),
});


export const {
    useGetFeaturedProductsQuery,
    useGetCategoriesQuery,
    useGetProductDetailsQuery,
    useGetProductsQuery,
    useGetBrandsQuery,
    usePlaceOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderDetailsQuery,
    useRegisterMutation,
    useLoginMutation,
    useTrackOrderQuery,
    useLazyTrackOrderQuery,
    useGetProductReviewsQuery,
    useSubmitReviewMutation,
    useToggleLikeReviewMutation,
    useGetMyReviewsQuery,
    useGetActiveFlashSaleQuery,
} = frontendApi;
