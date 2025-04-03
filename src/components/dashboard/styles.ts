import styled from "styled-components"
import { colors } from "../../../styles"

export const Container = styled.div`
    display: flex;
`

export const SideBar = styled.div`
    position: relative;
    background-color: ${colors.cinzaEscuro};
    height: 100vh;
    width: 260px;
    padding: 16px;
    border-right: 1px solid ${colors.corPrimaria};

    #logo_barberly {
        width: 120px;
        margin: 12px auto;
    }
`

export const BarberProfile = styled.div`
    display: flex;
    flex-direction: column;
`

export const SidebarList = styled.ul`
    margin-top: 32px;

    li {
        &.logout {
            position: absolute;
            bottom: 24px;
            margin: 0 auto;
        }
    }

    button {
        display: flex;
        align-items: center;
        height: 56px;
        width: 100%;
        border: none;
        padding: 24px;
        font-weight: bold;
        background-color: ${colors.cinzaEscuro};
        color: ${colors.texto};
        cursor: pointer;
        text-align: start;

        i {
            margin-right: 6px;
            font-size: 20px; 
            font-weight: 500;
            color: ${colors.branco};
        }

        &:hover {
            color: ${colors.branco};

            i { 
                color: ${colors.branco};
            }
        }

        &.active {
            color: ${colors.corPrimaria};

            i {
                color: ${colors.corPrimaria};
            }
        }
    }
`

export const Content = styled.div`
    padding: 24px;
    width: 100%;
`

export const Header = styled.header`
    position: relative;
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(252, 247, 247, 0.44);
`

export const Profile = styled.div`
    position: absolute;
    right: 24px;
    display: flex;
    align-items: center;

    img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${colors.cinzaEscuro};
        margin-right: 8px;
    }

    p {
        text-align: center;
        color: ${colors.branco};
        font-weight: bold;
    }
`