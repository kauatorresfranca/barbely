import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`

`

export const Confirmacao = styled.div`
    background-color: ${colors.cinzaEscuro};
    padding: 12px 20px;
    border-radius: 10px;
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
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
