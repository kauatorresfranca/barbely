import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const Modal = styled.div`
    background: ${colors.cinzaEscuro};
    padding: 24px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    h2 {
        margin-bottom: 16px;
        color: ${colors.branco};
        text-align: center;
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 90%;
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: ${colors.branco};
`

export const ProfissionalInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    div {
        margin-left: 16px;
    }

    h3 {
        font-size: 18px;
        margin-bottom: 8px;
        color: ${colors.branco};
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
        margin: 4px 0;
    }
`

export const ProfissionalImage = styled.div`
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
    }

    i {
        font-size: 64px;
        color: ${colors.texto};
    }
`

export const InputGroup = styled.div`
    margin-bottom: 16px;

    label {
        display: block;
        margin-bottom: 8px;
        color: ${colors.branco};
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid ${colors.cinzaClaro};
        border-radius: 4px;
        background: ${colors.cinzaEscuro};
        color: ${colors.branco};
        font-size: 14px;

        &:focus {
            outline: none;
            border-color: ${colors.corPrimaria};
        }
    }
`

export const ImagePreview = styled.div`
    margin-bottom: 16px;

    img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 8px;
        object-fit: cover;
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
`

export const Button = styled.button`
    padding: 8px 16px;
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;

    &:hover {
        background: ${colors.corPrimaria}CC;
    }
`

export const CancelButton = styled(Button)`
    background: ${colors.cinzaClaro};

    &:hover {
        background: ${colors.cinzaClaro}CC;
    }
`

export const DeleteButton = styled(Button)`
    background: ${colors.vermelho};

    &:hover {
        background: ${colors.vermelho}CC;
    }

    i {
        margin-right: 8px;
    }
`

export const ErrorMessage = styled.p`
    color: ${colors.vermelho};
    font-size: 14px;
    margin-bottom: 16px;
`

export const InfoSection = styled.section`
    margin-bottom: 24px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: ${colors.branco};
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
        margin: 8px 0;

        i {
            margin-right: 8px;
            color: ${colors.corPrimaria};
        }

        strong {
            color: ${colors.branco};
        }
    }
`

export const StatsSection = styled.section`
    margin-bottom: 24px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: ${colors.branco};
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
    }
`

export const HistorySection = styled.section`
    margin-bottom: 24px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: ${colors.branco};
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
    }
`

export const HistoryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-top: 16px;

    i {
        font-size: 24px;
        color: ${colors.corPrimaria};
    }
`

export const HistoryContent = styled.div`
    flex: 1;

    div {
        margin-bottom: 8px;

        h4 {
            font-size: 16px;
            color: ${colors.branco};
            margin: 0;
        }

        p.horario {
            font-size: 14px;
            color: ${colors.texto};
        }
    }
`

export const HistoryInfos = styled.div`
    display: flex;
    gap: 16px;
`

export const Info = styled.div`
    h4 {
        font-size: 14px;
        color: ${colors.texto};
        margin-bottom: 4px;
    }

    p {
        font-size: 14px;
        color: ${colors.branco};
        margin: 0;
    }
`

export const ProfissionalDeleteSection = styled.section`
    margin-top: 24px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: ${colors.branco};
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
        margin-bottom: 16px;
    }
`
