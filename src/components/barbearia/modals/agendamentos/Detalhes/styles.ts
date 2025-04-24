import styled from 'styled-components'
import { colors } from '../../../../../../styles'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

export const Modal = styled.div`
    background: linear-gradient(145deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
    padding: 2.5rem;
    border-radius: 16px;
    width: 550px;
    max-width: 95%;
    position: relative;
    animation: slideIn 0.4s ease-out;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);

    h2 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: ${colors.branco};
        font-size: 1.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.branco}AA;
    transition: all 0.3s ease;

    &:hover {
        color: ${colors.corPrimaria};
        transform: scale(1.1);
    }
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
    }
`

export const InfoLabel = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.branco}CC;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

export const InfoValue = styled.span<{
    status?: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
}>`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ status }) =>
        status === 'CANCELADO'
            ? '#ff4444'
            : status === 'EXPIRADO'
            ? '#888888'
            : status === 'CONCLUIDO'
            ? '#28a745'
            : colors.branco};
    text-align: right;
`
