import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { classes } from "../styles/theme";

/**
 * A reusable card component for displaying skills
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon component or element to display
 * @param {string} props.title - Card title
 * @param {string[]} props.items - List of items to display
 * @param {string} props.description - Optional description text
 * @param {string} props.imageSrc - Optional image source URL
 * @param {string} props.imageAlt - Optional image alt text
 * @param {Object} props.variants - Framer Motion variants for animations
 */
function SkillCard({ 
  icon: Icon, 
  title, 
  items = [], 
  description, 
  imageSrc, 
  imageAlt,
  variants 
}) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.04, translateY: -4 }}
      className={classes.card}
    >
      {Icon && <Icon className="text-3xl text-blue-600 mb-3" aria-hidden />}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || title}
          className="w-20 h-auto mb-4 object-contain"
          loading="lazy"
        />
      )}

      <h3 className="font-semibold text-blue-700">{title}</h3>

      {description && (
        <p className="text-sm text-blue-800 mt-2 leading-relaxed">
          {description}
        </p>
      )}

      {items.length > 0 && (
        <ul className="text-sm text-blue-800 space-y-0.5 mt-2">
          {items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

SkillCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  variants: PropTypes.object
};

export default SkillCard;
