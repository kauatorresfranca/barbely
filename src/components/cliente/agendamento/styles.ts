import styled from 'styled-components'
import { colors } from '../../../../styles'

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

export const Etapas = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    span {
        height: 8px;
        width: 23%;
        background-color: ${colors.branco};
        border-radius: 10px;
        transition: 0.7s;
        cursor: pointer;

        &.active {
            background-color: ${colors.corPrimaria};
        }

        &.disabled {
            background-color: ${colors.branco};
            opacity: 0.5;
            cursor: not-allowed;
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

export const Step = styled.div`
    display: flex;
    flex-direction: column;
`

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 12px;
    background-color: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${colors.corPrimariaEscura};
    }
`
