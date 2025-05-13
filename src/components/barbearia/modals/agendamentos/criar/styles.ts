import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

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
    overflow-y: scroll;

    h2 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: ${colors.branco};
        font-size: 18px;
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

    @media (max-width: ${breakpoints.desktop}) {
        width: 90%;
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
    border-radius: 10px;
`

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    transition: all 0.3s ease;
`

export const InfoLabel = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.corPrimaria};
`

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    padding-left: 8px;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 4px;
    background: ${colors.cinzaEscuro};
    transition: border 0.4s ease-in-out;

    &:hover {
        border: 1px solid ${colors.branco};
    }

    &:focus {
        border: 1px solid ${colors.corPrimaria};
        outline: none;
    }

    &::placeholder {
        color: ${colors.cinzaClaro};
        font-weight: bold;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    padding-left: 8px;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 4px;
    background: ${colors.cinzaEscuro};
    transition: border 0.4s ease-in-out;

    &:hover {
        border: 1px solid ${colors.branco};
    }

    &:focus {
        border: 1px solid ${colors.corPrimaria};
        outline: none;
    }
    &::placeholder {
        color: ${colors.cinzaClaro};
        font-weight: bold;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    option {
        background: ${colors.cinzaEscuro};
        color: ${colors.branco};
    }
`

export const ErrorMessage = styled.p`
    color: #ff4444;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
`

export const SuccessMessage = styled.p`
    color: rgb(43, 138, 67);
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
`

export const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}AA);
    color: ${colors.branco};
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
        transform: scale(1.03);
        background: linear-gradient(45deg, ${colors.corPrimaria}CC, ${colors.corPrimaria});
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`
