// src/pages/Skill.jsx
import { motion } from 'framer-motion';
import PageLayout from '../layouts/page-layout.jsx';
import SkillCard from '../components/skill-card.jsx';
import { animations, classes } from '../styles/theme';
import { technologyIcons } from '../config/technology-icons.js';

const skills = [
  {
    icon: technologyIcons.copilot.Icon,
    label: 'AI-Assisted Development',
    description:
      'Using AI tools and agents to explore code, support implementation and debugging, and critically review generated results.',
    items: ['GitHub Copilot', 'Claude Code', 'AI Agents'],
  },
  {
    icon: technologyIcons.java.Icon,
    label: 'Java',
    description:
      'Core enterprise Java development, modern language features (Java 8 to 21+), concurrency, OOP patterns, and JVM tuning.',
  },
  {
    icon: technologyIcons.spring.Icon,
    label: 'Spring Ecosystem',
    description:
      'Designing scalable enterprise backends and REST APIs with Spring Boot, JPA/Hibernate, Kafka, and microservices configuration.',
  },
  {
    icon: technologyIcons.node.Icon,
    label: 'Node.js & TypeScript',
    description:
      'Creating event-driven, high-performance backends and serverless API endpoints using Express, NestJS, and AWS Lambda.',
  },
  {
    icon: technologyIcons.mongo.Icon,
    label: 'MongoDB',
    description:
      'Modeling document databases for performance, designing indexing strategies, and configuring horizontal scaling.',
  },
  {
    icon: technologyIcons.oracle.Icon,
    label: 'Oracle SQL & GoldenGate',
    description:
      'Relational schema modeling, query profiling, tuning execution plans, and replication pipelines via Oracle GoldenGate.',
  },
  {
    icon: technologyIcons.aws.Icon,
    label: 'Amazon Web Services',
    description:
      'Architecting infrastructure with Lambda, SQS, SNS, EventBridge, ECS/EKS containerization, and RDS/DynamoDB databases.',
  },
  {
    icon: technologyIcons.kafka.Icon,
    label: 'Apache Kafka',
    description:
      'Designing real-time event streaming architectures, change-data-capture (CDC) pipelines, and pub/sub streaming channels.',
  },
  {
    icon: technologyIcons.docker.Icon,
    label: 'Docker & Containers',
    description:
      'Containerizing services with multi-stage builds, managing container environments, and streamlining local and cloud workflows.',
  },
  {
    icon: technologyIcons.mysql.Icon,
    label: 'MySQL',
    description:
      'Writing optimized relational queries, managing schema migrations safely, and designing database relations.',
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
        {skills.map((skill) => (
          <SkillCard
            key={skill.label}
            icon={skill.icon}
            title={skill.label}
            description={skill.description}
            items={skill.items}
            variants={animations.cardVariants}
          />
        ))}
      </motion.ul>
    </PageLayout>
  );
}

export default Skill;
