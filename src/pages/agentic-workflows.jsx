import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaRobot,
    FaBrain,
    FaCogs,
    FaProjectDiagram,
    FaCheckCircle,
    FaTimesCircle,
    FaChevronRight,
    FaCode,
    FaDatabase,
    FaSearch,
    FaNetworkWired,
    FaLayerGroup,
    FaShieldAlt,
    FaSyncAlt,
    FaExternalLinkAlt,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

/* ── 5-stage ReAct loop ─────────────────────────────────── */
const stages = [
    {
        id: "goal",
        label: "Goal & Context",
        color: "orange",
        icon: FaBrain,
        summary: "User objective + memory injection",
        detail: {
            heading: "Goal Ingestion & Context Assembly",
            body: "The agent receives a high-level objective and assembles a rich context window: the raw user goal, relevant conversation history, retrieved long-term memory chunks (via vector search), and any injected system instructions. This phase determines what the agent knows before it starts reasoning.",
            points: [
                "Short-term context: sliding window over recent turns",
                "Long-term memory: semantic retrieval from vector store (Pinecone, pgvector)",
                "System prompt: persona, constraints, available tools",
                "Structured goal extraction (optional JSON schema)",
            ],
            badge: "INPUT",
        },
    },
    {
        id: "plan",
        label: "Plan",
        color: "amber",
        icon: FaProjectDiagram,
        summary: "Decompose goal into ordered sub-tasks",
        detail: {
            heading: "Planning & Task Decomposition",
            body: "The LLM produces a structured plan — a sequence of sub-tasks with dependencies. Strategies range from simple chain-of-thought to explicit Plan-and-Execute frameworks where a planner LLM generates a DAG of steps and a separate executor LLM runs them.",
            points: [
                "ReAct: interleaved Thought → Action → Observation loop",
                "Plan-and-Execute: planner separates from executor",
                "Tree-of-Thoughts: parallel branch exploration + pruning",
                "Reflection: self-critique before committing to a plan",
            ],
            badge: "REASON",
        },
    },
    {
        id: "act",
        label: "Act (Tool Use)",
        color: "blue",
        icon: FaCogs,
        summary: "Invoke tools, APIs, code interpreters",
        detail: {
            heading: "Action & Tool Invocation",
            body: "The agent translates each sub-task into a concrete tool call — structured JSON that is dispatched to the tool executor. Tools can be anything: REST APIs, SQL databases, code sandboxes, web browsers, file systems, or other agents. The executor returns an observation.",
            points: [
                "Tool registry: typed schema per tool (name, description, input JSON Schema)",
                "Parallel tool calling: fan-out multiple actions in a single LLM turn",
                "Code interpreter: Python/JS sandbox for computation",
                "Web search, retrieval, memory read/write tools",
            ],
            badge: "ACT",
        },
    },
    {
        id: "observe",
        label: "Observe & Reflect",
        color: "violet",
        icon: FaSearch,
        summary: "Parse results, self-critique, retry",
        detail: {
            heading: "Observation, Reflection & Error Recovery",
            body: "Tool outputs are fed back into the context. The agent evaluates whether the observation satisfies the sub-task. If not — due to errors, unexpected results, or hallucinated tool calls — the reflection step triggers a corrective loop: the agent revises its plan and retries up to N times.",
            points: [
                "Structured output parsing with fallback re-prompting",
                "Self-reflection: 'Did this action achieve the goal? Why not?'",
                "Retry budget with exponential back-off",
                "Human-in-the-loop escalation on repeated failure",
            ],
            badge: "OBSERVE",
        },
    },
    {
        id: "output",
        label: "Final Response",
        color: "emerald",
        icon: FaCheckCircle,
        summary: "Synthesize answer, persist memory",
        detail: {
            heading: "Response Synthesis & Memory Persistence",
            body: "Once all sub-tasks are resolved, the agent synthesizes a final answer from the collected observations. Relevant facts are compressed and written back to long-term memory for future sessions. Structured outputs (JSON, markdown, code) can be streamed to downstream systems.",
            points: [
                "Final answer grounded in tool observations (reduces hallucination)",
                "Memory consolidation: summarise + upsert to vector store",
                "Streaming output via SSE / WebSocket for real-time UX",
                "Audit trail: full trace logged for observability",
            ],
            badge: "OUTPUT",
        },
    },
];

