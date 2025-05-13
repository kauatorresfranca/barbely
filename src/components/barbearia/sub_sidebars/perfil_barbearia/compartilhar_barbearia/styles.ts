import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};
    transition: 0.3s ease-in-out;

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

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
        text-align: center;

        .link {
            width: 100%;

            i {
                font-size: 12px;
            }
        }

        .linktext {
            font-size: 12px;
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

    @media (max-width: ${breakpoints.desktop}) {
        width: 24pc;
    }
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
