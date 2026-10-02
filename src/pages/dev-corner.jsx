// src/pages/Devcorner.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaDatabase,
  FaServer,
  FaUserShield,
  FaGithub,
  FaDraftingCompass,
  FaCloud,
  FaKey,
  FaWallet,
  FaFutbol,
  FaImages,
  FaCode,
  FaIdCard,
  FaSitemap,
  FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageLayout from '../layouts/page-layout.jsx';
import { animations } from '../styles/theme';

const topics = [
  {
    title: 'Change Data Capture (CDC)',
    description:
      'Capture real-time transactions directly from database logs and stream them to downstream targets reliably.',
    icon: FaDatabase,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/30',
    tag: 'Data Streaming',
    link: '/devcorner/cdc',
  },
  {
    title: 'Event-Driven Architecture',
    description:
      'Design decoupled, scalable microservices using asynchronous pub/sub messaging patterns and event schemas.',
    icon: FaBolt,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'hover:border-amber-500/30',
    tag: 'System Design',
    link: '/devcorner/event-driven-architecture',
  },
  {
    title: 'Data Platform',
    description:
      'Build robust infrastructure pipelines for ingesting, transforming, storing, and serving analytical data.',
    icon: FaServer,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'hover:border-emerald-500/30',
    tag: 'Big Data',
    link: '/devcorner/data-platform',
  },
  {
    title: 'Database Versioning',
    description:
      'Version database schemas repeatably and safely across dev, staging, and production using migration pipelines.',
    icon: FaDatabase,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'hover:border-violet-500/30',
    tag: 'DevOps / GitOps',
    link: '/devcorner/database-versioning',
  },
  {
    title: 'User Auth vs Machine-to-Machine',
    description:
      "A developer's guide to user authentication (OIDC, OAuth2) vs service-to-service credentials (mTLS, SPIFFE).",
    icon: FaUserShield,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'hover:border-rose-500/30',
    tag: 'Security',
    link: '/devcorner/auth',
  },
  {
    title: 'Cryptography',
    description:
      'Explore hashes, symmetric encryption, digital signatures, and integrity through practical examples and interactive demos.',
    icon: FaKey,
    color: 'text-fuchsia-500',
    bg: 'bg-fuchsia-500/10',
    border: 'hover:border-fuchsia-500/30',
    tag: 'Security & Cryptography',
    link: '/devcorner/cryptography',
  },
  {
    title: 'Model Context Protocol (MCP)',
    description:
      'Learn to build custom MCP servers and clients to extend LLM runtime engines with secure local tooling.',
    icon: FaServer,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'hover:border-cyan-500/30',
    tag: 'AI Engineering',
    link: '/devcorner/mcp',
  },
  {
    title: 'Agentic Workflows',
    description:
      'Autonomous AI systems that plan, use tools, and reason through complex tasks in iterative loops.',
    icon: FaBolt,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'hover:border-orange-500/30',
    tag: 'AI Engineering',
    link: '/devcorner/agentic-workflows',
  },
  {
    title: 'Spec-Driven Development (SDD)',
    description:
      'Turn specifications into executable truth to steer AI agents, eliminate code drift, and automate full-cycle software delivery.',
    icon: FaDraftingCompass,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    border: 'hover:border-indigo-500/30',
    tag: 'AI Engineering',
    link: '/devcorner/spec-driven-development',
  },
  {
    title: 'Infrastructure as Code (IaC)',
    description:
      'Provision, version, and manage resilient cloud infrastructure declaratively using Terraform and AWS CDK.',
    icon: FaCloud,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/30',
    tag: 'DevOps & Cloud',
    link: '/devcorner/infrastructure-as-code',
  },
];

