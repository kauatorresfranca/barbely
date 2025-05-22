import styled from 'styled-components'
import { colors } from '../../../../../styles'

export type SelectableProps = {
    $selected: boolean
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .empty {
        font-size: 14px;
        color: ${colors.texto};
    }
`

export const Employee = styled.div``

export const EmployeeList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 12px;
    margin-top: 12px;
`

export const EmployeeItem = styled.div<SelectableProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 90%;
    padding: 8px;
    border: 2px solid ${({ $selected }) => ($selected ? colors.corPrimaria : 'transparent')};
    border-radius: 8px;
    cursor: pointer;
    background-color: ${colors.cinzaEscuro};
    transition: all 0.2s ease;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    img {
        height: 35px;
        width: 35px;
        border-radius: 50%;
    }

    &:hover {
        border-color: #fff;
    }

    h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
    }

    p {
        margin: 2px 0;
        color: ${colors.branco};
    }
`

export const Service = styled.div``

export const ServicesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
`

export const ServiceItem = styled.div<SelectableProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border: 2px solid ${({ $selected }) => ($selected ? colors.corPrimaria : 'transparent')};
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ $selected }) => ($selected ? colors.cinzaEscuro : colors.cinzaEscuro)};
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        border-color: #fff;
    }

    h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
    }

    p {
        margin: 2px 0;
        color: ${colors.texto};
    }
`

export const Button = styled.button`
    padding: 12px;
    margin-top: 12px;
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

export const ClienteNome = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Input = styled.input`
    padding: 10px;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 4px;
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${colors.corPrimaria};
    }
`

export const OrDivider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 12px 0;
    color: ${colors.texto};

    span {
        padding: 0 10px;
        z-index: 1;
    }

    &:before,
    &:after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: ${colors.cinzaTransparent};
        margin: 0 8px;
    }
`

export const SignInOption = styled.button`
    padding: 10px;
    background-color: transparent;
    color: ${colors.corPrimaria};
    border: 1px solid ${colors.corPrimaria};
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${colors.corPrimaria};
        color: ${colors.cinzaEscuro};
    }
`
