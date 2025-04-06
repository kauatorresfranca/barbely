import styled from 'styled-components'
import { colors } from '../../../../styles'

export const Container = styled.div`
`

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 20px;

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
    padding: 12px;
    background-color: ${colors.cinzaClaro};
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    p {
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
`;
