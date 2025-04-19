import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    width: 680px;
    background: ${colors.cinzaClaro};
    padding: 20px;
    border-radius: 8px;
    color: #fff;
`

export const PlanosGrid = styled.div`
    display: flex;
    gap: 24px;
`

export const PlanoCard = styled.div<{ atual: boolean }>`
    background-color: ${colors.cinzaEscuro};
    border: 2px solid ${(props) => (props.atual ? colors.corPrimaria : colors.cinzaTransparent)};
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 20px;
        color: ${colors.branco};
        margin-bottom: 12px;
    }
    .preco {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.corPrimaria};
        margin-bottom: 16px;
    }
    ul {
        list-style: none;
        margin-bottom: 20px;
        li {
            margin-bottom: 8px;
            color: ${colors.texto};
        }
    }
`

export const Botao = styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:disabled {
        background-color: ${colors.cinzaTransparent};
        cursor: not-allowed;
    }
`
