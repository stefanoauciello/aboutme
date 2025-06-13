// src/pages/Certification.jsx
import {motion} from "framer-motion";
import containerVariants from "../components/utils";

const certificates = [
    {
        title: "AWS Certified Developer – Associate",
        year: 2023,
        provider: "AWS",
        logo: "/aws.png",
    },
    {
        title: "AWS Certified Cloud Practitioner",
        year: 2021,
        provider: "AWS",
        logo: "/aws.png",
    },
    {
        title: "MongoDB Developer Foundation DF01",
        year: 2024,
        provider: "MongoDB",
        logo: "/mongo.png",
    },
    {
        title: "MongoDB Benchmarking & Capacity Planning OA610",
        year: 2024,
        provider: "MongoDB",
        logo: "/mongo.png",
    },
    {
        title: "MongoDB Advanced Queries & Data Processing DA610",
        year: 2024,
        provider: "MongoDB",
        logo: "/mongo.png",
    },
    {
        title: "MongoDB Application Optimization DA640",
        year: 2024,
        provider: "MongoDB",
        logo: "/mongo.png",
    },
    {
        title: "Cisco IT Essential",
        year: 2013,
        provider: "Cisco",
        logo: "/cisco.png",
    },
];

const listVariants = {
    hidden: {},
    visible: {
        transition: {staggerChildren: 0.12},
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.45}},
};

function Certification() {
    return (
        <motion.section
            className="p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8">
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Certifications
                </h2>

                <motion.ul
                    className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                >
                    {certificates.map(cert => (
                        <motion.li
                            key={cert.title}
                            variants={itemVariants}
                            whileHover={{translateY: -4}}
                            className="px-4 py-6 rounded-lg bg-white/70 backdrop-blur
                         shadow-md flex flex-col items-center text-center
                         transition"
                        >
                            <img
                                src={import.meta.env.BASE_URL + cert.logo}
                                alt={`${cert.provider} logo`}
                                className="w-20 h-auto mb-4 object-contain"
                                loading="lazy"
                            />

                            <h3 className="font-semibold text-blue-700 leading-tight">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-blue-600 mt-1">{cert.year}</p>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default Certification;
