import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaServer,
    FaTerminal,
    FaLink,
    FaProjectDiagram,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaCode,
    FaShieldAlt,
    FaRobot,
    FaDatabase,
    FaFolderOpen,
    FaTools,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const protocolStages = [
    {
        id: "client",
        stepNumber: "01",
        name: "Host Application & AI Client",
        shortName: "AI Host & Client",
        tech: "Claude Desktop / Cursor / IDE",
        icon: FaRobot,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Host Runtime",
        tagline: "The AI agent or IDE orchestrating conversation context and reasoning",
        role: "The client application initiating the AI session. It executes the reasoning loop, discovers connected MCP servers, presents available tools to the LLM context, and requests user approval before executing actions.",
        specs: [
            { label: "Host Role", value: "Orchestrates prompts, tools, and user consent" },
            { label: "Execution Model", value: "Spawns child processes or connects via SSE" },
            { label: "Security Sandbox", value: "Human-in-the-loop approval gate" },
        ],
    },
    {
        id: "transport",
        stepNumber: "02",
        name: "Standardized Transport Layer",
        shortName: "Transport Pipes",
        tech: "stdio / SSE (HTTP Streams)",
        icon: FaTerminal,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "Bidirectional Stream",
        tagline: "Ultra-low latency communication over local stdio or remote SSE",
        role: "The communication wire between client and server. For local desktop agents, standard input/output (stdio) provides zero-network overhead and isolation. For cloud architectures, Server-Sent Events (SSE) supports remote streaming.",
        specs: [
            { label: "Local Transport", value: "Standard I/O (stdio) pipes" },
            { label: "Remote Transport", value: "HTTP Server-Sent Events (SSE) + POST" },
            { label: "Wire Protocol", value: "JSON-RPC 2.0 framing" },
        ],
    },
    {
        id: "protocol",
        stepNumber: "03",
        name: "MCP Protocol Handshake",
        shortName: "Protocol Handshake",
        tech: "JSON-RPC 2.0 / Capabilities",
        icon: FaProjectDiagram,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "Negotiation",
        tagline: "Negotiates protocol versions, capabilities, and lifecycle events",
        role: "The client and server exchange an `initialize` handshake. The server advertises its capabilities (whether it supports Tools, Resources, Prompts, or Logging) along with semantic schemas, establishing a verified contract.",
        specs: [
            { label: "Handshake Method", value: "initialize / initialized notification" },
            { label: "Dynamic Discovery", value: "tools/list, resources/list, prompts/list" },
            { label: "Compatibility", value: "Strict semantic protocol versioning" },
        ],
    },
    {
        id: "capabilities",
        stepNumber: "04",
        name: "MCP Server Subsystems",
        shortName: "Server Capabilities",
        tech: "Tools / Resources / Prompts",
        icon: FaTools,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Modular Primitives",
        tagline: "Exposes executable tools, readable resources, and prompt templates",
        role: "The specialized MCP server exposing three core primitives: Tools (executable functions with JSON schema inputs), Resources (readable passive data streams like files and logs), and Prompts (reusable workflow templates).",
        specs: [
            { label: "Tools", value: "Executable functions with JSON Schema parameters" },
            { label: "Resources", value: "URI-addressed contextual data streams" },
            { label: "Prompts", value: "Pre-parameterized engineering workflows" },
        ],
    },
    {
        id: "backends",
        stepNumber: "05",
        name: "Enterprise Backends & Sinks",
        shortName: "Backend Services",
        tech: "Git / DBs / Cloud APIs / OS",
        icon: FaDatabase,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Secure Access",
        tagline: "Securely bridges AI agents to filesystems, databases, and third-party APIs",
        role: "The underlying services executed by the MCP server: local file systems, PostgreSQL databases, GitHub/GitLab repositories, Jira APIs, or internal microservices. The model never touches credentials directly.",
        specs: [
            { label: "Secret Isolation", value: "Tokens stay inside MCP server, hidden from LLM" },
            { label: "Scope Restriction", value: "Granular read/write path bounding" },
            { label: "Enterprise Ready", value: "Integrates with legacy & cloud infrastructure" },
        ],
    },
];

const comparisonMatrix = [
    {
        aspect: "Integration Architecture",
        custom: "M × N complexity: Each AI app must build custom connectors for every backend tool",
        mcp: "M + N open standard: Build 1 MCP server, plug instantly into any supporting AI client",
        better: "mcp",
    },
    {
        aspect: "Credential & Secret Security",
        custom: "High risk: API tokens and credentials often injected into prompt context or model memory",
        mcp: "Zero secret leakage: Credentials remain on the local server; the LLM only sends arguments",
        better: "mcp",
    },
    {
        aspect: "Runtime Capability Discovery",
        custom: "Hardcoded: Adding a tool requires rewriting system prompts and modifying client code",
        mcp: "Dynamic discovery: Servers advertise tools and schemas at runtime via `tools/list`",
        better: "mcp",
    },
    {
        aspect: "Human-in-the-Loop Governance",
        custom: "Ad-hoc: Custom confirmation modals or unconstrained auto-execution risks",
        mcp: "Standardized: Protocol specification mandates explicit client confirmation before tool calls",
        better: "mcp",
    },
    {
        aspect: "Transport Flexibility",
        custom: "Coupled: Monolithic HTTP endpoints or proprietary vendor SDK bridges",
        mcp: "Decoupled: Seamlessly toggle between local low-overhead stdio and remote HTTP/SSE",
        better: "mcp",
    },
];

