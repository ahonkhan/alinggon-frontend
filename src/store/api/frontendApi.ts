import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    video?: string | null;
    category: string;
    brand_id?: number;
    vendor_id?: number;
    brand?: any;
    vendor?: any;
    reviews?: Review[];
    related_products?: Product[];
}

export interface SiteReview {
    id: number;
    name: string;
    role: string | null;
    rating: number;
    comment: string;
    avatar: string | null;
    images: string[] | null;
    is_verified: boolean;
    status: boolean;
    created_at: string;
}

export interface SiteReviewsResponse {
    success: boolean;
    data: SiteReview[];
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
    footer_logo?: string;
    footer_text?: string;
    popup_image?: string;
    popup_status?: boolean;
    popup_title?: string;
    popup_subtitle?: string;
    popup_button_text?: string;
    popup_button_link?: string;
    free_delivery_status?: boolean;
    free_delivery_text?: string;
    contact_address?: string;
    contact_phone?: string;
    contact_email?: string;
    social_facebook?: string;
    social_instagram?: string;
    social_x?: string;
    social_youtube?: string;
    social_linkedin?: string;
    hero_banners?: string[] | null;
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

export interface HomeContentResponse {
    success: boolean;
    data: {
        banners: string[];
        how_to_order: {
            url: string | null;
            type: 'youtube' | 'custom';
        };
        review_videos: {
            type: 'youtube' | 'custom';
            url: string;
        }[];
        logo: string | null;
        header_logo: string | null;
        footer_logo: string | null;
        popup_image: string | null;
        popup_status: boolean;
        popup_overlay_status?: boolean;
        popup_overlay_color?: string | null;
        popup_title?: string | null;
        popup_subtitle?: string | null;
        popup_button_text?: string | null;
        popup_button_link?: string | null;
        free_delivery_status?: boolean;
        free_delivery_text?: string | null;
        footer_text: string | null;
        contact_address?: string | null;
        contact_phone?: string | null;
        contact_email?: string | null;
        social_facebook?: string | null;
        social_instagram?: string | null;
        social_x?: string | null;
        social_youtube?: string | null;
        social_linkedin?: string | null;
        footer_trust_title?: string | null;
        footer_trust_subtitle?: string | null;
        footer_stat1_value?: string | null;
        footer_stat1_label?: string | null;
        footer_stat2_value?: string | null;
        footer_stat2_label?: string | null;
        footer_col1_title?: string | null;
        footer_col1_text?: string | null;
        footer_col2_title?: string | null;
        footer_col2_text?: string | null;
        footer_col1_links?: { name: string; url: string }[];
        footer_col2_links?: { name: string; url: string }[];
        chat_messenger_link?: string | null;
        chat_whatsapp_number?: string | null;
    };
}

export interface BrandsResponse {
    success: boolean;
    data: BrandData[];
}

export interface LeadershipTeamMember {
    id: number;
    role: string;
    images: string[];
    color: string;
    bg: string;
    order: number;
    status: boolean;
}

export interface SocialNetwork {
    id: number;
    social_network_group_id: number;
    name: string;
    url: string | null;
    image: string | null;
    description: string | null;
    order: number;
    status: boolean;
}

export interface PersonalPicture {
    id: number;
    image_path: string;
    is_locked: boolean;
    password?: string;
    order: number;
    status: boolean;
}

export interface SocialNetworkGroup {
    id: number;
    name: string;
    order: number;
    status: boolean;
    social_networks: SocialNetwork[];
}

export interface AboutInfoResponse {
    success: boolean;
    data: {
        leadership_team: LeadershipTeamMember[];
        social_network_groups: SocialNetworkGroup[];
        admin_settings: {
            admin_title?: string;
            admin_greetings?: string;
            admin_quote?: string;
            admin_description?: string;
            years_lead?: string;
            community_size?: string;
            dedication_hours?: string;
            admin_images?: string[];
            about_video_url?: string;
            about_video_title?: string;
            about_video_description?: string;
            about_footer_text?: string;
            bottom_stat1_label?: string;
            bottom_stat1_value?: string;
            bottom_stat2_label?: string;
            bottom_stat2_value?: string;
            bottom_stat3_label?: string;
            bottom_stat3_value?: string;
            admin_personal_pic_pass_mode?: 'single' | 'multiple';
            admin_personal_pic_single_password?: string;
        };
        personal_pictures: PersonalPicture[];
    };
}

export interface TicketMessage {
    id: number;
    ticket_id: number;
    user_id: number;
    message: string | null;
    attachment: string | null;
    is_admin_reply: boolean;
    created_at: string;
    user?: {
        id: number;
        name: string;
        profile_photo?: string;
    };
}

export interface Ticket {
    id: number;
    user_id: number;
    subject: string;
    status: 'open' | 'closed' | 'pending';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
    messages?: TicketMessage[];
}

export interface TicketsResponse {
    success: boolean;
    data: Ticket[];
}

export interface TicketDetailsResponse {
    success: boolean;
    data: Ticket;
}

export interface ProfileStatsResponse {
    success: boolean;
    data: {
        total_orders: number;
        spent_amount: number;
        active_tickets: number;
    };
}

// Ensure base URL matches the backend API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://alinggon-admin.rangpurit.com/api';
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const frontendApi = createApi({
    reducerPath: 'frontendApi',
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
            return (action.payload as any)?.[reducerPath];
        }
    },
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
    tagTypes: ['User', 'Addresses', 'Tickets', 'Stats', 'Orders', 'Wishlist'],
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
            invalidatesTags: ['Orders', 'Stats'],
        }),
        getMyOrders: builder.query<any, void>({
            query: () => '/orders/my-orders',
            providesTags: ['Orders'],
        }),
        getOrderDetails: builder.query<any, string>({
            query: (orderNumber) => `/orders/${orderNumber}`,
            providesTags: (result, error, arg) => [{ type: 'Orders', id: arg }],
        }),
        sendOtp: builder.mutation<any, { name: string, email?: string, phone?: string }>({
            query: (data) => ({
                url: '/register/send-otp',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation<any, { identifier: string, type: 'email' | 'phone', otp: string }>({
            query: (data) => ({
                url: '/register/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),
        resendOtp: builder.mutation<any, { identifier: string, type: 'email' | 'phone' }>({
            query: (data) => ({
                url: '/register/resend-otp',
                method: 'POST',
                body: data,
            }),
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
        submitSiteReview: builder.mutation<any, any>({
            query: (data) => ({
                url: '/site-reviews',
                method: 'POST',
                body: data,
            }),
        }),
        getActiveFlashSale: builder.query<{ success: boolean; data: FlashSale }, void>({
            query: () => '/flash-sale/active',
        }),
        getSiteReviews: builder.query<SiteReviewsResponse, void>({
            query: () => '/site-reviews',
        }),
        getHomeContent: builder.query<HomeContentResponse, void>({
            query: () => '/home-content',
        }),
        getAboutInfo: builder.query<AboutInfoResponse, void>({
            query: () => '/about-info',
        }),
        verifyPersonalPicturePassword: builder.mutation<{ success: boolean; image_path?: string; message?: string }, { id: number; password: string }>({
            query: (data) => ({
                url: '/verify-personal-picture-password',
                method: 'POST',
                body: data,
            }),
        }),
        verifyBulkPersonalPicturesPassword: builder.mutation<{ success: boolean; unlocked_pictures: Record<number, string> }, { password: string }>({
            query: (data) => ({
                url: '/verify-bulk-personal-pictures-password',
                method: 'POST',
                body: data,
            }),
        }),
        getTickets: builder.query<TicketsResponse, void>({
            query: () => '/tickets',
            providesTags: ['Tickets'],
        }),
        createTicket: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/tickets',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Tickets', 'Stats'],
        }),
        getTicketDetails: builder.query<TicketDetailsResponse, string>({
            query: (id) => `/tickets/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Tickets', id: arg }],
        }),
        submitTicketReply: builder.mutation<any, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/tickets/${id}/reply`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Tickets', id: arg.id },
                'Tickets'
            ],
        }),
        getProfileStats: builder.query<ProfileStatsResponse, void>({
            query: () => '/profile/stats',
            providesTags: ['Stats'],
        }),
        updateProfile: builder.mutation<any, { name: string, email: string, phone?: string }>({
            query: (data) => ({
                url: '/profile/update',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User', 'Stats'],
        }),
        updateProfilePhoto: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/profile/photo',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User', 'Stats'],
        }),
        changePassword: builder.mutation<any, any>({
            query: (data) => ({
                url: '/profile/password',
                method: 'POST',
                body: data,
            }),
        }),
        updatePreferences: builder.mutation<any, { preferences: any }>({
            query: (data) => ({
                url: '/profile/preferences',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getAddresses: builder.query<any, void>({
            query: () => '/profile/addresses',
            providesTags: ['Addresses'],
        }),
        addAddress: builder.mutation<any, any>({
            query: (data) => ({
                url: '/profile/addresses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Addresses'],
        }),
        updateAddress: builder.mutation<any, { id: number, data: any }>({
            query: ({ id, data }) => ({
                url: `/profile/addresses/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Addresses'],
        }),
        deleteAddress: builder.mutation<any, number>({
            query: (id) => ({
                url: `/profile/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Addresses'],
        }),
        getWishlist: builder.query<any, void>({
            query: () => '/wishlist',
            providesTags: ['Wishlist'],
        }),
        toggleWishlist: builder.mutation<any, { product_id: string }>({
            query: (data) => ({
                url: '/wishlist/toggle',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Wishlist'],
        }),
        subscribeNewsletter: builder.mutation<any, { email: string }>({
            query: (data) => ({
                url: '/newsletter/subscribe',
                method: 'POST',
                body: data,
            }),
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
    useSendOtpMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useRegisterMutation,
    useLoginMutation,
    useTrackOrderQuery,
    useLazyTrackOrderQuery,
    useGetProductReviewsQuery,
    useSubmitReviewMutation,
    useToggleLikeReviewMutation,
    useGetMyReviewsQuery,
    useSubmitSiteReviewMutation,
    useGetActiveFlashSaleQuery,
    useGetSiteReviewsQuery,
    useGetHomeContentQuery,
    useGetAboutInfoQuery,
    useVerifyPersonalPicturePasswordMutation,
    useVerifyBulkPersonalPicturesPasswordMutation,
    useGetTicketsQuery,
    useCreateTicketMutation,
    useGetTicketDetailsQuery,
    useSubmitTicketReplyMutation,
    useGetProfileStatsQuery,
    useUpdateProfileMutation,
    useUpdateProfilePhotoMutation,
    useChangePasswordMutation,
    useUpdatePreferencesMutation,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useGetWishlistQuery,
    useToggleWishlistMutation,
    useSubscribeNewsletterMutation,
} = frontendApi;
