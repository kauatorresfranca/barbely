// hooks/useBarbearias.ts
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Barbearia } from '../models/Barbearia';

export const useBarbearias = () => {
    const [barbearias, setBarbearias] = useState<Barbearia[]>([]); // Tipando como um array de Barbearia
    
    useEffect(() => {
        fetch(`${api.baseURL}/barbearias/`)
        .then(response => response.json())
        .then(data => setBarbearias(data))
        .catch(error => console.error("Erro ao buscar barbearias:", error));
    }, [setBarbearias]);

    return barbearias;
};
