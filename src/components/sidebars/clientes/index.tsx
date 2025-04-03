import * as S from './styles';
import { useState } from 'react';

const Clientes = () => {
    const [clientes] = useState([
        { id: 1, nome: 'Carlos Mendes', telefone: '(11) 99999-9999' },
        { id: 2, nome: 'Fernanda Lima', telefone: '(11) 98888-8888' },
        { id: 3, nome: 'Ricardo Santos', telefone: '(11) 97777-7777' },
    ]);

    return (
        <S.Container>
            <h1>Clientes</h1>
            <S.List>
                {clientes.map((cliente) => (
                    <S.ListItem key={cliente.id}>
                        <span>{cliente.nome}</span>
                        <span>{cliente.telefone}</span>
                        <S.Button>Detalhes</S.Button>
                    </S.ListItem>
                ))}
            </S.List>
        </S.Container>
    );
};

export default Clientes;
