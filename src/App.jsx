import React, {useEffect, useState} from "react";
import {HashRouter as Router, Link, NavLink, Route, Routes, useLocation,} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {FaBars, FaTimes} from "react-icons/fa";
import {createPortal} from "react-dom";

import containerVariants from "./components/utils";

import About from "./pages/about";
import Experience from "./pages/experience";
import Certification from "./pages/certification";
import Skill from "./pages/skill";
import Contact from "./pages/contact";
import Devcorner from "./pages/devcorner";
import CDC from "./pages/cdc";
import EventDrivenArchitecture from "./pages/event-driven-architecture";
import DataPlatform from "./pages/data-platform";
import DatabaseVersioning from "./pages/database-versioning";
import Auth from "./pages/auth";

const navLinks = [
    {to: "/", label: "Home"},
    {to: "/about", label: "About"},
    {to: "/experience", label: "Experience"},
    {to: "/certification", label: "Certification"},
    {to: "/skill", label: "Skills"},
    {to: "/contact", label: "Contact"},
    {to: "/devcorner", label: "Dev Corner"},
];

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

function Home() {
    const photo = `${import.meta.env.BASE_URL}profile.jpg`;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <div className="sm:hidden w-full min-h-[100dvh] flex flex-col">
                <img
                    src={photo}
                    alt="Stefano Auciello"
                    className="w-full h-2/3 object-cover"
                />
                <div className="flex-1 flex flex-col justify-center items-center bg-blue-50">
                    <h1 className="text-4xl font-extrabold text-blue-600">
                        Stefano Auciello
                    </h1>
                    <p className="text-lg text-blue-600">Senior Software Engineer</p>
                </div>
            </div>
            <div className="hidden sm:block">
                <div
                    className="mx-auto sm:max-w-2xl lg:max-w-4xl bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-xl rounded-2xl px-8 py-10 lg:p-12 text-blue-900 text-center space-y-6">
                    <img
                        src={photo}
                        alt="Stefano Auciello"
                        className="w-40 lg:w-60 h-auto border-4 border-blue-300 shadow-lg rounded-lg mx-auto"
                    />
                    <div className="space-y-2">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-600">
                            Stefano Auciello
                        </h1>
                        <p className="text-xl text-blue-600">Senior Software Engineer</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/experience" element={<Experience/>}/>
                <Route path="/certification" element={<Certification/>}/>
                <Route path="/skill" element={<Skill/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/devcorner" element={<Devcorner/>}/>
                <Route path="/devcorner/cdc" element={<CDC/>}/>
                <Route path="/devcorner/event-driven-architecture" element={<EventDrivenArchitecture/>}/>
                <Route path="/devcorner/data-platform" element={<DataPlatform/>}/>
                <Route path="/devcorner/database-versioning" element={<DatabaseVersioning/>}/>
                <Route path="/devcorner/auth" element={<Auth/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default function Portfolio() {
    return (
        <Router>
            <Navbar/>
            <main className="pt-16 sm:pt-24 min-h-screen bg-blue-100">
                <AnimatedRoutes/>
            </main>
        </Router>
    );
}
