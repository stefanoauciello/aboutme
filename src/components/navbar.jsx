import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import navLinks from "../config/nav-links.js";

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => setOpen(false), [location.pathname]);

    useEffect(() => {
        document.documentElement.classList.toggle("overflow-hidden", open);
        document.body.classList.toggle("overflow-hidden", open);
    }, [open]);

    const drawer = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    />

                    <motion.nav
                        key="drawer"
                        className="fixed inset-y-0 left-0 z-[130] w-[80vw] sm:w-64 bg-gradient-to-b from-blue-100 to-white shadow-xl p-8 overflow-y-auto"
                        initial={{x: "-100%"}}
                        animate={{x: 0}}
                        exit={{x: "-100%"}}
                        transition={{type: "tween", duration: 0.3}}
                    >
                        <ul className="space-y-6">
                            {navLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        end={l.to === "/"}
                                        className={({isActive}) =>
                                            `block rounded-lg px-4 py-2 font-semibold ${
                                                isActive
                                                    ? "bg-blue-200 text-blue-900"
                                                    : "text-blue-700 hover:bg-blue-100"
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
            <header className="fixed top-0 left-0 w-full z-[100] box-border backdrop-blur-sm bg-white/70">
                <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3 md:px-6">
                    <Link to="/" className="text-xl font-bold text-blue-700">
                        SA
                    </Link>

                    <button
                        aria-label="Toggle navigation"
                        onClick={() => setOpen((prev) => !prev)}
                        className="md:hidden text-blue-700 text-2xl"
                    >
                        {open ? <FaTimes/> : <FaBars/>}
                    </button>

                    <nav className="hidden md:block">
                        <ul className="flex space-x-4 lg:space-x-6">
                            {navLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        end={l.to === "/"}
                                        className={({isActive}) =>
                                            `px-3 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                                                isActive
                                                    ? "bg-blue-200 text-blue-900"
                                                    : "text-blue-700 hover:bg-blue-100"
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