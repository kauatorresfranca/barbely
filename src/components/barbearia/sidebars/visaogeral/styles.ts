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

    @media (max-width: ${breakpoints.desktop}) {
        .subtitle {
            font-size: 12px;
        }
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
        background-color: ${colors.cinzaClaro};
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        transition: 0.3s;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        option {
            background-color: ${colors.cinzaClaro};
            color: ${colors.branco};
        }
    }

    @media (max-width: ${breakpoints.desktop}) {
        gap: 8px;

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

    @media (max-width: ${breakpoints.desktop}) {
        font-size: 12px;
        padding: 0px 0px 0px 0px;
    }
`

export const DateInputsWrapper = styled.div`
    position: absolute;
    top: 50px;
    left: 170px;
    display: flex;
    z-index: 10;
    background: ${colors.cinzaClaro};
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 12px 12px 20px 12px;
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

    @media (max-width: ${breakpoints.desktop}) {
        flex-direction: column;
        left: 0;
        right: 0;
        padding: 12px 12px 12px 12px;

        button {
            width: 100%;
        }
    }
`

export const InputsContainer = styled.div`
    display: flex;
    width: 30%;
`

export const InputsGroup = styled.div`
    display: flex;
    gap: 8px;

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
    }
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

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;

        input[type='date'] {
            width: 100%;
        }
    }
`

export const FirstLine = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: ${breakpoints.desktop}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`

export const SecondLine = styled.div`
    display: flex;
    max-height: 358px;
    height: 100%;
    width: 100%;
    margin-top: 40px;
    gap: 20px;

    @media (max-width: ${breakpoints.desktop}) {
        flex-direction: column;
    }
`

export const Card = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, ${colors.cinzaClaro}CC, ${colors.cinzaEscuro}66);
    height: 130px;
    width: 100%;
    padding: 20px;
    border-radius: 10px; /* Ajustado para 10px */
    text-align: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .valor {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-grow: 1;
    }

    i {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 24px;
        color: ${colors.corPrimaria};
        background: ${colors.cinzaEscuroTransparent};
        border-radius: 8px; /* Ajustado para 8px */
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    &:hover i {
        transform: scale(1.1);
    }

    h3 {
        font-size: 16px;
        margin-bottom: 8px;
        color: ${colors.texto};
        font-weight: 500;
    }

    p {
        font-size: 20px;
        font-weight: 700;
        color: ${colors.branco};
        margin: 0;
    }

    &#secondline {
        height: 175px;
        width: 100%;
        border: none;
    }

    @media (max-width: ${breakpoints.desktop}) {
        flex-direction: column;
        padding: 12px;
        height: auto;

        .valor {
            align-items: center;
            margin-top: 10px;
        }

        i {
            position: relative;
            top: 0;
            right: 0;
            font-size: 28px;
            padding: 8px;
        }

        h3 {
            font-size: 14px;
            margin-bottom: 6px;
        }

        p {
            font-size: 18px;
        }

        &#secondline {
            height: auto;
        }
    }
`

export const GraficoContainer = styled.div`
    background: linear-gradient(135deg, ${colors.cinzaClaro}CC, ${colors.cinzaEscuro}66);
    border-radius: 10px; /* Ajustado para 10px */
    width: 60.5%;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
    }
`

export const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;

    @media (max-width: ${breakpoints.desktop}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
    }
`

export const MetricsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40px; /* Ajuste conforme necessário para os cards */
`

export const Message = styled.p`
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
`
