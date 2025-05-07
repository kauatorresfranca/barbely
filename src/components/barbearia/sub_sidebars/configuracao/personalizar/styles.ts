import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    padding: 20px;
    gap: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`
