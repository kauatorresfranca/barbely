import { useEffect } from 'react'
import * as S from './styles'

interface ToastProps {
    message: string
    onClose: () => void
}

export const Toast = ({ message, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 2500) // 3 segundos
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <S.ToastContainer
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: -200, x: -150, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }} // aplica a todas as fases
        >
            {message}
        </S.ToastContainer>
    )
}
