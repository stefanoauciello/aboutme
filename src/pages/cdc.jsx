import React from "react";
import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const CDC = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-600">Change Data Capture</h2>
      <p className="text-blue-700 mt-6 text-lg">
        Change Data Capture (CDC) is a technique to capture real-time changes in a database and stream them efficiently to other systems.
      </p>

      <div className="mt-8 text-left text-blue-700 space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Transaction Logs:</strong> Monitor changes at the database level.</li>
          <li><strong>Event Streaming:</strong> Use tools like Kafka or Debezium to stream changes.</li>
          <li><strong>Downstream Processing:</strong> Process changes in real-time for analytics or replication.</li>
        </ul>
      </div>

      <div className="mt-8 text-left text-blue-700 space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time data synchronization across systems.</li>
          <li>Reduced workload on databases compared to traditional polling.</li>
          <li>Improved scalability and responsiveness of data-driven applications.</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default CDC;
