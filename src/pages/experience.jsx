import { motion } from "framer-motion";
import { useState } from "react";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Experience = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-300 text-center">
        Experience
      </h2>
      <div className="mt-8 space-y-6">
        {[
          {
            company: "Vodafone",
            role: "Senior Software Engineer (May 2022 - Present)",
            description: `Currently working at DXL as a Java/Node.js Backend Developer and Data Engineer, focusing on consumer data. I’ve led the migration of our Java Spring Boot microservices stack from OpenShift to AWS EKS, including data migration from MongoDB to MongoDB Atlas and optimizing Kafka systems. I prioritize performance, scalability, and capacity planning to support millions of active customers. Recently, I reengineered the real-time Change Data Capture (CDC) architecture, using Node.js Lambda and Java microservices to ensure data updates with minimal latency.`,
            secondrole: "",
            seconddescription: "",
            images: [
              "java.png",
              "kafka.png",
              "node.png",
              "aws.png",
              "mongo.png",
            ],
          },
          {
            company: "Bandyer/Kaleyra",
            role: "Senior Associate Software Developer (May 2021 - May 2022)",
            description: `Responsible for developing Node.js services using TypeScript, deploying them on AWS via GitLab CI/CD pipelines. I write unit and integration tests with Jest to ensure code quality and reliability. My work also involves managing Docker containers and leveraging various AWS services to enhance system scalability and efficiency. Additionally, I work extensively with MongoDB and MySQL, implementing database changes through automated Liquibase pipelines to streamline deployment and maintain data integrity.`,
            secondrole: "",
            seconddescription: "",
            images: ["node.png", "aws.png", "mongo.png"],
          },
          {
            company: "Dechit",
            role: "Software Developer, consultant at Sky (March 2019 - May 2021)",
            description: `Led the complete re-architecture of Sky Sport’s system on AWS to enable real-time responsiveness to events through an event-driven architecture. Leveraged AWS components such as AppSync, Lambda, and other best-practice tools to design a highly scalable, decoupled, serverless, and reliable microservices architecture. My role involved extensive work with Node.js, TypeScript, Java, Jenkins, and Amazon Aurora MySQL, adhering to Agile methodologies and emphasizing Test-Driven Development (TDD) to ensure robust code quality. I also managed code versioning and collaborative development through Git and a pull request workflow.`,
            secondrole: "",
            seconddescription: "",
            images: ["java.png", "node.png", "aws.png", "lambda.png"],
          },
          {
            company: "ThinkOpen",
            role: "Software Developer, consultant at Arlanis Reply (June 2018 - March 2019) ",
            description: `Developed backend applications using Node.js, deploying them on Heroku to ensure seamless scalability and accessibility. Emphasized Test-Driven Development (TDD) to maintain high code quality and reliability. Additionally, utilized Git and a pull request workflow to collaborate effectively and manage code versioning.`,
            secondrole:
              "Software Developer, consultant at Unicredit Services Spa (July 2017 - June 2018) ",
            seconddescription:
              "Developed Java Spring applications within Docker environments, utilizing CI/CD pipelines via Go Server to automate deployment. Managed virtual machines using Vagrant and Ansible for efficient automation, and followed Test-Driven Development (TDD) practices to uphold code quality. Collaborated in an Agile setting, leveraging Git and a pull request workflow for seamless version control and team coordination.",
            images: ["spring.png", "node.png", "docker.png", "heroku.png"],
          },
          {
            company: "Spindox",
            role: "Software Developer (October 2014 - June 2017) ",
            description: `Developed Java applications for Ferrari, working directly at their headquarters in Maranello, with a focus on the maintenance and enhancement of internal management systems. In addition to my work with Ferrari, I also contributed to various internal projects, handling technical analysis, development, and deployment of applications to improve operational efficiency across different business areas.`,
            secondrole: "",
            seconddescription: "",
            images: ["java.png"],
          },
        ].map((job, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-700 p-4 md:p-6 rounded-lg shadow-md"
          >
            <div className="flex-1 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-blue-200">
                {job.company}
              </h3>
              <p className="text-gray-400 mt-2">{job.role}</p>
              <p className="mt-2">{job.description}</p>
              <p className="text-gray-400 mt-2">{job.secondrole}</p>
              <p className="mt-2">{job.seconddescription}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {job.images.map((img, i) => (
                <img
                  key={i}
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt={img.split(".")[0]}
                  className="w-20 sm:w-24 md:w-32 lg:w-40 h-auto object-contain rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;