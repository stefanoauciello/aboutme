import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const CDC = () => {
  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8 text-left text-blue-700">
        <h2 className="text-4xl font-semibold text-blue-600 text-center">
          Change Data Capture (CDC)
        </h2>

        {/* Diagram */}
        <div className="my-6 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}CDC.png`}
            alt="CDC Diagram"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
          />
        </div>

        {/* Intro */}
        <p className="text-base sm:text-lg">
          Change Data Capture (CDC) is a data integration pattern that
          identifies and captures changes made to data in real time, and streams
          those changes to other systems for immediate action or analysis.
        </p>

        {/* Key Concepts */}
        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Transaction Logs:</strong> Monitor low-level operations
              directly from database logs.
            </li>
            <li>
              <strong>Event Streaming:</strong> Stream detected changes using
              tools like Debezium or GoldenGate.
            </li>
            <li>
              <strong>Downstream Processing:</strong> Real-time reactions to
              changes for analytics, replication or alerting.
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time data synchronization across multiple systems.</li>
            <li>Minimized impact on source databases compared to polling.</li>
            <li>Improved responsiveness and scalability of data pipelines.</li>
          </ul>
        </div>

        {/* Use Case */}
        <div className="mt-8 space-y-4">
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

        {/* Tech Stack */}
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
              <strong>Debezium</strong>: Open-source, Kafka-native CDC engine.
            </li>
            <li>
              <strong>Apache Kafka</strong>: Distributed event streaming
              platform.
            </li>
            <li>
              <strong>Kafka Connect</strong>: Integrates CDC sources with Kafka
              topics.
            </li>
            <li>
              <strong>AWS DMS</strong>: Managed service supporting CDC in AWS
              environments.
            </li>
            <li>
              <strong>Apache Spark Structured Streaming</strong>: Real-time
              analytics and transformation of CDC streams.
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default CDC;
