// src/pages/Devcorner.jsx
import { motion } from "framer-motion";
import { FaBolt, FaDatabase, FaServer, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import containerVariants from "../components/utils";

const topics = [
    {
        title: "Change Data Capture",
        description: "Capture real‑time changes in your database and stream them reliably.",
        icon: FaDatabase,
        color: "text-blue-500",
        link: "/devcorner/cdc",
    },
    {
        title: "Event‑Driven Architecture",
        description: "Design scalable, loosely‑coupled systems with event‑based communication.",
        icon: FaBolt,
        color: "text-yellow-500",
        link: "/devcorner/event-driven-architecture",
    },
    {
        title: "Data Platform",
        description: "Build a robust infrastructure for ingesting, processing and serving data.",
        icon: FaServer,
        color: "text-green-500",
        link: "/devcorner/data-platform",
    },
    {
        title: "Database Versioning",
        description: "Version your schema safely and repeatably across multiple environments.",
        icon: FaServer,
        color: "text-indigo-600",
        link: "/devcorner/database-versioning",
    },
    {
        title: "User Auth vs Machine-to-Machine",
        description: "Side-by-side guide to interactive user authentication (OIDC) and service-to-service flows (Client Credentials, Token Exchange). Diagrams, code and best practices.",
        icon: FaUserShield,
        color: "text-red-500",
        link: "/devcorner/auth",
    },
];

const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Devcorner() {
    return (
        <motion.section
            className="h-[100dvh] md:h-auto overflow-y-auto p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">Dev Corner</h2>
                <p className="text-blue-700 mt-6 text-lg text-center">
                    A space where I break down software architecture patterns, best practices and core tech concepts.
                </p>

                <motion.ul
                    className="mt-10 grid gap-6 sm:grid-cols-2"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {topics.map((topic) => {
                        const Icon = topic.icon;
                        return (
                            <motion.li key={topic.title} variants={cardVariants}>
                                <Link
                                    to={topic.link}
                                    className="group block h-full px-6 py-8 rounded-lg bg-white/70 backdrop-blur shadow-md transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                >
                                    <Icon
                                        className={`${topic.color} text-4xl mx-auto mb-4 transition group-hover:scale-110`}
                                        aria-hidden
                                    />
                                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{topic.title}</h3>
                                    <p className="text-sm text-blue-800 leading-relaxed">{topic.description}</p>
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default Devcorner;
