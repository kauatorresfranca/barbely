import styled from 'styled-components'
import { breakpoints, colors } from '../../../../styles'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 12px 12px 0 12px;
    border-radius: 8px;
    text-align: center;

    p {
        font-size: 14px;
        color: ${colors.texto};
    }

    @media (max-width: ${breakpoints.tablet}) {
        padding: 4px;
    }
`
