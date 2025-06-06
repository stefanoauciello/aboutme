import {motion} from "framer-motion";
import {
    FaFileAlt,
    FaBroadcastTower,
    FaProjectDiagram,
    FaCheckCircle,
    FaDatabase,
} from "react-icons/fa";
import containerVariants from "../components/utils";

const keyConcepts = [
    {
        icon: FaFileAlt,
        title: "Transaction Logs",
        description:
            "Monitor low-level operations directly from database logs.",
    },
    {
        icon: FaBroadcastTower,
        title: "Event Streaming",
        description:
            "Stream detected changes using tools like Debezium or GoldenGate.",
    },
    {
        icon: FaProjectDiagram,
        title: "Downstream Processing",
        description:
            "Real-time reactions to changes for analytics, replication or alerting.",
    },
];

const benefits = [
    "Real-time data synchronization across multiple systems.",
    "Minimized impact on source databases compared to polling.",
    "Improved responsiveness and scalability of data pipelines.",
];

const technologies = [
    {
        label: "Oracle GoldenGate",
        description: "Enterprise-grade, log-based CDC solution.",
    },
    {label: "Debezium", description: "Open-source, Kafka-native CDC engine."},
    {
        label: "Apache Kafka",
        description: "Distributed event streaming platform.",
    },
    {
        label: "Kafka Connect",
        description: "Integrates CDC sources with Kafka topics.",
    },
    {label: "AWS DMS", description: "Managed service supporting CDC in AWS environments."},
    {
        label: "Apache Spark Structured Streaming",
        description: "Real-time analytics and transformation of CDC streams.",
    },
];

const CDC = () => {
    return (
        <motion.section
            className="h-[100dvh] md:h-auto overflow-y-auto p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Change Data Capture (CDC)
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}CDC.png`}
                        alt="CDC Diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="text-base sm:text-lg">
                    Change Data Capture (CDC) is a data integration pattern that
                    identifies and captures changes made to data in real time, and streams
                    those changes to other systems for immediate action or analysis.
                </p>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {keyConcepts.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.title}
                                    className="flex items-start bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm"
                                >
                                    <Icon className="text-xl text-primary-600 mr-3 mt-1" />
                                    <span>
                                        <strong>{item.title}:</strong> {item.description}
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

                <div className="mt-8 space-y-4 bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Real-World Use Case
                    </h3>
                    <p>
                        In my professional experience, I've implemented log-based CDC using{" "}
                        <strong>Oracle GoldenGate</strong> to extract changes from
                        transactional systems. These changes were streamed to{" "}
                        <strong>Apache Kafka</strong> topics, enabling downstream consumers
                        such as analytics services and microservices on{" "}
                        <strong>Kubernetes</strong> to react in near real-time. This
                        significantly reduced latency and modernized our ETL pipeline.
                    </p>
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
            </div>
        </motion.section>
    );
};

export default CDC;
