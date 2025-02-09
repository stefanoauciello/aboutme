import { motion } from "framer-motion";
import { useState } from "react";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

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

export default About;