import {motion} from "framer-motion";
import {
    FaCloudUploadAlt,
    FaDatabase,
    FaCogs,
    FaShieldAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";
import containerVariants from "../components/utils";
import BackButton from "../components/back-button.jsx";

const technologies = [
    {
        label: "Apache Kafka",
        description: "Stream ingestion and distributed event backbone.",
    },
    {
        label: "Apache Airflow",
        description: "Orchestrates complex data workflows.",
    },
    {
        label: "Delta Lake / Snowflake",
        description: "Reliable storage layer for analytics with ACID guarantees.",
    },
    {label: "dbt", description: "SQL-based transformations inside the warehouse."},
    {
        label: "Grafana or Power BI",
        description: "Dashboards and metrics visualization for stakeholders.",
    },
];

const keyComponents = [
    {
        icon: FaCloudUploadAlt,
        title: "Data Ingestion",
        description:
            "Efficiently collect data from various sources such as APIs, databases, streaming services, and files.",
    },
    {
        icon: FaDatabase,
        title: "Data Storage",
        description:
            "Securely store structured, semi-structured, and unstructured data using scalable storage solutions.",
    },
    {
        icon: FaCogs,
        title: "Data Processing",
        description:
            "Transform, clean, and enrich data through batch and real-time processing pipelines.",
    },
    {
        icon: FaShieldAlt,
        title: "Data Governance",
        description:
            "Maintain data quality, enforce security policies, and ensure regulatory compliance.",
    },
    {
        icon: FaChartLine,
        title: "Data Access & Analytics",
        description:
            "Enable self-service analytics, dashboards, and insights for business users and data scientists.",
    },
];

const benefits = [
    "Modular and scalable architecture adaptable to any business size.",
    "Supports both real-time and batch data workflows.",
    "Centralized control over data quality, access, and compliance.",
    "Accelerates decision-making with reliable and accessible data.",
    "Improves collaboration through a shared, well-documented data catalog.",
];

const DataPlatform = () => {
    return (
        <motion.section
            className="min-h-screen
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg text-center
                 max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <BackButton fallbackTo="/devcorner" />
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Data Platform
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}data-platform.png`}
                        alt="Data Platform Diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="mt-6 text-base sm:text-lg">
                    A Data Platform is a unified infrastructure that allows organizations
                    to ingest, store, process, govern, and analyze data efficiently. It
                    forms the backbone of modern data-driven decision-making and enables
                    scalable, secure, and real-time access to information.
                </p>

                <p className="mt-4 text-base sm:text-lg">
                    Modern platforms combine streaming and batch pipelines to consolidate
                    data from microservices, IoT devices and third-party systems.
                    Connectors feed raw events into a lake or warehouse where tools like
                    Airflow and dbt apply transformations on a schedule. Metadata
                    cataloging and fine-grained access controls ensure every dataset is
                    trustworthy and easily discoverable across the organization.
                </p>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Key Components
                    </h3>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {keyComponents.map((component) => {
                            const Icon = component.icon;
                            return (
                                <li
                                    key={component.title}
                                    className="flex items-start bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm"
                                >
                                    <Icon className="text-xl text-primary-600 mr-3 mt-1" />
                                    <span>
                                        <strong>{component.title}:</strong> {component.description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
                    <ul className="space-y-2">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start">
                                <FaCheckCircle className="text-green-600 mr-2 mt-1" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Recommended Technologies
                    </h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {technologies.map((tech) => (
                            <li key={tech.label} className="flex items-start">
                                <FaDatabase className="text-primary-600 mr-2 mt-1" />
                                <span>
                                    <strong>{tech.label}</strong>: {tech.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4 bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Real-World Use Case
                    </h3>
                    <p>
                        A large retail company uses a data platform to collect real-time
                        sales data from physical stores and e-commerce systems. This data is
                        ingested via streaming and batch pipelines, stored in a data lake,
                        processed using Apache Spark, and visualized in tools like Power BI.
                        Governance policies enforce access control and data quality,
                        ensuring consistency across all business units.
                    </p>
                </div>
            </div>
        </motion.section>
    );
};

export default DataPlatform;
