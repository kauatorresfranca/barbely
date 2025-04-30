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
        border: none;
        border-radius: 8px;
        background-color: ${colors.cinzaClaro};
        transition: border 0.4s ease-in-out;
        color: ${colors.texto};
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
    background: linear-gradient(-45deg, ${colors.cinzaClaro}, ${colors.cinzaClaro}AA);
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    p {
        width: 35%;
        color: ${colors.branco};
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    min-height: 200px; /* Ajuste conforme necessário */
`

export const Message = styled.p`
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
`
