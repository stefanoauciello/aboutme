import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.querySelectorAll(".overflow-y-auto").forEach((el) => {
            el.scrollTop = 0;
        });
    }, [pathname]);

    return null;
}

export default ScrollToTop;
