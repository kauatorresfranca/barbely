import * as S from './styles';
import { useState } from 'react';

const Financeiro = () => {
    const [saldo] = useState(1520.75);
    const [transacoes] = useState([
        { id: 1, descricao: 'Corte de cabelo', valor: 50.0, tipo: 'entrada' },
        { id: 2, descricao: 'Compra de produtos', valor: 200.0, tipo: 'saida' },
        { id: 3, descricao: 'Barba e cabelo', valor: 80.0, tipo: 'entrada' },
    ]);

    return (
        <S.Container>
            <h1>Financeiro</h1>
            <S.Balance>Saldo Atual: R$ {saldo.toFixed(2)}</S.Balance>
            <S.Table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map((transacao) => (
                        <tr key={transacao.id}>
                            <td>{transacao.descricao}</td>
                            <td>R$ {transacao.valor.toFixed(2)}</td>
                            <td>{transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default Financeiro;
