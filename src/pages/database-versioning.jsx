import { motion } from "framer-motion";
import BackButton from "../components/button";
import containerVariants from "../components/utils";

const keyConcepts = [
  {
    title: "Changelog",
    description:
        "A file that defines a sequence of database changes (changesets) to be applied in order.",
  },
  {
    title: "Changeset",
    description:
        "A single unit of change, such as creating a table or adding a column, identified by an ID and author.",
  },
  {
    title: "DATABASECHANGELOG Table",
    description:
        "A table maintained by Liquibase to track which changesets have been applied to the database.",
  },
  {
    title: "Rollback",
    description:
        "The ability to undo changes by reverting to a previous state defined in the changelog.",
  },
  {
    title: "Diff & Drift Detection",
    description:
        "Liquibase can compare database schemas to detect differences and generate changelogs accordingly.",
  },
  {
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
          className="h-[100dvh] md:h-auto overflow-y-auto
                 p-6 md:p-12 text-blue-900
                 bg-gradient-to-r from-blue-50 to-white
                 rounded-xl shadow-lg text-center
                 max-w-4xl mx-auto flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
        <BackButton />

        <div className="flex-grow px-4 md:px-8 text-left text-blue-700">
          <h2 className="text-4xl font-semibold text-blue-600 text-center">
            Database Versioning with Liquibase
          </h2>

          <div className="my-6 flex justify-center">
            <img
                src={`${import.meta.env.BASE_URL}liquid_base.png`}
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

          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">Key Concepts</h3>
            <ul className="list-disc list-inside space-y-2">
              {keyConcepts.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">Benefits</h3>
            <ul className="list-disc list-inside space-y-2">
              {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-4">
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
        </div>
      </motion.section>
  );
};

export default DatabaseVersioning;
