import * as S from './styles'

interface Props {
    closeModal: () => void
}

const EditarProfissionalModal = ({ closeModal }: Props) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Editar Profissional</h2>
                <S.inputGroup>
                    <label htmlFor="nome_profissional">Nome do Profissional</label>
                    <input
                        type="text"
                        id="nome_profissional"
                        name="nome"
                        placeholder="Nome do Profissional"
                        required
                    />
                </S.inputGroup>
                <button className="confimar" type="submit">
                    Confirmar Alterações
                </button>
            </S.Modal>
        </S.Overlay>
    )
}

export default EditarProfissionalModal