const projects = [
  {
    title: 'Asset Allocation Tracker',
    description:
      'A local-first investment portfolio dashboard to track holdings, visualize allocation, and export PDF reports.',
    icon: FaWallet,
    tag: 'Personal Finance',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    link: 'https://github.com/stefanoauciello/asset-allocation',
  },
  {
    title: 'Istants-Pic',
    description:
      'A photo upload and processing service that stores metadata and resizes images asynchronously with RabbitMQ.',
    icon: FaImages,
    tag: 'Node.js · RabbitMQ',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    link: 'https://github.com/stefanoauciello/istants-pic',
  },
  {
    title: 'Manager',
    description:
      'An Android app for organizing friendly football matches and automatically balancing teams for 5- or 7-a-side games.',
    icon: FaFutbol,
    tag: 'High school thesis project',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    link: 'https://github.com/stefanoauciello/manager',
  },
  {
    title: 'Simple React + Node.js',
    description:
      'A full-stack starter app with a React frontend, REST API, JWT authentication, and synchronized MySQL and MongoDB databases.',
    icon: FaCode,
    tag: 'Full Stack',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    link: 'https://github.com/stefanoauciello/simpleReactNodeJS',
  },
  {
    title: 'TaxCodeService',
    description:
      'A REST API to generate Italian tax codes from personal information and decode tax codes into their component data.',
    icon: FaIdCard,
    tag: 'TypeScript · API',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    link: 'https://github.com/stefanoauciello/taxCodeService',
  },
  {
    title: 'tree-cdk',
    description:
      'A serverless AWS service for querying hierarchical data, built with TypeScript, Lambda, CDK, and the Nested Set Model.',
    icon: FaSitemap,
    tag: 'AWS · Infrastructure as Code',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    link: 'https://github.com/stefanoauciello/tree-cdk',
  },
];

function DevCorner() {
  const [search, setSearch] = useState('');
  const query = search.trim().toLocaleLowerCase();
  const matchesSearch = (item) =>
    [item.title, item.description, item.tag]
      .some((value) => value.toLocaleLowerCase().includes(query));
  const filteredTopics = query ? topics.filter(matchesSearch) : topics;
  const filteredProjects = query ? projects.filter(matchesSearch) : projects;

  return (
    <PageLayout
      title="Dev Corner"
      subtitle="Articles, architecture guides, and apps I've built."
    >
      <label className="relative block max-w-xl mx-auto mt-8 mb-10">
        <FaSearch
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles and apps..."
          aria-label="Search articles and apps"
          className="w-full rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </label>

      {filteredTopics.length > 0 && (
        <section aria-labelledby="articles-guides-heading">
          <h2
            id="articles-guides-heading"
            className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-2"
          >
            Articles &amp; Guides
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Explore practical guides and deep dives into software engineering.
          </p>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={animations.gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.title}
                  variants={animations.cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.22, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={topic.link}
                    className={`group flex flex-col justify-between h-full rounded-2xl glass-card p-6 border border-slate-200/35 dark:border-slate-800/35 transition-all duration-300 ${topic.border}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {topic.tag}
                        </span>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={20} aria-hidden />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-150/40 dark:border-slate-800/10 flex items-center text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 gap-1.5 transition-all">
                      <span>Read Article</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {filteredProjects.length > 0 && (
        <section
          className="mt-16"
          aria-labelledby="apps-projects-heading"
        >
          <h2
            id="apps-projects-heading"
            className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
          >
            Apps &amp; Projects
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            A selection of applications and projects, with source code on GitHub.
          </p>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={animations.gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  variants={animations.cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.22, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between h-full rounded-2xl glass-card p-6 border border-slate-200/35 dark:border-slate-800/35 transition-all duration-300 hover:border-primary-500/30"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {project.tag}
                        </span>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl ${project.bg} ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={20} aria-hidden />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-150/40 dark:border-slate-800/10 flex items-center text-xs font-semibold text-primary-600 dark:text-primary-400 gap-1.5 transition-all">
                      <FaGithub size={14} aria-hidden />
                      <span>View on GitHub</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {query && filteredTopics.length === 0 && filteredProjects.length === 0 && (
        <p className="text-center text-slate-600 dark:text-slate-400 mt-8" role="status">
          No articles or apps found for “{search.trim()}”.
        </p>
      )}

      <div className="mt-16 text-center space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Looking for more source code and repositories?
        </p>
        <a
          href="https://github.com/stefanoauciello"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary gap-2 inline-flex"
        >
          <FaGithub size={14} /> Check My GitHub
        </a>
      </div>
    </PageLayout>
  );
}

export default DevCorner;
