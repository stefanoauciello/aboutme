import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaDatabase,
    FaBolt,
    FaStream,
    FaBoxes,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaLink,
    FaCode,
    FaLayerGroup,
    FaShieldAlt,
    FaSearch,
    FaSyncAlt,
    FaServer,
    FaExclamationTriangle,
    FaFilter,
    FaHistory,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const pipelineStages = [
    {
        id: "source",
        stepNumber: "01",
        name: "Source OLTP Database",
        shortName: "Source DB",
        tech: "PostgreSQL / MySQL / Oracle",
        icon: FaDatabase,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "ACID Write-Ahead Log",
        tagline: "Transactions committed directly to internal write logs (WAL / Binlog)",
        role: "Primary transactional database handling user queries. Instead of executing resource-intensive polling queries, changes are intercepted from low-level transaction logs (e.g. Postgres WAL via pgoutput, MySQL binary logs, Oracle Redo logs).",
        specs: [
            { label: "Capture Mechanism", value: "Log-level reading (WAL / binlog / Redo)" },
            { label: "Query Overhead", value: "0% query load on SQL engine" },
            { label: "Consistency Model", value: "Strict local ACID transaction boundary" },
        ],
    },
    {
        id: "engine",
        stepNumber: "02",
        name: "CDC Capture Engine",
        shortName: "Debezium Connector",
        tech: "Debezium / Kafka Connect",
        icon: FaSyncAlt,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Non-Invasive Log Miner",
        tagline: "Tails sequential transaction logs with sub-millisecond latency",
        role: "A specialized distributed connector running on Kafka Connect. It tails transaction logs continuously, translates raw binary row changes into structured JSON/Avro events, and guarantees reliable offset tracking (LSN) for seamless failover.",
        specs: [
            { label: "Propagation Latency", value: "Sub-second (< 50ms - 200ms)" },
            { label: "Offset Management", value: "Exact LSN checkpointing" },
            { label: "Schema Compatibility", value: "Schema Registry / Avro / CloudEvents" },
        ],
    },
    {
        id: "streaming",
        stepNumber: "03",
        name: "Distributed Event Stream",
        shortName: "Apache Kafka",
        tech: "Kafka / Redpanda Topics",
        icon: FaStream,
        color: "text-red-500",
        border: "border-red-500/30",
        bg: "bg-red-500/10",
        badge: "Ordered Event Backbone",
        tagline: "Partitioned, immutable, and replayable change log stream",
        role: "Acts as the central event nervous system. Change events are partitioned by entity primary key (e.g., order_id), guaranteeing strict in-order delivery. Provides high-throughput fan-out, persistent log retention, and replay capability.",
        specs: [
            { label: "Ordering Guarantee", value: "Strict per-partition sequential ordering" },
            { label: "Scalability", value: "Horizontal partitioning across brokers" },
            { label: "Replayability", value: "Configurable time/size-based retention" },
        ],
    },
    {
        id: "processing",
        stepNumber: "04",
        name: "Stream Routing & Transform",
        shortName: "Stream Processing",
        tech: "Apache Flink / Kafka Streams / Lambda",
        icon: FaFilter,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "In-Flight Transformation",
        tagline: "Applies real-time enrichment, PII masking, and routing",
        role: "Optional real-time stream processing layer. Filters internal table columns, anonymizes sensitive GDPR/PII fields, enriches payloads with external metadata, and dynamically routes events to target queues and consumer topics.",
        specs: [
            { label: "Processing Model", value: "Event-by-event stateless or windowed" },
            { label: "Data Governance", value: "Automated PII scrubbing & validation" },
            { label: "Routing Strategy", value: "Content-based topic multiplexing" },
        ],
    },
    {
        id: "sinks",
        stepNumber: "05",
        name: "Downstream Target Sinks",
        shortName: "Target Sinks",
        tech: "Elastic / Redis / Lakehouse / Services",
        icon: FaBoxes,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Zero-Lag Materialization",
        tagline: "Instant sync across search, in-memory caches, and microservices",
        role: "Independent consumers materializing specialized read projections: indexing full-text search in Elasticsearch, invalidating or warming Redis caches, feeding analytics into Snowflake/Iceberg, and triggering async microservices.",
        specs: [
            { label: "Eventual Consistency", value: "Near real-time sync across meshes" },
            { label: "Source Decoupling", value: "Downstream load never touches OLTP DB" },
            { label: "Consumer Ecosystem", value: "Search, Caches, Lakehouse, Microservices" },
        ],
    },
];

