// src/pages/Devcorner.jsx
import { motion } from "framer-motion";
import { FaBolt, FaDatabase, FaServer, FaUserShield, FaGithub, FaDraftingCompass, FaCloud } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageLayout from "../layouts/page-layout.jsx";
import { animations } from "../styles/theme";

const topics = [
    {
        title: "Change Data Capture (CDC)",
        description: "Capture real-time transactions directly from database logs and stream them to downstream targets reliably.",
        icon: FaDatabase,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "hover:border-blue-500/30",
        tag: "Data Streaming",
        link: "/devcorner/cdc",
    },
    {
        title: "Event-Driven Architecture",
        description: "Design decoupled, scalable microservices using asynchronous pub/sub messaging patterns and event schemas.",
        icon: FaBolt,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "hover:border-amber-500/30",
        tag: "System Design",
        link: "/devcorner/event-driven-architecture",
    },
    {
        title: "Data Platform",
        description: "Build robust infrastructure pipelines for ingesting, transforming, storing, and serving analytical data.",
        icon: FaServer,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "hover:border-emerald-500/30",
        tag: "Big Data",
        link: "/devcorner/data-platform",
    },
    {
        title: "Database Versioning",
        description: "Version database schemas repeatably and safely across dev, staging, and production using migration pipelines.",
        icon: FaDatabase,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        border: "hover:border-violet-500/30",
        tag: "DevOps / GitOps",
        link: "/devcorner/database-versioning",
    },
    {
        title: "User Auth vs Machine-to-Machine",
        description: "A developer's guide to user authentication (OIDC, OAuth2) vs service-to-service credentials (mTLS, SPIFFE).",
        icon: FaUserShield,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "hover:border-rose-500/30",
        tag: "Security",
        link: "/devcorner/auth",
    },
    {
        title: "Model Context Protocol (MCP)",
        description: "Learn to build custom MCP servers and clients to extend LLM runtime engines with secure local tooling.",
        icon: FaServer,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "hover:border-cyan-500/30",
        tag: "AI Engineering",
        link: "/devcorner/mcp",
    },
    {
        title: "Agentic Workflows",
        description: "Autonomous AI systems that plan, use tools, and reason through complex tasks in iterative loops.",
        icon: FaBolt,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "hover:border-orange-500/30",
        tag: "AI Engineering",
        link: "/devcorner/agentic-workflows",
    },
    {
        title: "Spec-Driven Development (SDD)",
        description: "Turn specifications into executable truth to steer AI agents, eliminate code drift, and automate full-cycle software delivery.",
        icon: FaDraftingCompass,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        border: "hover:border-indigo-500/30",
        tag: "AI Engineering",
        link: "/devcorner/spec-driven-development",
    },
    {
        title: "Infrastructure as Code (IaC)",
        description: "Provision, version, and manage resilient cloud infrastructure declaratively using Terraform and AWS CDK.",
        icon: FaCloud,
        color: "text-sky-500",
        bg: "bg-sky-500/10",
        border: "hover:border-sky-500/30",
        tag: "DevOps & Cloud",
        link: "/devcorner/infrastructure-as-code",
    },
];

function DevCorner() {
    return (
        <PageLayout 
            title="Dev Corner" 
            subtitle="A curation of guides, architecture blueprints, and articles on system design."
        >
            <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
                variants={animations.gridVariants}
                initial="hidden"
                animate="visible"
            >
                {topics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                        <motion.div 
                            key={topic.title} 
                            variants={animations.cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to={topic.link}
                                className={`group flex flex-col justify-between h-full rounded-2xl glass-card p-6 border border-slate-200/35 dark:border-slate-800/35 transition-all duration-300 ${topic.border}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                            {topic.tag}
                                        </span>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={20} aria-hidden />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </div>
                                
                                <div className="mt-6 pt-3 border-t border-slate-150/40 dark:border-slate-800/10 flex items-center text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 gap-1.5 transition-all">
                                    <span>Read Article</span>
                                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="mt-16 text-center space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Looking for more source code and repositories?</p>
                <a 
                    href="https://github.com/stefanoauciello" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary gap-2 inline-flex"
                >
                    <FaGithub size={14} /> Check My GitHub
                </a>
            </div>
        </PageLayout>
    );
}

export default DevCorner;
