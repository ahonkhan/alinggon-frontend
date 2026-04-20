"use client";

import { useGetHomeContentQuery } from "@/store/api/frontendApi";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPixelEvent } from "@/utils/pixel";

export default function MarketingScripts() {
    const { data: homeContent } = useGetHomeContentQuery();
    const marketing = homeContent?.data?.marketing;
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Track PageView on route change
    useEffect(() => {
        trackPixelEvent("PageView");
    }, [pathname, searchParams]);

    useEffect(() => {
        if (!marketing) return;

        const injectScript = (html: string, target: HTMLElement) => {
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

        // Inject Head Scripts
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

    }, [marketing]);

    return null;
}