const comparisonMatrix = [
    {
        aspect: "Source Database Impact",
        polling: "Heavy CPU spikes, periodic SELECT * scans, locks on indexed columns",
        cdc: "Zero query lock; lightweight binary log tailing with negligible CPU overhead",
        better: "cdc",
    },
    {
        aspect: "Delete Detection",
        polling: "Cannot detect hard deletes without soft-delete flags or costly audit triggers",
        cdc: "Natively captured as 'd' events; emits automatic tombstone markers for cache cleanup",
        better: "cdc",
    },
    {
        aspect: "Replication Latency",
        polling: "High latency bound by batch intervals (e.g. 5m, 15m, or hourly polling)",
        cdc: "Sub-second streaming latency (< 100ms typical end-to-end)",
        better: "cdc",
    },
    {
        aspect: "Intermediate State Changes",
        polling: "Missed completely: multiple quick updates between polls collapse into the latest row state",
        cdc: "100% captured: preserves every sequential state mutation in chronological order",
        better: "cdc",
    },
    {
        aspect: "Network & I/O Footprint",
        polling: "Transmits full datasets or unchanged rows repetitively over the wire",
        cdc: "Streams compact differential deltas only when state mutations occur",
        better: "cdc",
    },
    {
        aspect: "Schema Evolution & Safety",
        polling: "Fragile; schema modifications break SQL queries or trigger runtime deserialization bugs",
        cdc: "Schema Registry enforces backward/forward compatibility and schema validation",
        better: "cdc",
    },
];

const samplePayloads = {
    insert: {
        title: "INSERT Operation (op: 'c')",
        desc: "A customer creates a new order in PostgreSQL. Debezium captures the WAL commit and outputs an event with the initial state in the 'after' block.",
        code: `{
  "schema": { "type": "struct", "name": "inventory.orders.Envelope" },
  "payload": {
    "before": null,
    "after": {
      "order_id": 10482,
      "customer_id": "cust_8821",
      "total_amount": 149.90,
      "status": "PENDING",
      "created_at": "2026-09-16T11:20:00Z"
    },
    "source": {
      "version": "2.6.0.Final",
      "connector": "postgresql",
      "name": "dbserver1",
      "ts_ms": 1789550400120,
      "db": "production_oltp",
      "schema": "public",
      "table": "orders",
      "lsn": 349182048
    },
    "op": "c",
    "ts_ms": 1789550400155
  }
}`,
    },
    update: {
        title: "UPDATE Operation (op: 'u')",
        desc: "Order status changes from 'PENDING' to 'PAID'. Both previous ('before') and updated ('after') states are captured, allowing consumers to detect exact property diffs.",
        code: `{
  "schema": { "type": "struct", "name": "inventory.orders.Envelope" },
  "payload": {
    "before": {
      "order_id": 10482,
      "customer_id": "cust_8821",
      "total_amount": 149.90,
      "status": "PENDING",
      "created_at": "2026-09-16T11:20:00Z"
    },
    "after": {
      "order_id": 10482,
      "customer_id": "cust_8821",
      "total_amount": 149.90,
      "status": "PAID",
      "created_at": "2026-09-16T11:20:00Z"
    },
    "source": {
      "version": "2.6.0.Final",
      "connector": "postgresql",
      "name": "dbserver1",
      "ts_ms": 1789550404310,
      "db": "production_oltp",
      "schema": "public",
      "table": "orders",
      "lsn": 349183890
    },
    "op": "u",
    "ts_ms": 1789550404342
  }
}`,
    },
    delete: {
        title: "DELETE Operation (op: 'd')",
        desc: "A record is deleted from the source table. The payload preserves the 'before' state for auditing, sets 'after' to null, and Kafka emits a tombstone to clear downstream caches.",
        code: `{
  "schema": { "type": "struct", "name": "inventory.orders.Envelope" },
  "payload": {
    "before": {
      "order_id": 10482,
      "customer_id": "cust_8821",
      "total_amount": 149.90,
      "status": "CANCELLED",
      "created_at": "2026-09-16T11:20:00Z"
    },
    "after": null,
    "source": {
      "version": "2.6.0.Final",
      "connector": "postgresql",
      "name": "dbserver1",
      "ts_ms": 1789550410880,
      "db": "production_oltp",
      "schema": "public",
      "table": "orders",
      "lsn": 349185120
    },
    "op": "d",
    "ts_ms": 1789550410905
  }
}`,
    },
};

