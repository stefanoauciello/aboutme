import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { animations, classes } from "../styles/theme";

/**
 * A reusable page layout component with consistent styling and animations
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the layout
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Page subtitle
 * @param {string} props.className - Additional CSS classes for the content container
 */
function PageLayout({ children, title, subtitle, className = "" }) {
  return (
    <motion.section
      className={classes.pageContainer}
      variants={animations.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${classes.contentContainer} ${className}`}>
        {title && (
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h1 className={classes.pageTitle}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-base md:text-lg">
                {subtitle}
              </p>
            )}
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4 rounded-full" />
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default PageLayout;