/* ── Comparison matrix ──────────────────────────────────── */
const comparisonRows = [
    { dim: "Execution model", naive: "Single LLM call", agentic: "Iterative loop with feedback" },
    { dim: "Error recovery", naive: "None — fail silently", agentic: "Self-reflection + retry budget" },
    { dim: "Tool integration", naive: "Prompt-injected results", agentic: "Structured tool registry + parallel calls" },
    { dim: "Long-term memory", naive: "No — stateless", agentic: "Vector store read/write across sessions" },
    { dim: "Complex task handling", naive: "Single-step only", agentic: "Multi-step DAG decomposition" },
    { dim: "Observability", naive: "Input/output only", agentic: "Full ReAct trace + step-level audit" },
];

/* ── Multi-Agent patterns ───────────────────────────────── */
const multiAgentPatterns = [
    {
        name: "Supervisor",
        description: "A coordinator LLM delegates sub-tasks to specialised worker agents and aggregates their results.",
        pros: "Centralized control, easy to audit",
        accent: "orange",
    },
    {
        name: "Swarm",
        description: "Agents collaborate peer-to-peer, passing messages and partial results via a shared message bus.",
        pros: "Resilient, scales horizontally",
        accent: "amber",
    },
    {
        name: "Pipeline",
        description: "Agents are chained sequentially — each receives the previous agent's output as its input.",
        pros: "Predictable, easy to debug",
        accent: "blue",
    },
];

/* ── JSON Trace inspector tabs ──────────────────────────── */
const traceTabs = [
    {
        label: "Thought",
        code: `{
  "type": "thought",
  "content": "The user wants a summary of Q3 revenue by region. I need to: 1) query the sales DB, 2) group by region, 3) format as markdown table.",
  "step": 1
}`,
    },
    {
        label: "Tool Call",
        code: `{
  "type": "tool_call",
  "tool": "sql_query",
  "input": {
    "query": "SELECT region, SUM(revenue) AS total FROM sales WHERE quarter = 'Q3' GROUP BY region ORDER BY total DESC",
    "database": "analytics"
  },
  "step": 2
}`,
    },
    {
        label: "Observation",
        code: `{
  "type": "observation",
  "tool": "sql_query",
  "output": {
    "rows": [
      { "region": "EMEA",  "total": 4200000 },
      { "region": "AMER",  "total": 3850000 },
      { "region": "APAC",  "total": 2100000 }
    ],
    "row_count": 3
  },
  "step": 2
}`,
    },
    {
        label: "Final Answer",
        code: `{
  "type": "final_answer",
  "content": "| Region | Q3 Revenue |\\n|--------|-----------|\\n| EMEA | $4.2M |\\n| AMER | $3.85M |\\n| APAC | $2.1M |",
  "memory_write": {
    "key": "q3_revenue_summary",
    "summary": "EMEA led Q3 with $4.2M, followed by AMER ($3.85M) and APAC ($2.1M)."
  },
  "step": 3
}`,
    },
];

/* ── Production patterns ────────────────────────────────── */
const patterns = [
    { icon: FaLayerGroup, title: "RAG-Augmented Agent", desc: "Retrieval-Augmented Generation: inject relevant docs into context before each reasoning step to ground answers in facts." },
    { icon: FaSyncAlt, title: "Self-Healing Pipelines", desc: "Agents monitor their own outputs, detect anomalies or errors, and autonomously trigger remediation workflows." },
    { icon: FaShieldAlt, title: "Guardrails & Sandboxing", desc: "Code execution in isolated containers; output validation against safety classifiers before surfacing to users." },
    { icon: FaNetworkWired, title: "Multi-Agent Orchestration", desc: "Supervisor delegates to domain-specialist agents (research, code, data), aggregating results into a unified response." },
    { icon: FaDatabase, title: "Persistent Memory", desc: "Vector-store–backed episodic memory allows agents to recall past interactions, user preferences, and completed tasks." },
    { icon: FaCode, title: "Code Interpreter", desc: "Sandboxed Python/JS execution lets agents perform precise computation, data analysis, and chart generation." },
];

