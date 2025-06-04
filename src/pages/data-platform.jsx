import {motion} from "framer-motion";
import containerVariants from "../components/utils";

const keyComponents = [
    {
        title: "Data Ingestion",
        description:
            "Efficiently collect data from various sources such as APIs, databases, streaming services, and files.",
    },
    {
        title: "Data Storage",
        description:
            "Securely store structured, semi-structured, and unstructured data using scalable storage solutions.",
    },
    {
        title: "Data Processing",
        description:
            "Transform, clean, and enrich data through batch and real-time processing pipelines.",
    },
    {
        title: "Data Governance",
        description:
            "Maintain data quality, enforce security policies, and ensure regulatory compliance.",
    },
    {
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
];

const DataPlatform = () => {
    return (
        <motion.section
            className="h-[100dvh] md:h-auto overflow-y-auto
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg text-center
                 max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
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

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Key Components
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                        {keyComponents.map((component, index) => (
                            <li key={index}>
                                <strong>{component.title}:</strong> {component.description}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
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
