import styled from 'styled-components'
import { colors } from '../../../../../styles'

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

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-top: 16px;

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    label {
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

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
`

export const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
`
