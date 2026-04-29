"use client";

/**
 * Send Facebook Pixel events to both Browser and Server (CAPI)
 */
export const trackPixelEvent = async (
    eventName: string,
    data: Record<string, any> = {},
    userData: Record<string, any> = {}
) => {
    // Generate a unique Event ID for deduplication between Browser and CAPI
    const event_id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 1. Browser Event (If fbq is available)
    if (typeof window !== "undefined" && (window as any).fbq) {
        // Facebook requires the eventID as the 4th parameter for deduplication
        (window as any).fbq("track", eventName, data, { eventID: event_id });
    }

    // 2. Server Event (CAPI via our backend)
    try {
        const response = await fetch(`${'https://alinggon-ap.rangpurit.com'}/api/pixel/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                event_name: eventName,
                event_id: event_id, // Pass the same ID to the server
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
