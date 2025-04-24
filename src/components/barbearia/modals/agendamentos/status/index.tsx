import { Agendamento } from '../../../../cliente/modals/meus_agendamentos'
import * as S from './styles'

type StatusModalProps = {
    isOpen: boolean
    onClose: () => void
    agendamento: Agendamento | null
    setAgendamento: (agendamento: Agendamento) => void
    error: string | null
    onUpdate: (agendamentoId: number, novoStatus: Agendamento['status']) => void
    formatarStatus: (status: Agendamento['status']) => string
}

const StatusModal = ({
    isOpen,
    onClose,
    agendamento,
    setAgendamento,
    error,
    onUpdate,
    formatarStatus,
}: StatusModalProps) => {
    if (!isOpen || !agendamento) return null

    return (
        <S.Overlay>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Alterar Status do Agendamento</h2>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                <S.ModalContent>
                    <S.InfoItem>
                        <S.InfoLabel>Cliente</S.InfoLabel>
                        <S.InfoValue>{agendamento.cliente_nome}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Serviço</S.InfoLabel>
                        <S.InfoValue>{agendamento.servico_nome}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Status Atual</S.InfoLabel>
                        <S.InfoValue status={agendamento.status}>
                            {formatarStatus(agendamento.status)}
                        </S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Novo Status</S.InfoLabel>
                        <S.Select
                            value={agendamento.status}
                            onChange={(e) =>
                                setAgendamento({
                                    ...agendamento,
                                    status: e.target.value as Agendamento['status'],
                                })
                            }
                        >
                            <option value="CONFIRMADO">Confirmado</option>
                            <option value="CANCELADO">Cancelado</option>
                            <option value="EXPIRADO">Expirado</option>
                            <option value="CONCLUIDO">Concluído</option>
                        </S.Select>
                    </S.InfoItem>
                    <S.SubmitButton onClick={() => onUpdate(agendamento.id, agendamento.status)}>
                        Salvar Alteração
                    </S.SubmitButton>
                </S.ModalContent>
            </S.Modal>
        </S.Overlay>
    )
}

export default StatusModal