const sampleRpcMessages = {
    initialize: {
        title: "Client-Server Handshake (`initialize`)",
        desc: "The client starts the server process and exchanges capabilities, negotiating protocol versions and advertised server primitives.",
        code: `// 1. Client Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {}
    },
    "clientInfo": {
      "name": "CustomAgentClient",
      "version": "1.0.0"
    }
  }
}

// 2. Server Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": { "listChanged": true },
      "resources": { "subscribe": true, "listChanged": true },
      "prompts": { "listChanged": false }
    },
    "serverInfo": {
      "name": "EnterpriseDatabaseMcpServer",
      "version": "2.1.0"
    }
  }
}`,
    },
    toolsList: {
        title: "Dynamic Tool Discovery (`tools/list`)",
        desc: "The client asks the server for available tools. The server responds with typed JSON Schemas for each function, which the client injects into the LLM context.",
        code: `// Client Request: {"jsonrpc": "2.0", "id": 2, "method": "tools/list"}

// Server Response:
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "query_orders_database",
        "description": "Executes read-only analytical SQL queries against the PostgreSQL production warehouse.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "sql_query": {
              "type": "string",
              "description": "SELECT query to run. Mutations (DROP, DELETE, UPDATE) are blocked."
            },
            "limit": {
              "type": "integer",
              "default": 100,
              "description": "Maximum number of rows to return"
            }
          },
          "required": ["sql_query"]
        }
      }
    ]
  }
}`,
    },
    toolsCall: {
        title: "Tool Execution Request (`tools/call`)",
        desc: "When the LLM decides to call a tool, the client forwards the structured arguments to the MCP server, and receives formatted content back.",
        code: `// 1. Client Execution Request (with User Approval)
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "query_orders_database",
    "arguments": {
      "sql_query": "SELECT status, COUNT(*) AS count FROM orders GROUP BY status;",
      "limit": 10
    }
  }
}

// 2. Server Execution Result
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\\"status\\": \\"PAID\\", \\"count\\": 1420}, {\\"status\\": \\"PENDING\\", \\"count\\": 84}]"
      }
    ],
    "isError": false
  }
}`,
    },
};

const protocolPillars = [
    {
        icon: FaTools,
        title: "Tools (Action Execution)",
        description: "Enables LLMs to perform state changes or retrieve computations: executing SQL queries, issuing git commits, calling external REST endpoints, or interacting with local CLI utilities.",
        tech: "Typed JSON-Schema Function Calling",
    },
    {
        icon: FaFolderOpen,
        title: "Resources (Contextual Streams)",
        description: "Read-only data sources addressed by standardized URIs (e.g. `file:///logs/app.log` or `postgres://schema/users`). Supports live subscriptions to alert the client when resources change.",
        tech: "URI-Addressed Data Providers",
    },
    {
        icon: FaCode,
        title: "Prompts (Engineered Templates)",
        description: "Reusable, version-controlled prompt workflows hosted by the server (e.g. `code-review`, `schema-migration-planner`) that guide models through complex multi-step tasks.",
        tech: "Server-Hosted Parameterized Prompts",
    },
    {
        icon: FaShieldAlt,
        title: "Sandboxed Security Boundary",
        description: "MCP servers run in restricted environments. Secret API keys and database passwords never leave the server process, shielding the AI model from raw credentials.",
        tech: "Zero Secret Ingestion & Human Approval",
    },
];

const ecosystemTools = [
    {
        category: "Host Environments & Clients",
        tools: "Claude Desktop, Antigravity IDE, Cursor, Zed, Sourcegraph Cody, Custom Python / TypeScript SDKs",
    },
    {
        category: "Server Transports",
        tools: "stdio (Local process piping), Server-Sent Events (SSE over HTTP), Streamable WebSockets",
    },
    {
        category: "Official SDK Ecosystem",
        tools: "@modelcontextprotocol/sdk (TypeScript), mcp (Python), mcp-golang, Kotlin MCP SDK",
    },
    {
        category: "Open Community Servers",
        tools: "PostgreSQL MCP, GitHub MCP, Filesystem MCP, Slack MCP, Brave Search MCP, Kubernetes MCP",
    },
];

