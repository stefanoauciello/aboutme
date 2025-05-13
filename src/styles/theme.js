/**
 * Theme configuration for the application
 * Contains animation variants, colors, and other styling constants
 */

// Animation variants
export const animations = {
  // Container animation for page transitions
  containerVariants: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  
  // Item animation with staggered children
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: idx => ({
      opacity: 1,
      y: 0,
      transition: { delay: idx * 0.15, duration: 0.45 },
    }),
  },
  
  // Grid animation with staggered children
  gridVariants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
  
  // Card animation for grid items
  cardVariants: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  },
};

// Common class combinations
export const classes = {
  pageContainer: `
    h-[100dvh] md:h-auto overflow-y-auto
    p-6 md:p-12 text-blue-900
    bg-gradient-to-r from-blue-50 to-white
    rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col
  `,
  
  pageTitle: "text-4xl font-semibold text-blue-600 text-center",
  
  contentContainer: "flex-grow px-4 md:px-8",
  
  cardGrid: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  
  card: `
    px-4 py-6 rounded-lg bg-white/70 backdrop-blur
    shadow-md flex flex-col items-center text-center
    transition
  `,
};