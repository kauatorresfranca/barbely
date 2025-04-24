import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

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
    gap: 6px;
    margin-bottom: 20px;
    position: relative;

    select {
        height: 42px;
        width: 205px;
        padding: 8px;
        color: ${colors.branco};
        background-color: transparent;
        border-radius: 10px;
        border: 1px solid rgba(134, 126, 126, 0.53);
        font-size: 14px;
        font-weight: bold;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }

        option {
            background-color: ${colors.cinzaClaro};
            color: ${colors.branco};
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        select {
            width: 160px;
            font-size: 12px;
        }
    }
`

export const DateRange = styled.div`
    height: 42px;
    padding: 8px 12px;
    background-color: transparent;
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${colors.texto};
    cursor: pointer;
    transition: 0.3s;

    span {
        font-weight: bold;
        margin-right: 6px;
        color: ${colors.branco};
    }

    @media (max-width: ${breakpoints.tablet}) {
        font-size: 12px;
        padding: 0px 0px 0px 0px;
    }
`

export const DateInputsWrapper = styled.div`
    position: absolute;
    top: 50px;
    left: 170px;
    z-index: 10;
    background: ${colors.cinzaClaro};
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 12px 12px 20px 12px;
    display: flex;
    gap: 8px;
    align-items: flex-end;

    button {
        height: 40px;
        padding: 0 12px;
        font-weight: bold;
        color: ${colors.cinzaEscuro};
        background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}CC);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            opacity: 0.9;
        }
    }
`

export const InputsContainer = styled.div`
    display: flex;
    width: 30%;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 4px;
        color: ${colors.branco};
    }

    input[type='date'] {
        height: 40px;
        width: 140px;
        padding: 8px;
        color: ${colors.branco};
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid rgba(134, 126, 126, 0.53);
        font-size: 14px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }

        &::-webkit-calendar-picker-indicator {
            filter: invert(1); // Makes the calendar icon white
        }
    }
`

export const FirstLine = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
`

export const SecondLine = styled.div`
    display: flex;
    max-height: 358px;
    height: 100%;
    width: 100%;
    margin-top: 40px;
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
    }
`

export const Card = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(-45deg, ${colors.cinzaClaro}, ${colors.cinzaClaro}AA);
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

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
        padding: 8px;

        .valor {
            position: static;
        }

        h3 {
            font-size: 14px;
            margin-bottom: 10px;
            color: ${colors.texto};
        }

        p {
            font-size: 16px;
            font-weight: bold;
            color: ${colors.branco};
        }

        &#secondline {
            height: 175px;
            width: 100%;
            border: none;

            .valor {
                position: static;
            }
        }
    }
`

export const GraficoContainer = styled.div`
    background: linear-gradient(-45deg, ${colors.cinzaClaro}, ${colors.cinzaClaro}AA);
    border-radius: 8px;
    width: 60.5%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;

    @media (max-width: ${breakpoints.tablet}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
    }
`
