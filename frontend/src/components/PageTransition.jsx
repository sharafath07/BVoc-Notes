import { useState } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { navigationDirection } from "./navigationLinks";

const slide = { duration: 0.28, ease: [0.22, 0.75, 0.28, 1] };
const positions = {
    enter: direction => ({ x: `${direction * 100}%` }),
    center: { x: 0 },
    exit: direction => ({ x: `${direction * -100}%`, transition: direction ? slide : { duration: 0 } }),
};

function SlidingPage({ direction, className, children }) {
    const present = useIsPresent();
    return (
        <motion.div
            className={className}
            style={present ? undefined : { position: "absolute", inset: 0, overflow: "hidden" }}
            inert={!present}
            custom={direction}
            variants={positions}
            initial="enter"
            animate="center"
            exit="exit"
            transition={direction ? slide : { duration: 0 }}
        >
            {children}
        </motion.div>
    );
}

export default function PageTransition({ pathname, className, children }) {
    const reducedMotion = useReducedMotion();
    const [navigation, setNavigation] = useState({ pathname, direction: 0, group: 0 });
    if (navigation.pathname !== pathname) {
        const direction = reducedMotion ? 0 : navigationDirection(navigation.pathname, pathname);
        // Unmount the previous route immediately for redirects and unanimated navigation.
        setNavigation({ pathname, direction, group: direction ? navigation.group : navigation.group + 1 });
    }
    const direction = reducedMotion ? 0 : navigation.direction;
    return (
        <div id="route-content" tabIndex={-1} className="department-route relative overflow-x-clip">
            <AnimatePresence key={navigation.group} initial={false} custom={direction}>
                <SlidingPage key={pathname} direction={direction} className={className}>
                    {children}
                </SlidingPage>
            </AnimatePresence>
        </div>
    );
}
