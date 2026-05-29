import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import AnimatedRoutes from "./components/animated-routes.jsx";
import ScrollToTop from "./components/scroll-to-top.jsx";
import GlowBackground from "./components/glow-background.jsx";

export default function Portfolio() {
    useEffect(() => {
        // Initialize theme class from localStorage or system preference
        const saved = localStorage.getItem("theme");
        const theme = saved || "dark"; // Default to dark for premium developer feel
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen relative text-slate-800 dark:text-slate-100 transition-colors duration-300">
                {/* Immersive animated canvas backdrop */}
                <GlowBackground />

                {/* Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main className="pt-24 pb-16 min-h-screen relative z-10">
                    <AnimatedRoutes />
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm border-t border-slate-200/20 dark:border-slate-800/10 backdrop-blur-[2px] relative z-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <p>© {new Date().getFullYear()} Stefano Auciello. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