/* ── Ecosystem ──────────────────────────────────────────── */
const ecosystem = [
    { category: "Frameworks", tools: ["LangGraph", "CrewAI", "AutoGen", "Agno"] },
    { category: "LLM Providers", tools: ["OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "Mistral"] },
    { category: "Memory / Vector", tools: ["Pinecone", "pgvector", "Weaviate", "Qdrant"] },
    { category: "Observability", tools: ["LangSmith", "Langfuse", "Phoenix", "OpenTelemetry"] },
];

const accentMap = {
    orange: { bg: "bg-orange-500/10", text: "text-orange-500 dark:text-orange-400", border: "border-orange-500/30", ring: "ring-orange-500/40", badge: "bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/25" },
    amber:  { bg: "bg-amber-500/10",  text: "text-amber-500 dark:text-amber-400",   border: "border-amber-500/30",  ring: "ring-amber-500/40",  badge: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/25" },
    blue:   { bg: "bg-blue-500/10",   text: "text-blue-500 dark:text-blue-400",     border: "border-blue-500/30",   ring: "ring-blue-500/40",   badge: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/25" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-500 dark:text-violet-400", border: "border-violet-500/30", ring: "ring-violet-500/40", badge: "bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/25" },
    emerald:{ bg: "bg-emerald-500/10",text: "text-emerald-500 dark:text-emerald-400",border:"border-emerald-500/30",ring:"ring-emerald-500/40", badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/25" },
};

export default function AgenticWorkflows() {
    const [selectedStage, setSelectedStage] = useState(stages[0]);
    const [activeTab, setActiveTab] = useState(0);

    const acc = accentMap[selectedStage.color] ?? accentMap.orange;

    return (
        <PageLayout
            title="Agentic Workflows"
            subtitle="Exploring the next frontier of AI: systems that don't just chat, but act and reason autonomously."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* ── 1. Interactive ReAct Loop ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        ReAct Loop Topology
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Click any stage to explore the internals of each phase.
                    </p>

                    {/* Stage selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {stages.map((s, i) => {
                            const a = accentMap[s.color] ?? accentMap.orange;
                            const active = selectedStage.id === s.id;
                            const Icon = s.icon;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedStage(s)}
                                    className={`glass-card p-3 flex flex-col items-center gap-1.5 text-center border transition-all duration-200 cursor-pointer ${
                                        active
                                            ? `${a.border} ring-2 ${a.ring} ${a.bg}`
                                            : "border-slate-200/30 dark:border-slate-800/30 hover:border-slate-300/50"
                                    }`}
                                >
                                    <div className={`text-xs font-bold rounded px-1.5 py-0.5 border ${a.badge}`}>
                                        {i + 1}
                                    </div>
                                    <Icon size={16} className={active ? a.text : "text-slate-400"} />
                                    <span className={`text-xs font-semibold leading-tight ${active ? a.text : "text-slate-500 dark:text-slate-400"}`}>
                                        {s.label}
                                    </span>
                                    {i < stages.length - 1 && (
                                        <FaChevronRight size={9} className="text-slate-300 dark:text-slate-600 hidden sm:block absolute right-0 top-1/2 -translate-y-1/2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Detail card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedStage.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className={`glass-card p-6 border ${acc.border} ${acc.bg} space-y-4`}
                        >
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${acc.badge}`}>
                                    {selectedStage.detail.badge}
                                </span>
                                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                    {selectedStage.detail.heading}
                                </h4>
                            </div>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                {selectedStage.detail.body}
                            </p>
                            <ul className="space-y-1.5">
                                {selectedStage.detail.points.map((pt) => (
                                    <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                        <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={12} />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── 2. Comparison matrix ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Naive LLM vs Agentic System
                    </h3>
                    <div className="glass-card border border-slate-200/30 dark:border-slate-800/30 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-slate-200/30 dark:border-slate-700/30">
                                    <th className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 w-1/3">Dimension</th>
                                    <th className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1.5"><FaTimesCircle className="text-rose-400" size={13} /> Naive LLM Call</span>
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-orange-500 dark:text-orange-400">
                                        <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400" size={13} /> Agentic System</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, i) => (
                                    <tr key={row.dim} className={i % 2 === 0 ? "bg-slate-50/30 dark:bg-slate-800/10" : ""}>
                                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{row.dim}</td>
                                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.naive}</td>
                                        <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{row.agentic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── 3. Multi-Agent patterns ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Multi-Agent Coordination Patterns
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Complex tasks benefit from distributing work across specialised agents — each with its own tools, memory, and LLM configuration.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {multiAgentPatterns.map((p) => {
                            const a = accentMap[p.accent] ?? accentMap.orange;
                            return (
                                <div key={p.name} className={`glass-card p-5 border ${a.border} ${a.bg} space-y-2`}>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${a.badge}`}>{p.name}</span>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.description}</p>
                                    <p className={`text-xs font-semibold ${a.text}`}>✓ {p.pros}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── 4. JSON Trace Inspector ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        ReAct Trace Inspector
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        A real execution trace for &quot;Summarise Q3 revenue by region&quot; — each step logged by the agent runtime.
                    </p>
                    <div className="glass-card border border-slate-200/30 dark:border-slate-800/30 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex gap-1 p-3 border-b border-slate-200/30 dark:border-slate-800/30 overflow-x-auto">
                            {traceTabs.map((t, i) => (
                                <button
                                    key={t.label}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        activeTab === i
                                            ? "bg-orange-500/15 text-orange-600 dark:text-orange-300 border border-orange-500/30"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        {/* Code */}
                        <AnimatePresence mode="wait">
                            <motion.pre
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="bg-slate-950 text-slate-300 text-xs sm:text-sm p-5 overflow-x-auto leading-relaxed font-mono"
                            >
                                {traceTabs[activeTab].code}
                            </motion.pre>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── 5. Production patterns ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Production Patterns
                    </h3>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {patterns.map((p) => {
                            const Icon = p.icon;
                            return (
                                <motion.div
                                    key={p.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
                                >
                                    <div className="p-2.5 bg-orange-500/10 text-orange-500 dark:text-orange-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm leading-snug">{p.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* ── 6. Ecosystem ── */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Ecosystem
                    </h3>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {ecosystem.map((cat) => (
                            <motion.div
                                key={cat.category}
                                variants={animations.cardVariants}
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 space-y-3"
                            >
                                <h4 className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider">{cat.category}</h4>
                                <ul className="space-y-1.5">
                                    {cat.tools.map((t) => (
                                        <li key={t} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ── 7. Takeaway ── */}
                <div className="glass-card p-6 border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FaRobot className="text-orange-500" /> The Autonomy Shift
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        Agentic workflows represent a fundamental shift: LLMs move from passive responders to active participants in software systems. By combining iterative reasoning, structured tool use, persistent memory, and multi-agent coordination, we unlock AI that can tackle ambiguous, multi-step problems — autonomously and reliably — at production scale.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {["ReAct Loop", "Tool Use", "Long-term Memory", "Multi-Agent", "Self-Reflection", "Observability"].map((tag) => (
                            <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-500/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                        <a
                            href="https://github.com/stefanoauciello"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary inline-flex items-center gap-2 text-sm"
                        >
                            <FaExternalLinkAlt size={12} /> View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
