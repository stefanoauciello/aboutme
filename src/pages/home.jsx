import React from "react";
import { motion } from "framer-motion";
import containerVariants from "../components/utils";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Home() {
    const photo = `${import.meta.env.BASE_URL}profile.jpg`;

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/stefanoauciello", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/stefano-auciello", label: "LinkedIn" },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full px-4 py-8 md:py-16"
        >
            {/* Mobile Layout */}
            <div className="sm:hidden w-full flex flex-col">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-conic from-primary-400 via-secondary-400 to-accent-400 rounded-full blur-2xl opacity-20"></div>
                    <img
                        src={photo}
                        alt="Stefano Auciello"
                        className="relative w-48 h-48 object-cover rounded-full border-4 border-white shadow-card mx-auto"
                    />
                </div>
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                        Stefano Auciello
                    </h1>
                    <p className="text-xl text-dark-700">Senior Software Engineer</p>

                    <div className="flex justify-center space-x-4 pt-4">
                        {socialLinks.map((link) => (
                            <a 
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white rounded-full shadow-soft text-dark-600 hover:text-primary-600 transition-all hover:shadow-card"
                                aria-label={link.label}
                            >
                                <link.icon size={20} />
                            </a>
                        ))}
                    </div>

                    <div className="pt-8">
                        <Link to="/about" className="btn btn-primary">
                            Learn More About Me
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block max-w-5xl mx-auto">
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-conic from-primary-400 via-secondary-400 to-accent-400 rounded-3xl blur-2xl opacity-10"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm shadow-card rounded-2xl overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                            <div className="relative order-2 md:order-1 text-center md:text-left space-y-6">
                                <div>
                                    <h1 className="text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent leading-tight">
                                        Stefano Auciello
                                    </h1>
                                    <p className="mt-4 text-2xl text-dark-700">Senior Software Engineer</p>
                                </div>

                                <p className="text-lg text-dark-600">
                                    Passionate about building scalable systems and elegant solutions to complex problems.
                                </p>

                                <div className="flex justify-center md:justify-start space-x-4">
                                    {socialLinks.map((link) => (
                                        <a 
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-full shadow-soft text-dark-600 hover:text-primary-600 transition-all hover:shadow-card"
                                            aria-label={link.label}
                                        >
                                            <link.icon size={22} />
                                        </a>
                                    ))}
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                    <Link to="/about" className="btn btn-primary">
                                        About Me
                                    </Link>
                                    <Link to="/experience" className="btn bg-white text-primary-700 hover:bg-primary-50">
                                        My Experience
                                    </Link>
                                </div>
                            </div>

                            <div className="order-1 md:order-2 flex justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur"></div>
                                    <img
                                        src={photo}
                                        alt="Stefano Auciello"
                                        className="relative w-64 h-64 object-cover rounded-2xl border-4 border-white shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;
