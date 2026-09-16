import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaDatabase,
    FaLayerGroup,
    FaCogs,
    FaShieldAlt,
    FaChartLine,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaCode,
    FaServer,
    FaSyncAlt,
    FaHistory,
    FaCloudUploadAlt,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const medallionStages = [
    {
        id: "ingestion",
        stepNumber: "01",
        name: "Sources & Ingestion",
        shortName: "Data Ingestion",
        tech: "Kafka / Airbyte / Debezium",
        icon: FaCloudUploadAlt,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "Multi-Source Feed",
        tagline: "Unifies real-time streaming event logs and scheduled batch feeds",
        role: "Captures transactional mutations via CDC (Debezium), clickstreams via Kafka, and SaaS CRM/ERP records via Airbyte or Fivetran without burdening source OLTP databases.",
        specs: [
            { label: "Ingestion Modes", value: "Real-time streaming & micro-batch" },
            { label: "Source Protocols", value: "CDC / Kafka / REST / S3 / JDBC" },
            { label: "Latency", value: "Sub-second streaming to hourly batch" },
        ],
    },
    {
        id: "bronze",
        stepNumber: "02",
        name: "Bronze Layer (Raw Landing)",
        shortName: "Bronze Storage",
        tech: "S3 / ADLS / Iceberg Raw",
        icon: FaDatabase,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Raw Immutable Log",
        tagline: "Append-only historical archive preserving exact original payloads",
        role: "The landing zone in cloud object storage where raw, unmodified payloads are appended. Preserves full historical auditability and allows reprocessing from scratch if downstream logic changes.",
        specs: [
            { label: "Storage Format", value: "Raw Parquet / JSON / Avro" },
            { label: "Mutation Policy", value: "Strict append-only, immutable history" },
            { label: "Retention", value: "Indefinite cold tier archiving" },
        ],
    },
    {
        id: "silver",
        stepNumber: "03",
        name: "Silver Layer (Cleaned & Conformed)",
        shortName: "Silver Refinement",
        tech: "Apache Spark / dbt / Flink",
        icon: FaCogs,
        color: "text-purple-500",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        badge: "Quality Cleansed",
        tagline: "Applies schema validation, deduplication, and PII anonymization",
        role: "Transforms raw data into cleaned, normalized tables. Enforces schema contracts, deduplicates records, validates domain constraints, scrubs sensitive PII for GDPR compliance, and joins related event streams.",
        specs: [
            { label: "Data Quality", value: "Automated assertion tests & null checks" },
            { label: "Table Format", value: "Apache Iceberg / Delta Lake (ACID)" },
            { label: "Transformation Engine", value: "dbt Core / Apache Spark / Trino" },
        ],
    },
    {
        id: "gold",
        stepNumber: "04",
        name: "Gold Layer (Business Aggregates)",
        shortName: "Gold Analytics",
        tech: "Star Schemas / Feature Stores",
        icon: FaLayerGroup,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Curated Data Marts",
        tagline: "High-performance dimensional models ready for instant querying",
        role: "Organized into business-level domains and dimensional models (facts and dimensions). Pre-aggregates core KPI metrics, churn predictions, and customer 360 profiles optimized for low-latency BI queries.",
        specs: [
            { label: "Modeling Paradigm", value: "Dimensional Star / Snowflake Schema" },
            { label: "Query Speed", value: "Sub-second analytical response" },
            { label: "Governance", value: "Granular column/row-level RBAC" },
        ],
    },
    {
        id: "consumption",
        stepNumber: "05",
        name: "Consumption & Data Products",
        shortName: "Self-Service BI",
        tech: "Power BI / ClickHouse / Reverse ETL",
        icon: FaChartLine,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Actionable Insights",
        tagline: "Empowers executive dashboards, ML feature stores, and operational apps",
        role: "Serves trusted data products to stakeholders: interactive BI reporting in Power BI or Superset, ultra-fast vector metrics in ClickHouse, and operational syncs via Reverse ETL back into production CRMs.",
        specs: [
            { label: "Consumers", value: "BI Analysts, ML Engineers, Execs" },
            { label: "Serving Tools", value: "Power BI, Superset, Census, APIs" },
            { label: "Value Output", value: "Self-service data democratization" },
        ],
    },
];

