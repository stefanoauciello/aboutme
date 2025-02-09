import { motion } from "framer-motion";
import { useState } from "react";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Certification = () => {
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
              src={import.meta.env.BASE_URL + item.src}
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

export default Certification;