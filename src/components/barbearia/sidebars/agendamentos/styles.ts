import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    .subtitle {
        margin-top: 6px;
        margin-bottom: 16px;
        color: ${colors.texto};
        font-size: 14px;
    }

    @media (max-width: ${breakpoints.tablet}) {
        .subtitle {
            font-size: 12px;
        }
    }
`

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    gap: 20px;

    button {
        height: 42px;
        width: 140px;
        font-weight: bold;
        color: ${colors.branco};
        background-color: ${colors.cinzaClaro};
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: scale(1.03);
        }
    }

    .avançarDia,
    .voltarDia {
        height: 40px;
        width: 40px;

        &:hover {
            transform: scale(1.07);
        }
    }
`

export const MeusAgendamentosHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CriarAgendamento = styled.button`
    height: 42px;
    width: 140px;
    font-weight: bold;
    color: ${colors.cinzaEscuro};
    background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}AA);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.03);
    }
`

export const DateNavigator = styled.div`
    display: flex;
    align-items: center;
    background: ${colors.cinzaEscuro};
    border-radius: 8px;
    padding: 4px;
    gap: 8px;
`

export const ArrowButton = styled.button`
    background: transparent;
    border: none;
    color: ${colors.branco};
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    &:hover {
        background: ${colors.cinzaClaro}80;
    }
`

export const DateDisplay = styled.div`
    padding: 8px 16px;
    color: ${colors.branco};
    font-weight: bold;
    font-size: 16px;
    min-width: 120px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background: ${colors.cinzaClaro}80;
    }
`

export const HorariosContainer = styled.div`
    padding: 20px;
    background-color: ${colors.cinzaClaro};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export const FuncionariosHeader = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 70px;
`

export const FuncionarioTitle = styled.div`
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.branco};
    padding: 14px;
    background: linear-gradient(-45deg, ${colors.cinzaEscuro}, ${colors.cinzaEscuro}AA);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`

export const TimelinesContainer = styled.div`
    display: flex;
    position: relative;
    background: ${colors.cinzaClaro};
    border-radius: 0 0 12px 12px;
`

export const Timelines = styled.div`
    display: flex;
    gap: 10px;
    flex: 1;
`

export const Timeline = styled.div`
    position: relative;
    flex: 1;
    border-left: 1px solid ${colors.cinzaTransparent};
    border-right: 1px solid ${colors.cinzaTransparent};
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.05));
`

export const Horarios = styled.div`
    width: 60px;
    position: relative;
    margin-right: 10px;
`

export const Hora = styled.div`
    position: absolute;
    font-size: 13px;
    font-weight: 500;
    color: ${colors.branco};
    background: ${colors.cinzaEscuro};
    padding: 4px 8px;
    border-radius: 12px;
    transform: translateY(-50%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

export const LinhaHora = styled.div<{ top: number }>`
    position: absolute;
    left: 0;
    right: 0;
    top: ${({ top }) => `${top}px`};
    height: 1px;
    background: linear-gradient(to right, ${colors.cinzaTransparent}, transparent);
`

export const AgendamentosArea = styled.div`
    position: relative;
    flex: 1;
`

export const AgendamentoBlock = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 95%;
    margin: 0 auto;
    background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}CC);
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    border: 1px solid ${colors.cinzaTransparent};

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
`

export const AgendamentoInfo = styled.div<{
    hora: string
    status: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
}>`
    display: flex;
    align-items: center;

    .cliente {
        color: ${colors.branco};
        font-weight: bold;
        margin-bottom: 2px;
        font-size: 15px;
    }

    .servico {
        color: ${colors.branco}CC;
        font-size: 13px;
    }

    .duracao {
        color: ${colors.branco}AA;
        font-size: 12px;
    }

    .status {
        margin-right: 12px;
        font-size: 11px;
        color: ${colors.branco};
        font-weight: 600;
        background: ${({ status }) =>
            status === 'CANCELADO'
                ? `${colors.vermelho}`
                : status === 'EXPIRADO'
                ? '#cccccc'
                : status === 'CONCLUIDO'
                ? `${colors.verdeTransparent}`
                : `${colors.cinzaClaro}`};
        padding: 2px 8px;
        border-radius: 10px;
        display: inline-block;
    }
`

export const Button = styled.div`
    padding: 8px 14px;
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid ${colors.cinzaTransparent};

    &:hover {
        background-color: ${colors.cinzaClaro};
        border-color: ${colors.corPrimaria};
        transform: translateY(-1px);
    }
`

export const ErrorMessage = styled.p``

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    min-height: 200px;
`

export const Message = styled.p`
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
`

// Wrapper para o DateDisplay e o DatePicker
export const DateWrapper = styled.div`
    position: relative;
    display: inline-block;
`

// Estilização do calendário
export const CalendarContainer = styled.div`
    .custom-calendar {
        position: absolute;
        top: 60px;
        left: -45px;
        z-index: 1000;
        background: ${colors.cinzaClaro};
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        padding: 10px;
        font-family: 'Arial', sans-serif;

        .react-datepicker__header {
            background: ${colors.cinzaEscuro};
            border-bottom: none;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            position: relative; /* Para posicionar as setas em relação ao header */
        }

        .react-datepicker__current-month {
            color: ${colors.branco};
            font-weight: bold;
            font-size: 16px;
        }

        .react-datepicker__day-name,
        .react-datepicker__day {
            color: ${colors.branco};
            width: 36px;
            line-height: 36px;
            margin: 4px;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
            background: ${colors.corPrimaria};
            color: ${colors.branco};
            border-radius: 50%;
        }

        .react-datepicker__day:hover {
            background: ${colors.cinzaEscuro};
            border-radius: 50%;
        }

        .react-datepicker__navigation {
            top: 12px; /* Ajusta a posição vertical das setas */
            width: 40px; /* Reduz o tamanho da área clicável das setas */
            height: 24px;
            background-color: transparent;
            box-shadow: none;
            margin-top: 6px;
        }

        .react-datepicker__navigation-icon {
            width: 24px;
            height: 24px;
        }

        .react-datepicker__navigation-icon::before {
            width: 8px; /* Reduz o tamanho do ícone da seta */
            height: 8px;
        }

        .react-datepicker__triangle {
            display: none;
        }
    }
`
