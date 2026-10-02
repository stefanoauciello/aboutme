// src/pages/Certification.jsx
import { motion } from 'framer-motion';
import PageLayout from '../layouts/page-layout.jsx';
import { animations } from '../styles/theme';
import { technologyIcons } from '../config/technology-icons.js';

const certificates = [
  {
    title: 'AWS Certified Developer – Associate',
    year: 2023,
    provider: 'AWS',
    icon: technologyIcons.aws.Icon,
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    year: 2021,
    provider: 'AWS',
    icon: technologyIcons.aws.Icon,
  },
  {
    title: 'MongoDB Developer Foundation DF01',
    year: 2024,
    provider: 'MongoDB',
    icon: technologyIcons.mongo.Icon,
  },
  {
    title: 'MongoDB Benchmarking & Capacity Planning OA610',
    year: 2024,
    provider: 'MongoDB',
    icon: technologyIcons.mongo.Icon,
  },
  {
    title: 'MongoDB Advanced Queries & Data Processing DA610',
    year: 2024,
    provider: 'MongoDB',
    icon: technologyIcons.mongo.Icon,
  },
  {
    title: 'MongoDB Application Optimization DA640',
    year: 2024,
    provider: 'MongoDB',
    icon: technologyIcons.mongo.Icon,
  },
  {
    title: 'Cisco IT Essential',
    year: 2013,
    provider: 'Cisco',
    icon: technologyIcons.cisco.Icon,
  },
];

function Certification() {
  return (
    <PageLayout
      title="Certifications"
      subtitle="Academic achievements and industry credentials validating technical competencies."
    >
      <motion.ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
        initial="hidden"
        animate="visible"
        variants={animations.gridVariants}
      >
        {certificates.map((cert) => {
          const Icon = cert.icon;
          return (
            <motion.li
              key={cert.title}
              variants={animations.cardVariants}
              whileHover={{ scale: 1.02, translateY: -3 }}
              className="glass-card p-6 flex flex-col items-center text-center justify-between min-h-[220px]"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/20 dark:border-slate-700/20">
                  <Icon
                    aria-label={`${cert.provider} logo`}
                    className="w-full h-full text-primary-600 dark:text-primary-400"
                  />
                </div>

                <h3 className="font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="w-full flex items-center justify-between mt-5 pt-3 border-t border-slate-200/40 dark:border-slate-800/20 text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  {cert.provider}
                </span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  {cert.year}
                </span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </PageLayout>
  );
}

export default Certification;
