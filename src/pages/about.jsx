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
        I'm a passionate Software Engineer who thrives on delivering end-to-end solutions from crafting clean, efficient code to deploying scalable systems in production. Over the years, my interest in data has grown significantly, especially through my experience at Vodafone, where I've been deeply involved in Big Data and Real-Time architecture.

        Beyond my professional journey, I'm also pursuing a university degree while continuously expanding my expertise through certifications. I aim to be a reliable reference point for my team, bridging technical and business perspectives to drive well-informed decisions. My mission is to guide the team toward the best possible solutions, from technical analysis to architectural design and seamless implementation.
      </p>
    </motion.section>
  );
};

export default About;