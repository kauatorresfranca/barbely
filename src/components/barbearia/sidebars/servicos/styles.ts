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

    .servicos_length {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 16px;
        text-align: center;
        color: ${colors.texto};
    }

    @media (max-width: ${breakpoints.tablet}) {
        .subtitle {
            font-size: 12px;
        }
    }
`

export const ServiceHeader = styled.div`
    position: relative;
    margin-bottom: 60px;

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
`

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 10px;

    .empty {
        width: 100%;
        font-weight: 400;
        color: ${colors.texto};
    }

    p {
        font-weight: 500;
        width: 25%;
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
        width: 25%;
        color: ${colors.branco};
    }
`

export const IconsGroup = styled.div`
    display: flex;

    i {
        cursor: pointer;
    }

    .edit {
        color: ${colors.branco};
    }

    .delete {
        color: red;
        margin-left: 10px;
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
