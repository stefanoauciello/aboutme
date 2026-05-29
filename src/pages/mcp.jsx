import { motion } from "framer-motion";
import { FaServer, FaTerminal, FaLink, FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const concepts = [
    {
        icon: FaProjectDiagram,
        title: "Shared Context",
        description: "MCP defines how a client (like an AI assistant) discovers and calls tools, resources, and templates exposed by servers safely.",
    },
    {
        icon: FaServer,
        title: "Server Capability",
        description: "Exposes RPC-style functions (tools), raw readable data (resources), templates (prompts), and alerts, adhering to the MCP spec.",
    },
    {
        icon: FaTerminal,
        title: "Client Interface",
        description: "Connects to MCP servers over standard pipes (stdio, WebSocket), listing capabilities and invoking tools to support users.",
    },
];

const benefits = [
    "Strictly decouples the LLM assistant from backend API integration details.",
    "Provides a typed, structured contract for tools across AI runtime engines.",
    "Operates locally-first via stdio pipes, and supports remote execution over WebSockets.",
];

export default function MCP() {
    return (
        <PageLayout 
            title="Model Context Protocol (MCP)" 
            subtitle="An open standard enabling secure, structured context integration between LLMs and tools."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Diagram Section */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}mcp.png`}
                        alt="MCP Core Architecture Diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Standardized Client-Server Protocol Integration Schema
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        The Model Context Protocol (MCP) is an open-standard communication system that defines how AI applications (clients) discover and call tools, read data sources (resources), and load prompts from backend servers.
                    </p>
                    <p>
                        Instead of coding custom API clients for every new tool, MCP provides a unified JSON-RPC protocol over standard streams (like stdio) or network connections. This allows developers to build an MCP server once, and plug it directly into any supporting AI workspace, agentic loop, or IDE.
                    </p>
                </div>

                {/* Key Concepts Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Protocol Architecture
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
                        Why Adopt MCP?
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2 text-left">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-450 mt-1 flex-shrink-0" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Basic Flow */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4 text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Standard Connection Flow
                    </h3>
                    <ol className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-4 text-sm sm:text-base">
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">1. Server Launch</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                Start the MCP server process. The server advertises its schema capabilities: tools, resource URIs, and template prompts.
                            </span>
                        </li>
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">2. Client Handshake</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                The client (e.g. an AI assistant) boots the server process as a child, establishing a bidirectional stdio JSON-RPC channel.
                            </span>
                        </li>
                        <li>
                            <strong className="text-slate-800 dark:text-slate-200 block">3. Execution Loop</strong>
                            <span className="text-slate-600 dark:text-slate-450 block mt-0.5">
                                As the LLM processes tasks, it requests tool execution. The client forwards the JSON-RPC call, and the server computes and returns results in standard schemas.
                            </span>
                        </li>
                    </ol>
                </div>

                {/* Call to Actions */}
                <div className="pt-6 flex flex-wrap gap-4 justify-center">
                    <a
                        href="https://github.com/stefanoauciello/mcp-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary gap-2 inline-flex items-center"
                    >
                        <FaLink size={12} /> MCP Client Repository
                    </a>
                    <a
                        href="https://github.com/stefanoauciello/mcp-server"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary gap-2 inline-flex items-center shadow-lg"
                    >
                        <FaLink size={12} /> MCP Server Repository
                    </a>
                </div>
            </div>
        </PageLayout>
    );
}
