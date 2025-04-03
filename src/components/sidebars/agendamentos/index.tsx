import * as S from './styles';
import { useState } from 'react';

const Agendamentos = () => {
    const [agendamentos] = useState([
        { id: 1, cliente: 'João Silva', data: '02/04/2025', horario: '14:00' },
        { id: 2, cliente: 'Marcos Souza', data: '03/04/2025', horario: '16:00' },
        { id: 3, cliente: 'Ana Pereira', data: '05/04/2025', horario: '10:00' },
    ]);

    return (
        <S.Container>
            <h1>Agendamentos</h1>
            <S.Table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.cliente}</td>
                            <td>{item.data}</td>
                            <td>{item.horario}</td>
                            <td>
                                <S.Button>Editar</S.Button>
                                <S.Button delete>Cancelar</S.Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default Agendamentos;
