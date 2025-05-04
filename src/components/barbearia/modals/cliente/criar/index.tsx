import React from 'react'
import * as S from './styles'

interface ClienteEditProps {
    closeModal: () => void
}

const ClienteNew: React.FC<ClienteEditProps> = ({ closeModal }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Criar Cliente</h2>
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteNew
