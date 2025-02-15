import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const skills = [
  { src: "/spring.png", alt: "Spring", label: "Spring", description: "Experience in building microservices and RESTful APIs with Java and Spring Boot. Usage of JPA, Hibernate, and Kafka for data management and asynchronous communication in distributed architectures." },
  { src: "/node.png", alt: "Node", label: "NodeJS", description: "Experience with Node.js for building AWS Lambda functions and scalable backends using frameworks such as Express and NestJS. Skilled in designing serverless APIs and microservices on AWS." },
  { src: "/mongo.png", alt: "MongoDB", label: "MongoDB", description: "Experience using MongoDB for managing entities as documents, leveraging the flexibility of NoSQL databases for scalable and high-performance applications." },
  { src: "/oracle.png", alt: "Oracle", label: "Oracle", description: "Knowledge of query optimization in Oracle DB, with cost analysis of operations to enhance performance. Experience with Oracle GoldenGate for data replication and synchronization in distributed environments." },
  { src: "/aws.png", alt: "AWS", label: "AWS", description: "Experience in developing serverless applications with AWS Lambda in various languages. Knowledge of Aurora DB and DynamoDB for data management. Proficient in asynchronous services like SQS, SNS, EventBridge, and S3 to ensure integration and scalability. Familiar with ECS and Amazon EKS for deploying and orchestrating containerized applications. AWS Certified Developer - Associate." },
  { src: "/kafka.png", alt: "Kafka", label: "Kafka", description: "Knowledge of Apache Kafka, with experience in Change Data Capture (CDC) for data propagation and synchronization in distributed systems. Working on event-driven architectures to ensure reliability and scalability in data stream processing." },
  { src: "/mysql.png", alt: "MySQL", label: "MySQL", description: "Experience using MySQL, mainly in personal open-source projects, with a focus on data modeling, query optimization, and managing relationships between entities." },
];

const Skill = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex flex-col items-center mt-8">
        {skills.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-8 w-full max-w-3xl mb-6 p-4 bg-white shadow-md rounded-lg"
          >
            <img
              src={import.meta.env.BASE_URL + item.src}
              alt={item.alt}
              className="w-16 h-16 object-contain flex-shrink-0"
            />
            <div className="flex-1">
              <span className="text-blue-600 text-lg font-bold block text-left">{item.label}</span>
              <p className="text-blue-700 text-sm mt-1 leading-relaxed text-left">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skill;