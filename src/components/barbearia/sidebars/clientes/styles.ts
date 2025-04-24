import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
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

export const Search = styled.div`
    input {
        width: 100%;
        height: 48px;
        padding: 12px;
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 3px;
        background-color: ${colors.texto};
        transition: border 0.4s ease-in-out;
        color: ${colors.cinzaEscuro};

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            ${colors.cinzaEscuro};
            font-weight: bold;
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
    gap: 8px;

    i {
        &.edit {
            color: ${colors.branco};
            cursor: pointer;
        }

        &.details {
            color: ${colors.verdeTransparent};
            cursor: pointer;
        }

        &.delete {
            color: ${colors.vermelho};
            cursor: pointer;
        }
    }
`

export const List = styled.ul`
    list-style: none;
    margin-top: 16px;
    padding: 0;

    .cliente_length {
        text-align: center;
        color: ${colors.texto};
    }
`

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 20px;
    background-color: ${colors.cinzaClaro};
    border: 0.04rem solid ${colors.cinzaTransparent};
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    p {
        width: 35%;
        color: ${colors.branco};
    }
`
