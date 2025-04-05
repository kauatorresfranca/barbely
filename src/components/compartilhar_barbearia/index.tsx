import { useEffect, useState } from "react";
import { Barbearia } from "../../models/Barbearia";

import * as S from './styles'

const CompartilharBarbearia = () => {
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);

    useEffect(() => {
        const dataStorage = sessionStorage.getItem("barbearia");

        if (dataStorage) {
            const barbeariaLogada = JSON.parse(dataStorage) as Barbearia;
            setBarbearia(barbeariaLogada);
        }
    }, []);

    return (
        <>
            {barbearia && (
    <S.Container>
        <h3>Compartilhe o link da sua barbearia !</h3>
        <p>O link é uma forma fácil de você compartilhar com seus clientes o perfil da sua barbearia e eles conseguirem fazer o agendamento com sua barbearia de uma forma prática e simples.</p>
        <p>Link da sua barbearia: {`http://localhost:5173/barbearia/${barbearia.slug}`}</p>
        <S.ToBarberClientLink to={`/barbearia/${barbearia.slug}`}>
            Ver barbearia
        </S.ToBarberClientLink>
    </S.Container>
)}
        </>
    )
}

export default CompartilharBarbearia