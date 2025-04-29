import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Success = styled.div`
    text-align: center;

    p {
        color: ${colors.texto};
        font-size: 14px;
    }
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