export default function MCP() {
    const [selectedStage, setSelectedStage] = useState(protocolStages[2]);
    const [activeTab, setActiveTab] = useState("toolsCall");

    return (
        <PageLayout 
            title="Model Context Protocol (MCP)" 
            subtitle="The open standard protocol connecting AI models and agents to local tools, databases, and enterprise context."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Interactive Architecture Pipeline Visualizer */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Open Standard Architecture
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Client-Server Protocol Integration Schema
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md w-fit">
                            Click stages to inspect details
                        </span>
                    </div>

                    {/* Pipeline Stage Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {protocolStages.map((stage, idx) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStage.id === stage.id;
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                                        isSelected
                                            ? "bg-cyan-500/15 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-cyan-500/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${stage.bg} ${stage.color}`}>
                                            <Icon size={16} />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                                            {stage.shortName}
                                        </h4>
                                    </div>
                                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 truncate">
                                        {stage.tech}
                                    </p>

                                    {/* Arrow connector for large screens */}
                                    {idx < protocolStages.length - 1 && (
                                        <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-600 pointer-events-none">
                                            <FaArrowRight size={10} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Stage Detail Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedStage.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="p-5 sm:p-6 rounded-xl bg-slate-100/60 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 space-y-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/60 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-lg ${selectedStage.bg} ${selectedStage.color}`}>
                                        <selectedStage.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                                            {selectedStage.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {selectedStage.tagline}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 w-fit">
                                    {selectedStage.badge}
                                </span>
                            </div>

                            <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                                {selectedStage.role}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                {selectedStage.specs.map((spec) => (
                                    <div 
                                        key={spec.label}
                                        className="p-3 rounded-lg bg-white/70 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50"
                                    >
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                                            {spec.label}
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Main Narrative */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        The <strong>Model Context Protocol (MCP)</strong> is an open specification introduced by Anthropic that standardizes how artificial intelligence applications discover, read, and invoke backend tools, enterprise resources, and prompt templates.
                    </p>
                    <p>
                        Prior to MCP, connecting an AI model to an external database, API, or local codebase required building bespoke connectors for every tool and every client engine—a brittle <em>M × N integration nightmare</em>. MCP functions as the <strong>USB-C for AI applications</strong>: a universal JSON-RPC 2.0 interface. Once a developer writes an MCP server for a tool or database, any supporting AI workspace (Claude Desktop, Antigravity IDE, Cursor, or autonomous CLI agents) can connect, discover capabilities, and execute workflows seamlessly.
                    </p>
                </div>

                {/* Comparison Section: Custom Ad-Hoc Integrations vs Open MCP */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Ecosystem Standardization
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Custom Ad-Hoc Connectors vs. Open Standard MCP
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Dimension</th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-3/8">
                                        Custom Ad-Hoc Tooling
                                    </th>
                                    <th className="p-4 font-bold text-cyan-600 dark:text-cyan-400 w-3/8">
                                        Model Context Protocol (MCP)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                {comparisonMatrix.map((item) => (
                                    <tr key={item.aspect} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                                            {item.aspect}
                                        </td>
                                        <td className="p-4 text-slate-550 dark:text-slate-400 flex items-start gap-2">
                                            <FaTimesCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={14} />
                                            <span>{item.custom}</span>
                                        </td>
                                        <td className="p-4 text-slate-850 dark:text-slate-200">
                                            <div className="flex items-start gap-2">
                                                <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                                                <span className="font-medium">{item.mcp}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Interactive Protocol Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Protocol Wire Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Real JSON-RPC 2.0 Message Exchanges
                            </h3>
                        </div>

                        {/* Artifact Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(sampleRpcMessages).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === key
                                            ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key === "initialize" ? "Initialize" : key === "toolsList" ? "Tools / List" : "Tools / Call"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {sampleRpcMessages[activeTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {sampleRpcMessages[activeTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-cyan-400" />
                                <span>mcp-stream: stdio.jsonrpc</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                application/json-rpc
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {sampleRpcMessages[activeTab].code}
                        </pre>
                    </div>
                </div>

                {/* Core Architecture Pillars */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Architecture Primitives
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {protocolPillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div 
                                    key={pillar.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded border border-cyan-500/15 w-fit">
                                        {pillar.tech}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Modern Ecosystem & Tooling */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Modern MCP Ecosystem & Supported Stacks
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {ecosystemTools.map((tech) => (
                            <div 
                                key={tech.category} 
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex items-start gap-3.5"
                            >
                                <div className="p-2 bg-secondary-500/10 text-secondary-500 dark:text-secondary-400 rounded-lg mt-0.5">
                                    <FaServer size={14} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                        {tech.category}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-0.5 leading-relaxed font-mono">
                                        {tech.tools}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Projects Showcase Call-to-Action */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 text-center bg-gradient-to-b from-cyan-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Explore My Real-World MCP Projects
                        </h3>
                        <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                            Check out my end-to-end MCP implementations on GitHub, featuring a dedicated MCP client managing child process stdio pipes and a custom MCP server exposing production tools.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
                            {["JSON-RPC 2.0", "stdio Pipes", "SSE Transport", "Tool Discovery", "TypeScript SDK", "Node.js"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="pt-2 flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://github.com/stefanoauciello/mcp-client"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary gap-2 inline-flex items-center"
                            >
                                <FaLink size={12} /> View mcp-client on GitHub
                            </a>
                            <a
                                href="https://github.com/stefanoauciello/mcp-server"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary gap-2 inline-flex items-center shadow-lg"
                            >
                                <FaLink size={12} /> View mcp-server on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
