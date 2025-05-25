import styled from 'styled-components'
import { colors } from '../../../../../styles'

export type SelectableProps = {
    $selected: boolean
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const MetodosList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 12px 0;
`

export const MetodoItem = styled.div<SelectableProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 8px;
    border: 2px solid ${({ $selected }) => ($selected ? colors.corPrimaria : 'transparent')};
    border-radius: 8px;
    cursor: pointer;
    background-color: ${colors.cinzaEscuro};
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        border-color: #fff;
    }

    p {
        margin: 0;
        color: ${colors.branco};
        font-size: 1rem;
    }
`

export const MetodoContent = styled.div`
    display: flex;
    gap: 8px;

    .pix {
        color: #2de0ca;
    }

    .card {
        color: ${colors.branco};
    }

    .cash {
        color: ${colors.verde};
    }
`

export const Button = styled.button`
    padding: 12px;
    background-color: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &.back {
        background-color: ${colors.cinzaEscuro};
        color: ${colors.branco};
    }

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`
