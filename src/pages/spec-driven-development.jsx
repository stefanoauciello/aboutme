import { motion } from "framer-motion";
import {
    FaDraftingCompass,
    FaFileCode,
    FaCogs,
    FaCheckCircle,
    FaShieldAlt,
    FaRobot,
    FaSyncAlt,
    FaLayerGroup,
    FaExchangeAlt,
    FaLaptopCode,
    FaArrowRight,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const workflowSteps = [
    {
        step: "01",
        title: "Formal Specification",
        desc: "Define schemas, API contracts, domain invariants, edge cases, and acceptance criteria in machine-readable formats.",
        icon: FaDraftingCompass,
        badge: "Contract First",
    },
    {
        step: "02",
        title: "Agentic Decomposition",
        desc: "Autonomous AI agents parse the specification, construct a DAG dependency plan, and bound the task scope.",
        icon: FaRobot,
        badge: "Task Planning",
    },
    {
        step: "03",
        title: "Code & Test Synthesis",
        desc: "Co-generate implementation code alongside synthetic unit, integration, and contract tests derived from the spec.",
        icon: FaFileCode,
        badge: "Synthesis",
    },
    {
        step: "04",
        title: "Closed-Loop Verification",
        desc: "Run hermetic tests and linters. If assertions fail, the agent self-heals the code until the spec is satisfied.",
        icon: FaSyncAlt,
        badge: "Self-Healing Loop",
    },
    {
        step: "05",
        title: "Living Contract Sync",
        desc: "Changes propagate back to documentation and client SDKs, eliminating drift between spec and production runtime.",
        icon: FaLayerGroup,
        badge: "Zero Drift",
    },
];

const corePillars = [
    {
        icon: FaFileCode,
        title: "Executable Single Source of Truth",
        description:
            "Specifications are no longer abandoned wiki pages. They become executable blueprints driving code generation, mocks, validation layers, and integration test suites.",
    },
    {
        icon: FaShieldAlt,
        title: "Guardrails Against AI Hallucination",
        description:
            "AI models produce drift and subtle regressions when prompted loosely. Formal specs supply the exact boundaries, constraints, and types required for deterministic outputs.",
    },
    {
        icon: FaSyncAlt,
        title: "Closed-Loop Self-Healing",
        description:
            "When tests fail during generation, the agent inspects the spec invariant, refines the implementation, and retries in an automated loop before opening a pull request.",
    },
    {
        icon: FaExchangeAlt,
        title: "Polyglot Contract Consistency",
        description:
            "Define an interface once in OpenAPI, Protobuf, or JSON Schema, and generate typed client libraries, server stubs, and mocks across Go, Java, TypeScript, and Python without drift.",
    },
    {
        icon: FaLaptopCode,
        title: "From Code Writers to System Architects",
        description:
            "Engineers spend less time writing boilerplate syntax and more time designing resilient distributed architectures, failure modes, security boundaries, and domain models.",
    },
    {
        icon: FaCogs,
        title: "Continuous Drift Detection",
        description:
            "Automated CI/CD pipelines compare runtime telemetry and schema outputs against the spec repository to flag unauthorized regressions or undocumented changes instantly.",
    },
];

const comparisonData = [
    {
        aspect: "Primary Artifact",
        vibe: "Ad-hoc chat prompts & unverified code",
        sdd: "Version-controlled, structured specification",
    },
    {
        aspect: "AI Role",
        vibe: "Unconstrained code generator",
        sdd: "Deterministic agent guided by testable invariants",
    },
    {
        aspect: "Verification",
        vibe: "Manual eyeball inspection & runtime surprises",
        sdd: "Automated synthesis of contract & property tests",
    },
    {
        aspect: "Architectural Integrity",
        vibe: "Rapid decay, duplicate logic, high drift",
        sdd: "Zero-drift modular architecture with clear boundaries",
    },
    {
        aspect: "Developer Experience",
        vibe: "Debugging endless hallucinated edge cases",
        sdd: "Focusing on domain design, performance & constraints",
    },
];

const toolingList = [
    {
        category: "Contract & Schema Standards",
        tools: "OpenAPI 3.1, AsyncAPI, JSON Schema, Protocol Buffers, TypeSpec",
    },
    {
        category: "Behavior & Invariant Specs",
        tools: "Cucumber / Gherkin, Markdown PRDs/ADRs, Pydantic, Zod",
    },
    {
        category: "Agentic Harnesses & Execution",
        tools: "Antigravity CLI / AGY Rules, Cursor Rules, Model Context Protocol (MCP), Claude Code",
    },
    {
        category: "Verification & Environments",
        tools: "Testcontainers, WireMock, Spectral (API linting), Playwright",
    },
];

export default function SpecDrivenDevelopment() {
    return (
        <PageLayout
            title="Spec-Driven Development (SDD)"
            subtitle="How executable specifications and AI coding agents are replacing vibe coding with deterministic, verifiable software engineering."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Interactive Workflow Diagram / Visual Flow */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35">
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                            The SDD Lifecycle Loop
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            From Intent to Production in 5 Automated Steps
                        </h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-5 relative">
                        {workflowSteps.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="relative flex flex-col justify-between p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500/40 transition-all group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono font-extrabold text-indigo-500">
                                                {item.step}
                                            </span>
                                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/60 px-1.5 py-0.5 rounded">
                                                {item.badge}
                                            </span>
                                        </div>
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {index < workflowSteps.length - 1 && (
                                        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-600">
                                            <FaArrowRight size={10} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-6 tracking-wide">
                        Closed feedback loop: Failures in Step 04 trigger Step 02/03 re-evaluation until all specification contracts pass.
                    </p>
                </div>

                {/* Main Narrative / Introduction */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        The software industry is experiencing a profound tectonic shift. Generative AI and autonomous coding agents have commoditized raw syntax generation. Developers can now produce hundreds of lines of code in seconds. However, this hyper-speed has surfaced an acute engineering crisis: <strong>code drift, architectural fragmentation, and subtle regressions</strong> caused by unconstrained prompting or &quot;vibe coding&quot;.
                    </p>
                    <p>
                        <strong>Spec-Driven Development (SDD)</strong> is the antidote. Rather than treating natural language prompts as the ultimate blueprint, SDD places formal, machine-readable specifications at the center of the software engineering lifecycle. The specification—whether an OpenAPI schema, an Architecture Decision Record (ADR), or a testable behavior contract—becomes the <em>single executable source of truth</em>.
                    </p>
                    <p>
                        In this new paradigm, AI agents are not left to guess intent. They are bounded by rigorous mathematical and behavioral constraints. The engineer acts as the <strong>lead architect and specification author</strong>, while autonomous agentic loops handle implementation, verification, and regression prevention.
                    </p>
                </div>

                {/* Core Pillars Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Pillars of Spec-Driven Development
                    </h3>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {corePillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3 text-left hover:-translate-y-1 transition-all"
                                >
                                    <div className="p-2.5 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1.5 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Vibe Coding vs Spec-Driven Development Comparison */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Paradigm Comparison: Vibe Coding vs. SDD
                    </h3>
                    <div className="glass-card overflow-hidden border border-slate-200/30 dark:border-slate-800/30">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                        <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Dimension</th>
                                        <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">Vibe Coding / Ad-Hoc AI</th>
                                        <th className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Spec-Driven Development</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                    {comparisonData.map((row) => (
                                        <tr key={row.aspect} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                                                {row.aspect}
                                            </td>
                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                {row.vibe}
                                            </td>
                                            <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                                                {row.sdd}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Tooling & Standards Ecosystem */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        The SDD Toolchain & Ecosystem
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {toolingList.map((item) => (
                            <div
                                key={item.category}
                                className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 space-y-2"
                            >
                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                                    {item.category}
                                </span>
                                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                                    {item.tools}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Why Engineering Teams are Adopting SDD
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-1 text-left">
                        {[
                            "90% reduction in API contract breaks across distributed microservice teams.",
                            "Elimination of cognitive fatigue caused by reviewing unstructured, hallucinated AI pull requests.",
                            "Seamless onboarding: new engineers and AI agents read the exact same living specifications.",
                            "Deterministic test suites generated automatically to probe edge cases before code touches staging.",
                            "Scalable leverage: a single staff engineer can orchestrate multiple autonomous agent swarms safely.",
                        ].map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-indigo-500 mt-1 flex-shrink-0" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Future Vision / Conclusion */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4 text-left bg-indigo-500/5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FaDraftingCompass className="text-indigo-500" /> The Future: The Engineer as System Orchestrator
                    </h3>
                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed">
                        Spec-Driven Development does not replace engineers; it elevates them. By delegating syntax emission to AI models bounded by strict contracts, engineers return to the essence of computer science: system architecture, data modeling, reliability invariants, security boundaries, and domain problem-solving. SDD is the foundation upon which the next generation of resilient, agent-assisted software will be built.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
