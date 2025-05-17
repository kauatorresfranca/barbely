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
    background: linear-gradient(135deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
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

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;

    button {
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
    }
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
        color: ${colors.corPrimaria};
    }
`
