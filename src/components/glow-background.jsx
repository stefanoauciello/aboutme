import { motion } from "framer-motion";

/**
 * A beautiful, premium backdrop component with glowing ambient lights
 * and a subtle developer grid overlay. Adapts to theme colors.
 */
export default function GlowBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Dynamic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          color: "var(--color-slate-300, #cbd5e1)",
        }}
      />

      {/* Floating Ambient Glow 1 - Top Left */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-primary-400/20 dark:from-primary-600/10 to-transparent blur-[80px]"
      />

      {/* Floating Ambient Glow 2 - Bottom Right */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-secondary-400/20 dark:from-secondary-600/10 to-transparent blur-[100px]"
      />

      {/* Floating Ambient Glow 3 - Middle Center */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 20, -30, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-gradient-radial from-accent-300/10 dark:from-accent-500/5 to-transparent blur-[90px]"
      />
    </div>
  );
}
