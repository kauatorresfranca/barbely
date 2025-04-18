import * as S from './styles'

interface Props {
    closeModal: () => void
}

const EditarServicoModal = ({ closeModal }: Props) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Editar Servico</h2>
                {/* Seu formulário vai aqui */}
            </S.Modal>
        </S.Overlay>
    )
}

export default EditarServicoModal
