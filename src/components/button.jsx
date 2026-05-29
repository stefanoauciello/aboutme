import PropTypes from "prop-types";

/**
 * A reusable Button component with consistent variant styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button label or contents
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.type - HTML button type attribute
 * @param {string} props.variant - Variant style: 'primary' | 'secondary' | 'accent'
 * @param {string} props.className - Additional CSS classes
 */
function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
    const variantClass = variant === "primary" 
        ? "btn-primary" 
        : variant === "secondary" 
            ? "btn-secondary" 
            : "btn-accent";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${variantClass} ${className}`}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary", "accent"]),
    className: PropTypes.string,
};

export default Button;
