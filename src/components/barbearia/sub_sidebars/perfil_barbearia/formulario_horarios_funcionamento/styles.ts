import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Container = styled.div`
    width: 680px;
    background: ${colors.cinzaClaro};
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    transition: 0.3s ease-in-out;

    h2 {
        text-align: center;
    }

    .subtitle {
        color: ${colors.texto};
        font-size: 14px;
        text-align: center;
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
        padding: 20px 10px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th,
    td {
        padding: 10px;
        text-align: left;
        color: #fff;
    }

    th {
        font-weight: 500;
        color: ${colors.texto};
    }
`

export const CheckboxWrapper = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    cursor: pointer;
    user-select: none;
    font-size: 16px;

    h3 {
        font-size: 16px;
    }

    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid ${colors.cinzaTransparent};
        border-radius: 4px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    input:checked + .checkmark {
        background: ${colors.cinzaClaro};
        border-color: ${colors.corPrimaria};
    }

    input:checked + .checkmark::after {
        content: '✔';
        font-size: 14px;
        color: ${colors.corPrimaria};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media (max-width: ${breakpoints.desktop}) {
        h3 {
            font-size: 12px;
        }
    }
`

export const Input = styled.input`
    background: ${colors.cinzaEscuro};
    border: 1px solid #444;
    height: 50px;
    padding: 8px;
    color: #fff;
    border-radius: 4px;
    width: 120px;
    text-align: center;
    border: none;
    color-scheme: dark;

    &:disabled {
        opacity: 0.5;
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
    }
`

export const Button = styled.button`
    background: ${colors.corPrimaria};
    color: #000;
    padding: 14px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    min-height: 200px; /* Ajuste conforme necessário */
`

export const Message = styled.p`
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
`
