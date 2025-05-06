import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Overlay = styled.div`
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

export const Modal = styled.div`
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

    h2 {
        text-align: center;
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 90%;
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

export const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
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

export const ButtonGroup = styled.div`
    display: flex;
    width: 100%;
    gap: 12px;
`

export const inputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    width: 100%;

    input {
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
    }

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    label {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.texto};
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

export const InfoClientList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    strong {
        color: ${colors.corPrimaria};
    }

    p {
        display: flex;
        gap: 12px;
        font-weight: 400;
    }
`
