import { useEffect } from "react";

function ScrollToTop() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    return null;
}

export default ScrollToTop;
