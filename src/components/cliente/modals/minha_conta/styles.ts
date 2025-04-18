import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

// Estilizações para as modais
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const ModalContent = styled.div`
    background: linear-gradient(135deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideUp 0.3s ease-out;

    @media (max-width: ${breakpoints.tablet}) {
        max-width: 100%;
        height: 100%;
        border-radius: 0;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: ${colors.branco};
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`

export const ModalBody = styled.div`
    margin-top: 24px;
    color: ${colors.branco};

    p {
        font-size: 16px;
        margin-bottom: 12px;
    }
`

export const ModalButton = styled.button`
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 16px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`

export const AgendamentoItem = styled.div`
    background: ${colors.cinzaClaro};
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    p {
        font-size: 14px;
        margin-bottom: 8px;
    }
`
