import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-blue-300 hover:text-white transition mb-6"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      <nav
        className={`absolute top-12 left-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 backdrop-blur-md w-full p-4 md:static md:flex md:justify-center md:space-x-8 md:p-0 transition-all ${
          isOpen ? "block" : "hidden"
        } md:block rounded-lg shadow-md`}
      >
        <Link
          to="/about"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          About
        </Link>
        <Link
          to="/experience"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Experience
        </Link>
        <Link
          to="/certifications"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Certifications
        </Link>
        <Link
          to="/skills"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Skills
        </Link>
        <Link
          to="/contact"
          className="block text-blue-300 hover:text-white transition text-center"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}

function Home() {
  return (
    <motion.div
      className="max-w-5xl w-full bg-gradient-to-r from-blue-800 via-gray-900 to-blue-800 shadow-xl rounded-2xl p-12 text-white text-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center space-y-6">
        <img
          src="/profile.jpg"
          alt="Stefano Auciello"
          className="w-60 h-auto border-4 border-blue-300 shadow-lg rounded-lg"
        />
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-blue-300">
            Stefano Auciello
          </h1>
          <p className="text-xl text-gray-300">Senior Software Engineer</p>
        </div>
      </div>
      <Navbar />
    </motion.div>
  );
}

const About = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-300">About Me</h2>
      <p className="text-gray-300 mt-6 text-lg">
        I'm a dedicated Software Engineer with a strong passion for end-to-end
        software delivery, from writing code to deploying robust solutions into
        production. My interest in data has deepened over recent years,
        particularly through my work at Vodafone, where I've been immersed in
        Big Data and the management of Real-Time architectures. In parallel, I'm
        pursuing a university degree and continuously advancing my knowledge
        with new certifications. I strive to be a trusted point of reference
        within my team, offering both technical and business insights. My goal
        is to help guide the team toward optimal solutions, from technical
        analysis through architectural design and implementation.
      </p>
    </motion.section>
  );
};

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
                  src={`/${img}`}
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

const Certifications = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-300">Certifications</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-4 mt-6 text-lg">
        <li>AWS Certified Developer – Associate (2023)</li>
        <li>AWS Certified Cloud Practitioner (2021)</li>
        <li>MongoDB Developer Foundation DF01 (2024)</li>
        <li>MongoDB Benchmarking and Capacity Planning OA610 (2024)</li>
        <li>MongoDB Advanced Queries and Data Processing DA610 (2024)</li>
        <li>MongoDB Application Optimization DA640 (2024)</li>
        <li>Cisco IT Essential (2013)</li>
      </ul>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
        {[
          { src: "/aws.png", alt: "AWS Logo", label: "AWS" },
          { src: "/mongo.png", alt: "MongoDB Logo", label: "MongoDB" },
          { src: "/cisco.png", alt: "Cisco Logo", label: "Cisco" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={item.src}
              alt={item.alt}
              className="w-auto max-w-[80px] md:max-w-[120px] lg:max-w-[150px] h-auto object-contain"
            />
            <span className="text-gray-400 text-sm mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const Skills = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
        {[
          { src: "/spring.png", alt: "Spring", label: "Spring" },
          { src: "/node.png", alt: "Node", label: "NodeJS" },
          { src: "/mongo.png", alt: "MongoDB", label: "MongoDB" },
          { src: "/oracle.png", alt: "Oracle", label: "Oracle" },
          { src: "/aws.png", alt: "AWS", label: "AWS" },
          { src: "/kafka.png", alt: "Kafka", label: "Kafka" },
          { src: "/mysql.png", alt: "MySQL", label: "MySQL" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center min-h-[180px] w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] bg-gray-700 rounded-lg shadow-lg p-4"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-auto h-16 md:h-20 lg:h-24 object-contain"
            />
            <span className="text-gray-400 text-sm mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const Contact = () => {
  return (
    <motion.section
      className="p-12 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-300">Contact</h2>
      <p className="text-gray-300 mt-6 flex items-center justify-center space-x-4 text-lg">
        <FaEnvelope />
        <span>auciellostefano1@gmail.com</span>
      </p>
      <p className="text-gray-300 mt-4 flex items-center justify-center space-x-4 text-lg">
        <FaMapMarkerAlt />
        <span>Peschiera Borromeo (MI), Italy</span>
      </p>
      <p className="text-gray-300 mt-4 flex items-center justify-center space-x-4 text-lg">
        <FaLinkedin />
        <a
          href="https://www.linkedin.com/in/stefano-auciello"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-400"
        >
          @stefano-auciello
        </a>
      </p>
    </motion.section>
  );
};

export default function Portfolio() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center space-y-12 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
