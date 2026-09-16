import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBolt,
    FaBroadcastTower,
    FaBoxes,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaCode,
    FaShieldAlt,
    FaServer,
    FaExclamationTriangle,
    FaPaperPlane,
    FaInbox,
    FaRandom,
    FaProjectDiagram,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const pipelineStages = [
    {
        id: "producer",
        stepNumber: "01",
        name: "Event Producer",
        shortName: "Producer Service",
        tech: "Auth API / Checkout Service",
        icon: FaPaperPlane,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "State Mutation",
        tagline: "Emits domain events asynchronously when transactions complete",
        role: "The originating microservice that completes a local transaction (e.g. creating an order or registering a user) and broadcasts an immutable domain event representing a fact that has occurred.",
        specs: [
            { label: "Execution Pattern", value: "Non-blocking, fire-and-forget emit" },
            { label: "Coupling", value: "Zero knowledge of downstream subscribers" },
            { label: "Contract Standard", value: "CloudEvents / JSON Schema / Avro" },
        ],
    },
    {
        id: "broker",
        stepNumber: "02",
        name: "Event Broker / Topic",
        shortName: "Message Topic",
        tech: "Amazon SNS / Kafka / EventBridge",
        icon: FaBroadcastTower,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "Pub/Sub Fanout",
        tagline: "Receives events and broadcasts them to multiple subscriber queues",
        role: "The central publish-subscribe message router. Receives messages from producers and fans them out across multiple bound target queues based on subscription rules and attribute filter policies.",
        specs: [
            { label: "Routing Model", value: "1-to-N Topic Fanout distribution" },
            { label: "Message Filtering", value: "Header & attribute-based evaluation" },
            { label: "Throughput", value: "Virtually unlimited burst ingestion" },
        ],
    },
    {
        id: "queuing",
        stepNumber: "03",
        name: "Queue Buffering & DLQ",
        shortName: "Queue Buffer",
        tech: "Amazon SQS / RabbitMQ / Kafka",
        icon: FaInbox,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "Shock Absorber",
        tagline: "Isolates consumer workloads, buffers spikes, and isolates errors",
        role: "Provides persistent message buffering between brokers and individual consumer microservices. Acts as a shock absorber during traffic spikes and routes repeated failures to a Dead-Letter Queue (DLQ).",
        specs: [
            { label: "Delivery Guarantee", value: "At-least-once (or FIFO strictly ordered)" },
            { label: "Fault Isolation", value: "Dead-Letter Queue (DLQ) after N retries" },
            { label: "Backpressure", value: "Decouples producer rate from consumer rate" },
        ],
    },
    {
        id: "consumers",
        stepNumber: "04",
        name: "Consumer Workers",
        shortName: "Async Workers",
        tech: "Lambda / ECS / Spring Boot",
        icon: FaBoxes,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Independent Scaling",
        tagline: "Process messages concurrently at their own optimal pace",
        role: "Dedicated microservices, serverless functions, or background containers that pull or receive messages from their dedicated queues and execute specific business tasks completely in parallel.",
        specs: [
            { label: "Scaling Trigger", value: "Autoscales based on Queue Backlog (Depth)" },
            { label: "Idempotency", value: "Idempotency key check prevents duplicates" },
            { label: "Concurrency", value: "Parallel batch or worker processing" },
        ],
    },
    {
        id: "projections",
        stepNumber: "05",
        name: "Sinks & Side-Effects",
        shortName: "Downstream Sinks",
        tech: "SES / Analytics / Read Projections",
        icon: FaProjectDiagram,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Eventual Consistency",
        tagline: "Materializes read models, sends emails, and triggers integrations",
        role: "The ultimate outcome of event processing: transactional email dispatch via SES, updating CQRS read databases, updating third-party webhooks, or streaming into analytical data lakes.",
        specs: [
            { label: "Consistency", value: "Eventual consistency across domains" },
            { label: "Extensibility", value: "Add new sinks with zero producer changes" },
            { label: "Auditability", value: "Immutable historical log of domain facts" },
        ],
    },
];

