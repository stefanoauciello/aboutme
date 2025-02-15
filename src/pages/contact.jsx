import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Contact = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-600">Contact</h2>
      <div className="mt-6 space-y-4 text-lg">
        <p className="text-blue-700 flex items-center justify-center space-x-4">
          <FaEnvelope className="text-blue-600" />
          <span>auciellostefano1@gmail.com</span>
        </p>
        <p className="text-blue-700 flex items-center justify-center space-x-4">
          <FaMapMarkerAlt className="text-blue-600" />
          <span>Peschiera Borromeo (MI), Italy</span>
        </p>
        <p className="text-blue-700 flex items-center justify-center space-x-4">
          <FaLinkedin className="text-blue-600" />
          <a
            href="https://www.linkedin.com/in/stefano-auciello"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-500"
          >
            @stefano-auciello
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default Contact;