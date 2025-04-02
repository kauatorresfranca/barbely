import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("access_token"));

    useEffect(() => {
        const checkAuth = () => setIsAuthenticated(!!sessionStorage.getItem("access_token"));

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    return { isAuthenticated };
};
