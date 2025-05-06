import * as S from './styles'

interface DeleteConfirmationModalProps {
    isOpen: boolean
    itemName: string
    onConfirm: () => void
    onClose: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    itemName,
    onConfirm,
    onClose,
}) => {
    if (!isOpen) return null

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja deletar {itemName}?</p>
                <S.ButtonGroup>
                    <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
                    <S.ModalButton onClick={onConfirm} className="delete">
                        Deletar
                    </S.ModalButton>
                </S.ButtonGroup>
            </S.Modal>
        </S.Overlay>
    )
}

export default DeleteConfirmationModal
