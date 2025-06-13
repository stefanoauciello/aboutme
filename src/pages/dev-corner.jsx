// src/pages/Devcorner.jsx
import { motion } from "framer-motion";
import { FaBolt, FaDatabase, FaServer, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import containerVariants from "../components/utils";
import BackButton from "../components/back-button.jsx";

const topics = [
    {
        title: "Change Data Capture",
        description: "Capture real‑time changes in your database and stream them reliably.",
        icon: FaDatabase,
        gradient: "from-primary-500 to-primary-700",
        link: "/devcorner/cdc",
    },
    {
        title: "Event‑Driven Architecture",
        description: "Design scalable, loosely‑coupled systems with event‑based communication.",
        icon: FaBolt,
        gradient: "from-accent-400 to-accent-600",
        link: "/devcorner/event-driven-architecture",
    },
    {
        title: "Data Platform",
        description: "Build a robust infrastructure for ingesting, processing and serving data.",
        icon: FaServer,
        gradient: "from-green-500 to-green-700",
        link: "/devcorner/data-platform",
    },
    {
        title: "Database Versioning",
        description: "Version your schema safely and repeatably across multiple environments.",
        icon: FaServer,
        gradient: "from-secondary-500 to-secondary-700",
        link: "/devcorner/database-versioning",
    },
    {
        title: "User Auth vs Machine-to-Machine",
        description: "Side-by-side guide to interactive user authentication (OIDC) and service-to-service flows (Client Credentials, Token Exchange). Diagrams, code and best practices.",
        icon: FaUserShield,
        gradient: "from-red-500 to-red-700",
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

function DevCorner() {
    return (
        <motion.section
            className="px-4 py-8 md:py-12 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <BackButton />
            <div className="relative mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-md opacity-20"></div>
                <div className="relative bg-white/80 backdrop-blur-sm shadow-soft rounded-lg p-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        Dev Corner
                    </h2>
                    <p className="text-dark-600 mt-6 text-lg max-w-2xl mx-auto">
                        A space where I break down software architecture patterns, best practices and core tech concepts.
                    </p>
                </div>
            </div>

            <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
            >
                {topics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                        <motion.div key={topic.title} variants={cardVariants}>
                            <Link
                                to={topic.link}
                                className="group block h-full rounded-xl bg-white shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${topic.gradient}`}></div>
                                <div className="p-6">
                                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="text-2xl" aria-hidden />
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-dark-800 mb-2">{topic.title}</h3>
                                    <p className="text-dark-600 leading-relaxed">{topic.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="mt-12 text-center">
                <p className="text-dark-500 mb-4">Looking for more technical content?</p>
                <a 
                    href="https://github.com/stefanoauciello" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                >
                    Check My GitHub
                </a>
            </div>
        </motion.section>
    );
}

export default DevCorner;
