import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import containerVariants from "./components/utils";
import Skill from "./pages/skill";
import About from "./pages/about";
import Experience from "./pages/experience";
import Certification from "./pages/certification";
import Contact from "./pages/contact";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        className="text-blue-700 text-2xl md:hidden focus:outline-none p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav
        className={`absolute top-14 left-0 bg-white shadow-lg w-full p-4 md:static md:flex md:justify-center md:space-x-8 md:p-0 transition-all ${
          isOpen ? "block" : "hidden"
        } md:flex rounded-lg`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto text-center">
          {[
            { path: "/about", label: "About" },
            { path: "/experience", label: "Experience" },
            { path: "/certification", label: "Certification" },
            { path: "/skill", label: "Skills" },
            { path: "/contact", label: "Contact" }
          ].map((item) => (
            <li key={item.path} className="py-2 md:py-0">
              <Link to={item.path} className="block text-blue-600 hover:text-blue-900 transition px-4 py-2 rounded-md hover:bg-blue-100">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Home() {
  return (
    <motion.div
      className="max-w-5xl w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-xl rounded-2xl p-12 text-blue-900 text-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center space-y-6">
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt="Stefano Auciello"
          className="w-60 h-auto border-4 border-blue-300 shadow-lg rounded-lg"
        />
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-blue-600">Stefano Auciello</h1>
          <p className="text-xl text-blue-600">Senior Software Engineer</p>
        </div>
      </div>
      <Navbar />
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center space-y-12 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
