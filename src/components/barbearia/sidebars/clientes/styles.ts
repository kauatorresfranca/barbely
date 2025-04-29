import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    position: relative;
    height: 100%;

    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
    }

    .cliente_length {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 16px;
        text-align: center;
        color: ${colors.texto};
    }
`

export const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 10px;
    gap: 16px;

    .empty {
        width: 100%;
        font-weight: 400;
        color: ${colors.texto};
    }
`

export const SearchAndAdd = styled.div`
    display: flex;
    align-items: center;

    input {
        width: 85%;
        height: 42px;
        padding: 12px;
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 3px;
        background-color: ${colors.cinzaEscuro};
        transition: border 0.4s ease-in-out;
        color: ${colors.texto};
        font-weight: bold;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: ${colors.texto};
            font-weight: bold;
        }
    }

    button {
        position: absolute;
        right: 8px;
        height: 42px;
        width: 140px;
        font-weight: bold;
        color: ${colors.branco};
        background: ${colors.cinzaClaro};
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.03);
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        input {
            height: 42px;
            width: 60%;
        }
    }
`

export const FieldNames = styled.div`
    display: flex;
    padding: 0 20px;
    justify-content: space-between;

    p {
        font-weight: 500;
    }
`

export const IconGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    button {
        padding: 4px;
        border: none;
        border-radius: 8px;
        background-color: ${colors.corPrimaria};
        color: ${colors.branco};
        cursor: pointer;
        transition: 0.2s ease-in-out;

        &:hover {
            transform: scale(1.1);
        }
    }

    i {
        &.edit {
            color: ${colors.branco};
            cursor: pointer;
        }

        &.delete {
            color: red;
            cursor: pointer;
        }
    }
`

export const List = styled.ul`
    list-style: none;
    margin-top: 16px;
    padding: 0;
`

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 20px;
    background-color: ${colors.cinzaClaro};
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    p {
        width: 35%;
        color: ${colors.branco};
    }
`
