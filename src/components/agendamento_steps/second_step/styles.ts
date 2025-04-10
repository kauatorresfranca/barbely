import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`


    h3 {
        font-weight: 500;
    }
`

export const Button = styled.button`
    padding: 12px;
    margin-top: 12px;
    width: 100%;
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

export const Data = styled.div`

`

export const Horario = styled.div`

`

export const HorarioList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`

export const HorarioItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 48px;
    padding: 8px;
    background-color: ${colors.cinzaEscuro};
    font-weight: 500;
    border-radius: 10px;
`
