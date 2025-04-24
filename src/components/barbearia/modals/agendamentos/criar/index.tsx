import * as S from './styles'

type Funcionario = {
    id: number
    nome: string
}

type Servico = {
    id: number
    nome: string
    duracao_minutos: number
}

type NovoAgendamento = {
    cliente_email: string
    cliente_nome: string
    funcionario: string
    servico: string
    data: string
    hora_inicio: string
}

type CriarAgendamentoModalProps = {
    isOpen: boolean
    onClose: () => void
    novoAgendamento: NovoAgendamento
    setNovoAgendamento: (novoAgendamento: NovoAgendamento) => void
    funcionarios: Funcionario[]
    servicos: Servico[]
    horas: string[]
    error: string | null
    criandoAgendamento: boolean
    onCreate: () => void
}

const CriarAgendamentoModal = ({
    isOpen,
    onClose,
    novoAgendamento,
    setNovoAgendamento,
    funcionarios,
    servicos,
    horas,
    error,
    criandoAgendamento,
    onCreate,
}: CriarAgendamentoModalProps) => {
    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Criar Novo Agendamento</h2>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                <S.ModalContent>
                    <S.InfoItem>
                        <S.InfoLabel>E-mail do Cliente</S.InfoLabel>
                        <S.Input
                            type="email"
                            value={novoAgendamento.cliente_email}
                            onChange={(e) =>
                                setNovoAgendamento({
                                    ...novoAgendamento,
                                    cliente_email: e.target.value,
                                })
                            }
                            placeholder="exemplo@dominio.com"
                            disabled={criandoAgendamento}
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
                        >
                            {horas.map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </S.Select>
                    </S.InfoItem>
                </S.ModalContent>
                <S.SubmitButton onClick={onCreate} disabled={criandoAgendamento}>
                    {criandoAgendamento ? 'Criando...' : 'Criar Agendamento'}
                </S.SubmitButton>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarAgendamentoModal
