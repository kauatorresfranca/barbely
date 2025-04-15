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
        align-items: center;

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
            text-decoration: underline;
        }
    }
`
export const Button = styled.button`
    width: 100%;
    margin: 12px 0;
    background-color: ${colors.cinzaEscuro};
    color: ${colors.branco};
    border: none;
    padding: 12px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
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
