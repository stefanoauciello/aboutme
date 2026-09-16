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
      exit="exit"
    >
      <div className={`${classes.contentContainer} ${className}`}>
        {title && (
          <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={classes.pageTitle}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
                className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
              className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-5 rounded-full origin-center" 
            />
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
