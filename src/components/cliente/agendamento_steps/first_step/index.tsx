import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const FirstStep = ({ setActiveTab, barbearia }: Props) => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [servicos, setServicos] = useState<Servico[]>([])
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
    const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number | null>(null)
    const [clienteNome, setClienteNome] = useState<string>('')
    const [clienteEmail, setClienteEmail] = useState<string>('')
    const [telefone, setTelefone] = useState<string>('')

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

            // Validação para agendamento sem login
            if (barbearia?.agendamento_sem_login) {
                if (!clienteNome.trim()) {
                    alert('Por favor, insira o nome do cliente para prosseguir.')
                    return
                }
                if (!clienteEmail.trim()) {
                    alert('Por favor, insira o e-mail do cliente para prosseguir.')
                    return
                }
                // Validação básica de e-mail (opcional)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(clienteEmail.trim())) {
                    alert('Por favor, insira um e-mail válido.')
                    return
                }
            }

            const dataToSend: Partial<AgendamentoData> = { servico, funcionario }
            if (barbearia?.agendamento_sem_login) {
                dataToSend.clienteNome = clienteNome.trim()
                dataToSend.clienteEmail = clienteEmail.trim()
                if (telefone.trim()) {
                    dataToSend.telefone = telefone.trim()
                }
            }

            setActiveTab('horarios', dataToSend)
        } else {
            alert('Por favor, selecione um serviço!')
        }
    }

    const logar = () => {
        navigate(`/barbearia/${slug}/login`)
    }

    return (
        <S.Container>
            <S.Employee>
                <h3>Escolha um barbeiro</h3>
                {funcionarios ? (
                    <S.EmployeeList>
                        {funcionarios.length > 0 ? (
                            funcionarios.map((func) => (
                                <S.EmployeeItem
                                    key={func.id}
                                    onClick={() => setSelectedFuncionarioId(func.id)}
                                    $selected={selectedFuncionarioId === func.id}
                                >
                                    <img src={user} alt={`Foto de ${func.nome}`} />
                                    <h4>{func.nome}</h4>
                                </S.EmployeeItem>
                            ))
                        ) : (
                            <p>A barbearia ainda não tem barbeiros cadastrados.</p>
                        )}
                    </S.EmployeeList>
                ) : (
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                )}
            </S.Employee>
            <S.Service>
                <h3>Escolha o serviço</h3>
                {servicos ? (
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
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                )}
            </S.Service>
            {barbearia?.agendamento_sem_login && (
                <S.ClienteNome>
                    <h3>Digite seus dados</h3>
                    <S.Input
                        type="text"
                        value={clienteNome}
                        onChange={(e) => setClienteNome(e.target.value)}
                        placeholder="Digite seu nome completo"
                        required
                    />
                    <S.Input
                        type="email"
                        value={clienteEmail}
                        onChange={(e) => setClienteEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                    <S.Input
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite seu telefone (opcional)"
                    />
                    <S.OrDivider>
                        <span>ou</span>
                    </S.OrDivider>
                    <S.SignInOption onClick={logar}>Siga com uma conta</S.SignInOption>
                </S.ClienteNome>
            )}
            <S.Button onClick={handleNext}>Prosseguir</S.Button>
        </S.Container>
    )
}

export default FirstStep
