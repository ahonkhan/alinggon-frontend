import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
        // The Echo class now requires a type argument (usually 'any' or 'pusher')
        Echo: Echo<any>;
    }
}

/**
 * Initializes Laravel Echo for the client-side.
 * Since Next.js runs on both server and client, we must check for 'window'.
 */
export const initEcho = (token: string | null): Echo<any> | undefined => {
    if (typeof window !== 'undefined') {
        if (!window.Echo) {
            window.Pusher = Pusher;

            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
                forceTLS: true,
                authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                        Accept: 'application/json',
                    },
                },
            });
        }
        return window.Echo;
    }
    
    return undefined;
};