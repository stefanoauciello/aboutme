import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const contactInfo = [
  { icon: FaEnvelope, text: "auciellostefano1@gmail.com" },
  { icon: FaMapMarkerAlt, text: "Peschiera Borromeo (MI), Italy" },
  {
    icon: FaLinkedin,
    text: "@stefano-auciello",
    link: "https://www.linkedin.com/in/stefano-auciello",
  },
];

const Contact = () => {
  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto overflow-y-auto h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-blue-600">Contact</h2>
        <div className="mt-6 space-y-4 text-lg">
          {contactInfo.map((item, index) => (
            <p
              key={index}
              className="text-blue-700 flex items-center justify-center space-x-4"
            >
              <item.icon className="text-blue-600" />
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
