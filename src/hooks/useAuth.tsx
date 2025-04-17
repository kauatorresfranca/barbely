import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("access_token_barbearia"));

    useEffect(() => {
        const checkAuth = () => setIsAuthenticated(!!sessionStorage.getItem("access_token_barbearia"));

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    return { isAuthenticated };
};
