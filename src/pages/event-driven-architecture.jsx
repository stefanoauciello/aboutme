import { motion } from "framer-motion";
import {
    FaBolt,
    FaBroadcastTower,
    FaBoxOpen,
    FaFileAlt,
    FaProjectDiagram,
    FaDatabase,
    FaCheckCircle,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const keyConcepts = [
    {
        icon: FaBolt,
        title: "Event Producers",
        description: "Services that publish messages notifying downstream nodes that a lifecycle state change occurred.",
    },
    {
        icon: FaBroadcastTower,
        title: "Event Brokers",
        description: "Orchestration nodes (like SNS or Kafka) responsible for routing messages to subscribers.",
    },
    {
        icon: FaBoxOpen,
        title: "Event Consumers",
        description: "Subscribed systems that read events from queues or channels and trigger isolated operations.",
    },
    {
        icon: FaFileAlt,
        title: "Event Message",
        description: "An immutable data payload capturing the exact state changes at a point in time.",
    },
    {
        icon: FaProjectDiagram,
        title: "Event Channel",
        description: "A secure pipe, such as an SQS queue or SNS topic, carrying messages between nodes.",
    },
    {
        icon: FaDatabase,
        title: "Event Store",
        description: "A durable history of raw published logs, facilitating diagnostics, audits, or state replays.",
    },
];

const benefits = [
    "Strict separation of concern boundaries: producers require no logic or awareness of consumer services.",
    "Highly elastic, horizontally autoscaling capacity under burst workloads.",
    "Improved resilience: failures in target processors do not compromise the stability of client systems.",
    "Ease of extension: integration of new analytics or audit triggers requires zero write updates to producers.",
];

const EventDrivenArchitecture = () => {
    return (
        <PageLayout 
            title="Event-Driven Architecture" 
            subtitle="Design highly decoupled, fault-tolerant systems using asynchronous pub/sub messaging."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Diagram Section */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}eda-architecture.png`}
                        alt="EDA Architecture Diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Pub/Sub Message Fanout & Queue Routing Architecture
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        Event-Driven Architecture (EDA) is a design paradigm where microservices communicate asynchronously by publishing and reacting to events rather than chaining synchronous RPC or HTTP requests.
                    </p>
                    <p>
                        When a business transaction occurs, the orchestrating service publishes an immutable event message containing state context. Event brokers handle delivery, fanning messages out to subscribed queues. Because consumers process messages independently, developers can build scalable, resilient platforms that survive peaks and partial downtime.
                    </p>
                </div>

                {/* Key Concepts Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Core Concepts
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        variants={animations.gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {keyConcepts.map((concept) => {
                            const Icon = concept.icon;
                            return (
                                <motion.div
                                    key={concept.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
                                >
                                    <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                                            {concept.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                                            {concept.description}
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
                        Architecture Benefits
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-650 dark:text-slate-350">
                                <FaCheckCircle className="text-emerald-500 dark:text-emerald-450 mt-1 flex-shrink-0" size={16} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Practical Example: User Registration */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Practical Flow: User Signup
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            An event chain utilizing Amazon SNS, Amazon SQS, and Amazon SES.
                        </p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-6 text-sm sm:text-base">
                        <div className="relative">
                            <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 ring-4 ring-slate-50 dark:ring-slate-900" />
                            <strong className="text-slate-800 dark:text-slate-200 block">1. Registration Event Published</strong>
                            <span className="text-slate-600 dark:text-slate-450 mt-0.5 block leading-relaxed">
                                The backend Auth Service completes account writing and broadcasts a <code>UserRegistered</code> event onto an Amazon SNS topic.
                            </span>
                        </div>
                        
                        <div className="relative">
                            <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 ring-4 ring-slate-50 dark:ring-slate-900" />
                            <strong className="text-slate-800 dark:text-slate-200 block">2. Routing & Fanout</strong>
                            <span className="text-slate-600 dark:text-slate-450 mt-0.5 block leading-relaxed">
                                SNS replicates the event payload and pushes a copy into two subscribed SQS queues: the Email Queue and the Marketing Analytics Queue.
                            </span>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 ring-4 ring-slate-50 dark:ring-slate-900" />
                            <strong className="text-slate-800 dark:text-slate-200 block">3. Asynchronous Execution</strong>
                            <span className="text-slate-600 dark:text-slate-450 mt-0.5 block leading-relaxed">
                                The Email Service polls its SQS queue, dispatching welcome templates through Amazon SES. Simultaneously, the Analytics Service reads from its queue to update tracking databases—entirely in parallel.
                            </span>
                        </div>
                    </div>

                    {/* Code Highlight Box */}
                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Event Payload Example (JSON)
                        </span>
                        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-900 shadow-inner font-mono text-xs sm:text-sm p-4 text-left">
                            <pre className="text-emerald-400">
                                <span className="text-slate-500">{`{`}</span>
                                <br />
                                {`  `}
                                <span className="text-violet-400">&quot;eventType&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-amber-300">&quot;UserRegistered&quot;</span>
                                <span className="text-slate-400">,</span>
                                <br />
                                {`  `}
                                <span className="text-violet-400">&quot;timestamp&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-amber-300">&quot;2026-05-29T15:38:22Z&quot;</span>
                                <span className="text-slate-400">,</span>
                                <br />
                                {`  `}
                                <span className="text-violet-400">&quot;payload&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-slate-500">{`{`}</span>
                                <br />
                                {`    `}
                                <span className="text-violet-400">&quot;userId&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-amber-300">&quot;usr_9x8e1a&quot;</span>
                                <span className="text-slate-400">,</span>
                                <br />
                                {`    `}
                                <span className="text-violet-400">&quot;email&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-amber-300">&quot;stefano@example.com&quot;</span>
                                <span className="text-slate-400">,</span>
                                <br />
                                {`    `}
                                <span className="text-violet-400">&quot;name&quot;</span>
                                <span className="text-slate-400">:</span>{" "}
                                <span className="text-amber-300">&quot;Stefano Auciello&quot;</span>
                                <br />
                                {`  `}
                                <span className="text-slate-500">{`}`}</span>
                                <br />
                                <span className="text-slate-500">{`}`}</span>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default EventDrivenArchitecture;
