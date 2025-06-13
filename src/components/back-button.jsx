// src/components/back-button.jsx
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * A reusable back button component for navigation
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {string} props.fallbackTo - Fallback route if history is empty
 * @param {string} props.className - Additional CSS classes
 */
function BackButton({ label = "Back", fallbackTo = "/", className = "" }) {
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
                       bg-white/80 backdrop-blur text-blue-700 border border-blue-200
                       shadow-soft hover:bg-white hover:shadow-md transition-all"
            >
                <FaArrowLeft
                    className="text-blue-600 group-hover:-translate-x-1 transition-transform"
                    aria-hidden="true"
                />
                <span className="font-medium">{label}</span>
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
