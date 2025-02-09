import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import containerVariants from "./components/utils";
import Skill from "./pages/skill"
import About from "./pages/about"
import Experience from "./pages/experience"
import Certification from "./pages/certification"
import Contact from "./pages/contact"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      <nav
        className={`absolute top-12 left-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 backdrop-blur-md w-full p-4 md:static md:flex md:justify-center md:space-x-8 md:p-0 transition-all ${
          isOpen ? "block" : "hidden"
        } md:block rounded-lg shadow-md`}
      >
        <Link
          to="/about"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          About
        </Link>
        <Link
          to="/experience"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Experience
        </Link>
        <Link
          to="/certification"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Certification
        </Link>
        <Link
          to="/skill"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Skills
        </Link>
        <Link
          to="/contact"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}

function Home() {
  return (
    <motion.div
      className="max-w-5xl w-full bg-gradient-to-r from-blue-800 via-gray-900 to-blue-800 shadow-xl rounded-2xl p-12 text-white text-center space-y-8"
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
          <h1 className="text-6xl font-extrabold text-blue-300">
            Stefano Auciello
          </h1>
          <p className="text-xl text-gray-300">Senior Software Engineer</p>
        </div>
      </div>
      <Navbar />
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center space-y-12 p-6">
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
