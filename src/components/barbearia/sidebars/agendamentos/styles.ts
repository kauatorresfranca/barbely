import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    .subtitle {
        margin-top: 6px;
        margin-bottom: 16px;
        color: ${colors.texto};
        font-size: 14px;
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
        background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}AA);
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.3s ease;

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

export const DateNavigator = styled.div`
    display: flex;
    align-items: center;
    background: ${colors.cinzaEscuro};
    border-radius: 8px;
    padding: 4px;
`

export const ArrowButton = styled.button`
    background: transparent;
    border: none;
    color: ${colors.branco};
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
`

export const DateDisplay = styled.div`
    padding: 8px 16px;
    color: ${colors.branco};
    font-weight: bold;
    font-size: 16px;
    min-width: 120px;
    text-align: center;
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
    margin-left: 70px; /* Alinhar com a tabela, compensando o espaço dos horários */
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
                : `${colors.corPrimariaEscura}`};
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

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

export const Modal = styled.div`
    background: linear-gradient(145deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
    padding: 2.5rem;
    border-radius: 16px;
    width: 550px;
    max-width: 95%;
    position: relative;
    animation: slideIn 0.4s ease-out;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);

    h2 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: ${colors.branco};
        font-size: 1.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.branco}AA;
    transition: all 0.3s ease;

    &:hover {
        color: ${colors.corPrimaria};
        transform: scale(1.1);
    }
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
    }
`

export const InfoLabel = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.branco}CC;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

export const InfoValue = styled.span<{
    status?: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
}>`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ status }) =>
        status === 'CANCELADO'
            ? '#ff4444'
            : status === 'EXPIRADO'
            ? '#888888'
            : status === 'CONCLUIDO'
            ? '#28a745'
            : colors.branco};
    text-align: right;
`

export const Select = styled.select`
    padding: 8px 12px;
    font-size: 1rem;
    color: ${colors.branco};
    background: ${colors.cinzaEscuro};
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${colors.corPrimaria};
    }

    option {
        background: ${colors.cinzaEscuro};
        color: ${colors.branco};
    }
`

export const ErrorMessage = styled.p`
    color: #ff4444;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
`

export const SubmitButton = styled.button`
    padding: 12px;
    background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}AA);
    color: ${colors.branco};
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
        transform: scale(1.03);
        background: linear-gradient(45deg, ${colors.corPrimaria}CC, ${colors.corPrimaria});
    }
`
