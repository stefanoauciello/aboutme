import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const EventDrivenArchitecture = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-600">Event-Driven Architecture</h2>
      <p className="text-blue-700 mt-6 text-lg">
        Event-Driven Architecture (EDA) is a software design pattern in which decoupled applications asynchronously communicate by sending and receiving events.
      </p>

      <div className="mt-8 text-left text-blue-700 space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Event Producers:</strong> Generate events when a change occurs.</li>
          <li><strong>Event Brokers:</strong> Middleware (e.g., Kafka, RabbitMQ) that routes events.</li>
          <li><strong>Event Consumers:</strong> Services that react to events and perform actions.</li>
        </ul>
      </div>

      <div className="mt-8 text-left text-blue-700 space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Loosely coupled architecture that scales efficiently.</li>
          <li>Improved system responsiveness and real-time data processing.</li>
          <li>Better fault tolerance and resilience.</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default EventDrivenArchitecture;
