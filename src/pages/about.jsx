// src/pages/About.jsx
import {motion} from "framer-motion";
import {FaCloud, FaCode, FaDatabase} from "react-icons/fa";
import containerVariants from "../components/utils";

const skillCards = [
    {
        icon: FaCode,
        title: "Frameworks & Runtime",
        items: ["Spring", "Node.js"],
    },
    {
        icon: FaDatabase,
        title: "Databases",
        items: ["MongoDB", "Oracle", "MySQL"],
    },
    {
        icon: FaCloud,
        title: "Cloud & Streaming",
        items: ["AWS", "Kafka"],
    },
];

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: idx => ({
        opacity: 1,
        y: 0,
        transition: {delay: idx * 0.15, duration: 0.45},
    }),
};

function About() {
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
                    About&nbsp;Me
                </h2>

                <motion.div
                    className="mt-8 space-y-4 text-lg text-blue-700"
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        `I'm a software engineer who loves delivering end‑to‑end solutions—writing clean code, shipping resilient services and keeping them running in production.`,
                        `At Vodafone I dived deep into Big‑Data and real‑time architectures, which ignited a passion for data platforms and streaming pipelines.`,
                        `While working full‑time I’m also finishing my degree and collecting certifications. My goal: be the teammate who bridges business and tech, guiding the team from analysis to seamless delivery.`,
                    ].map((text, idx) => (
                        <motion.p key={idx} custom={idx} variants={itemVariants}>
                            {text}
                        </motion.p>
                    ))}
                </motion.div>

                <motion.ul
                    className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                >
                    {skillCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <motion.li
                                key={card.title}
                                custom={idx}
                                variants={itemVariants}
                                whileHover={{translateY: -4}}
                                className="px-4 py-6 rounded-lg bg-white/70 backdrop-blur
                           shadow-md flex flex-col items-center text-center
                           transition"
                            >
                                <Icon className="text-3xl text-blue-600 mb-3" aria-hidden/>
                                <h3 className="font-semibold text-blue-700 mb-2">{card.title}</h3>
                                <ul className="text-sm text-blue-800 space-y-0.5">
                                    {card.items.map(skill => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default About;
