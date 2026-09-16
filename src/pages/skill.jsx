// src/pages/Skill.jsx
import { motion } from "framer-motion";
import PageLayout from "../layouts/page-layout.jsx";
import SkillCard from "../components/skill-card.jsx";
import { animations, classes } from "../styles/theme";

const skills = [
  {
    src: "java.png",
    alt: "Java",
    label: "Java",
    description:
      "Core enterprise Java development, modern language features (Java 8 to 21+), concurrency, OOP patterns, and JVM tuning.",
  },
  {
    src: "spring.png",
    alt: "Spring",
    label: "Spring Ecosystem",
    description:
      "Designing scalable enterprise backends and REST APIs with Spring Boot, JPA/Hibernate, Kafka, and microservices configuration.",
  },
  {
    src: "node.png",
    alt: "Node.js",
    label: "Node.js & TypeScript",
    description:
      "Creating event-driven, high-performance backends and serverless API endpoints using Express, NestJS, and AWS Lambda.",
  },
  {
    src: "mongo.png",
    alt: "MongoDB",
    label: "MongoDB",
    description:
      "Modeling document databases for performance, designing indexing strategies, and configuring horizontal scaling.",
  },
  {
    src: "oracle.png",
    alt: "Oracle DB & GoldenGate",
    label: "Oracle SQL & GoldenGate",
    description:
      "Relational schema modeling, query profiling, tuning execution plans, and replication pipelines via Oracle GoldenGate.",
  },
  {
    src: "aws.png",
    alt: "AWS",
    label: "Amazon Web Services",
    description:
      "Architecting infrastructure with Lambda, SQS, SNS, EventBridge, ECS/EKS containerization, and RDS/DynamoDB databases.",
  },
  {
    src: "kafka.png",
    alt: "Apache Kafka",
    label: "Apache Kafka",
    description:
      "Designing real-time event streaming architectures, change-data-capture (CDC) pipelines, and pub/sub streaming channels.",
  },
  {
    src: "docker.png",
    alt: "Docker",
    label: "Docker & Containers",
    description:
      "Containerizing services with multi-stage builds, managing container environments, and streamlining local and cloud workflows.",
  },
  {
    src: "mysql.png",
    alt: "MySQL",
    label: "MySQL",
    description:
      "Writing optimized relational queries, managing schema migrations safely, and designing database relations.",
  },
];

function Skill() {
  return (
    <PageLayout 
      title="Skills" 
      subtitle="My core technical competencies and tools for engineering backend applications."
    >
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