const architectureEvolution = [
    {
        aspect: "Core Storage & File Formats",
        warehouse: "Proprietary, closed database storage (high vendor lock-in)",
        lake: "Raw object storage (S3/GCS) with JSON/CSV (no ACID guarantees)",
        lakehouse: "Open table formats (Apache Iceberg, Delta Lake) on cheap object storage with ACID",
    },
    {
        aspect: "Query Performance & Cost",
        warehouse: "Fast analytical queries, but extremely high storage compute cost at petabyte scale",
        lake: "Inexpensive storage, but slow, inefficient table scans and query bottlenecks",
        lakehouse: "Sub-second vectorized querying (ClickHouse, Trino, Snowflake) at commodity storage pricing",
    },
    {
        aspect: "Data Consistency & Mutability",
        warehouse: "ACID transactions with full rollback support",
        lake: "Append-only, corruption-prone during concurrent writes, no rollback",
        lakehouse: "Full ACID transactions, snapshot isolation, and time-travel rollbacks",
    },
    {
        aspect: "Supported Workloads",
        warehouse: "Structured relational SQL queries exclusively",
        lake: "Machine learning and ad-hoc batch exploration",
        lakehouse: "Unified platform: SQL BI, Streaming CDC, Data Science, and Real-Time APIs",
    },
];

const sampleArtifacts = {
    dataContract: {
        title: "Upstream Data Contract (YAML / OpenDataContract)",
        desc: "Defines schema guarantees, freshness SLAs, and column types agreed upon between software engineers and data teams before code hits production.",
        code: `version: 1.0.0
dataset: orders_v1
domain: e-commerce
owner: checkout-engineering@company.com
freshness_sla: "15 minutes"
schema:
  - name: order_id
    type: string
    description: "Unique UUID identifier of the customer purchase"
    constraints:
      unique: true
      not_null: true
  - name: customer_id
    type: string
    constraints:
      not_null: true
  - name: total_amount
    type: decimal(10,2)
    constraints:
      min: 0.01
  - name: currency
    type: string
    constraints:
      allowed_values: ["EUR", "USD", "GBP"]
  - name: status
    type: string
    constraints:
      allowed_values: ["PENDING", "PAID", "CANCELLED"]`,
    },
    dbtModel: {
        title: "dbt Dimensional Transformation Model (SQL + Jinja)",
        desc: "Transforms cleaned Silver records into a high-performance customer order aggregate with automated freshness and assertion tests.",
        code: `{{ config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge',
    file_format='iceberg'
) }}

WITH silver_orders AS (
    SELECT
        order_id,
        customer_id,
        CAST(total_amount AS DECIMAL(10, 2)) AS amount_eur,
        status,
        DATE_TRUNC('day', order_timestamp) AS order_date
    FROM {{ ref('silver_orders_cleaned') }}
    {% if is_incremental() %}
        WHERE order_timestamp >= (SELECT MAX(order_timestamp) FROM {{ this }})
    {% endif %}
)

SELECT
    order_id,
    customer_id,
    amount_eur,
    status,
    order_date,
    CURRENT_TIMESTAMP() AS dbt_updated_at
FROM silver_orders;`,
    },
    timeTravelQuery: {
        title: "Iceberg / Delta Time-Travel & Snapshot Query (SQL)",
        desc: "Query historical platform state exactly as it existed before a bug or corrupted batch ran, without requiring manual backup restores.",
        code: `-- Query the state of the sales mart yesterday at 14:00 UTC
SELECT 
    region,
    COUNT(order_id) AS total_orders,
    SUM(amount_eur) AS total_revenue
FROM gold_sales_analytics
FOR SYSTEM_TIME AS OF '2026-09-15 14:00:00 UTC'
GROUP BY region;

-- Compare delta changes between two snapshots
SELECT * FROM gold_sales_analytics 
VERSION AS OF 104992
EXCEPT
SELECT * FROM gold_sales_analytics 
VERSION AS OF 104991;`,
    },
};

