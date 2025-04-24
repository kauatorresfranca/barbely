import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const FormularioContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 700px;
    width: 500px;
    padding: 48px;
    border-radius: 8px;
    margin: 60px auto 0 auto;
    background-color: ${colors.cinzaClaro};

    img {
        width: 160px;
        position: absolute;
        top: 24px;
    }

    h2 {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.branco};
        margin-bottom: 4px;
    }

    p {
        width: 100%;
        font-size: 14px;
        color: ${colors.texto};
        margin-bottom: 16px;
        text-align: center;
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 90%;
        padding: 20px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;

    a {
        color: ${colors.corPrimaria};
        position: absolute;
        bottom: 24px;
        left: 0;
        right: 0;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }

    span {
        color: ${colors.branco};
        font-weight: 500;
    }

    button {
        width: 100%;
        height: 48px;
        margin-top: 16px;
        border: none;
        border-radius: 3px;
        background-color: ${colors.corPrimaria};
        color: ${colors.cinzaClaro};
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
    }
`

export const inputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    label {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.texto};
    }

    input {
        width: 100%;
        height: 48px;
        padding-left: 8px;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: #181b20;
        transition: border 0.4s ease-in-out;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }

        &::placeholder {
            color: ${colors.cinzaClaro};
            font-weight: bold;
        }
    }

    i {
        position: absolute;
        right: 10px;
        color: ${colors.texto};

        &:hover {
            cursor: pointer;
        }
    }
`
