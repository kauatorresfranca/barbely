import styled from 'styled-components'
import { colors } from '../../../styles'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    padding: 20px;
    gap: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};
`

export const ToBarberClientLink = styled(Link)`
    background-color: transparent;
    width: 240px;
    border: 2px solid ${colors.corPrimaria};
    color: ${colors.corPrimaria};
    padding: 12px;
    text-align: center;
    border-radius: 10px;
`