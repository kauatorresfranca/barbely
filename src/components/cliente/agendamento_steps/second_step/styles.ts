import styled from 'styled-components'
import { colors } from '../../../../../styles'
import 'react-day-picker/dist/style.css'

interface TurnoItemProps {
    selected: boolean
}

interface HorarioItemProps {
    selected: boolean
    disabled?: boolean
}

export const Container = styled.div`
    .rdp-root {
        --rdp-accent-color: ${colors.texto};
        --rdp-accent-background-color: ${colors.corPrimaria}1A;
        --rdp-today-color: ${colors.corPrimaria};
        --rdp-selected-border: 2px solid ${colors.corPrimaria};
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .rdp {
        font-family: inherit;
        display: flex;
        width: 100%;
        background-color: ${colors.cinzaEscuro};
        color: white;
        border-radius: 12px;
    }

    .rdp-months {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .rdp-month {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 1000px;
        max-width: none !important;
        flex: 1;
        min-width: 0;
        background-color: ${colors.cinzaEscuro};
        color: white;
        padding: 0 14px;
        border-radius: 10px;
    }

    .rdp-nav_button {
        color: ${colors.corPrimaria};
        background: transparent;
        border: none;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .rdp-nav_button svg {
        stroke: ${colors.corPrimaria};
        width: 20px;
        height: 20px;
    }

    .rdp-nav_button:hover {
        background-color: ${colors.corPrimaria};
    }

    .rdp-nav_button:hover svg {
        stroke: white;
    }

    .rdp-caption_label {
        color: white;
        font-weight: bold;
    }

    .rdp-day {
        color: white;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .rdp-day:hover {
        background-color: ${colors.corPrimaria};
        color: white;
    }

    .rdp-day_selected:not(.rdp-day_outside) {
        background-color: ${colors.corPrimaria};
        color: white;
        font-weight: bold;
    }

    .rdp-day_today {
        font-weight: bold;
        border: 1px solid ${colors.corPrimaria};
    }

    .rdp-day_disabled {
        color: #666;
        opacity: 0.5;
    }

    .rdp-day:focus,
    .rdp-day:focus-visible {
        outline: none;
        background-color: ${colors.corPrimaria};
    }

    h3 {
        font-weight: 500;
        margin: 8px 0;
    }
`

export const Button = styled.button`
    padding: 12px;
    margin-top: 12px;
    width: 100%;
    background-color: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`

export const Data = styled.div``

export const DataPickWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const Horario = styled.div`
    .nenhum_horario {
        width: 300px;
        color: ${colors.texto};
    }
`

export const TurnosList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin: 20px 0;
`

export const TurnoItem = styled.div<TurnoItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 48px;
    padding: 8px;
    background-color: ${({ selected }) => (selected ? colors.corPrimaria : colors.cinzaEscuro)};
    color: ${({ selected }) => (selected ? '#fff' : '#000')};
    font-weight: 500;
    border-radius: 10px;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
`

export const HorarioList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`

export const HorarioItem = styled.div<HorarioItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 48px;
    padding: 8px;
    background-color: ${({ selected, disabled }) =>
        disabled
            ? `${colors.vermelhoTransparent}`
            : selected
            ? colors.corPrimaria
            : colors.cinzaEscuro};
    color: ${({ selected, disabled }) => (disabled ? '#fff' : selected ? '#fff' : '#000')};
    font-weight: 500;
    border-radius: 10px;
    transition: 0.3s;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`