const productionUseCases = [
    {
        icon: FaSearch,
        title: "Real-Time Search Indexing",
        description: "Mirror PostgreSQL or MongoDB changes into Elasticsearch / OpenSearch with zero latency, keeping search catalogs up-to-date without background index re-crawls.",
        tech: "Postgres ➔ Debezium ➔ Kafka ➔ OpenSearch",
    },
    {
        icon: FaBolt,
        title: "Event-Driven Cache Invalidation",
        description: "Automatically invalidate or warm Redis and Memcached entries whenever an entity is updated in the primary datastore, eliminating stale cache bugs.",
        tech: "MySQL ➔ Debezium ➔ Redis Sink",
    },
    {
        icon: FaHistory,
        title: "Zero-Downtime Database Migration",
        description: "Replicate production traffic continuously from legacy on-prem databases (Oracle, DB2) to cloud-native platforms (MongoDB Atlas, Aurora) prior to cutover.",
        tech: "Oracle GoldenGate / AWS DMS ➔ Cloud DB",
    },
    {
        icon: FaLayerGroup,
        title: "Analytical Lakehouse Streaming",
        description: "Stream microsecond database deltas into ClickHouse, Apache Iceberg, or Snowflake without batch ETL bottlenecks or source table locking.",
        tech: "Kafka ➔ Flink ➔ Apache Iceberg / Snowflake",
    },
];

const technologies = [
    {
        category: "Source Database Logs",
        tools: "PostgreSQL (pgoutput WAL), MySQL (Row Binlog), MongoDB (Oplog), Oracle (Redo Log)",
    },
    {
        category: "CDC Engines & Connectors",
        tools: "Debezium, Kafka Connect, AWS Database Migration Service (DMS), Oracle GoldenGate, Striim",
    },
    {
        category: "Distributed Event Brokers",
        tools: "Apache Kafka, Redpanda, AWS Kinesis, Azure Event Hubs",
    },
    {
        category: "Stream Analytics & Sinks",
        tools: "Apache Flink, Kafka Streams, Elasticsearch, Redis, ClickHouse, Apache Iceberg",
    },
];

