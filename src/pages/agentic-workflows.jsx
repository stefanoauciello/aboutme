import { motion } from "framer-motion";
import { FaRobot, FaBrain, FaCogs, FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const concepts = [
    {
        icon: FaProjectDiagram,
        title: "Reasoning Loops",
        description: "Agents use iterative cycles (like ReAct or Plan-and-Execute) to break down complex goals into executable steps.",
    },
    {
        icon: FaCogs,
        title: "Tool Use",
        description: "Autonomous integration with external APIs, databases, and code execution environments to interact with the real world.",
    },
    {
        icon: FaBrain,
        title: "Memory Systems",
        description: "Implementing short-term context window management and long-term vector-based memory for persistent learning.",
    },
];

const pillars = [
    "Autonomous decision-making based on high-level objectives.",
    "Dynamic error correction and self-reflection during execution.",
    "Scalable orchestration of multi-agent systems for complex workflows.",
];

export default function AgenticWorkflows() {
    return (
        <PageLayout 
            title="Agentic Workflows" 
            subtitle="Exploring the next frontier of AI: systems that don't just chat, but act and reason autonomously."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Diagram Section */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}agentic-ai.png`}
                        alt="Agentic AI Workflow Diagram"
                        className="w-full max-w-2xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Iterative Reasoning and Tool Use Loop Architecture
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        The shift from static LLM prompts to <strong>Agentic Workflows</strong> represents a fundamental change in how we build AI applications. Instead of a single pass of generation, agentic systems operate in loops—planning, executing, and reflecting on their own output.
                    </p>
                    <p>
                        This approach enables AI to handle ambiguity, use tools effectively, and recover from mistakes without human intervention. By wrapping LLMs in an orchestration layer, we transform them from simple predictors into autonomous problem-solvers.
                    </p>
                </div>

                {/* Key Concepts Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Components
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {concepts.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3 text-left"
                                >
                                    <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Key Characteristics
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-1 text-left">
                        {pillars.map((pillar) => (
                            <li key={pillar} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-450 mt-1 flex-shrink-0" size={16} />
                                <span>{pillar}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Future Vision */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4 text-left bg-primary-500/5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FaRobot className="text-primary-500" /> The Future of Autonomy
                    </h3>
                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed">
                        We are moving towards a world where AI agents are integrated into every layer of the software stack. From autonomous DevOps agents that fix bugs and deploy code, to personal assistants that manage complex multi-step research tasks, agentic workflows are the engine driving this revolution.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
