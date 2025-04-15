import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`

    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
    }
`

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 20px;

    .empty {
        width: 100%;
        font-weight: 400;
        color: ${colors.texto};
    }

    p {
        font-weight: 500;
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
    height: 60px;
    padding: 20px;
    background-color: ${colors.cinzaClaro};
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    p {
        width: 35%;
        color: ${colors.branco};
    }
`;

export const Button = styled.button`
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    background-color: ${colors.corPrimaria};
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`
