import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const Modal = styled.div`
    background: linear-gradient(135deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideUp 0.3s ease-out;

    h2 {
        text-align: center;
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 90%;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
`

export const Button = styled.button`
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
    text-align: center;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`

export const CancelButton = styled(Button)`
    background: ${colors.cinzaClaro};
    color: ${colors.branco};
`

export const DeleteButton = styled(Button)`
    background: ${colors.vermelho};
    color: ${colors.branco};
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    width: 100%;
    margin-bottom: 8px;

    input {
        width: 100%;
        padding: 10px;
        padding-left: 8px;
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 4px;
        background: ${colors.cinzaEscuro};
        color: ${colors.branco};
        transition: border 0.4s ease-in-out;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }
    }

    label {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.texto};
    }
`
export const ClienteImage = styled.div`
    margin-right: 15px;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }

    i {
        padding: 40px;
        background: ${colors.cinzaTransparent};
        color: ${colors.texto};
        font-size: 40px;
        border-radius: 15px;
    }
`

export const ClientInfo = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;

    h3 {
        font-size: 24px;
        color: ${colors.branco};
    }

    p {
        margin: 5px 0;
        color: ${colors.branco};
    }
`

export const InfoSection = styled.div`
    margin-bottom: 20px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: ${colors.branco};
    }

    p {
        margin: 5px 0;
        display: flex;
        align-items: center;
        color: ${colors.branco};

        i {
            margin-right: 8px;
            padding: 8px;
            background: ${colors.cinzaTransparent};
            color: ${colors.corPrimaria};
            border-radius: 8px;
        }

        strong {
            margin-left: 6px;
        }
    }
`

export const StatsSection = styled.div`
    margin-bottom: 20px;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: ${colors.branco};
    }

    p {
        margin: 5px 0;
        color: ${colors.branco};
    }
`

export const ErrorMessage = styled.p`
    color: ${colors.vermelho};
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`
