import * as S from './styles'

interface Props {
    closeModal: () => void
}

const ClienteDetail = ({ closeModal }: Props) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Detalhes do cliente</h2>
                {/* Seu formulário vai aqui */}
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteDetail
