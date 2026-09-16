import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaDatabase,
    FaCodeBranch,
    FaTable,
    FaUndo,
    FaCogs,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowRight,
    FaCode,
    FaServer,
    FaShieldAlt,
    FaFileCode,
    FaLock,
    FaHistory,
    FaLink,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const lifecycleStages = [
    {
        id: "authoring",
        stepNumber: "01",
        name: "Changeset Authoring",
        shortName: "Schema Authoring",
        tech: "Git / SQL / YAML / XML",
        icon: FaFileCode,
        color: "text-violet-500",
        border: "border-violet-500/30",
        bg: "bg-violet-500/10",
        badge: "Version Controlled",
        tagline: "Define atomic DDL/DML migrations with ID, author, and rollback logic",
        role: "Developers write declarative changesets alongside application code in feature branches. Every migration is tagged with a unique identifier, author name, execution preconditions, and an explicit rollback query.",
        specs: [
            { label: "Storage", value: "Version-controlled Git repository" },
            { label: "Atomicity", value: "Single logical mutation per changeset" },
            { label: "Rollback Strategy", value: "Mandatory paired undo script" },
        ],
    },
    {
        id: "validation",
        stepNumber: "02",
        name: "CI Dry-Run & Testing",
        shortName: "CI/CD Dry-Run",
        tech: "GitHub Actions / Testcontainers",
        icon: FaCodeBranch,
        color: "text-blue-500",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        badge: "Shift-Left Verification",
        tagline: "Automates linting, checksum audits, and dry-run execution against test DBs",
        role: "During pull requests, the CI pipeline boots an ephemeral Testcontainer instance, runs `liquibase update-sql` to inspect raw SQL outputs, verifies cryptographic MD5 checksums, and tests both forward migration and rollback.",
        specs: [
            { label: "Test Environment", value: "Disposable containerized database" },
            { label: "Safety Checks", value: "Checksum integrity & non-blocking DDL" },
            { label: "Review Artifact", value: "Raw SQL preview for DBA sign-off" },
        ],
    },
    {
        id: "locking",
        stepNumber: "03",
        name: "Distributed Lock Acquisition",
        shortName: "Changelog Lock",
        tech: "DATABASECHANGELOGLOCK",
        icon: FaLock,
        color: "text-amber-500",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        badge: "Concurrency Guard",
        tagline: "Acquires an atomic distributed database lock to prevent race conditions",
        role: "Before reading or running migrations, the engine acquires an atomic lock in `DATABASECHANGELOGLOCK`. This prevents multi-pod microservice deployments from running simultaneous, conflicting schema updates on the same cluster.",
        specs: [
            { label: "Locking Scope", value: "Row-level atomic database lock" },
            { label: "Cluster Safety", value: "Prevents concurrent duplicate execution" },
            { label: "Fault Recovery", value: "Configurable lock timeout & release" },
        ],
    },
    {
        id: "execution",
        stepNumber: "04",
        name: "Atomic Migration Execution",
        shortName: "Execution & Registry",
        tech: "DATABASECHANGELOG / ACID",
        icon: FaDatabase,
        color: "text-emerald-500",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        badge: "Transactional DDL",
        tagline: "Applies pending changesets inside transactions and updates history",
        role: "The migration tool compares the local changelog against the remote `DATABASECHANGELOG` history table. Unapplied changesets execute sequentially within transactional boundaries, and MD5 hashes are logged upon success.",
        specs: [
            { label: "Execution Model", value: "ACID transactional boundary" },
            { label: "State Register", value: "MD5 hash, author, timestamp, order" },
            { label: "Idempotency", value: "Already applied changesets are skipped" },
        ],
    },
    {
        id: "audit",
        stepNumber: "05",
        name: "Lock Release & Drift Audit",
        shortName: "Drift Audit & Ready",
        tech: "Schema Inspection / Telemetry",
        icon: FaShieldAlt,
        color: "text-cyan-500",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        badge: "Zero-Drift Parity",
        tagline: "Releases lock and confirms strict parity across dev, staging, and prod",
        role: "Releases the distributed lock and verifies that the live database schema matches the expected repository state. Telemetry metrics confirm that application pods can boot safely with zero schema drift.",
        specs: [
            { label: "Lock Status", value: "Released immediately post-migration" },
            { label: "Parity Check", value: "Zero schema drift across environments" },
            { label: "Rollback Readiness", value: "Tested undo path immediately available" },
        ],
    },
];

