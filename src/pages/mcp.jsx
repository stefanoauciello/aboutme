import { motion } from "framer-motion";
import { FaServer, FaTerminal, FaLink, FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import containerVariants from "../components/utils";
import BackButton from "../components/back-button.jsx";

const concepts = [
    {
        icon: FaProjectDiagram,
        title: "Shared context between LLMs and tools",
        description:
            "MCP defines how a client (often an AI assistant) can discover and use tools, resources, and prompts provided by a server in a structured, safe way.",
    },
    {
        icon: FaServer,
        title: "Server",
        description:
            "Exposes capabilities: tools (RPC-style functions), resources (readable data), prompts (templates), and events. Implements the MCP spec and transports.",
    },
    {
        icon: FaTerminal,
        title: "Client",
        description:
            "Connects to one or more MCP servers over a transport (stdio, WebSocket, etc.), lists capabilities, and invokes tools/resources to assist the user.",
    },
];

const benefits = [
    "Decouples the assistant (client) from implementation details of external tools.",
    "Consistent, typed-ish contract for tools/resources across different providers.",
    "Local-first and remote-friendly via multiple transports (stdio, WebSocket).",
];

export default function MCP() {
    return (
        <motion.section
            className="min-h-screen p-6 md:p-12 text-blue-900 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg text-center max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <BackButton fallbackTo="/devcorner" />
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Model Context Protocol (MCP)
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}mcp.png`}
                        alt="MCP Diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="mt-6 text-base sm:text-lg">
                    The Model Context Protocol (MCP) is an open protocol that standardizes how
                    AI assistants (clients) discover and use external capabilities provided by
                    servers. An MCP server advertises tools, resources, and prompts; an MCP client
                    connects over a transport (like stdio or WebSocket), lists these capabilities,
                    and invokes them to help the user solve tasks.
                </p>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {concepts.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.title}
                                    className="flex items-start bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm"
                                >
                                    <Icon className="text-xl text-primary-600 mr-3 mt-1" />
                                    <span>
                                        <strong>{item.title}:</strong> {item.description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Why MCP</h3>
                    <ul className="space-y-2">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start">
                                <FaCheckCircle className="text-green-600 mr-2 mt-1" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-3 bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-blue-600">Basic Flow</h3>
                    <ol className="list-decimal ml-5 space-y-2">
                        <li>
                            Start an MCP server that exposes one or more tools/resources.
                        </li>
                        <li>
                            Connect an MCP client to that server over a supported transport.
                        </li>
                        <li>
                            The client discovers capabilities and invokes tools on demand.
                        </li>
                    </ol>
                </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 text-center">
                <a
                    href="https://github.com/stefanoauciello/mcp-client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary inline-flex items-center justify-center"
                >
                    <FaLink className="mr-2" /> MCP Client on GitHub
                </a>
                <a
                    href="https://github.com/stefanoauciello/mcp-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center justify-center"
                >
                    <FaLink className="mr-2" /> MCP Server on GitHub
                </a>
            </div>
        </motion.section>
    );
}
