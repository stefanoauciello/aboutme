import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy-loaded pages for optimal bundle splitting
const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about'));
const Experience = lazy(() => import('../pages/experience'));
const Certification = lazy(() => import('../pages/certification'));
const Skill = lazy(() => import('../pages/skill'));
const Contact = lazy(() => import('../pages/contact'));
const NotFound = lazy(() => import('../pages/not-found.jsx'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certification" element={<Certification />} />
            <Route
              path="/certifications"
              element={<Navigate to="/certification" replace />}
            />
            <Route path="/skill" element={<Skill />} />
            <Route path="/skills" element={<Navigate to="/skill" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
