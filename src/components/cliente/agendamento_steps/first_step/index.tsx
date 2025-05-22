import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Funcionario } from '../../../../models/funcionario'
import { Servico } from '../../../../models/servico'
import { Barbearia } from '../../../../models/Barbearia'
import { AgendamentoData } from '../../agendamento'
import * as S from './styles'
import user from '../../../../assets/images/user.png'
import { ClipLoader } from 'react-spinners'
import api from '../../../../services/api'

type Props = {
    setActiveTab: (tab: string, data?: Partial<AgendamentoData>) => void
    barbearia: Barbearia | null
}

const FirstStep = ({ setActiveTab }: Props) => {
    const { slug } = useParams()
    const [servicos, setServicos] = useState<Servico[]>([])
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
    const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number | null>(null)

    useEffect(() => {
        if (slug) {
            sessionStorage.setItem('barbearia_slug', slug)
        }

        const fetchData = async () => {
            try {
                const [servicosRes, funcionariosRes] = await Promise.all([
                    fetch(`${api.baseURL}/servicos/?barbearia_slug=${slug}`),
                    fetch(`${api.baseURL}/funcionarios/?barbearia_slug=${slug}`),
                ])

                if (servicosRes.ok) {
                    const servicosData = await servicosRes.json()
                    console.log('Serviços carregados:', servicosData)
                    setServicos(servicosData)
                } else {
                    console.error('Erro ao buscar serviços')
                }

                if (funcionariosRes.ok) {
                    const funcionariosData = await funcionariosRes.json()
                    console.log('Funcionários carregados:', funcionariosData)
                    setFuncionarios(funcionariosData)
                } else {
                    console.error('Erro ao buscar profissionais')
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            }
        }

        fetchData()
    }, [slug])

    const handleNext = () => {
        if (selectedServiceId !== null) {
            const servico = servicos.find((s) => s.id === selectedServiceId)
            const funcionario =
                selectedFuncionarioId !== null
                    ? funcionarios.find((f) => f.id === selectedFuncionarioId) || null
                    : null

            if (!servico) {
                alert('Erro: Serviço selecionado não encontrado.')
                return
            }

            const dataToSend: Partial<AgendamentoData> = { servico, funcionario }
            setActiveTab('horarios', dataToSend)
        } else {
            alert('Por favor, selecione um serviço!')
        }
    }

    return (
        <S.Container>
            <S.Employee>
                <h3>Escolha um barbeiro</h3>
                {funcionarios ? (
                    funcionarios.length > 0 ? (
                        <S.EmployeeList>
                            {funcionarios.map((func) => (
                                <S.EmployeeItem
                                    key={func.id}
                                    onClick={() => setSelectedFuncionarioId(func.id)}
                                    $selected={selectedFuncionarioId === func.id}
                                >
                                    <img src={func.imagem ? `${func.imagem}` : `${user}`} alt={`Foto de ${func.nome}`} />
                                    <h4>{func.nome}</h4>
                                </S.EmployeeItem>
                            ))}
                        </S.EmployeeList>
                    ) : (
                        <p className='empty'>A barbearia ainda não tem nenhum barbeiro cadastrado.</p>
                    )
                ) : (
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                )}
            </S.Employee>
            <S.Service>
                <h3>Escolha o serviço</h3>
                {servicos ? (
                    servicos.length > 0 ? (
                        <S.ServicesList>
                            {servicos.map((servico) => (
                                <S.ServiceItem
                                    key={servico.id}
                                    onClick={() => setSelectedServiceId(servico.id)}
                                    $selected={selectedServiceId === servico.id}
                                >
                                    <div>
                                        <h4>{servico.nome}</h4>
                                        <p>{servico.duracao_minutos} min</p>
                                    </div>
                                    <p>R$ {servico.preco}</p>
                                </S.ServiceItem>
                            ))}
                        </S.ServicesList>
                    ) : (
                        <p className='empty'>A barbearia ainda não tem nenhum serviço cadastrado.</p>
                    )
                ) : (
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                )}
            </S.Service>
            <S.Button onClick={handleNext}>Prosseguir</S.Button>
        </S.Container>
    )
}

export default FirstStep
