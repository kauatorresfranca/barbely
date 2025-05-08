import styled from 'styled-components'
import { breakpoints, colors } from '../../../../styles'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    background: transparent; /* Deixa o fundo transparente para herdar do S.Content */
    border-radius: 12px;
    text-align: center;

    h2 {
        color: ${colors.branco};
        font-size: 20px;
        margin-bottom: 15px;
        font-weight: 600;
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
        margin: 10px 0;
    }

    @media (max-width: ${breakpoints.tablet}) {
        padding: 12px;
        h2 {
            font-size: 18px;
        }
    }
`
