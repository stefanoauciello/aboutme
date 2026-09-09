import { motion } from "framer-motion";
import containerVariants from "../components/utils";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaCloud, FaDatabase } from "react-icons/fa";

function Home() {
    const photo = `${import.meta.env.BASE_URL}profile.jpg`;

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/stefanoauciello", label: "GitHub", color: "hover:text-slate-900 dark:hover:text-white" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/stefano-auciello", label: "LinkedIn", color: "hover:text-blue-600 dark:hover:text-blue-400" },
    ];

    const pillars = [
        { icon: FaCode, title: "Backend Systems", desc: "Spring Boot, Node.js, TypeScript" },
        { icon: FaCloud, title: "Cloud Architecture", desc: "AWS Serverless, ECS/EKS, Microservices" },
        { icon: FaDatabase, title: "Data Pipelines", desc: "Kafka, Event-Driven CDC, NoSQL/RDBMS" },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10"
        >
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Text Content Area */}
                <div className="md:col-span-7 text-center md:text-left space-y-6 order-2 md:order-1">
                    <div className="space-y-3">
                        {/* Status Tag */}
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Open to new opportunities
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight text-slate-900 dark:text-white">
                            Ciao, I&apos;m <br className="hidden sm:inline" />
                            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent">
                                Stefano Auciello
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300">
                            Senior Software Engineer & Enthusiastic AI
                        </p>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                        Passionate about building scalable systems, breaking down legacy architectures, and crafting elegant, resilient cloud solutions for millions of users, always striving to integrate and leverage AI.
                    </p>

                    {/* Social links */}
                    <div className="flex justify-center md:justify-start gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 bg-white dark:bg-slate-900 rounded-full shadow-soft dark:shadow-md text-slate-500 dark:text-slate-400 ${link.color} transition-all border border-slate-200/40 dark:border-slate-800/40 hover:scale-110`}
                                aria-label={link.label}
                            >
                                <link.icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
                        <Link to="/about" className="btn btn-primary gap-2">
                            About Me <FaArrowRight size={12} />
                        </Link>
                        <Link to="/experience" className="btn btn-secondary">
                            My Experience
                        </Link>
                    </div>
                </div>

                {/* Profile Image Area */}
                <div className="md:col-span-5 flex justify-center order-1 md:order-2">
                    <div className="relative group">
                        {/* Outer rotating/pulsing glow borders */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>

                        {/* Image Container */}
                        <div className="relative w-60 h-60 sm:w-72 sm:h-72 bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl">
                            <img
                                src={photo}
                                alt="Stefano Auciello"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Pillars Section */}
            <div className="mt-16 sm:mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pillars.map((pillar, idx) => {
                    const Icon = pillar.icon;
                    return (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                            className="glass-card p-6 flex flex-col items-center md:items-start text-center md:text-left gap-4"
                        >
                            <div className="p-3 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-xl">
                                <Icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">{pillar.title}</h3>
                                <p className="text-sm text-slate-650 dark:text-slate-400 mt-1 leading-relaxed">{pillar.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default Home;
