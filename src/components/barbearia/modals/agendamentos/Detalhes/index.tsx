import { Agendamento } from '../../../../cliente/modals/meus_agendamentos'
import * as S from './styles'

type DetalhesModalProps = {
    isOpen: boolean
    onClose: () => void
    agendamento: Agendamento | null
    formatarStatus: (status: Agendamento['status']) => string
}

const DetalhesModal = ({ isOpen, onClose, agendamento, formatarStatus }: DetalhesModalProps) => {
    if (!isOpen || !agendamento) return null

    return (
        <S.Overlay>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Detalhes do Agendamento</h2>
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
                        <S.InfoLabel>Horário</S.InfoLabel>
                        <S.InfoValue>{agendamento.hora_inicio.slice(0, 5)}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Duração</S.InfoLabel>
                        <S.InfoValue>{`${agendamento.servico_duracao} minutos`}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Status</S.InfoLabel>
                        <S.InfoValue status={agendamento.status}>
                            {formatarStatus(agendamento.status)}
                        </S.InfoValue>
                    </S.InfoItem>
                </S.ModalContent>
            </S.Modal>
        </S.Overlay>
    )
}

export default DetalhesModal
