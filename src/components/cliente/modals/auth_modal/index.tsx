import { useState } from 'react'
import * as S from './styles'
import logo from '../../../../assets/images/logo.png'
import FormularioLoginCliente from '../login'
import FormularioCadastroCliente from '../cadastro'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    onLoginSuccess: () => void
}

const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true)

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <S.Overlay isOpen={isOpen} onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <img src={logo} alt="Logo" />
                {isLoginView ? (
                    <FormularioLoginCliente
                        onLoginSuccess={onLoginSuccess}
                        onSwitchToCadastro={() => setIsLoginView(false)}
                    />
                ) : (
                    <FormularioCadastroCliente onSwitchToLogin={() => setIsLoginView(true)} />
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default AuthModal
