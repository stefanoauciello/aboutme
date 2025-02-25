import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const keyComponents = [
  {
    title: "Data Ingestion",
    description: "Collect data from various sources efficiently.",
  },
  {
    title: "Data Storage",
    description: "Store structured and unstructured data securely.",
  },
  {
    title: "Data Processing",
    description: "Transform and analyze data in batch or real-time.",
  },
  {
    title: "Data Governance",
    description: "Ensure security, compliance, and data quality.",
  },
];

const benefits = [
  "Scalable and flexible architecture.",
  "Real-time and batch data processing.",
  "Enhanced data security and governance.",
];

const DataPlatform = () => {
  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto overflow-y-auto h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-blue-600">Data Platform</h2>
        <p className="text-blue-700 mt-6 text-lg">
          A Data Platform provides a scalable, efficient, and reliable
          foundation for data storage, processing, and analytics, enabling
          organizations to harness the power of their data.
        </p>

        <div className="mt-8 text-left text-blue-700 space-y-4">
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

        <div className="mt-8 text-left text-blue-700 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
          <ul className="list-disc list-inside space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default DataPlatform;
