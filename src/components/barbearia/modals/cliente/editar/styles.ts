import styled from 'styled-components'
import { colors } from '../../../../../../styles'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

export const Modal = styled.div`
    background-color: ${colors.cinzaClaro};
    padding: 2rem;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;

    h2 {
        margin-bottom: 12px;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    label {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        color: ${colors.cinzaEscuro};

        input {
            margin-top: 4px;
            padding: 8px;
            border: 1px solid ${colors.cinzaClaro};
            border-radius: 4px;
            font-size: 1rem;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
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

export const Button = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${colors.corPrimaria};
    color: white;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #0056b3;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
`

export const CancelButton = styled(Button)`
    background-color: ${colors.cinzaClaro};

    &:hover {
        background-color: ${colors.cinzaEscuro};
    }
`
