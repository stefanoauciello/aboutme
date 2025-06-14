import {motion} from "framer-motion";
import {
    FaFileAlt,
    FaCodeBranch,
    FaTable,
    FaUndo,
    FaSearch,
    FaCogs,
    FaCheckCircle,
} from "react-icons/fa";
import containerVariants from "../components/utils";
import BackButton from "../components/back-button.jsx";

const keyConcepts = [
    {
        icon: FaFileAlt,
        title: "Changelog",
        description:
            "A file that defines a sequence of database changes (changesets) to be applied in order.",
    },
    {
        icon: FaCodeBranch,
        title: "Changeset",
        description:
            "A single unit of change, such as creating a table or adding a column, identified by an ID and author.",
    },
    {
        icon: FaTable,
        title: "DATABASECHANGELOG Table",
        description:
            "A table maintained by Liquibase to track which changesets have been applied to the database.",
    },
    {
        icon: FaUndo,
        title: "Rollback",
        description:
            "The ability to undo changes by reverting to a previous state defined in the changelog.",
    },
    {
        icon: FaSearch,
        title: "Diff & Drift Detection",
        description:
            "Liquibase can compare database schemas to detect differences and generate changelogs accordingly.",
    },
    {
        icon: FaCogs,
        title: "CI/CD Integration",
        description:
            "Liquibase can be integrated into CI/CD pipelines to automate database migrations alongside application deployments.",
    },
];

const benefits = [
    "Ensures consistent database schema across environments.",
    "Tracks and documents all schema changes over time.",
    "Facilitates collaboration among development teams.",
    "Enables safe rollbacks in case of issues.",
    "Integrates seamlessly with version control systems.",
    "Supports automated deployments in CI/CD workflows.",
];

const DatabaseVersioning = () => {
    return (
        <motion.section
            className="min-h-screen
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg text-center
                 max-w-4xl mx-auto flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
                <BackButton fallbackTo="/devcorner" />
                <h2 className="text-4xl font-semibold text-blue-600 text-center">
                    Database Versioning with Liquibase
                </h2>

                <div className="my-6 flex justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}liqui_base.png`}
                        alt="Liquibase Workflow Diagram"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md border-4 border-blue-300 shadow-lg rounded-lg"
                    />
                </div>

                <p className="text-lg">
                    Database versioning is the practice of tracking and managing changes
                    to a database schema over time in a structured, auditable, and
                    repeatable way. Liquibase helps teams manage these changes across
                    environments safely and consistently.
                </p>

                <p className="mt-4 text-base sm:text-lg">
                    Each update to the schema is defined as a versioned
                    <em>changeset</em> stored alongside your application code. Liquibase
                    reads these changelogs to apply pending updates or roll back
                    unwanted ones. Integrating Liquibase into your CI pipeline
                    ensures databases in development, staging and production all
                    evolve in lockstep, reducing the risk of drift.
                </p>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {keyConcepts.map((item) => {
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
                    <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
                    <ul className="space-y-2">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start">
                                <FaCheckCircle className="text-green-600 mr-2 mt-1" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 space-y-4 bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Practical Example: Adding a New Table
                    </h3>
                    <p>
                        Here's how you can define a new <code>users</code> table in an XML
                        changelog file:
                    </p>
                    <div className="overflow-x-auto">
            <pre className="bg-gray-100 text-sm p-4 rounded-md whitespace-pre-wrap break-words">
{`<changeSet id="1" author="developer">
  <createTable tableName="users">
    <column name="id" type="int" autoIncrement="true">
      <constraints primaryKey="true" nullable="false"/>
    </column>
    <column name="username" type="varchar(50)">
      <constraints nullable="false"/>
    </column>
    <column name="email" type="varchar(100)"/>
  </createTable>
</changeSet>`}
            </pre>
                    </div>
                    <p>
                        When you run Liquibase, this changeset will be executed and tracked
                        in the <code>DATABASECHANGELOG</code> table.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-600">
                        Recommended Workflow
                    </h3>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Write and commit changesets describing schema updates.</li>
                        <li>Store changelog files in the same repository as your application code.</li>
                        <li>Execute Liquibase during each deployment to apply pending changes.</li>
                        <li>Monitor the <code>DATABASECHANGELOG</code> table to verify successful runs.</li>
                    </ol>
                </div>
            </div>
        </motion.section>
    );
};

export default DatabaseVersioning;
