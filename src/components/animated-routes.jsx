
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Lazy-loaded pages for optimal bundle splitting
const Home = lazy(() => import("../pages/home"));
const About = lazy(() => import("../pages/about"));
const Experience = lazy(() => import("../pages/experience"));
const Certification = lazy(() => import("../pages/certification"));
const Skill = lazy(() => import("../pages/skill"));
const Contact = lazy(() => import("../pages/contact"));
const DevCorner = lazy(() => import("../pages/dev-corner.jsx"));
const CDC = lazy(() => import("../pages/cdc"));
const EventDrivenArchitecture = lazy(() => import("../pages/event-driven-architecture"));
const DataPlatform = lazy(() => import("../pages/data-platform"));
const DatabaseVersioning = lazy(() => import("../pages/database-versioning"));
const Auth = lazy(() => import("../pages/auth"));
const MCP = lazy(() => import("../pages/mcp"));
const AgenticWorkflows = lazy(() => import("../pages/agentic-workflows"));
const SpecDrivenDevelopment = lazy(() => import("../pages/spec-driven-development"));
const NotFound = lazy(() => import("../pages/not-found.jsx"));

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
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/certification" element={<Certification />} />
                    <Route path="/certifications" element={<Navigate to="/certification" replace />} />
                    <Route path="/skill" element={<Skill />} />
                    <Route path="/skills" element={<Navigate to="/skill" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/devcorner" element={<DevCorner />} />
                    <Route path="/devcorner/cdc" element={<CDC />} />
                    <Route path="/devcorner/event-driven-architecture" element={<EventDrivenArchitecture />} />
                    <Route path="/devcorner/data-platform" element={<DataPlatform />} />
                    <Route path="/devcorner/database-versioning" element={<DatabaseVersioning />} />
                    <Route path="/devcorner/auth" element={<Auth />} />
                    <Route path="/devcorner/mcp" element={<MCP />} />
                    <Route path="/devcorner/agentic-workflows" element={<AgenticWorkflows />} />
                    <Route path="/devcorner/spec-driven-development" element={<SpecDrivenDevelopment />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
}

export default AnimatedRoutes;