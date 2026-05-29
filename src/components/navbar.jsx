import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import navLinks from "../config/nav-links.js";
import ThemeToggle from "./theme-toggle.jsx";

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
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const drawer = (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[120] bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer container */}
                    <motion.nav
                        key="drawer"
                        className="fixed inset-y-0 left-0 z-[130] w-[80vw] sm:w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <Link to="/" className="text-2xl font-display font-extrabold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent">
                                    SA
                                </Link>
                                <button
                                    aria-label="Close navigation"
                                    onClick={() => setOpen(false)}
                                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 cursor-pointer"
                                >
                                    <FaTimes size={18} />
                                </button>
                            </div>

                            <ul className="space-y-2">
                                {navLinks.map((l) => (
                                    <li key={l.to}>
                                        <NavLink
                                            to={l.to}
                                            end={l.to === "/"}
                                            className={({ isActive }) =>
                                                `block rounded-xl px-4 py-3 font-medium transition-all duration-200 ${isActive
                                                    ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                }`
                                            }
                                        >
                                            {l.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Appearance</span>
                            <ThemeToggle />
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled
                ? "py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-900/40 shadow-sm"
                : "py-5 bg-transparent"
                }`}>
                <div className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6">
                    <Link
                        to="/"
                        className="text-2xl font-display font-extrabold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
                    >
                        SA
                    </Link>

                    {/* Right side options */}
                    <div className="flex items-center space-x-3">
                        {/* Desktop Nav Links */}
                        <nav className="hidden md:block mr-2">
                            <ul className="flex items-center space-x-1">
                                {navLinks.map((l) => (
                                    <li key={l.to} className="relative">
                                        <NavLink
                                            to={l.to}
                                            end={l.to === "/"}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center relative"
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="activeNavBackground"
                                                            className="absolute inset-0 bg-slate-200/80 dark:bg-slate-800/80 rounded-full z-0"
                                                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                                        />
                                                    )}
                                                    <span className={`relative z-10 ${isActive ? "text-primary-600 dark:text-primary-400 font-semibold" : ""}`}>
                                                        {l.label}
                                                    </span>
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Theme switcher (Desktop/Mobile unified bar) */}
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {/* Mobile Drawer Trigger */}
                        <button
                            aria-label="Toggle navigation"
                            onClick={() => setOpen((prev) => !prev)}
                            className="md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                        >
                            <FaBars size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {createPortal(drawer, document.body)}
        </>
    );
}

export default Navbar;
