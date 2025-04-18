import { Cliente } from '../../../../../models/cliente'
import * as S from './styles'

interface Props {
    cliente: Cliente | null
    closeModal: () => void
}

const ClienteDetail = ({ cliente, closeModal }: Props) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Detalhes do Cliente</h2>
                {cliente ? (
                    <div>
                        <p>
                            <strong>Nome:</strong> {cliente.user.nome}
                        </p>
                        <p>
                            <strong>Telefone:</strong> {cliente.user.telefone}
                        </p>
                        {/* Adicione mais campos conforme necessário */}
                    </div>
                ) : (
                    <p>Nenhum cliente selecionado.</p>
                )}
                <S.Button onClick={closeModal}>Fechar</S.Button>
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteDetail
