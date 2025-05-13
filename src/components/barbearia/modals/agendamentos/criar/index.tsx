import { Dispatch, SetStateAction, useState } from 'react'
import * as S from './styles'
import { NovoAgendamento } from '../../../../../models/Agendamento'
import { Servico } from '../../../../../models/servico'
import { Funcionario } from '../../../../../models/funcionario'
import { authFetch } from '../../../../../utils/authFetch'
import api from '../../../../../services/api'

interface CriarAgendamentoModalProps {
    isOpen: boolean
    onClose: () => void
    novoAgendamento: NovoAgendamento
    setNovoAgendamento: Dispatch<SetStateAction<NovoAgendamento>>
    funcionarios: Funcionario[]
    servicos: Servico[]
    horas: string[]
    criandoAgendamento: boolean
    onCreate: () => void
    agendamentoSemLogin: boolean
}

const CriarAgendamentoModal = ({
    isOpen,
    onClose,
    novoAgendamento,
    setNovoAgendamento,
    funcionarios,
    servicos,
    horas,
    criandoAgendamento,
    onCreate,
    agendamentoSemLogin,
}: CriarAgendamentoModalProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    if (!isOpen) return null

    const handleCreate = async () => {
        // Limpar mensagens anteriores
        setErrorMessage(null)
        setSuccessMessage(null)

        // Validar campos obrigatórios
        if (!novoAgendamento.cliente_email) {
            setErrorMessage('O e-mail do cliente é obrigatório.')
            return
        }
        if (!novoAgendamento.cliente_nome) {
            setErrorMessage('O nome do cliente é obrigatório.')
            return
        }
        if (!novoAgendamento.funcionario) {
            setErrorMessage('Selecione um funcionário.')
            return
        }
        if (!novoAgendamento.servico) {
            setErrorMessage('Selecione um serviço.')
            return
        }
        if (!novoAgendamento.data) {
            setErrorMessage('Selecione uma data.')
            return
        }
        if (!novoAgendamento.hora_inicio) {
            setErrorMessage('Selecione uma hora de início.')
            return
        }
        if (!novoAgendamento.metodo_pagamento) {
            setErrorMessage('Selecione um método de pagamento.')
            return
        }

        // Validar formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(novoAgendamento.cliente_email)) {
            setErrorMessage('Por favor, forneça um e-mail válido.')
            return
        }

        // Preparar payload
        const payload: NovoAgendamento = {
            cliente_email: novoAgendamento.cliente_email,
            cliente_nome: novoAgendamento.cliente_nome,
            funcionario: novoAgendamento.funcionario,
            servico: novoAgendamento.servico,
            data: novoAgendamento.data,
            hora_inicio: novoAgendamento.hora_inicio,
            metodo_pagamento: novoAgendamento.metodo_pagamento,
        }

        try {
            const response = await authFetch(`${api.baseURL}/barbearia/agendamentos/criar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setSuccessMessage('Agendamento criado com sucesso!')
                onCreate()
                setTimeout(() => {
                    onClose()
                }, 2000)
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.detail || 'Erro ao criar agendamento. Tente novamente.')
            }
        } catch (err: any) {
            console.error('Erro ao criar agendamento:', {
                message: err.message,
                response: err.response ? await err.response.text() : 'Sem resposta',
                status: err.response?.status,
            })
            setErrorMessage('Ocorreu um erro ao criar o agendamento. Tente novamente.')
        }
    }

    return (
        <S.Overlay>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Criar Novo Agendamento</h2>
                <S.ModalContent>
                    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                    {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
                    <S.InfoItem>
                        <S.InfoLabel>E-mail do Cliente</S.InfoLabel>
                        <S.Input
                            type="email"
                            value={novoAgendamento.cliente_email || ''}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    cliente_email: e.target.value,
                                })
                            }
                            placeholder="exemplo@dominio.com"
                            disabled={criandoAgendamento}
                            required
                        />
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Nome do Cliente</S.InfoLabel>
                        <S.Input
                            type="text"
                            value={novoAgendamento.cliente_nome}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    cliente_nome: e.target.value,
                                })
                            }
                            placeholder="Nome completo"
                            disabled={criandoAgendamento}
                            required
                        />
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Funcionário</S.InfoLabel>
                        <S.Select
                            value={novoAgendamento.funcionario}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    funcionario: e.target.value,
                                })
                            }
                            disabled={criandoAgendamento}
                            required
                        >
                            <option value="">Selecione um funcionário</option>
                            {funcionarios.map((func) => (
                                <option key={func.id} value={func.id}>
                                    {func.nome}
                                </option>
                            ))}
                        </S.Select>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Serviço</S.InfoLabel>
                        <S.Select
                            value={novoAgendamento.servico}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    servico: e.target.value,
                                })
                            }
                            disabled={criandoAgendamento}
                            required
                        >
                            <option value="">Selecione um serviço</option>
                            {servicos.map((serv) => (
                                <option key={serv.id} value={serv.id}>
                                    {serv.nome} ({serv.duracao_minutos} min)
                                </option>
                            ))}
                        </S.Select>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Data</S.InfoLabel>
                        <S.Input
                            type="date"
                            value={novoAgendamento.data}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    data: e.target.value,
                                })
                            }
                            disabled={criandoAgendamento}
                            required
                        />
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Hora de Início</S.InfoLabel>
                        <S.Select
                            value={novoAgendamento.hora_inicio}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    hora_inicio: e.target.value,
                                })
                            }
                            disabled={criandoAgendamento}
                            required
                        >
                            <option value="">Selecione uma hora</option>
                            {horas.map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </S.Select>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Método de Pagamento</S.InfoLabel>
                        <S.Select
                            value={novoAgendamento.metodo_pagamento}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    metodo_pagamento: e.target.value,
                                })
                            }
                            disabled={criandoAgendamento}
                            required
                        >
                            <option value="">Selecione o método de pagamento</option>
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </S.Select>
                    </S.InfoItem>
                </S.ModalContent>
                <S.SubmitButton onClick={handleCreate} disabled={criandoAgendamento}>
                    {criandoAgendamento ? 'Criando...' : 'Criar Agendamento'}
                </S.SubmitButton>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarAgendamentoModal
