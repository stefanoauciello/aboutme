
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import pages
import Home from "../pages/home";
import About from "../pages/about";
import Experience from "../pages/experience";
import Certification from "../pages/certification";
import Skill from "../pages/skill";
import Contact from "../pages/contact";
import DevCorner from "../pages/dev-corner.jsx";
import CDC from "../pages/cdc";
import EventDrivenArchitecture from "../pages/event-driven-architecture";
import DataPlatform from "../pages/data-platform";
import DatabaseVersioning from "../pages/database-versioning";
import Auth from "../pages/auth";
import MCP from "../pages/mcp";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/certification" element={<Certification />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/devcorner" element={<DevCorner />} />
                <Route path="/devcorner/cdc" element={<CDC />} />
                <Route path="/devcorner/event-driven-architecture" element={<EventDrivenArchitecture />} />
                <Route path="/devcorner/data-platform" element={<DataPlatform />} />
                <Route path="/devcorner/database-versioning" element={<DatabaseVersioning />} />
                <Route path="/devcorner/auth" element={<Auth />} />
                <Route path="/devcorner/mcp" element={<MCP />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;