import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

/**
 * ScrollToTopButton appears when the user scrolls down,
 * displaying a sleek circular SVG progress ring of the current scroll percentage
 * with smooth hover and click animations.
 */
export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollHeight > 0) {
                setScrollPercentage(Math.min(1, Math.max(0, currentScroll / scrollHeight)));
            }

            if (currentScroll > 280) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - scrollPercentage * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-slate-900/5 dark:shadow-black/20 text-slate-700 dark:text-slate-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    initial={{ opacity: 0, scale: 0.6, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 15 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* SVG circular progress ring */}
                    <svg className="w-10 h-10 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
                        {/* Background track */}
                        <circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            className="stroke-slate-200 dark:stroke-slate-800"
                            strokeWidth="2.5"
                        />
                        {/* Animated progress stroke */}
                        <circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            className="stroke-primary-500 dark:stroke-primary-400 transition-all duration-100 ease-out"
                            strokeWidth="2.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Centered Arrow Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaArrowUp
                            size={13}
                            className="text-primary-600 dark:text-primary-400 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
