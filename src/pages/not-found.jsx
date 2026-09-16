import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaCompass, FaCodeBranch } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";

export default function NotFound() {
  return (
    <PageLayout
      title="404 - Page Not Found"
      subtitle="The page you're looking for doesn't exist or has moved."
    >
      <motion.div
        className="max-w-md mx-auto mt-8 text-center glass-card p-8 sm:p-10 space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <FaCompass size={40} className="animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
            Lost in Cyberspace?
          </h2>
          <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
            Don&apos;t worry! You can return to the homepage or explore engineering articles in Dev Corner.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn btn-primary gap-2 inline-flex items-center justify-center">
            <FaHome size={14} /> Back to Home
          </Link>
          <Link to="/devcorner" className="btn btn-secondary gap-2 inline-flex items-center justify-center">
            <FaCodeBranch size={14} /> Dev Corner
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}
