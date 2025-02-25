import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";
import { Link } from "react-router-dom";
import { FaDatabase, FaBolt, FaServer } from "react-icons/fa";

const topics = [
  {
    title: "Change Data Capture",
    description: "Capture real-time changes in your database and stream them efficiently.",
    icon: <FaDatabase className="text-blue-500 text-4xl" />,
    link: "/devcorner/cdc",
  },
  {
    title: "Event-Driven Architecture",
    description: "Design scalable and decoupled systems using event-based communication.",
    icon: <FaBolt className="text-yellow-500 text-4xl" />,
    link: "/devcorner/event-driven-architecture",
  },
  {
    title: "Data Platform",
    description: "Build a robust and scalable infrastructure to manage and process data efficiently.",
    icon: <FaServer className="text-green-500 text-4xl" />,
    link: "/devcorner/data-platform",
  },
];

const Devcorner = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-600">Dev Corner</h2>
      <p className="text-blue-700 mt-6 text-lg">
        Welcome to Dev Corner – a dedicated space where I explore and discuss technology,
        software architecture, best practices, and fundamental concepts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {topics.map((topic, index) => (
          <Link
            to={topic.link}
            key={index}
            className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex flex-col items-center text-center"
          >
            {topic.icon}
            <h3 className="text-xl font-semibold text-blue-600 mt-4">{topic.title}</h3>
            <p className="text-blue-700 text-sm mt-2">{topic.description}</p>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default Devcorner;
