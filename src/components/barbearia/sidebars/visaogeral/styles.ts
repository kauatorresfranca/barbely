import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    width: 100%;
    color: #fff;

    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
    }
`

export const Header = styled.div`
    margin-bottom: 20px;

    h2 {
        font-size: 24px;
        font-weight: bold;
    }
`

export const Filtro = styled.div`
    display: flex;
    align-items: center;

    input {
        height: 42px;
        width: 100%;
        padding: 8px;
        color: ${colors.branco};
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid rgba(134, 126, 126, 0.53);
        font-size: 16px;
        font-weight: bold;
        transition: 0.3s;
        color-scheme: dark light; /* Tenta adaptar ao tema */

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }

        &::-webkit-calendar-picker-indicator {
            filter: invert(1); /* Inverte a cor do ícone */
            cursor: pointer;
        }
    }

    button {
        height: 42px;
        width: 140px;
        font-weight: bold;
        color: ${colors.cinzaEscuro};
        background-color: ${colors.corPrimaria};
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
`

export const InputsContainer = styled.div`
    display: flex;
    width: 30%;
`

export const InputGroup = styled.div`
    width: 100%;
    margin-right: 8px;
    margin-bottom: 25px;

    p {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: ${colors.texto};
    }
`

export const FirstLine = styled.div`
    display: flex;
    gap: 20px;
`

export const SecondLine = styled.div`
    display: flex;
    max-height: 358px;
    height: 100%;
    width: 100%;
    margin-top: 40px;
    gap: 20px;
`

export const Card = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: ${colors.cinzaClaro};
    height: 130px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-left: 4px solid ${colors.corPrimaria};

    .valor {
        position: absolute;
        right: 70px;
    }

    i {
        color: ${colors.branco};
        font-size: 28px;
    }

    h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: ${colors.texto};
    }

    p {
        font-size: 22px;
        font-weight: bold;
        color: ${colors.branco};
    }

    &#secondline {
        height: 175px;
        width: 100%;
        border: none;

        .valor {
            position: absolute;
            right: 240px;
        }
    }
`

export const GraficoContainer = styled.div`
    background: ${colors.cinzaClaro};
    border-radius: 8px;
    width: 60.5%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
`
