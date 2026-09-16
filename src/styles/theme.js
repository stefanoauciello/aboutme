/**
 * Theme configuration for the application
 * Contains animation variants, colors, and other styling constants
 */

// Animation variants
export const animations = {
  // Container animation for page transitions
  containerVariants: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  },
  
  // Item animation with staggered children
  itemVariants: {
    hidden: { opacity: 0, y: 15 },
    visible: idx => ({
      opacity: 1,
      y: 0,
      transition: { delay: idx * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  },
  
  // Grid animation with staggered children
  gridVariants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  },
  
  // Card animation for grid items
  cardVariants: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  },
};

// Common class combinations
export const classes = {
  pageContainer: `
    w-full max-w-5xl mx-auto py-6 md:py-10 px-4 sm:px-6 relative z-10
  `,
  
  pageTitle: "text-4xl sm:text-5xl font-display font-extrabold leading-[1.25] sm:leading-[1.2] pb-2 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent text-center tracking-tight mb-5",
  
  contentContainer: "mt-8",
  
  cardGrid: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  
  card: `
    glass-card p-6 flex flex-col items-center text-center
    hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-primary-950/10 hover:border-primary-500/30 dark:hover:border-primary-500/20
  `,
};