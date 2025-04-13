import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;


    input {
        height: 42px;
        width: 100%;
        padding: 8px;
        margin-right: 18px;
        color: ${colors.branco};
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid rgba(134, 126, 126, 0.53);
        font-size: 16px;
        font-weight: bold;
        transition: .3s;
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
    width: 15%;
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

export const Container = styled.div`
    padding: 20px;
`

export const Timeline = styled.div`
    position: relative;
    display: flex;
    margin-left: 60px;
    border-left: 2px solid ${colors.cinzaTransparent};
    border-right: 2px solid ${colors.cinzaTransparent};
`

export const Horarios = styled.div`
    position: absolute;
    left: -60px;
    width: 50px;
`

export const Hora = styled.div`
    position: absolute;
    font-size: 12px;
    color: #888;
`

export const LinhaHora = styled.div<{ top: number }>`
    position: absolute;
    left: 0;
    right: 0;
    top: ${({ top }) => `${top}px`};
    height: 1px;
    background-color: ${colors.cinzaTransparent};
`

export const AgendamentosArea = styled.div`
    position: relative;
    flex: 1;
`

export const AgendamentoBlock = styled.div<{ hora: string }>`
    position: absolute;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    background-color: ${colors.branco};
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 14px;

    p {
        color: ${colors.corPrimaria};

        &.cliente {
            color: ${colors.cinzaEscuro};
            font-weight: bold;
        }
    }
`

export const Button = styled.div`
    padding: 8px;
    background-color: ${colors.corPrimaria};
    color: ${colors.branco};
    border-radius: 6px;
    cursor: pointer;
`
