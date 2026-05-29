import { motion } from "framer-motion";
import {
    FaFileAlt,
    FaCodeBranch,
    FaTable,
    FaUndo,
    FaSearch,
    FaCogs,
    FaCheckCircle,
} from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";
import BackButton from "../components/back-button.jsx";
import { animations } from "../styles/theme";

const keyConcepts = [
    {
        icon: FaFileAlt,
        title: "Changelog",
        description: "The root configuration file defining a sequential chain of schema updates (changesets) to be applied.",
    },
    {
        icon: FaCodeBranch,
        title: "Changeset",
        description: "A single, isolated transactional schema migration query, tagged by unique author and ID keys.",
    },
    {
        icon: FaTable,
        title: "Changelog Table",
        description: "A tracking register inside the database instance documenting previously executed changesets to prevent re-execution.",
    },
    {
        icon: FaUndo,
        title: "Rollbacks",
        description: "The safety-net rollback queries stored alongside migrations to revert schemas to previous states during hotfixes.",
    },
    {
        icon: FaSearch,
        title: "Drift Detection",
        description: "Auditing capabilities comparing environment catalogs to detect unexpected out-of-band schema changes.",
    },
    {
        icon: FaCogs,
        title: "CI/CD Integration",
        description: "Automated runners deploying schema migrations inside pipeline tasks before compiling the application binaries.",
    },
];

const benefits = [
    "Guarantees that databases in development, QA, and production remain in lockstep.",
    "Documents all historic schema mutations directly in version control.",
    "Allows parallel development across feature branches without query conflicts.",
    "Mitigates execution errors through automatic checksum comparisons.",
];

const DatabaseVersioning = () => {
    return (
        <PageLayout 
            title="Database Versioning with Liquibase" 
            subtitle="Track and manage database schema modifications alongside application code."
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <BackButton fallbackTo="/devcorner" />
                </div>

                {/* Diagram Section */}
                <div className="glass-card p-4 sm:p-6 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}liqui_base.png`}
                        alt="Liquibase Workflow Diagram"
                        className="w-full max-w-xl object-contain bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-2 shadow-inner"
                    />
                    <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-wider text-center">
                        Declarative Schema Versioning CI/CD Lifecycle
                    </p>
                </div>

                {/* Main description */}
                <div className="space-y-4 text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                        Database versioning treats schema DDL and DML operations exactly like source code. By tracking database migrations in version-controlled configuration sets, engineering teams can apply repeatable, automated schema updates safely across all environments.
                    </p>
                    <p>
                        Liquibase reads XML, YAML, JSON, or formatted SQL migration logs, checking the database's internal tracking registry to determine which changesets are pending. When deployed via CI/CD, database migrations run alongside microservices updates, virtually eliminating drift-related deployment incidents.
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
                        {keyConcepts.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={animations.cardVariants}
                                    className="glass-card p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3"
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
                        Operational Benefits
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

                {/* Practical Example */}
                <div className="glass-card p-6 border border-slate-200/30 dark:border-slate-800/30 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Practical Example: Schema Migration
                        </h3>
                        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
                            An XML changeset definition adding a relational <code>users</code> table.
                        </p>
                    </div>

                    <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-900 shadow-inner font-mono text-xs sm:text-sm p-4 text-left">
                        <pre className="text-emerald-400 leading-relaxed">
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">changeSet</span>{" "}
                            <span className="text-amber-300">id</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"1"</span>{" "}
                            <span className="text-amber-300">author</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"stefano"</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`  `}
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">createTable</span>{" "}
                            <span className="text-amber-300">tableName</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"users"</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`    `}
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">column</span>{" "}
                            <span className="text-amber-300">name</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"id"</span>{" "}
                            <span className="text-amber-300">type</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"int"</span>{" "}
                            <span className="text-amber-300">autoIncrement</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"true"</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`      `}
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">constraints</span>{" "}
                            <span className="text-amber-300">primaryKey</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"true"</span>{" "}
                            <span className="text-amber-300">nullable</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"false"</span>
                            <span className="text-slate-500">/&gt;</span>
                            <br />
                            {`    `}
                            <span className="text-slate-500">&lt;/</span>
                            <span className="text-violet-400">column</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`    `}
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">column</span>{" "}
                            <span className="text-amber-300">name</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"username"</span>{" "}
                            <span className="text-amber-300">type</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"varchar(50)"</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`      `}
                            <span className="text-slate-500">&lt;</span>
                            <span className="text-violet-400">constraints</span>{" "}
                            <span className="text-amber-300">nullable</span>
                            <span className="text-slate-450">=</span>
                            <span className="text-emerald-300">"false"</span>
                            <span className="text-slate-500">/&gt;</span>
                            <br />
                            {`    `}
                            <span className="text-slate-500">&lt;/</span>
                            <span className="text-violet-400">column</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            {`  `}
                            <span className="text-slate-500">&lt;/</span>
                            <span className="text-violet-400">createTable</span>
                            <span className="text-slate-500">&gt;</span>
                            <br />
                            <span className="text-slate-500">&lt;/</span>
                            <span className="text-violet-400">changeSet</span>
                            <span className="text-slate-500">&gt;</span>
                        </pre>
                    </div>

                    <p className="text-sm text-slate-650 dark:text-slate-350">
                        When the Liquibase job runs, it checks whether changeset <code>id="1"</code> exists in the target database changelog table. If missing, it applies the create table logic and appends an execution record.
                    </p>
                </div>

                {/* Recommended Workflow */}
                <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        CI/CD Execution Workflow
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-4 text-center">
                        {[
                            { step: "1", title: "Write changeset", text: "Commit DDL scripts in version control." },
                            { step: "2", title: "Branch Pull", text: "Validate files during peer code review." },
                            { step: "3", title: "CI Deployment", text: "Automate dry runs on staging databases." },
                            { step: "4", title: "App Release", text: "Apply updates before service initialization." },
                        ].map((w) => (
                            <div key={w.step} className="glass-card p-5 border border-slate-200/35 dark:border-slate-800/35 flex flex-col items-center">
                                <span className="w-8 h-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center text-sm shadow-md mb-3">
                                    {w.step}
                                </span>
                                <h4 className="font-bold text-slate-850 dark:text-slate-100 text-sm">{w.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 leading-normal">{w.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default DatabaseVersioning;
