import styled from "styled-components"
import { colors } from '../../../../../styles'

export const Container = styled.div`

    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
    }
`

export const ServiceHeader = styled.div`
    position: relative;
    margin-bottom: 60px;

    button {
        position: absolute;
        right: 8px;
        height: 40px;
        width: 130px;
        background-color: ${colors.corPrimaria};
        color: ${colors.cinzaEscuro};
        font-weight: bold;
        border-radius: 15px;
        border: none;
        padding: 4px;
        cursor: pointer;
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
    padding: 20px;
    height: 60px;
    background-color: ${colors.cinzaClaro};
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    p {
        color: ${colors.branco};
        width: 25%;
    }
`

export const IconsGroup = styled.div`
    display: flex;

    i {
        cursor: pointer;
    }

    .edit {
        color: ${colors.corPrimaria};
    }

    .delete {
        color: red;
        margin-left: 10px;
    }
`
