import styled from 'styled-components'
import { colors } from '../../../../../styles'
import 'react-datepicker/dist/react-datepicker.css'

interface TurnoItemProps {
    selected: boolean
}

interface HorarioItemProps {
    selected: boolean
    disabled?: boolean
}

export const Container = styled.div`
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

export const CalendarContainer = styled.div`
    width: 100%;

    .custom-calendar {
        background: ${colors.cinzaEscuro};
        width: 100%;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        padding: 10px;
        font-family: 'Arial', sans-serif;

        .react-datepicker__header {
            background: ${colors.cinzaEscuro};
            border-bottom: none;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            position: relative;
        }

        .react-datepicker__month-container {
            width: 100%;
        }

        .react-datepicker__current-month {
            color: ${colors.branco};
            font-weight: bold;
            font-size: 16px;
        }

        .react-datepicker__day-name,
        .react-datepicker__day {
            color: ${colors.branco};
            width: 48px;
            line-height: 36px;
            margin: 4px;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
            background: ${colors.corPrimaria};
            width: 48px;
            color: ${colors.branco};
            border-radius: 50%;
        }

        .react-datepicker__day:hover {
            background: ${colors.cinzaEscuro};
            border-radius: 50%;
        }

        .react-datepicker__navigation {
            top: 12px;
            width: 24px;
            height: 24px;
        }

        .react-datepicker__navigation-icon {
            width: 24px;
            height: 24px;
        }

        .react-datepicker__navigation-icon::before {
            border-color: ${colors.branco};
            width: 8px;
            height: 8px;
        }

        .react-datepicker__triangle {
            display: none;
        }

        .react-datepicker__day--disabled {
            color: #666;
            opacity: 0.5;
        }
    }
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
