import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const DataPlatform = () => {
  return (
      <motion.section
        className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BackButton />
        <h2 className="text-4xl font-semibold text-blue-600">Data Platform</h2>
        <p className="text-blue-700 mt-6 text-lg">
          A Data Platform provides a scalable, efficient, and reliable foundation for data storage, processing, and analytics, enabling organizations to harness the power of their data.
        </p>

        <div className="mt-8 text-left text-blue-700 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Key Components</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Data Ingestion:</strong> Collect data from various sources efficiently.</li>
            <li><strong>Data Storage:</strong> Store structured and unstructured data securely.</li>
            <li><strong>Data Processing:</strong> Transform and analyze data in batch or real-time.</li>
            <li><strong>Data Governance:</strong> Ensure security, compliance, and data quality.</li>
          </ul>
        </div>

        <div className="mt-8 text-left text-blue-700 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Scalable and flexible architecture.</li>
            <li>Real-time and batch data processing.</li>
            <li>Enhanced data security and governance.</li>
          </ul>
        </div>
      </motion.section>
    );
};

export default DataPlatform;
