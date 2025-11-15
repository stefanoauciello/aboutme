// src/pages/About.jsx
import { motion } from "framer-motion";
import { FaCloud, FaCode, FaDatabase } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import SkillCard from "../components/skill-card.jsx";
import { animations } from "../styles/theme";

const skillCards = [
  {
    icon: FaCode,
    title: "Frameworks & Runtime",
    items: ["Spring", "Node.js"],
  },
  {
    icon: FaDatabase,
    title: "Databases",
    items: ["MongoDB", "Oracle", "MySQL"],
  },
  {
    icon: FaCloud,
    title: "Cloud & Streaming",
    items: ["AWS", "Kafka"],
  },
];

function About() {
  return (
    <PageLayout title="About Me">
      <motion.div
        className="mt-8 space-y-4 text-lg text-blue-700"
        initial="hidden"
        animate="visible"
      >
        {[
          `I'm a software engineer who loves delivering end‑to‑end solutions—writing clean code, shipping resilient services and keeping them running in production.`,
          `While working full‑time I'm also finishing my degree and collecting certifications. My goal: be the teammate who bridges business and tech, guiding the team from analysis to seamless delivery.`,
        ].map((text, idx) => (
          <motion.p 
            key={idx} 
            custom={idx} 
            variants={animations.itemVariants}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.ul
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={animations.gridVariants}
      >
        {skillCards.map((card, idx) => (
          <SkillCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            items={card.items}
            variants={animations.cardVariants}
          />
        ))}
      </motion.ul>
    </PageLayout>
  );
}

export default About;