const comparisonData = [
    {
        metric: "Coupling & Dependencies",
        sync: "Tight temporal & spatial coupling: Producer must know consumer URL and wait for response",
        eda: "Complete decoupling: Producer emits events without knowing who consumes them",
        better: "eda",
    },
    {
        metric: "Failure Blast Radius",
        sync: "Cascading outages: If downstream service stalls, caller threads exhaust and crash",
        eda: "Fault isolated: Messages buffer safely in queues while failing consumers self-heal",
        better: "eda",
    },
    {
        metric: "Traffic Spikes & Shock Absorption",
        sync: "Unbuffered: Sudden 10x traffic spikes overload backend and trigger 504 Gateway Timeouts",
        eda: "Buffered: Queues absorb traffic surges; consumers pull messages at a safe, steady rate",
        better: "eda",
    },
    {
        metric: "System Extensibility",
        sync: "Rigid: Adding a new subscriber requires editing, re-testing, and deploying the caller service",
        eda: "Plug-and-play: Simply attach a new queue to the topic; zero changes to existing producers",
        better: "eda",
    },
    {
        metric: "Performance & Latency",
        sync: "Cumulative latency: Request duration is sum of all synchronous chained calls",
        eda: "Sub-second response: Caller completes immediate local commit; work runs concurrently",
        better: "eda",
    },
    {
        metric: "Debugging & Tracing",
        sync: "Simple linear stack traces and synchronous error returns",
        eda: "Requires distributed correlation IDs (W3C TraceContext) and centralized logging",
        better: "sync",
    },
];

const sampleEvents = {
    userRegistered: {
        title: "UserRegistered Event (CloudEvents 1.0)",
        desc: "Auth service emits a domain event upon successful signup. Email, CRM, and Analytics consumers ingest this simultaneously.",
        code: `{
  "specversion": "1.0",
  "id": "evt_9981af32-12ef-4d66",
  "source": "/services/auth-service",
  "type": "com.company.auth.UserRegistered",
  "datacontenttype": "application/json",
  "time": "2026-09-16T11:28:00Z",
  "data": {
    "userId": "usr_882049",
    "email": "stefano@example.com",
    "fullName": "Stefano Auciello",
    "tier": "PREMIUM",
    "registeredAt": "2026-09-16T11:27:58Z"
  }
}`,
    },
    orderPlaced: {
        title: "OrderPlaced Event (CloudEvents 1.0)",
        desc: "Checkout service completes order creation. Warehouse allocation, payment capture, and notification services react asynchronously.",
        code: `{
  "specversion": "1.0",
  "id": "evt_4412bc90-9988-43bb",
  "source": "/services/checkout-service",
  "type": "com.company.order.OrderPlaced",
  "datacontenttype": "application/json",
  "time": "2026-09-16T11:28:04Z",
  "data": {
    "orderId": "ord_104820",
    "customerId": "usr_882049",
    "currency": "EUR",
    "amount": 289.50,
    "items": [
      { "sku": "DEV-BOOK-01", "quantity": 1, "price": 49.50 },
      { "sku": "HW-KEY-PRO", "quantity": 2, "price": 120.00 }
    ],
    "idempotencyKey": "idemp_ord_104820_v1"
  }
}`,
    },
    paymentAuthorized: {
        title: "PaymentAuthorized Event (CloudEvents 1.0)",
        desc: "Payment gateway processes charge. Triggers shipment preparation and updates order fulfillment projection.",
        code: `{
  "specversion": "1.0",
  "id": "evt_7721cc81-3311-4fa1",
  "source": "/services/payment-service",
  "type": "com.company.payment.PaymentAuthorized",
  "datacontenttype": "application/json",
  "time": "2026-09-16T11:28:09Z",
  "data": {
    "paymentId": "pay_90182",
    "orderId": "ord_104820",
    "method": "CREDIT_CARD",
    "gatewayRef": "ch_3Nk1J92eZvKYlo2C",
    "status": "AUTHORIZED",
    "authorizedAt": "2026-09-16T11:28:08Z"
  }
}`,
    },
};

