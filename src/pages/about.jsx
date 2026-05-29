// src/pages/About.jsx
import { motion } from "framer-motion";
import { FaCloud, FaCode, FaDatabase, FaLightbulb, FaRocket, FaUserCheck } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import SkillCard from "../components/skill-card.jsx";
import { animations } from "../styles/theme";

const skillCards = [
  {
    icon: FaCode,
    title: "Frameworks & Runtime",
    items: ["Spring Boot", "Node.js", "Express", "TypeScript"],
  },
  {
    icon: FaDatabase,
    title: "Databases",
    items: ["MongoDB", "Oracle", "MySQL", "DynamoDB"],
  },
  {
    icon: FaCloud,
    title: "Cloud & Streaming",
    items: ["AWS", "Apache Kafka", "Docker", "Kubernetes"],
  },
];

const pillars = [
  {
    icon: FaRocket,
    title: "Resilient Architecture",
    text: "Building distributed services engineered to scale, handle traffic spikes, and recover gracefully from failures.",
  },
  {
    icon: FaLightbulb,
    title: "Continuous Learning",
    text: "Keeping tech skills sharp through academic pursuits, industry certifications, and experimenting with new tech.",
  },
  {
    icon: FaUserCheck,
    title: "Collaborative Leadership",
    text: "Bridging the gap between code and business objectives, helping mentor teams, and delivering high quality.",
  },
];

function About() {
  return (
    <PageLayout 
      title="About Me" 
      subtitle="Passionate backend engineer, cloud architect, and Enthusiastic AI."
    >
      {/* Intro section */}
      <div className="grid md:grid-cols-12 gap-8 items-start mt-8">
        <motion.div
          className="md:col-span-8 space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350"
          initial="hidden"
          animate="visible"
        >
          {[
            `I am a Senior Software Engineer with a deep passion for building robust distributed systems, implementing event-driven architectures, and driving cloud transformations. Over my career, I've designed and automated microservices stacks supporting millions of customers, re-engineered database versioning controls, and successfully migrated monolithic platforms to AWS cloud-native configurations.`,
            `Currently, at Generali's Digital Center of Excellence, I focus on decomposing legacy systems into scalable, fully-automated AWS serverless products. I believe that engineering is not just about writing code, but about designing solutions that last, scale, and deliver real value to the business and its end-users.`,
            `While working full-time, I continue to expand my academic knowledge and technical certifications. My ultimate goal is to act as a catalyst for technical innovation in any team I join, guiding products from initial business analysis all the way to production delivery.`
          ].map((text, idx) => (
            <motion.p
              key={idx}
              custom={idx}
              variants={animations.itemVariants}
              className="leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Focus Areas Sidebar */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
            My Focus Areas
          </h3>
          <ul className="space-y-2">
            {["System Re-Architecting", "Serverless Solutions", "Change Data Capture (CDC)", "Database Migration", "CI/CD Pipelines Automation", "Java & JavaScript Ecosystems"].map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.3 }}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Values & Pillars
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center gap-3"
              >
                <div className="p-3 bg-secondary-500/10 text-secondary-500 dark:text-secondary-400 rounded-xl">
                  <Icon size={20} />
                </div>
                <h4 className="font-bold text-slate-850 dark:text-slate-150 text-base">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skills highlight grid */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Technical Toolbox
        </h3>
        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={animations.gridVariants}
        >
          {skillCards.map((card) => (
            <SkillCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              items={card.items}
              variants={animations.cardVariants}
            />
          ))}
        </motion.ul>
      </div>
    </PageLayout>
  );
}

export default About;
