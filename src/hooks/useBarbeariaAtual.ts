import { useEffect, useState } from "react";
import { Barbearia } from "../models/Barbearia";

export const useBarbeariaAtual = () => {
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);

    useEffect(() => {
        const barbeariaData = sessionStorage.getItem("barbearia");
        console.log("Dado salvo no sessionStorage:", barbeariaData); // Log para depuração
        
        if (barbeariaData) {
            setBarbearia(JSON.parse(barbeariaData));
        }
    }, []);

    return barbearia;
};
