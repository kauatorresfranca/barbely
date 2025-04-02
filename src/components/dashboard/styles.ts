import styled from "styled-components"
import { colors } from "../../../styles"

export const Container = styled.div`
    display: flex;
`

export const SideBar = styled.div`
    background-color: ${colors.cinzaClaro};
    height: 100vh;
    width: 240px;

    div {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: ${colors.cinzaEscuro};
        margin: 12px auto 0 auto;
    }

    p {
        text-align: center;
    }
`