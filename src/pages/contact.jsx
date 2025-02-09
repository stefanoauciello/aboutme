import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Contact = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-300">Contact</h2>
      <p className="text-gray-300 mt-6 flex items-center justify-center space-x-4 text-lg">
        <FaEnvelope />
        <span>auciellostefano1@gmail.com</span>
      </p>
      <p className="text-gray-300 mt-4 flex items-center justify-center space-x-4 text-lg">
        <FaMapMarkerAlt />
        <span>Peschiera Borromeo (MI), Italy</span>
      </p>
      <p className="text-gray-300 mt-4 flex items-center justify-center space-x-4 text-lg">
        <FaLinkedin />
        <a
          href="https://www.linkedin.com/in/stefano-auciello"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-400"
        >
          @stefano-auciello
        </a>
      </p>
    </motion.section>
  );
};

export default Contact;