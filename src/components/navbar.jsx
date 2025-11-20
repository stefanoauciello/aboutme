import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import navLinks from "../config/nav-links.js";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => setOpen(false), 0);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    useEffect(() => {
        document.documentElement.classList.toggle("overflow-hidden", open);
        document.body.classList.toggle("overflow-hidden", open);
    }, [open]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const drawer = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[120] bg-dark-900/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.nav
                        key="drawer"
                        className="fixed inset-y-0 left-0 z-[130] w-[80vw] sm:w-64 bg-gradient-to-b from-primary-50 via-white to-secondary-50 shadow-card p-8 overflow-y-auto"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <Link to="/" className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                SA
                            </Link>
                            <button
                                aria-label="Close navigation"
                                onClick={() => setOpen(false)}
                                className="text-dark-500 hover:text-dark-700 p-2"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <ul className="space-y-3">
                            {navLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        end={l.to === "/"}
                                        className={({ isActive }) =>
                                            `block rounded-lg px-4 py-3 font-medium transition-all duration-200 ${isActive
                                                ? "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 font-semibold"
                                                : "text-dark-700 hover:bg-dark-100/50"
                                            }`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled
                ? "py-2 bg-white/80 backdrop-blur-md shadow-soft"
                : "py-4 bg-transparent"
                }`}>
                <div className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6">
                    <Link
                        to="/"
                        className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                    >
                        SA
                    </Link>

                    <button
                        aria-label="Toggle navigation"
                        onClick={() => setOpen((prev) => !prev)}
                        className="md:hidden p-2 rounded-full bg-white/80 shadow-soft text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        <FaBars />
                    </button>

                    <nav className="hidden md:block">
                        <ul className="flex space-x-1 lg:space-x-2">
                            {navLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        end={l.to === "/"}
                                        className={({ isActive }) =>
                                            `px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${isActive
                                                ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-soft"
                                                : "text-dark-700 hover:bg-white/80 hover:shadow-soft"
                                            }`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {createPortal(drawer, document.body)}
        </>
    );
}

export default Navbar;
