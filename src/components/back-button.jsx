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
function BackButton({label = "Back", fallbackTo = "/", className = ""}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallbackTo);
        }
    };

    return (
        <div className={`w-full flex justify-start mb-4 ${className}`}>
            <button
                type="button"
                aria-label={label}
                onClick={handleClick}
                className="inline-flex items-center
                   px-4 py-2 rounded-md shadow-md
                   text-blue-600 hover:text-blue-900 hover:bg-blue-100
                   transition focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-blue-600"
            >
                <FaArrowLeft className="mr-2" aria-hidden="true"/>
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