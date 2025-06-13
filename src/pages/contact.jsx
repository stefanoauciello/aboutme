// src/pages/Contact.jsx
import {motion} from "framer-motion";
import {FaEnvelope, FaLinkedin, FaMapMarkerAlt} from "react-icons/fa";
import containerVariants from "../components/utils";

const contactInfo = [
    {
        icon: FaEnvelope,
        label: "E‑mail",
        text: "auciellostefano1@gmail.com",
        link: "mailto:auciellostefano1@gmail.com",
    },
    {
        icon: FaMapMarkerAlt,
        label: "Location",
        text: "Peschiera Borromeo (MI), Italy",
        link: "https://www.google.com/maps/search/?api=1&query=Peschiera+Borromeo+MI+Italy",
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        text: "stefano‑auciello",
        link: "https://www.linkedin.com/in/stefano-auciello",
    },
];

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {delay: i * 0.12, duration: 0.4},
    }),
};

function Contact() {
    return (
        <motion.section
            className="min-h-screen
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="flex-grow px-4 md:px-8">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Contact
                </h2>

                <motion.ul
                    className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                >
                    {contactInfo.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.li
                                key={item.text}
                                custom={idx}
                                variants={itemVariants}
                                whileHover={{scale: 1.05}}
                                className="w-full px-4 py-6 rounded-lg bg-white/70 backdrop-blur
                           shadow-md flex flex-col items-center text-center
                           transition"
                            >
                                <Icon className="text-3xl text-blue-600 mb-3" aria-hidden/>
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-blue-700 hover:text-blue-900
                               focus:outline-none focus-visible:ring-2
                               focus-visible:ring-blue-600 transition"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <span className="font-medium text-blue-700">{item.text}</span>
                                )}
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default Contact;