const comparisonMatrix = [
    {
        aspect: "Tamper & Integrity Protection",
        manual: "Zero validation: Scripts can be edited after deployment without anyone noticing",
        automated: "Cryptographic MD5 checksums: Any out-of-band edits immediately halt execution",
        better: "automated",
    },
    {
        aspect: "Rollback Reliability",
        manual: "Written in panic during high-stress production outages, often untested",
        automated: "Pre-tested rollback scripts committed and verified in CI alongside migrations",
        better: "automated",
    },
    {
        aspect: "Concurrent Multi-Pod Safety",
        manual: "Race conditions: Multiple microservice replicas running init scripts simultaneously corrupt DDL",
        automated: "Atomic distributed lock table (`DATABASECHANGELOGLOCK`) enforces sequential execution",
        better: "automated",
    },
    {
        aspect: "Multi-Environment Parity",
        manual: "Silent schema drift between staging, QA, and production leads to runtime failures",
        automated: "Identical changelog executed through CI/CD guarantees 100% environment lockstep",
        better: "automated",
    },
    {
        aspect: "Auditability & Compliance",
        manual: "Scattered wiki pages or DBA Slack messages with no immutable timestamp history",
        automated: "Full execution registry table with author, date, order, and deployment tags",
        better: "automated",
    },
];

const sampleChangesets = {
    sqlFormat: {
        title: "Liquibase Formatted SQL Changeset",
        desc: "Native SQL syntax enriched with Liquibase metadata, execution preconditions, and rollback scripts. Familiar for DBAs and easy to peer review.",
        code: `--liquibase formatted sql

--changeset stefano:20260916-01-create-orders-table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'orders'
CREATE TABLE orders (
    order_id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);

--rollback DROP TABLE orders CASCADE;`,
    },
    yamlFormat: {
        title: "Declarative YAML Changeset (Database-Agnostic)",
        desc: "Declarative schema definition that automatically translates into dialect-specific DDL for PostgreSQL, MySQL, Oracle, or SQL Server.",
        code: `databaseChangeLog:
  - changeSet:
      id: 20260916-02-add-order-loyalty
      author: stefano
      preConditions:
        - onFail: MARK_RAN
        - tableExists:
            tableName: orders
      changes:
        - addColumn:
            tableName: orders
            columns:
              - column:
                  name: loyalty_points_earned
                  type: int
                  defaultValueNumeric: 0
                  constraints:
                    nullable: false
      rollback:
        - dropColumn:
            tableName: orders
            columnName: loyalty_points_earned`,
    },
    changelogTable: {
        title: "DATABASECHANGELOG Registry Table (Runtime Inspection)",
        desc: "The internal register maintained inside the target database to guarantee idempotency, record checksums, and prevent duplicate execution.",
        code: `-- Querying the internal Liquibase history register
SELECT 
    id,
    author,
    filename,
    dateexecuted,
    orderexecuted,
    md5sum,
    description
FROM databasechangelog
ORDER BY orderexecuted DESC
LIMIT 3;

/*
 Output:
 id: 20260916-02-add-order-loyalty | author: stefano | md5sum: 9:82fbc1a28... | EXECUTED
 id: 20260916-01-create-orders-table | author: stefano | md5sum: 9:44ac819d0... | EXECUTED
 id: 20260901-00-init-schema         | author: stefano | md5sum: 9:11ef032a1... | EXECUTED
*/`,
    },
};

const productionPatterns = [
    {
        icon: FaCodeBranch,
        title: "The Expand/Contract (Parallel Run) Pattern",
        description: "Enables zero-downtime database migrations in high-traffic 24/7 systems. Add new columns/tables in an expand phase, backfill asynchronously, and drop legacy columns only after old app versions are decommissioned.",
        tech: "Zero-Downtime Rolling Updates",
    },
    {
        icon: FaCogs,
        title: "Hermetic CI/CD Verification with Testcontainers",
        description: "Spins up real, ephemeral database engines inside GitHub Actions to run both forward `update` and reverse `rollback` tests on pull requests before approving code merges.",
        tech: "Testcontainers + Liquibase CLI",
    },
    {
        icon: FaHistory,
        title: "Preconditions & Targeted Contexts",
        description: "Guards against running destructive scripts in production. Uses conditional tags (e.g. `context: dev, test`) for mock datasets and checks preconditions before touching schemas.",
        tech: "Liquibase Contexts & Preconditions",
    },
    {
        icon: FaTable,
        title: "Schema Drift Detection & Auditing",
        description: "Runs automated drift inspections comparing the expected Git repository state with live staging and production databases to catch unauthorized manual DBA edits.",
        tech: "Liquibase diff / diff-changelog",
    },
];

