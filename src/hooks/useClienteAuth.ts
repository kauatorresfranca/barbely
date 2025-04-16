import { useEffect, useState } from "react";
import { Cliente } from "../models/cliente";

export const useCliente = () => {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("access_token_cliente");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch("http://localhost:8000/api/clientes/user-info/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar dados do cliente.");
                return res.json();
            })
            .then((data) => {
                setCliente(data);
            })
            .catch((err) => {
                console.error(err);
                sessionStorage.removeItem("access_token_cliente");
                sessionStorage.removeItem("refresh_token_cliente");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { cliente, loading };
};
