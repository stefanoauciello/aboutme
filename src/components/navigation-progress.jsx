import { useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * NavigationProgress provides two sleek visual feedbacks:
 * 1. An ultra-smooth top glowing route loading bar that sweeps across whenever navigation occurs.
 * 2. A scroll progress bar that tracks scroll depth along the page.
 */
export default function NavigationProgress() {
    const { pathname } = useLocation();

    // Track scroll progress along the page
    const { scrollYProgress } = useScroll();
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        restDelta: 0.001,
    });

    return (
        <>
            {/* Route change glowing indicator */}
            <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none overflow-hidden">
                <motion.div
                    key={pathname}
                    className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 shadow-[0_0_12px_rgba(14,165,233,0.8),0_0_6px_rgba(139,92,246,0.6)]"
                    initial={{ x: "-100%", opacity: 1 }}
                    animate={{
                        x: ["-100%", "-20%", "0%"],
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        times: [0, 0.6, 1],
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Reading / Scroll progress indicator at the bottom edge of the sticky navbar */}
            <div className="fixed top-[60px] md:top-[68px] left-0 right-0 z-[99] h-[2px] pointer-events-none bg-transparent">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 origin-left opacity-80 shadow-[0_0_8px_rgba(14,165,233,0.6)]"
                    style={{ scaleX: smoothScrollProgress }}
                />
            </div>
        </>
    );
}
