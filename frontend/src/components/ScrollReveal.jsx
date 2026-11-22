import { motion, useReducedMotion } from "motion/react";

export default function ScrollReveal({ as = "div", delay = 0, children, ...props }) {
    const Element = motion[as];
    const reducedMotion = useReducedMotion();

    return (
        <Element
            {...props}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay, duration: 0.32, ease: "easeOut" }}
        >
            {children}
        </Element>
    );
}
