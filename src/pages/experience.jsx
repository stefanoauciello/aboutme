import { motion } from "framer-motion";
import containerVariants from "../components/utils";

const experiences = [
    {
        company: "Vodafone",
        role: "Senior Software Engineer (May 2022 - Present)",
        description: `Currently working at DXL as a Backend Developer and Data Engineer, focusing on consumer data systems. I work with Java, Node.js, Spring Boot, AWS, MongoDB Atlas, and Apache Kafka to build scalable and high-performance microservices. Recently, I improved our real-time Change Data Capture (CDC) architecture using AWS Lambda and event-driven microservices, enhancing data consistency and minimizing latency across systems that serve millions of users.`,
        secondrole: "",
        seconddescription: "",
        images: ["java.png", "kafka.png", "node.png", "aws.png", "mongo.png"],
    },
    {
        company: "Bandyer/Kaleyra",
        role: "Senior Associate Software Developer (May 2021 - May 2022)",
        description: `I was responsible for developing Node.js services using TypeScript and deploying them on AWS via GitLab CI/CD pipelines. I wrote unit and integration tests with Jest to ensure code quality and reliability. My work also involved managing Docker containers and leveraging various AWS services to enhance system scalability and efficiency. Additionally, I worked extensively with MongoDB and MySQL, implementing database changes through automated Liquibase pipelines to streamline deployment and maintain data integrity.`,
        secondrole: "",
        seconddescription: "",
        images: ["node.png", "aws.png", "mongo.png"],
    },
    {
        company: "Dechit",
        role: "Software Developer, consultant at Sky (March 2019 - May 2021)",
        description: `At Sky, I contributed to modernizing the backend systems powering Sky Sport, focusing on scalability, real-time responsiveness, and reliability through an event-driven, serverless architecture on AWS. I worked with technologies such as AWS Lambda, AppSync, Node.js, TypeScript, Java, and Amazon Aurora, while embracing Agile practices and Test-Driven Development (TDD) to ensure clean, maintainable code. My responsibilities included CI/CD with Jenkins and collaborative development via Git and pull request workflows.`,
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
];

const listVariants = { visible: { transition: { staggerChildren: 0.15 } } };
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Experience() {
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
                    Experience
                </h2>

                <motion.ul
                    className="mt-10 relative border-l-4 border-blue-200 pl-6 space-y-10"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                >
                    {experiences.map((job, idx) => (
                        <motion.li key={job.company + idx} variants={itemVariants}>
                            {/* dot */}
                            <span className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-blue-500"></span>

                            {/* card */}
                            <div
                                className="bg-white/70 backdrop-blur px-6 py-6 rounded-lg
                           shadow-md space-y-4"
                            >
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-blue-700">
                                        {job.company}
                                    </h3>
                                    <p className="text-blue-700 font-semibold mt-1">
                                        {job.role}
                                    </p>
                                    <p className="text-blue-800 mt-2 leading-relaxed">
                                        {job.description}
                                    </p>

                                    {job.secondrole && (
                                        <>
                                            <p className="text-blue-700 font-semibold mt-4">
                                                {job.secondrole}
                                            </p>
                                            <p className="text-blue-800 mt-1 leading-relaxed">
                                                {job.seconddescription}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-start gap-4">
                                    {job.images.map((img) => (
                                        <img
                                            key={img}
                                            src={`${import.meta.env.BASE_URL}${img}`}
                                            alt={img.split(".")[0]}
                                            className="w-14 sm:w-16 md:w-20 h-auto object-contain
                                 rounded-md shadow"
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </motion.section>
    );
}

export default Experience;
