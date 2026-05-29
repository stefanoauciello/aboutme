// src/components/back-button.jsx
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * A reusable back button component for navigation
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
        <div className={`w-full flex justify-start mb-6 ${className}`}>
            <button
                type="button"
                aria-label={label}
                onClick={handleClick}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/60 dark:bg-slate-900/60 backdrop-blur text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50
                       shadow-sm hover:shadow-md dark:hover:bg-slate-800/85 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer text-sm font-semibold"
            >
                <FaArrowLeft
                    className="text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform"
                    aria-hidden="true"
                    size={12}
                />
                <span>{label}</span>
            </button>
        </div>
    );
}

BackButton.propTypes = {
    label: PropTypes.string,
    fallbackTo: PropTypes.string,
    className: PropTypes.string,
};

export default BackButton;