const productionPatterns = [
    {
        icon: FaBroadcastTower,
        title: "Pub/Sub Message Fan-Out",
        description: "A single event published to an SNS topic is replicated into multiple SQS queues, executing notifications, fraud checks, and billing in parallel without inter-service coupling.",
        tech: "Amazon SNS ➔ Amazon SQS (Multi-Queue)",
    },
    {
        icon: FaRandom,
        title: "Saga Pattern: Choreography vs. Orchestration",
        description: "Coordinate long-running distributed transactions across microservices. Choose event choreography for lightweight flows, or centralized orchestrators (Temporal, Step Functions) for complex state rollbacks.",
        tech: "Event Choreography / AWS Step Functions",
    },
    {
        icon: FaShieldAlt,
        title: "Idempotent Consumer Processing",
        description: "Guarantees safe message retries in at-least-once delivery networks. Consumers check a distributed cache (Redis) for processed event IDs before executing side-effects.",
        tech: "Redis Distributed Locks & Idempotency Keys",
    },
    {
        icon: FaExclamationTriangle,
        title: "Dead-Letter Queue (DLQ) & Circuit Breaking",
        description: "Isolates unprocessable 'poison pill' messages after exponential backoff retries, alerting on-call engineers while preventing consumer queue blockages.",
        tech: "SQS Dead-Letter Queue + CloudWatch Alarms",
    },
];

const technologies = [
    {
        category: "Event Brokers & Pub/Sub Topics",
        tools: "Amazon SNS, Apache Kafka, Google Cloud Pub/Sub, AWS EventBridge, RabbitMQ Exchange",
    },
    {
        category: "Message Queuing & Buffering",
        tools: "Amazon SQS, RabbitMQ Queues, Redis Streams, Azure Service Bus, Apache Pulsar",
    },
    {
        category: "Distributed Workflow Orchestration",
        tools: "Temporal.io, AWS Step Functions, Zeebe / Camunda, Netflix Conductor",
    },
    {
        category: "Schema & Event Standards",
        tools: "CNCF CloudEvents, AsyncAPI, Apache Avro, Protocol Buffers, JSON Schema",
    },
];

