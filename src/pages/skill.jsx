import { motion } from "framer-motion";
import { useState } from "react";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Skill = () => {
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
              src={import.meta.env.BASE_URL + item.src}
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

export default Skill;
