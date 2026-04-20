"use client";

/**
 * Send Facebook Pixel events to both Browser and Server (CAPI)
 */
export const trackPixelEvent = async (
    eventName: string,
    data: Record<string, any> = {},
    userData: Record<string, any> = {}
) => {
    // 1. Browser Event (If fbq is available)
    if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", eventName, data);
    }

    // 2. Server Event (CAPI via our backend)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alinggon-admin.rangpurit.com'}/api/pixel/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                event_name: eventName,
                data: {
                    ...data,
                    source_url: typeof window !== "undefined" ? window.location.href : "",
                },
                user_data: {
                    ...userData,
                    client_ip_address: "", // Backend will capture IP
                    client_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                    fbc: getCookies("_fbc"),
                    fbp: getCookies("_fbp"),
                },
            }),
        });

        if (!response.ok) {
            console.error("Pixel CAPI Tracking Error:", await response.text());
        }
    } catch (error) {
        console.error("Pixel Tracking fetch error:", error);
    }
};

/**
 * Simple cookie helper
 */
function getCookies(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
}
