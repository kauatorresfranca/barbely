import { useEffect, useState } from 'react'
import * as S from './styles'
import CriarProfissionalModal from '../../../formularios/sidebars/profissional/profissional_criar'
import EditarProfissionalModal from '../../../formularios/sidebars/profissional/profissional_editar'
import { Funcionario } from '../../../../models/funcionario'

const Profissionais = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openEditModal = () => setEditModalIsOpen(true)
    const closeEditModal = () => setEditModalIsOpen(false)

    const fetchFuncionarios = async () => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await fetch('http://localhost:8000/api/funcionarios/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setFuncionarios(data);
            } else {
                console.error('Erro ao buscar profissionais');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Deseja realmente deletar este profissional?")
        if (!confirm) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await fetch(`http://localhost:8000/api/funcionarios/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setFuncionarios(prev => prev.filter(f => f.id !== id))
            } else {
                console.error('Erro ao deletar profissional')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    useEffect(() => {
        fetchFuncionarios()
    }, [])

    return (
        <>
            <S.Container>
                <h2>Profissionais</h2>
                <p className='subtitle'>Adicione, edite ou remova os profissionais que fazem parte da sua equipe.</p>
                <S.ServiceHeader>
                    <button onClick={openModal}>+ Novo Profissional</button>
                </S.ServiceHeader>
                <S.Head>
                    {funcionarios.length <= 0 ? (
                        <p className='empty'>Você ainda não tem profissionais cadastrados</p>
                    ): (
                        <>
                            <p>Nome</p>
                            <i className="ri-tools-line"></i>
                        </>
                    )}
                </S.Head>
                <S.List>
                    {funcionarios.map((func) => (
                        <S.ListItem key={func.id}>
                            <p>{func.nome}</p>
                            <S.IconsGroup>
                                <i className="ri-edit-2-line edit" onClick={openEditModal}></i>
                                <i className="ri-delete-bin-line delete" onClick={() => handleDelete(func.id)}></i>
                            </S.IconsGroup>
                        </S.ListItem>
                    ))}
                </S.List>
            </S.Container>

            {modalIsOpen &&
                <CriarProfissionalModal closeModal={closeModal} onSuccess={fetchFuncionarios} />
            }

            {editModalIsOpen &&
                <EditarProfissionalModal closeModal={closeEditModal} />
            }
        </>
    )
}

export default Profissionais
