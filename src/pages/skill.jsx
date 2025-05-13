// src/pages/Skill.jsx
import { motion } from "framer-motion";
import PageLayout from "../layouts/page-layout.jsx";
import SkillCard from "../components/skill-card.jsx";
import { animations, classes } from "../styles/theme";

const skills = [
  {
    src: "/spring.png",
    alt: "Spring",
    label: "Spring",
    description:
      "Building microservices and REST APIs with Spring Boot, JPA/Hibernate, Kafka and other Spring ecosystem modules.",
  },
  {
    src: "/node.png",
    alt: "Node.js",
    label: "Node.js",
    description:
      "Authoring AWS Lambda functions and scalable back‑ends with Express / NestJS; designing serverless APIs on AWS.",
  },
  {
    src: "/mongo.png",
    alt: "MongoDB",
    label: "MongoDB",
    description:
      "Leveraging the flexibility of document databases for high‑performance, horizontally scalable apps.",
  },
  {
    src: "/oracle.png",
    alt: "Oracle",
    label: "Oracle",
    description:
      "Query tuning and cost analysis; experience with Oracle GoldenGate for replication in distributed systems.",
  },
  {
    src: "/aws.png",
    alt: "AWS",
    label: "AWS",
    description:
      "Serverless development with Lambda, SQS, SNS, EventBridge; data with Aurora & DynamoDB; containers on ECS & EKS.",
  },
  {
    src: "/kafka.png",
    alt: "Kafka",
    label: "Kafka",
    description:
      "Change‑Data‑Capture pipelines and event‑driven architectures for reliable, scalable stream processing.",
  },
  {
    src: "/mysql.png",
    alt: "MySQL",
    label: "MySQL",
    description:
      "Personal projects: schema design, query optimisation and relational modelling best‑practices.",
  },
];

function Skill() {
  return (
    <PageLayout title="Skills">
      <motion.ul
        className={classes.cardGrid}
        variants={animations.gridVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map(skill => (
          <SkillCard
            key={skill.label}
            title={skill.label}
            description={skill.description}
            imageSrc={import.meta.env.BASE_URL + skill.src}
            imageAlt={skill.alt}
            variants={animations.cardVariants}
          />
        ))}
      </motion.ul>
    </PageLayout>
  );
}

export default Skill;