const platformPillars = [
    {
        icon: FaDatabase,
        title: "Medallion Lakehouse Architecture",
        description: "Structures data systematically through Bronze (raw append), Silver (cleaned & conformed), and Gold (business aggregates) layers to eliminate data swamp degradation.",
        tech: "Apache Iceberg / Delta Lake on S3",
    },
    {
        icon: FaSyncAlt,
        title: "Unified Streaming & Batch Ingestion",
        description: "Seamlessly blends microsecond Kafka event streams with scheduled batch workflows, standardizing on open Parquet formats across the platform.",
        tech: "Kafka Connect + Flink + dbt",
    },
    {
        icon: FaShieldAlt,
        title: "Data Governance & Contract Enforcement",
        description: "Prevents silent upstream breaking changes by deploying machine-readable Data Contracts in CI/CD, alongside centralized role-based data masking.",
        tech: "OpenDataContract + OpenMetadata",
    },
    {
        icon: FaHistory,
        title: "Time-Travel & Audit Reproducibility",
        description: "Enables point-in-time snapshot rollbacks and zero-copy clones, making compliance reporting, machine learning training reproducibility, and bug forensics trivial.",
        tech: "Iceberg Snapshots / Delta Time-Travel",
    },
];

const ecosystemTools = [
    {
        category: "Lakehouse Table Formats",
        tools: "Apache Iceberg, Delta Lake, Apache Hudi (ACID on object storage)",
    },
    {
        category: "Ingestion & Stream Processing",
        tools: "Apache Kafka, Debezium (CDC), Apache Flink, Airbyte, Fivetran",
    },
    {
        category: "Data Transformation & Modeling",
        tools: "dbt (data build tool), Apache Spark, DuckDB, Trino / Presto",
    },
    {
        category: "Query Engines & Serving Layers",
        tools: "ClickHouse, Snowflake, Google BigQuery, StarRocks, DuckDB",
    },
];

