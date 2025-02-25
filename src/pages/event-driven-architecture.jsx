import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const keyConcepts = [
  {
    title: "Event Producers",
    description: "Generate events when a change occurs.",
  },
  {
    title: "Event Brokers",
    description: "Middleware (e.g., Kafka, RabbitMQ) that routes events.",
  },
  {
    title: "Event Consumers",
    description: "Services that react to events and perform actions.",
  },
];

const benefits = [
  "Loosely coupled architecture that scales efficiently.",
  "Improved system responsiveness and real-time data processing.",
  "Better fault tolerance and resilience.",
];

const EventDrivenArchitecture = () => {
  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto overflow-y-auto h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-blue-600">
          Event-Driven Architecture
        </h2>
        <p className="text-blue-700 mt-6 text-lg">
          Event-Driven Architecture (EDA) is a software design pattern in which
          decoupled applications asynchronously communicate by sending and
          receiving events.
        </p>

        <div className="mt-8 text-left text-blue-700 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
          <ul className="list-disc list-inside space-y-2">
            {keyConcepts.map((concept, index) => (
              <li key={index}>
                <strong>{concept.title}:</strong> {concept.description}
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

export default EventDrivenArchitecture;
