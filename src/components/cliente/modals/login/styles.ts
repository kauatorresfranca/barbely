import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Overlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
    padding: 48px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideUp 0.3s ease-out;

    h2 {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.branco};
        margin-bottom: 4px;
        text-align: center;
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
        margin-bottom: 16px;
        text-align: center;
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 90%;
        padding: 20px;
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
    top: 8px;
    right: 12px;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;

    a {
        color: ${colors.corPrimaria};
        margin-top: 16px;
        font-weight: 500;

        &.criarConta {
            position: absolute;
            bottom: 24px;
        }

        &:hover {
            text-decoration: underline;
        }
    }

    button {
        width: 100%;
        height: 48px;
        margin-top: 16px;
        border: none;
        border-radius: 3px;
        background-color: ${colors.corPrimaria};
        color: ${colors.cinzaClaro};
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
    }
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    width: 100%;
    margin-top: 16px;

    input {
        width: 100%;
        height: 48px;
        padding-left: 8px;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: #181b20;
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
    }

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    label {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.texto};
    }

    i {
        position: absolute;
        right: 10px;
        color: ${colors.texto};

        &:hover {
            cursor: pointer;
        }
    }
`

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
`
