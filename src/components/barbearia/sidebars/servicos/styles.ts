import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    position: relative;
    height: 100%;
    margin-bottom: 16px;

    .subtitle {
        margin-top: 6px;
        margin-bottom: 8px;
        color: ${colors.texto};
        font-size: 14px;
    }

    .servicos_length {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 16px;
        text-align: center;
        color: ${colors.texto};
    }

    @media (max-width: ${breakpoints.desktop}) {
        .subtitle {
            font-size: 12px;
        }
    }
`

export const ServiceHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 16px;
    margin-bottom: 16px;
    gap: 16px;
`

export const SearchAndAdd = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

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

    @media (max-width: ${breakpoints.desktop}) {
        input {
            height: 42px;
            width: 55%;
        }
    }
`

export const FieldNames = styled.div`
    display: flex;
    padding: 0 20px;
    margin-bottom: 16px;
    justify-content: space-between;

    p {
        font-weight: 500;
        flex: 1;

        &:first-child {
            text-align: left;
        }
    }
`

export const List = styled.ul`
    list-style: none;
    margin-top: 16px;
    padding: 0;
    margin-bottom: 16px;
`

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 20px;
    background: linear-gradient(-45deg, ${colors.cinzaClaro}, ${colors.cinzaClaro}AA);
    margin-bottom: 16px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    p {
        flex: 1;
        color: ${colors.branco};

        &:first-child {
            text-align: left;
        }
    }

    h4 {
        flex: 1;
        color: ${colors.branco};
    }

    .tesoura {
        padding: 8px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: ${colors.cinzaTransparent};
        color: ${colors.texto};
    }

    .flecha {
        color: ${colors.corPrimaria};
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    min-height: 200px;
    margin-bottom: 16px;
`

export const Message = styled.p`
    text-align: center;
    padding: 16px;
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 16px;
`
