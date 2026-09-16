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
    const [hoveredPath, setHoveredPath] = useState(null);
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
                        id="mobile-navigation"
                        key="drawer"
                        className="fixed inset-y-0 left-0 z-[130] w-[80vw] sm:w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between shadow-2xl"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <Link
                                    to="/"
                                    onClick={() => setOpen(false)}
                                    className="text-2xl font-display font-extrabold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent"
                                >
                                    SA
                                </Link>
                                <motion.button
                                    aria-label="Close navigation"
                                    onClick={() => setOpen(false)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <FaTimes size={18} />
                                </motion.button>
                            </div>

                            <ul className="space-y-2">
                                {navLinks.map((l, idx) => (
                                    <motion.li
                                        key={l.to}
                                        initial={{ opacity: 0, x: -25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.05 + idx * 0.04,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                        }}
                                    >
                                        <NavLink
                                            to={l.to}
                                            end={l.to === "/"}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                `group flex items-center justify-between rounded-xl px-4 py-3 font-medium transition-all duration-200 ${isActive
                                                    ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold shadow-sm"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                }`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <span className="flex items-center gap-2.5">
                                                        {isActive && (
                                                            <motion.span
                                                                layoutId="activeMobileIndicator"
                                                                className="w-1.5 h-4 rounded-full bg-gradient-to-b from-primary-500 to-secondary-500"
                                                            />
                                                        )}
                                                        <span>{l.label}</span>
                                                    </span>
                                                    <span className={`text-xs transition-transform duration-200 ${isActive ? "text-primary-500" : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`}>
                                                        →
                                                    </span>
                                                </>
                                            )}
                                        </NavLink>
                                    </motion.li>
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
                        className="text-2xl font-display font-extrabold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent inline-block"
                    >
                        <motion.span
                            className="inline-block"
                            whileHover={{ scale: 1.1, rotate: [-1, 2, -1, 0] }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 450, damping: 15 }}
                        >
                            SA
                        </motion.span>
                    </Link>

                    {/* Right side options */}
                    <div className="flex items-center space-x-3">
                        {/* Desktop Nav Links */}
                        <nav className="hidden md:block mr-2">
                            <ul
                                className="flex items-center space-x-1"
                                onMouseLeave={() => setHoveredPath(null)}
                            >
                                {navLinks.map((l) => (
                                    <li
                                        key={l.to}
                                        className="relative"
                                        onMouseEnter={() => setHoveredPath(l.to)}
                                    >
                                        <NavLink
                                            to={l.to}
                                            end={l.to === "/"}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center relative select-none"
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {/* Hover highlight pill (slides smoothly between non-active links) */}
                                                    {hoveredPath === l.to && !isActive && (
                                                        <motion.span
                                                            layoutId="hoverNavHighlight"
                                                            className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/60 rounded-full z-0 pointer-events-none"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ type: "spring", stiffness: 420, damping: 30 }}
                                                        />
                                                    )}

                                                    {/* Active link pill with glowing border & active dot */}
                                                    {isActive && (
                                                        <>
                                                            <motion.span
                                                                layoutId="activeNavBackground"
                                                                className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 rounded-full z-0 shadow-sm border border-primary-500/20 dark:border-primary-400/20"
                                                                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                                                            />
                                                            <motion.span
                                                                layoutId="activeNavDot"
                                                                className="absolute bottom-1 w-1 h-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-[0_0_6px_rgba(14,165,233,0.8)] z-10"
                                                                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                                                            />
                                                        </>
                                                    )}

                                                    <motion.span
                                                        whileTap={{ scale: 0.94 }}
                                                        className={`relative z-10 ${isActive ? "text-primary-600 dark:text-primary-400 font-semibold" : ""}`}
                                                    >
                                                        {l.label}
                                                    </motion.span>
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
                        <motion.button
                            aria-label={open ? "Close navigation" : "Open navigation"}
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                            onClick={() => setOpen((prev) => !prev)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className="md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                        >
                            <FaBars size={16} />
                        </motion.button>
                    </div>
                </div>
            </header>

            {createPortal(drawer, document.body)}
        </>
    );
}

export default Navbar;
