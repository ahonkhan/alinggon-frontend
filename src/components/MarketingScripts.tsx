"use client";

import { useGetHomeContentQuery } from "@/store/api/frontendApi";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPixelEvent } from "@/utils/pixel";

export default function MarketingScripts() {
    const { data: homeContent } = useGetHomeContentQuery();
    const marketing = homeContent?.data?.marketing;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Track PageView on route change
    useEffect(() => {
        if (!mounted) return;
        trackPixelEvent("PageView");
    }, [pathname, searchParams, mounted]);

    useEffect(() => {
        if (!mounted || !marketing) return;

        // --- 1. Facebook Pixel Initialization ---
        if (marketing.facebook_pixel_id) {
            const fbId = marketing.facebook_pixel_id;
            
            if (!(window as any).fbq) {
                // Standard Facebook Pixel Snippet
                (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    if (s && s.parentNode) {
                        s.parentNode.insertBefore(t, s);
                    } else {
                        b.head.appendChild(t);
                    }
                })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                
                (window as any).fbq('init', fbId);
                // Initial PageView
                (window as any).fbq('track', 'PageView');
            }
        }

        const injectScript = (html: string, target: HTMLElement) => {
            if (!html) return;
            const container = document.createElement('div');
            container.innerHTML = html;

            // Move non-script elements (like meta tags)
            const otherNodes = Array.from(container.childNodes).filter(node => node.nodeName !== 'SCRIPT');
            otherNodes.forEach(node => {
                target.appendChild(node);
            });

            // Handle script tags separately to ensure execution
            const scripts = container.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const oldScript = scripts[i];
                const newScript = document.createElement('script');

                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }

                target.appendChild(newScript);
            }
        };

        // Inject Other Marketing Scripts
        if (marketing.meta_domain_verification) injectScript(marketing.meta_domain_verification, document.head);
        if (marketing.gtm_head) injectScript(marketing.gtm_head, document.head);
        if (marketing.analytics_code) injectScript(marketing.analytics_code, document.head);
        if (marketing.custom_head_script) injectScript(marketing.custom_head_script, document.head);

        // Inject GTM Body (at the start of body)
        if (marketing.gtm_body) {
            const container = document.createElement('div');
            container.innerHTML = marketing.gtm_body;
            if (document.body.firstChild) {
                document.body.insertBefore(container.firstChild!, document.body.firstChild);
            } else {
                document.body.appendChild(container.firstChild!);
            }
        }

        // Inject Footer Scripts
        if (marketing.custom_footer_script) injectScript(marketing.custom_footer_script, document.body);
        if (marketing.cookie_consent_script) injectScript(marketing.cookie_consent_script, document.body);

    }, [marketing, mounted]);

    return null;
}