export default function DataPlatform() {
    const [selectedStage, setSelectedStage] = useState(medallionStages[2]);
    const [activeTab, setActiveTab] = useState("dbtModel");

    return (
        <PageLayout 
            title="Modern Data Platform Architecture" 
            subtitle="Architect scalable, governed data lakehouses unifying streaming CDC, batch transformations, and self-service analytics."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Interactive Architecture Topology */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                Medallion Pipeline Blueprint
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                End-to-End Modern Data Lakehouse Flow
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md w-fit">
                            Click stages to inspect details
                        </span>
                    </div>

                    {/* Pipeline Stage Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {medallionStages.map((stage, idx) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStage.id === stage.id;
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                                        isSelected
                                            ? "bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
                                    {idx < medallionStages.length - 1 && (
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
                                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 w-fit">
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
                        A <strong>Modern Data Platform</strong> is the foundational backbone that transforms fragmented operational silos, real-time event logs, and external APIs into governed, high-quality data products.
                    </p>
                    <p>
                        Historically, organizations suffered from a dual-architecture dilemma: fragile ETL pipelines duplicating data between slow raw data lakes and expensive proprietary data warehouses. The arrival of open table formats (such as <strong>Apache Iceberg</strong> and <strong>Delta Lake</strong>) created the <strong>Data Lakehouse</strong>—bringing ACID guarantees, schema evolution, and time-travel querying directly to low-cost cloud object storage, without vendor lock-in.
                    </p>
                </div>

                {/* Architecture Evolution: Warehouse vs Lake vs Lakehouse */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Architecture Paradigm Shift
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Data Warehouse vs. Data Lake vs. Modern Lakehouse
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Dimension</th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-1/4">
                                        Legacy Data Warehouse
                                    </th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-1/4">
                                        Raw Data Lake
                                    </th>
                                    <th className="p-4 font-bold text-emerald-600 dark:text-emerald-400 w-1/4">
                                        Modern Lakehouse (Iceberg)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                                {architectureEvolution.map((item) => (
                                    <tr key={item.aspect} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                                            {item.aspect}
                                        </td>
                                        <td className="p-4 text-slate-550 dark:text-slate-400">
                                            {item.warehouse}
                                        </td>
                                        <td className="p-4 text-slate-550 dark:text-slate-400">
                                            {item.lake}
                                        </td>
                                        <td className="p-4 text-slate-850 dark:text-slate-200 bg-emerald-500/5 font-medium">
                                            <div className="flex items-start gap-1.5">
                                                <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={13} />
                                                <span>{item.lakehouse}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Data Contracts & Shift-Left Data Quality Section */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 bg-gradient-to-br from-slate-50/70 to-slate-100/40 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mt-1">
                            <FaShieldAlt size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                Data Mesh & Governance
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Shifting Left with Data Contracts & Automated Testing
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        The single most frequent cause of broken analytics dashboards is undocumented upstream schema changes: a software engineer alters an OLTP database column, and downstream analytics pipelines break hours later. <strong>Data Contracts</strong> treat analytical schemas as explicit, versioned API agreements validated directly in backend CI/CD pipelines before code is deployed.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                                <FaTimesCircle size={15} />
                                <span>The Broken Pipeline Anti-Pattern</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Backend devs rename <code className="text-rose-500 font-mono text-xs">user_id</code> to <code className="text-rose-500 font-mono text-xs">account_id</code>. Nightly batch ETL fails silently. Data engineers spend days debugging broken Airflow DAGs, and business executives make decisions based on stale numbers.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                <FaCheckCircle size={15} />
                                <span>The Data Contract Invariant</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                                The producer service includes a declarative contract schema. Backend pull requests run automated contract linting. If a proposed change violates backward compatibility without versioning, the CI/CD pipeline blocks the merge automatically.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Code & Data Contract Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Engineering Artifact Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Data Contracts, dbt Models & Lakehouse Time-Travel
                            </h3>
                        </div>

                        {/* Artifact Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(sampleArtifacts).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === key
                                            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key === "dataContract" ? "Data Contract" : key === "dbtModel" ? "dbt Model" : "Time Travel"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {sampleArtifacts[activeTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {sampleArtifacts[activeTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-emerald-400" />
                                <span>{activeTab === "dataContract" ? "contract.yaml" : activeTab === "dbtModel" ? "models/orders.sql" : "query_history.sql"}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                {activeTab === "dataContract" ? "yaml" : "sql"}
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {sampleArtifacts[activeTab].code}
                        </pre>
                    </div>
                </div>

                {/* Core Pillars Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Modern Data Platform Architectural Pillars
                    </h3>
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2"
                        variants={animations.gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {platformPillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div 
                                    key={pillar.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/15 w-fit">
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
                        Modern Lakehouse Ecosystem & Tooling Stack
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

                {/* Architecture Takeaway Card */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-4 text-center bg-gradient-to-b from-emerald-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            From Data Swamps to High-Velocity Products
                        </h3>
                        <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                            A truly resilient data platform treats data not as a passive byproduct, but as a first-class product: verified against contracts, materialized via version-controlled dbt models, and served through open Apache Iceberg storage without locking the enterprise into costly proprietary databases.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
                            {["Apache Iceberg", "Delta Lake", "dbt Core", "Apache Kafka", "Apache Spark", "Trino", "ClickHouse"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-350 border border-slate-300/40 dark:border-slate-700/40"
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
