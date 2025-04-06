import { Cliente } from '../../../models/cliente';
import { authFetch } from '../../../utils/authFetch';
import * as S from './styles';
import { useState, useEffect } from 'react';

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        const barbeariaData = sessionStorage.getItem("barbearia"); // supondo que você salvou com esse nome
        const barbeariaId = barbeariaData ? JSON.parse(barbeariaData).id : null;

        if (!token || !barbeariaId) {
            setErro("Token ou ID da barbearia ausente.");
            setLoading(false);
            return;
        }

        authFetch(`http://localhost:8000/api/clientes/barbearia/${barbeariaId}/`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar clientes.");
                return res.json();
            })
            .then((data) => setClientes(data))
            .catch((err) => setErro(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <S.Container>Carregando...</S.Container>;
    if (erro) return <S.Container>Erro: {erro}</S.Container>;

    return (
        <S.Container>
            <h1>Meus Clientes</h1>
            <S.Head>
                <p>Nome</p>
                <p>Celular</p>
                <p>Detalhes</p>
            </S.Head>
            <S.List>
                {clientes.map((cliente) => (
                    <S.ListItem key={cliente.id}>
                        <p>{cliente.user.nome}</p>
                        <p>{cliente.user.telefone}</p>
                        <S.Button>Detalhes</S.Button>
                    </S.ListItem>
                ))}
            </S.List>
        </S.Container>
    );
};

export default Clientes;
