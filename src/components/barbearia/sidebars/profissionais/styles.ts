import styled from 'styled-components'
import { colors } from '../../../../../styles'

export const Container = styled.div`
    position: relative;
    height: 100%;

    .subtitle {
        margin-top: 6px;
        color: ${colors.texto};
        font-size: 14px;
    }

    .profissionais_length {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 16px;
        text-align: center;
        color: ${colors.texto};
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
`

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;

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
