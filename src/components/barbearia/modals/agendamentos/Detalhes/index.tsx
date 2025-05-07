import { Agendamento } from '../../../../../models/Agendamento'
import * as S from './styles'

type DetalhesModalProps = {
    isOpen: boolean
    onClose: () => void
    agendamento: Agendamento | null
    formatarStatus: (status: Agendamento['status']) => string
}

// Função para formatar o método de pagamento
const formatarMetodoPagamento = (metodo: string | null): string => {
    if (!metodo) {
        return 'Não especificado'
    }

    switch (metodo.toLowerCase()) {
        case 'pix':
            return 'Pix'
        case 'cartao_credito':
            return 'Cartão de Crédito'
        case 'cartao_debito':
            return 'Cartão de Débito'
        case 'dinheiro':
            return 'Dinheiro'
        default:
            return metodo.charAt(0).toUpperCase() + metodo.slice(1).toLowerCase()
    }
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
                    <S.InfoItem>
                        <S.InfoLabel>Método de Pagamento</S.InfoLabel>
                        <S.InfoValue>
                            {formatarMetodoPagamento(agendamento.metodo_pagamento)}
                        </S.InfoValue>
                    </S.InfoItem>
                </S.ModalContent>
            </S.Modal>
        </S.Overlay>
    )
}

export default DetalhesModal