export default function EventDrivenArchitecture() {
    const [selectedStage, setSelectedStage] = useState(pipelineStages[1]);
    const [activeTab, setActiveTab] = useState("orderPlaced");

    return (
        <PageLayout 
            title="Event-Driven Architecture (EDA)" 
            subtitle="Design highly decoupled, fault-tolerant systems using asynchronous pub/sub messaging and event choreography."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Interactive Architecture Pipeline Visualizer */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                Interactive Architecture Topology
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Pub/Sub Message Fan-Out & Asynchronous Worker Pipeline
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md w-fit">
                            Click stages to inspect details
                        </span>
                    </div>

                    {/* Pipeline Stage Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {pipelineStages.map((stage, idx) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStage.id === stage.id;
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                                        isSelected
                                            ? "bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-amber-500/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
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
                                    {idx < pipelineStages.length - 1 && (
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
                                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 w-fit">
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
                        <strong>Event-Driven Architecture (EDA)</strong> is a distributed design paradigm where microservices communicate asynchronously by emitting and reacting to domain events rather than chaining synchronous REST or RPC HTTP calls.
                    </p>
                    <p>
                        In synchronous architectures, a single slow downstream dependency cascades upstream, causing thread exhaustion, HTTP 504 timeouts, and cascading system outages. By contrast, an event-driven system decouples producers from consumers in both <em>space</em> (producers don&apos;t know who subscribes) and <em>time</em> (producers continue running immediately without waiting for consumers to finish). Queues act as resilient shock absorbers, shielding downstream services from traffic spikes and enabling elastic horizontal scaling.
                    </p>
                </div>

                {/* Comparison Section: Synchronous vs Asynchronous EDA */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Architecture Trade-Offs
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Synchronous Request-Response vs. Asynchronous EDA
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Metric</th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-3/8">
                                        Synchronous (REST / gRPC)
                                    </th>
                                    <th className="p-4 font-bold text-amber-600 dark:text-amber-400 w-3/8">
                                        Asynchronous EDA (Pub/Sub)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                {comparisonData.map((item) => (
                                    <tr key={item.metric} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                                            {item.metric}
                                        </td>
                                        <td className="p-4 text-slate-550 dark:text-slate-400 flex items-start gap-2">
                                            {item.better === "eda" ? (
                                                <FaTimesCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={14} />
                                            ) : (
                                                <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                                            )}
                                            <span>{item.sync}</span>
                                        </td>
                                        <td className="p-4 text-slate-850 dark:text-slate-200">
                                            <div className="flex items-start gap-2">
                                                {item.better === "eda" ? (
                                                    <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                                                ) : (
                                                    <FaExclamationTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={14} />
                                                )}
                                                <span className="font-medium">{item.eda}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Orchestration vs Choreography & Resilience Patterns */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 bg-gradient-to-br from-slate-50/70 to-slate-100/40 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 mt-1">
                            <FaRandom size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                Distributed Transaction Patterns
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Event Choreography vs. Event Orchestration
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        When multi-step business transactions cross service boundaries (e.g. creating an order, charging a card, reserving inventory), distributed transactions cannot use ACID database locking. The <strong>Saga Pattern</strong> coordinates these operations via compensating transactions using either choreography or orchestration.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 space-y-2.5">
                            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-sm">
                                <FaBolt size={15} />
                                <span>Event Choreography (Decentralized)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Services publish and subscribe to domain events directly. Service A finishes and publishes <code className="text-primary-500 font-mono text-xs">OrderCreated</code>; Service B listens, completes its step, and publishes <code className="text-primary-500 font-mono text-xs">PaymentCharged</code>. Ideal for simple, fast flows with no central point of coordination.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 space-y-2.5">
                            <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 font-bold text-sm">
                                <FaProjectDiagram size={15} />
                                <span>Event Orchestration (Central Controller)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                A central state machine (such as <strong>AWS Step Functions</strong> or <strong>Temporal</strong>) explicitly commands each participant service to execute tasks and triggers compensating undo logic if any step fails. Best for complex, mission-critical workflows with strict audit trails.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive CloudEvents Payload Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Specification Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Standardized CNCF CloudEvents 1.0 Payload
                            </h3>
                        </div>

                        {/* Event Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(sampleEvents).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === key
                                            ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {sampleEvents[activeTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {sampleEvents[activeTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-amber-400" />
                                <span>cloudevents-envelope: v1.0</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                application/cloudevents+json
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {sampleEvents[activeTab].code}
                        </pre>
                    </div>
                </div>

                {/* Production Architecture Patterns */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Production Architectural Patterns
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {productionPatterns.map((pattern) => {
                            const Icon = pattern.icon;
                            return (
                                <motion.div 
                                    key={pattern.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {pattern.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {pattern.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/15 w-fit">
                                        {pattern.tech}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Modern Ecosystem & Tooling */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Modern Event-Driven Ecosystem & Tooling
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {technologies.map((tech) => (
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

                {/* Real-World Production Architecture Highlight */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-4 text-center bg-gradient-to-b from-amber-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Engineered for Elasticity & Zero Downtime
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            By decoupling services into asynchronous event streams, distributed platforms effortlessly absorb Black Friday flash sales, prevent cascading service brownouts, and allow cross-functional teams to deploy independent microservices without coordination bottlenecks.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
                            {["Amazon SNS", "Amazon SQS", "Apache Kafka", "CloudEvents", "Dead-Letter Queues", "Temporal.io"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
