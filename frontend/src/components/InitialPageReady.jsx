import { useContext, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../Context/Context";
import { finishStartupRequests, waitForPageData } from "../api/axios";

// Mount inside Suspense so the initial route has committed before checking its assets.
export default function InitialPageReady() {
    const { authLoading, setInitialLoading } = useContext(Context);
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        if (authLoading) return;
        const controller = new AbortController();
        let frame;

        async function checkPage() {
            await waitForPageData();
            if (controller.signal.aborted) return;

            // Give the route a paint to display its data and start its fonts and images.
            frame = requestAnimationFrame(async () => {
                const images = Array.from(document.images).filter(image => {
                    if (image.loading !== "lazy") return true;
                    const bounds = image.getBoundingClientRect();
                    return bounds.height > 0 && bounds.top < innerHeight && bounds.bottom > 0;
                });
                await Promise.allSettled([document.fonts?.ready, ...images.map(image => image.decode())]);
                await waitForPageData();
                if (controller.signal.aborted) return;
                finishStartupRequests();
                setInitialLoading(false);
            });
        }

        // Page components can start their requests in effects after this layout effect.
        const start = () => { frame = requestAnimationFrame(checkPage); };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true, signal: controller.signal });

        return () => {
            controller.abort();
            cancelAnimationFrame(frame);
        };
    }, [authLoading, pathname, setInitialLoading]);

    return null;
}
