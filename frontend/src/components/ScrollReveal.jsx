import { useEffect, useRef } from "react";

export default function ScrollReveal({ as: Element = "div", delay = 0, className = "", children, ...props }) {
    const reveal = useRef(null);

    useEffect(() => {
        const element = reveal.current;
        if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (element.getBoundingClientRect().top < window.innerHeight) return;

        element.dataset.reveal = "pending";
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            element.dataset.reveal = "entered";
            observer.disconnect();
        });
        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <Element
            {...props}
            ref={reveal}
            className={`scroll-reveal ${className}`}
            style={delay ? { "--scroll-delay": `${delay}s` } : undefined}
        >
            {children}
        </Element>
    );
}
