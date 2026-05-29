import { motion } from "framer-motion";
import {
    FaCloudUploadAlt,
    FaDatabase,
    FaCogs,
    FaShieldAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const keyComponents = [
    {
        icon: FaCloudUploadAlt,
        title: "Data Ingestion",
        description: "Efficiently collect streams and logs from various sources such as APIs, operational databases, IoT networks, and third-party files.",
    },
    {
        icon: FaDatabase,
        title: "Data Storage",
        description: "Securely store structured, semi-structured, and raw unstructured files using highly elastic and searchable data lakehouses.",
    },
    {
        icon: FaCogs,
        title: "Data Processing",
        description: "Clean, transform, and enrich datasets dynamically using batch schedules and real-time processing frameworks.",
    },
    {
        icon: FaShieldAlt,
        title: "Data Governance",
        description: "Manage granular access rules, monitor data lineage, maintain data catalogs, and ensure compliance with regulatory standards.",
    },
    {
        icon: FaChartLine,
        title: "Analytics & Access",
        description: "Expose clean query structures, BI dashboards, and metrics reporting to help teams query insights autonomously.",
    },
];

const benefits = [
    "Unifies disconnected datasets into a single source of truth.",
    "Supports concurrent real-time streaming and high-volume batch processing.",
    "Centralizes compliance auditing, access controls, and encryption keys.",
    "Enables self-service reporting, accelerating business intelligence outputs.",
];

const technologies = [
    {
        label: "Apache Kafka",
        description: "Stream ingestion and distributed event backbone.",
    },
    {
        label: "Apache Airflow",
        description: "DAG-based execution model to orchestrate complex data workflows.",
    },
    {
        label: "Delta Lake / Snowflake",
        description: "Unified analytical warehouse layers supporting ACID compliance and time-travel.",
    },
    {
        label: "dbt (data build tool)",
        description: "Applies modular transformation modeling on top of data warehouses.",
    },
    {
        label: "Grafana / Power BI",
        description: "Visualizes analytical reports, system metrics, and business dashboards.",
    },
];

const DataPlatform = () => {
    return (
        <PageLayout 
            title="Data Platform Architecture" 
            subtitle="Consolidate ingestion, warehouse storage, transformations, and governance."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Diagram Section */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}data-platform.png`}
                        alt="Data Platform Architecture Diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Unified Data Lakehouse & Streaming Pipeline Blueprint
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        A modern Data Platform acts as a unified central repository and execution suite. It enables organizations to aggregate operational transactional databases, logs, and telemetry into clean, structured tables for querying.
                    </p>
                    <p>
                        By combining high-speed streaming ingestion (for near-instant analytics) with batch pipelines (for high-volume historical aggregations), the platform consolidates data silos. It handles transformations, manages schema drift, and applies fine-grained security filters to provide teams with consistent, trustworthy data.
                    </p>
                </div>

                {/* Key Components Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Pillars
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {keyComponents.map((component) => {
                            const Icon = component.icon;
                            return (
                                <motion.div
                                    key={component.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
                                >
                                    <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {component.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                                            {component.description}
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
                        Platform Benefits
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
                        Ecosystem Technologies
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

                {/* Real-World Use Case */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Real-World Application: Omni-channel Retail
                    </h3>
                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        A multinational retail brand collects streaming stock movements from local POS cash registers alongside online purchase logs. Ingested events flow into Delta Lake. Apache Airflow schedules daily dbt models to sanitize email registers, calculate regional profitability trends, and compute stock forecasts. This curated warehouse layer directly drives inventory ordering apps and executive metrics dashboards.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default DataPlatform;
