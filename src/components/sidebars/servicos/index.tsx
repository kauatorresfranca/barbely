import { useEffect, useState } from 'react'
import * as S from './styles'
import CriarServicoModal from '../../formularios/sidebars/servicos/servico_criar'
import EditarServicoModal from '../../formularios/sidebars/servicos/servico_editar'
import { Servico } from '../../../models/servico'

const Servicos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openEditModal = () => setEditModalIsOpen(true)
    const closeEditModal = () => setEditModalIsOpen(false)

    const fetchServicos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/servicos/')
            if (response.ok) {
                const data = await response.json()
                setServicos(data)
            } else {
                console.error('Erro ao buscar serviços')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Deseja realmente deletar este serviço?")
        if (!confirm) return

        try {
            const token = sessionStorage.getItem('access_token')
            const response = await fetch(`http://localhost:8000/api/servicos/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setServicos(prev => prev.filter(s => s.id !== id))
            } else {
                console.error('Erro ao deletar serviço')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    useEffect(() => {
        fetchServicos()
    }, [])

    return (
        <>
            <S.Container>
                <h2>Serviços</h2>
                <S.ServiceHeader>
                    <button onClick={openModal}>+ Novo Serviço</button>
                </S.ServiceHeader>
                <S.Head>
                    <p>Nome</p>
                    <p>Valor</p>
                    <i className="ri-tools-line"></i>
                </S.Head>
                <S.List>
                    {servicos.map((servico) => (
                        <S.ListItem key={servico.id}>
                            <p>{servico.nome}</p>
                            <p>R$ {Number(servico.preco).toFixed(2)}</p>
                            <S.IconsGroup>
                                <i className="ri-edit-2-line edit" onClick={openEditModal}></i>
                                <i className="ri-delete-bin-line delete" onClick={() => handleDelete(servico.id)}></i>
                            </S.IconsGroup>
                        </S.ListItem>
                    ))}
                </S.List>
            </S.Container>

            {modalIsOpen &&
                <CriarServicoModal closeModal={closeModal} onSuccess={fetchServicos} />
            }

            {editModalIsOpen &&
                <EditarServicoModal closeModal={closeEditModal} />
            }
        </>
    )
}

export default Servicos
