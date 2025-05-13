import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { animations, classes } from "../styles/theme";

/**
 * A reusable page layout component with consistent styling and animations
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the layout
 * @param {string} props.title - Page title
 * @param {string} props.className - Additional CSS classes for the content container
 */
function PageLayout({ children, title, className = "" }) {
  return (
    <motion.section
      className={classes.pageContainer}
      variants={animations.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${classes.contentContainer} ${className}`}>
        {title && (
          <h2 className={classes.pageTitle}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </motion.section>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PageLayout;
