import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`

`

export const Button = styled.button`
    background: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: 2px solid ${colors.corPrimaria};
    margin-right: 8px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${colors.corPrimaria};
        color: ${colors.branco};
    }
`