export default function CDC() {
    const [selectedStage, setSelectedStage] = useState(pipelineStages[1]);
    const [activePayloadTab, setActivePayloadTab] = useState("update");

    return (
        <PageLayout 
            title="Change Data Capture (CDC)" 
            subtitle="Stream database modifications in real-time with sub-second latency and zero query polling overhead."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Visual Interactive Architecture Pipeline */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                                Interactive Architecture Pipeline
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Transaction Log-Based Streaming Topology
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
                                            ? "bg-primary-500/15 border-primary-500 shadow-md shadow-primary-500/10 ring-1 ring-primary-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-primary-500/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-primary-500 dark:text-primary-400">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
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
                                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full border border-primary-500/20 w-fit">
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
                        <strong>Change Data Capture (CDC)</strong> is an architectural pattern that tracks, captures, and streams every data modification (INSERT, UPDATE, and DELETE) from an operational database directly into an event backbone in real time.
                    </p>
                    <p>
                        In legacy architectures, systems relied on periodic batch queries (polling) to detect changes. Polling introduces severe latency, wastes compute scanning millions of unchanged rows, and risks locking production databases during traffic spikes. CDC bypasses the SQL execution engine entirely by tapping directly into the database&apos;s low-level <strong>Write-Ahead Log (WAL)</strong> or binary commit log, capturing modifications in microseconds with near-zero transactional overhead.
                    </p>
                </div>

                {/* Comparison Section: Log-Based CDC vs. Polling */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Architecture Trade-Offs
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Log-Based CDC vs. Traditional Polling
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Metric</th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-3/8">
                                        Traditional Query Polling
                                    </th>
                                    <th className="p-4 font-bold text-primary-600 dark:text-primary-400 w-3/8">
                                        Log-Based CDC (Debezium/Kafka)
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
                                            <span>{item.polling}</span>
                                        </td>
                                        <td className="p-4 text-slate-850 dark:text-slate-200">
                                            <div className="flex items-start gap-2">
                                                <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                                                <span className="font-medium">{item.cdc}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* The Transactional Outbox Pattern Section */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 bg-gradient-to-br from-slate-50/70 to-slate-100/40 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 mt-1">
                            <FaShieldAlt size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                Critical Resilience Pattern
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Solving Dual-Writes with the Transactional Outbox Pattern
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        A notorious antipattern in microservices is the <strong>Dual-Write Problem</strong>: an application writes to a database and attempts to publish an event to Apache Kafka in the same API call. If the broker times out, the database commit persists without an event. If the database rolls back after publishing, ghost events poison downstream services. Two-Phase Commit (2PC) is notoriously fragile and kills throughput.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                                <FaExclamationTriangle size={15} />
                                <span>The Naive Dual-Write Dilemma</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Application calls <code className="text-rose-500 font-mono text-xs">db.save(entity)</code> followed by <code className="text-rose-500 font-mono text-xs">kafka.send(event)</code>. A network partition between the application and Kafka leaves the database committed while downstream services never learn of the change, introducing silent data inconsistency.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                <FaCheckCircle size={15} />
                                <span>The Transactional Outbox + CDC Fix</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                                The application saves both the entity and an outbox record inside the <strong>same local ACID transaction</strong> in the database. Debezium tails the Outbox table via CDC and reliably forwards the messages to Kafka, providing guaranteed at-least-once delivery with zero dual-write risk.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Event Payload Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Live Event Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Debezium CDC Envelope Payload Structure
                            </h3>
                        </div>

                        {/* Operation Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(samplePayloads).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActivePayloadTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                        activePayloadTab === key
                                            ? "bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {samplePayloads[activePayloadTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {samplePayloads[activePayloadTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-primary-400" />
                                <span>kafka-topic: production.orders</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                application/json
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {samplePayloads[activePayloadTab].code}
                        </pre>
                    </div>
                </div>

                {/* Production Use Cases */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Production Use Cases & Architectural Patterns
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {productionUseCases.map((useCase) => {
                            const Icon = useCase.icon;
                            return (
                                <motion.div 
                                    key={useCase.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {useCase.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {useCase.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-primary-600 dark:text-primary-400 bg-primary-500/5 px-2.5 py-1 rounded border border-primary-500/15 w-fit">
                                        {useCase.tech}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Modern Ecosystem & Tooling */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Modern CDC Ecosystem & Tooling
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

                {/* Project Showcase & Call to Action */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-4 text-center bg-gradient-to-b from-primary-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Explore My Real-World CDC Implementation
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Check out my end-to-end e-commerce transactional pipeline demonstrating real-time order synchronization across microservices using Debezium, Apache Kafka, Node.js serverless functions, and MongoDB Atlas.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-3">
                            {["Java / Spring Boot", "Debezium", "Apache Kafka", "Node.js Lambda", "MongoDB Atlas"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a
                            href="https://github.com/stefanoauciello/e-commerce-cdc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary gap-2 inline-flex items-center"
                        >
                            <FaLink size={12} /> View e-commerce-cdc on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
