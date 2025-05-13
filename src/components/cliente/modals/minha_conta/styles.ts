import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

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

    @media (max-width: ${breakpoints.desktop}) {
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

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
`

export const ImageWrapper = styled.div`
    position: relative;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
`

export const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    border: 2px solid ${colors.corPrimaria};
`

export const UserName = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: ${colors.branco};
    margin: 0;
    text-align: center;
`

export const ModalBody = styled.div`
    margin-top: 24px;
    color: ${colors.branco};
`

export const InfoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
`

export const InfoItem = styled.li`
    font-size: 16px;
    margin-bottom: 12px;
    color: ${colors.branco};
    display: flex;
    align-items: center;

    strong {
        color: ${colors.corPrimaria};
        margin-right: 8px;
        min-width: 80px;
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
    width: 100%;
    text-align: center;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 14px;
        color: ${colors.branco};
        margin-bottom: 4px;
    }
`

export const Input = styled.input`
    padding: 10px;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 4px;
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${colors.corPrimaria};
    }
`

export const ErrorMessage = styled.p`
    color: ${colors.vermelho};
    font-size: 14px;
    margin: 0;
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`

export const CancelButton = styled.button`
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    border: 1px solid ${colors.cinzaTransparent};
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
    text-align: center;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`
