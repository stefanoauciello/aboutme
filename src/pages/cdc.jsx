import { motion } from "framer-motion";
import {
    FaFileAlt,
    FaBroadcastTower,
    FaProjectDiagram,
    FaCheckCircle,
    FaDatabase,
    FaLink,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const keyConcepts = [
    {
        icon: FaFileAlt,
        title: "Transaction Logs",
        description: "Monitor low-level operations directly from database logs, bypassing SQL query load.",
    },
    {
        icon: FaBroadcastTower,
        title: "Event Streaming",
        description: "Capture and publish events immediately using tools like Debezium or Oracle GoldenGate.",
    },
    {
        icon: FaProjectDiagram,
        title: "Downstream Processing",
        description: "Deliver events to Kafka topics so search engines, caches, or analytical warehouses react instantly.",
    },
];

const benefits = [
    "Zero-impact, real-time data synchronization across microservices.",
    "Minimized database CPU usage compared to polling with recurrent SELECT queries.",
    "Sub-second data replication latency across distributed data meshes.",
    "Immediate, event-driven cache invalidation and search index updates.",
];

const technologies = [
    {
        label: "Oracle GoldenGate",
        description: "Enterprise log-based CDC engine with multi-platform replication.",
    },
    {
        label: "Debezium",
        description: "Kafka-native open-source source connectors tracking database transaction logs.",
    },
    {
        label: "Apache Kafka",
        description: "High-throughput distributed logs acting as the messaging channel.",
    },
    {
        label: "Kafka Connect",
        description: "Framework managing source connectors and forwarding messages to topics.",
    },
    {
        label: "AWS DMS",
        description: "Managed Database Migration Service running CDC replicates to cloud storage.",
    },
    {
        label: "Apache Spark",
        description: "Engine providing real-time processing and analytical stream transformations.",
    },
];

const CDC = () => {
    return (
        <PageLayout 
            title="Change Data Capture (CDC)" 
            subtitle="Stream database modifications in real-time without polling overhead."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero Diagram Card */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}CDC.png`}
                        alt="CDC Architecture Diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Transactional Log-based Data Pipeline Architecture
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        Change Data Capture (CDC) is a design pattern that identifies and captures insertions, updates, and deletions made to database tables, streaming those changes in real-time to external targets.
                    </p>
                    <p>
                        Instead of running periodic database queries (polling) which introduce latency and degrade database performance, CDC intercepts write operations directly from the database's transaction log. By decoupling extraction from query engines, it guarantees consistent near-zero latency replication across search indexes, search caches, and microservices databases.
                    </p>
                </div>

                {/* Key Concepts Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Key Concepts
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {keyConcepts.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
                                >
                                    <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Architecture Benefits
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-450 mt-1 flex-shrink-0" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recommended Technologies */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Recommended Technologies
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {technologies.map((tech) => (
                            <div 
                                key={tech.label} 
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex items-start gap-3.5"
                            >
                                <div className="p-2 bg-secondary-500/10 text-secondary-500 dark:text-secondary-400 rounded-lg mt-0.5">
                                    <FaDatabase size={14} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                        {tech.label}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-0.5 leading-relaxed">
                                        {tech.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Practical Example */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Practical Use-Case: E-Commerce Inventory
                    </h3>
                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        An online retail service captures order logs from Oracle Database using GoldenGate. These change messages are pushed onto Apache Kafka. Separate microservices consume the topics asynchronously: the logistics application reserves warehouses, the search application updates catalog stock counts, and the analytics cluster recalculates revenue projections—all without placing a single extra query load on the transaction store.
                    </p>
                </div>

                {/* Call to action */}
                <div className="pt-6 text-center">
                    <a
                        href="https://github.com/stefanoauciello/e-commerce-cdc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary gap-2 inline-flex items-center"
                    >
                        <FaLink size={12} /> Check My Project on GitHub
                    </a>
                </div>
            </div>
        </PageLayout>
    );
};

export default CDC;
