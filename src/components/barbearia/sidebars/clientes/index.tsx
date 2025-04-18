import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Cliente } from '../../../../models/cliente'
import { authFetch } from '../../../../utils/authFetch'
import ClienteDetail from '../../modals/cliente/cliente_detail'

import * as S from './styles'

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('access_token_barbearia')
        const barbeariaData = sessionStorage.getItem('barbearia')
        const barbeariaToken = sessionStorage.getItem('barbearia_token')

        console.log('Token:', token)
        console.log('Barbearia Data:', barbeariaData)
        console.log('Barbearia Token:', barbeariaToken)

        let barbeariaId: number | null = null
        try {
            if (barbeariaData) {
                const parsedData = JSON.parse(barbeariaData)
                barbeariaId = parsedData.id
            } else if (barbeariaToken) {
                barbeariaId = parseInt(barbeariaToken, 10)
            }
        } catch (e) {
            console.error('Erro ao parsear barbeariaData:', e)
        }

        console.log('Barbearia ID:', barbeariaId)

        if (!token || !barbeariaId) {
            setErro('Token ou ID da barbearia ausente. Por favor, faça login novamente.')
            setLoading(false)
            navigate('/login')
            return
        }

        authFetch(`http://localhost:8000/api/clientes/barbearia/${barbeariaId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log('Resposta da API /api/clientes/barbearia:', res.status, res.statusText)
                if (!res.ok) {
                    throw new Error(`Erro ao buscar clientes: ${res.status} ${res.statusText}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log('Clientes recebidos:', data)
                setClientes(data)
            })
            .catch((err) => {
                console.error('Erro na requisição:', err)
                setErro(err.message)
            })
            .finally(() => setLoading(false))
    }, [navigate])

    const handleOpenModal = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedCliente(null)
        setModalIsOpen(false)
    }

    if (loading) return <S.Container>Carregando...</S.Container>
    if (erro) return <S.Container>Erro: {erro}</S.Container>

    return (
        <S.Container>
            <h2>Meus Clientes</h2>
            <p className="subtitle">
                Acesse a lista de clientes cadastrados na sua barbearia e veja o histórico de
                agendamentos.
            </p>
            <S.Head>
                {clientes.length <= 0 ? (
                    <p className="empty">Você ainda não tem clientes cadastrados</p>
                ) : (
                    <>
                        <p>Nome</p>
                        <p>Celular</p>
                        <p>Detalhes</p>
                    </>
                )}
            </S.Head>
            <S.List>
                {clientes.map((cliente) => (
                    <S.ListItem key={cliente.id}>
                        <p>{cliente.user.nome}</p>
                        <p>{cliente.user.telefone}</p>
                        <S.Button onClick={() => handleOpenModal(cliente)}>Detalhes</S.Button>
                    </S.ListItem>
                ))}
            </S.List>
            {modalIsOpen && (
                <ClienteDetail cliente={selectedCliente} closeModal={handleCloseModal} />
            )}
        </S.Container>
    )
}

export default Clientes
