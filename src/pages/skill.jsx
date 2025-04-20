// src/pages/Skill.jsx
import {motion} from "framer-motion";
import containerVariants from "../components/utils";

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

const gridVariants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.12}},
};

const cardVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.45}},
};

function Skill() {
    return (
        <motion.section
            className="h-[100dvh] md:h-auto overflow-y-auto
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="flex-grow px-4 md:px-8">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Skills
                </h2>

                <motion.ul
                    className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {skills.map(skill => (
                        <motion.li
                            key={skill.label}
                            variants={cardVariants}
                            whileHover={{scale: 1.04, translateY: -4}}
                            className="px-4 py-6 rounded-lg bg-white/70 backdrop-blur
                         shadow-md flex flex-col items-center text-center
                         transition"
                        >
                            <img
                                src={import.meta.env.BASE_URL + skill.src}
                                alt={skill.alt}
                                className="w-20 h-auto mb-4 object-contain"
                                loading="lazy"
                            />
                            <h3 className="font-semibold text-blue-700">{skill.label}</h3>
                            <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                                {skill.description}
                            </p>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default Skill;
