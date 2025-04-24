import styled from 'styled-components'
import { colors } from '../../../../../styles'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 12px;
        margin: 20px 0;
        background-color: ${colors.cinzaEscuro};
        border-radius: 10px;

        i {
            font-size: 20px;
            margin-right: 4px;
        }
    }

    p {
        margin: 12px 0;
        text-align: center;
        color: ${colors.texto};

        &.linktext {
            color: ${colors.branco};
            font-weight: 400;
        }
    }
`
export const Button = styled.button`
    width: 40px;
    background-color: ${colors.cinzaEscuro};
    color: ${colors.branco};
    border: none;
    padding: 12px;
    margin-left: 12px;
    border-left: 1px solid ${colors.cinzaTransparent};
    font-weight: 400;
    cursor: pointer;
    transition: 0.3s;
    text-align: center;
`

export const ToBarberClientLink = styled(Link)`
    background-color: ${colors.corPrimaria};
    width: 100%;
    color: ${colors.cinzaClaro};
    padding: 12px;
    border: none;
    text-align: center;
    border-radius: 10px;
    font-weight: 600;
`
