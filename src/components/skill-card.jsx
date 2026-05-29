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
      whileHover={{ scale: 1.02 }}
      className={classes.card}
    >
      {Icon && <Icon className="text-3xl text-primary-500 dark:text-primary-400 mb-3" aria-hidden />}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || title}
          className="w-14 h-14 mb-4 object-contain filter drop-shadow-sm dark:drop-shadow-[0_4px_6px_rgba(255,255,255,0.05)]"
          loading="lazy"
        />
      )}

      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{title}</h3>

      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {description}
        </p>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          {items.map(item => (
            <span 
              key={item} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              {item}
            </span>
          ))}
        </div>
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
