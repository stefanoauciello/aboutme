import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import AnimatedRoutes from "./components/animated-routes.jsx";

export default function Portfolio() {
    return (
        <Router>
            <Navbar/>
            <main className="pt-16 sm:pt-24 min-h-screen bg-blue-100">
                <AnimatedRoutes/>
            </main>
        </Router>
    );
}
