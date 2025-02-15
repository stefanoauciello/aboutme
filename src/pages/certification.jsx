import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Certification = () => {
  return (
    <motion.section
      className="p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <h2 className="text-4xl font-semibold text-blue-600">Certifications</h2>
      <ul className="list-disc list-inside text-blue-700 space-y-4 mt-6 text-lg text-left mx-auto max-w-3xl">
        <li>AWS Certified Developer – Associate (2023)</li>
        <li>AWS Certified Cloud Practitioner (2021)</li>
        <li>MongoDB Developer Foundation DF01 (2024)</li>
        <li>MongoDB Benchmarking and Capacity Planning OA610 (2024)</li>
        <li>MongoDB Advanced Queries and Data Processing DA610 (2024)</li>
        <li>MongoDB Application Optimization DA640 (2024)</li>
        <li>Cisco IT Essential (2013)</li>
      </ul>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
        {[{ src: "/aws.png", alt: "AWS Logo", label: "AWS" },
          { src: "/mongo.png", alt: "MongoDB Logo", label: "MongoDB" },
          { src: "/cisco.png", alt: "Cisco Logo", label: "Cisco" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={import.meta.env.BASE_URL + item.src}
              alt={item.alt}
              className="w-auto max-w-[100px] md:max-w-[140px] lg:max-w-[160px] h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certification;