const ecosystemTools = [
    {
        category: "Migration Engines & CLI",
        tools: "Liquibase (XML, YAML, SQL), Flyway (Java / SQL-first), Atlas (Schema-as-code), Prisma Migrate",
    },
    {
        category: "CI/CD & Ephemeral Testing",
        tools: "Testcontainers (Java, Node, Go), GitHub Actions, GitLab CI Runners",
    },
    {
        category: "Database GitOps & Governance",
        tools: "Bytebase, Liquibase Enterprise, Liquibase Checks, Flyway Hub",
    },
    {
        category: "Supported Relational Engines",
        tools: "PostgreSQL, MySQL, Oracle Database, CockroachDB, MariaDB, SQL Server",
    },
];

export default function DatabaseVersioning() {
    const [selectedStage, setSelectedStage] = useState(lifecycleStages[1]);
    const [activeTab, setActiveTab] = useState("sqlFormat");

    return (
        <PageLayout 
            title="Database Versioning & Migrations" 
            subtitle="Treat database schemas as version-controlled code: repeatable, automated, and zero-downtime CI/CD migrations."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Hero / Interactive Lifecycle Pipeline Topology */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                                CI/CD Migration Lifecycle
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Declarative Schema Migration Topology
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md w-fit">
                            Click stages to inspect details
                        </span>
                    </div>

                    {/* Pipeline Stage Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {lifecycleStages.map((stage, idx) => {
                            const Icon = stage.icon;
                            const isSelected = selectedStage.id === stage.id;
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                                        isSelected
                                            ? "bg-violet-500/15 border-violet-500 shadow-md shadow-violet-500/10 ring-1 ring-violet-500/40"
                                            : "bg-slate-50/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-violet-500 dark:text-violet-400">
                                                {stage.stepNumber}
                                            </span>
                                            {isSelected && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
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
                                    {idx < lifecycleStages.length - 1 && (
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
                                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20 w-fit">
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
                        In modern software engineering, application code is continuously tested, reviewed, and deployed via automated CI/CD pipelines. Yet historically, database schemas were managed through ad-hoc manual SQL scripts run by hand, leading to catastrophic runtime failures and dreaded <strong>schema drift</strong> between environments.
                    </p>
                    <p>
                        <strong>Database Versioning</strong> solves this by treating database schemas as first-class, version-controlled source code. Using declarative engines like <strong>Liquibase</strong> or <strong>Flyway</strong>, every database modification is codified into an immutable, checksummed changeset. Automated pipelines deploy schema updates seamlessly alongside application binaries, guaranteeing 100% environment parity and verified rollback safety.
                    </p>
                </div>

                {/* Comparison Section: Automated Versioning vs. Manual Scripts */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest bg-secondary-500/10 px-3 py-1 rounded-full border border-secondary-500/20">
                            Engineering Reliability
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Automated Migration Engine vs. Ad-Hoc Manual Scripts
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-800/50 glass-card">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50">
                                    <th className="p-4 font-bold text-slate-900 dark:text-white w-1/4">Evaluation Dimension</th>
                                    <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-3/8">
                                        Ad-Hoc Manual SQL Scripts
                                    </th>
                                    <th className="p-4 font-bold text-violet-600 dark:text-violet-400 w-3/8">
                                        Automated Versioning (Liquibase / Flyway)
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
                                            <span>{item.manual}</span>
                                        </td>
                                        <td className="p-4 text-slate-850 dark:text-slate-200">
                                            <div className="flex items-start gap-2">
                                                <FaCheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                                                <span className="font-medium">{item.automated}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Zero-Downtime Pattern: Expand / Contract */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-6 bg-gradient-to-br from-slate-50/70 to-slate-100/40 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400 mt-1">
                            <FaUndo size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2.5 py-0.5 rounded-full border border-violet-500/20">
                                Zero-Downtime Pattern
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                The Expand / Contract (Parallel Run) Migration Pattern
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                        In a 24/7 high-traffic distributed architecture with rolling deployments, executing a destructive DDL statement (like renaming a column: <code className="text-rose-500 font-mono text-xs">ALTER TABLE users RENAME COLUMN phone TO mobile;</code>) immediately crashes running application pods that expect the old column name. The <strong>Expand / Contract pattern</strong> guarantees backward compatibility across all active rolling pods.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 space-y-2">
                            <span className="text-xs font-mono font-extrabold text-violet-500 dark:text-violet-400">
                                PHASE 01: EXPAND
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Add New Column</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Add <code className="text-violet-500 font-mono">mobile</code> as a nullable column alongside <code className="text-violet-500 font-mono">phone</code>. Deploy app version that dual-writes to both columns.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 space-y-2">
                            <span className="text-xs font-mono font-extrabold text-violet-500 dark:text-violet-400">
                                PHASE 02: BACKFILL
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Migrate Historical Data</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Run a low-priority background batch job to copy historical values from <code className="text-violet-500 font-mono">phone</code> to <code className="text-violet-500 font-mono">mobile</code> without database locks.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 space-y-2">
                            <span className="text-xs font-mono font-extrabold text-violet-500 dark:text-violet-400">
                                PHASE 03: CONTRACT
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Drop Legacy Column</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Deploy application version reading strictly from <code className="text-violet-500 font-mono">mobile</code>. Execute final migration dropping the obsolete <code className="text-violet-500 font-mono">phone</code> column.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Changeset & Registry Inspector */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Syntax & Registry Inspector
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                Changeset Definitions & History Table
                            </h3>
                        </div>

                        {/* Artifact Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                            {Object.keys(sampleChangesets).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === key
                                            ? "bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                                >
                                    {key === "sqlFormat" ? "SQL Format" : key === "yamlFormat" ? "YAML Format" : "Changelog Table"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {sampleChangesets[activeTab].title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">
                            {sampleChangesets[activeTab].desc}
                        </p>
                    </div>

                    {/* Code Display */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-300/40 dark:border-slate-800/80 bg-slate-950 font-mono text-xs text-slate-200 p-4 shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <FaCode size={13} className="text-violet-400" />
                                <span>{activeTab === "sqlFormat" ? "changelog.sql" : activeTab === "yamlFormat" ? "changelog.yaml" : "databasechangelog.sql"}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                {activeTab === "yamlFormat" ? "yaml" : "sql"}
                            </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 font-mono text-[11px] sm:text-xs">
                            {sampleChangesets[activeTab].code}
                        </pre>
                    </div>
                </div>

                {/* Production Best Practices Grid */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Production Migration Best Practices
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
                                        <div className="p-2.5 bg-violet-500/10 text-violet-500 dark:text-violet-400 rounded-xl w-fit">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base">
                                            {pattern.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                                            {pattern.description}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-mono text-violet-600 dark:text-violet-400 bg-violet-500/5 px-2.5 py-1 rounded border border-violet-500/15 w-fit">
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
                        Modern Database GitOps & Migration Ecosystem
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

                {/* Takeaway & Showcase Card */}
                <div className="glass-card p-6 sm:p-8 border border-slate-200/35 dark:border-slate-800/35 space-y-4 text-center bg-gradient-to-b from-violet-500/5 to-transparent">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            Zero-Drift Database Reliability
                        </h3>
                        <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                            Automating schema migrations through version-controlled changesets eliminates the manual DBA bottleneck, prevents catastrophic production downtime during rolling updates, and guarantees that every staging environment accurately reflects production truth.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-3">
                            {["Liquibase", "Flyway", "Testcontainers", "GitOps", "Expand/Contract", "Zero-Downtime DDL"].map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-350 border border-slate-300/40 dark:border-slate-700/40"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a
                            href="https://github.com/stefanoauciello/db-continuos-integration"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary gap-2 inline-flex items-center"
                        >
                            <FaLink size={12} /> View db-continuos-integration on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
