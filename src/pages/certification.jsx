import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const Certification = () => {
  const certifications = [
    "AWS Certified Developer – Associate (2023)",
    "AWS Certified Cloud Practitioner (2021)",
    "MongoDB Developer Foundation DF01 (2024)",
    "MongoDB Benchmarking and Capacity Planning OA610 (2024)",
    "MongoDB Advanced Queries and Data Processing DA610 (2024)",
    "MongoDB Application Optimization DA640 (2024)",
    "Cisco IT Essential (2013)",
  ];

  const logos = [
    { src: "/aws.png", alt: "AWS Logo", label: "AWS" },
    { src: "/mongo.png", alt: "MongoDB Logo", label: "MongoDB" },
    { src: "/cisco.png", alt: "Cisco Logo", label: "Cisco" },
  ];

  return (
    <motion.section
      className="p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto overflow-y-auto h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton />
      <div className="flex-grow overflow-y-auto px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-blue-600">Certifications</h2>
        <ul className="list-disc list-inside text-blue-700 space-y-4 mt-6 text-lg text-left mx-auto max-w-3xl">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
          {logos.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={import.meta.env.BASE_URL + item.src}
                alt={item.alt}
                className="w-auto max-w-[100px] md:max-w-[140px] lg:max-w-[160px] h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Certification;
