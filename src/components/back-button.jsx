// src/components/back-button.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * A reusable back button component for navigation with smooth entrance and hover animations
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {string} props.fallbackTo - Fallback route if history is empty
 * @param {string} props.className - Additional CSS classes
 */
function BackButton({ label = "Back to Dev Corner", fallbackTo = "/devcorner", className = "" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallbackTo);
        }
    };

    return (
        <motion.div 
            className={`w-full flex justify-start mb-6 ${className}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <motion.button
                type="button"
                aria-label={label}
                onClick={handleClick}
                whileHover={{ x: -4, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                       bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60
                       shadow-sm hover:shadow-md dark:hover:bg-slate-800/90 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer text-sm font-semibold"
            >
                <FaArrowLeft
                    className="text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:-translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                    size={12}
                />
                <span>{label}</span>
            </motion.button>
        </motion.div>
    );
}

BackButton.propTypes = {
    label: PropTypes.string,
    fallbackTo: PropTypes.string,
    className: PropTypes.string,
};

export default BackButton;
