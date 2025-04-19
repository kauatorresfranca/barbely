import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    width: 680px;
    background: ${colors.cinzaClaro};
    padding: 20px;
    border-radius: 8px;
    color: #fff;

    h2 {
        margin-bottom: 12px;
        color: ${colors.branco};
    }
    p {
        margin-bottom: 24px;
        color: ${colors.texto};
    }
`

export const ResumoGrid = styled.div`
    display: flex;
    gap: 24px;
`

export const ResumoItem = styled.div`
    background-color: ${colors.cinzaEscuro};
    border: 2px solid ${colors.cinzaTransparent};
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    text-align: center;

    h3 {
        font-size: 18px;
        color: ${colors.branco};
        margin-bottom: 12px;
    }
    p {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.corPrimaria};
    }
`
