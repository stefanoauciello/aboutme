import React from "react";
import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const CDC = () => {
  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto overflow-y-auto h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8 text-left text-blue-700">
        <h2 className="text-4xl font-semibold text-blue-600 text-center">
          Change Data Capture
        </h2>
        <div className="my-6 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}CDC.png`}
            alt="CDC Diagram"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
          />
        </div>
        <p className="mt-6 text-lg">
          Change Data Capture (CDC) is a technique to capture real-time changes
          in a database and stream them efficiently to other systems.
        </p>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Transaction Logs:</strong> Monitor changes at the database
              level.
            </li>
            <li>
              <strong>Event Streaming:</strong> Use tools like Oracle
              GoldenGate or Debezium with Kafka to stream changes.
            </li>
            <li>
              <strong>Downstream Processing:</strong> Process changes in
              real-time for analytics or replication.
            </li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time data synchronization across systems.</li>
            <li>
              Reduced workload on databases compared to traditional polling.
            </li>
            <li>
              Improved scalability and responsiveness of data-driven
              applications.
            </li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">
            Real-World Use Case
          </h3>
          <p>
            In my professional experience, I've primarily implemented log-based
            CDC using Oracle GoldenGate. Integrated with Apache Kafka, this
            setup enabled real-time synchronization of transactional data with
            analytics services and microservices running on Kubernetes. This
            approach significantly reduced data latency and optimized our ETL
            processes.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">
            Recommended Technologies
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Oracle GoldenGate</strong>: Enterprise-grade, log-based
              CDC solution.
            </li>
            <li>
              <strong>Debezium</strong>: Open-source, log-based CDC.
            </li>
            <li>
              <strong>Apache Kafka</strong>: Streaming platform to process CDC
              streams.
            </li>
            <li>
              <strong>Kafka Connect</strong>: Integrates CDC data with Kafka.
            </li>
            <li>
              <strong>AWS DMS</strong>: Managed CDC service in the cloud.
            </li>
            <li>
              <strong>Apache Spark Structured Streaming</strong>: Advanced
              analytics on CDC data.
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default CDC;
