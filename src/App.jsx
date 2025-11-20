
import { HashRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import AnimatedRoutes from "./components/animated-routes.jsx";
import ScrollToTop from "./components/scroll-to-top.jsx";

export default function Portfolio() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50 to-secondary-50">
                <Navbar />
                <main className="pt-16 sm:pt-24 min-h-screen relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-primary-300/20 to-transparent"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-radial from-secondary-300/20 to-transparent"></div>
                        <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full bg-gradient-radial from-accent-300/20 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <AnimatedRoutes />
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-dark-500 text-sm">
                    <div className="max-w-7xl mx-auto px-4">
                        <p>© {new Date().getFullYear()} Stefano Auciello. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
