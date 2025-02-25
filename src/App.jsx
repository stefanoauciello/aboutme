import React, { useState, useEffect } from "react";
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
import Devcorner from "./pages/devcorner";
import CDC from "./pages/cdc";
import EventDrivenArchitecture from "./pages/event-driven-architecture";
import DataPlatform from "./pages/data-platform";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <button
        className="text-blue-700 text-2xl md:hidden focus:outline-none p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav
        className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-blue-100 to-white shadow-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:static md:h-auto md:translate-x-0 md:flex md:justify-center md:space-x-8 p-6 md:p-0 z-50 rounded-lg`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto text-center">
          {[
            { path: "/about", label: "About" },
            { path: "/experience", label: "Experience" },
            { path: "/certification", label: "Certification" },
            { path: "/skill", label: "Skills" },
            { path: "/contact", label: "Contact" },
            { path: "/devcorner", label: "Dev Corner" }
          ].map((item) => (
            <li key={item.path} className="py-4 md:py-0">
              <Link to={item.path} className="block text-blue-700 font-semibold hover:text-blue-900 transition px-6 py-3 md:px-4 md:py-2 rounded-lg hover:bg-blue-200 shadow-md md:shadow-none">
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
          <Route path="/devcorner" element={<Devcorner />} />
          <Route path="/devcorner/cdc" element={<CDC />} />
          <Route path="/devcorner/event-driven-architecture" element={<EventDrivenArchitecture />} />
          <Route path="/devcorner/data-platform" element={<DataPlatform />} />
        </Routes>
      </div>
    </Router>
  );
}
