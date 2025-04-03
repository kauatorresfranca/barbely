import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`
    color: #222;
    border-radius: 8px;
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
    padding: 12px;
    background-color: #ffffff;
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    span {
        color: ${colors.cinzaEscuro}
    }
`;

export const Button = styled.button`
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
