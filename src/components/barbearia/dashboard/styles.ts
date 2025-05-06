import styled from 'styled-components'
import { breakpoints, colors } from '../../../../styles'

// Definindo a interface para as props do SideBar
interface SideBarProps {
    isOpen: boolean
}

export const Container = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
`

export const HamburgerButton = styled.button`
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 1000;
    background: none;
    border: none;
    font-size: 24px;
    color: ${colors.branco};
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`

export const SideBar = styled.div<SideBarProps>`
    position: relative;
    background-color: ${colors.cinzaEscuro};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100vh;
    width: 270px;
    padding: 16px;
    border-right: 1px solid ${colors.cinzaTransparent};

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        padding: 0px 40px;
        transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
        transition: transform 0.3s ease-in-out;
    }

    #logo_barberly {
        width: 120px;
        margin: 12px auto;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${colors.cinzaTransparent};
        border-radius: 4px;
    }

    scrollbar-width: thin;
    scrollbar-color: ${colors.cinzaTransparent} transparent;
`

export const BarberProfile = styled.div`
    display: flex;
    flex-direction: column;
`

export const SidebarList = styled.ul`
    margin-top: 32px;

    li {
        &.logout {
            margin-top: 120px;
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
    flex: 1;
    overflow-y: auto;
    height: 100vh;

    @media (max-width: 768px) {
        padding-top: 60px;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${colors.cinzaTransparent};
        border-radius: 4px;
    }

    scrollbar-width: thin;
    scrollbar-color: ${colors.cinzaTransparent} transparent;
`

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
        height: 40px;
        width: 100%;
        padding: 8px;
        color: ${colors.branco};
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid ${colors.texto};
        font-weight: bold;
    }

    button {
        height: 40px;
        width: 180px;
        color: ${colors.cinzaEscuro};
        background-color: ${colors.corPrimaria};
        border: none;
        border-radius: 10px;
    }
`

export const Profile = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 32px;
    padding: 12px 8px;
    background-color: ${colors.cinzaClaro};
    border-radius: 10px;

    img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
        background-color: ${colors.cinzaEscuro};
        margin-right: 12px;
    }

    h3 {
        font-size: 16px;
        text-align: center;
        color: ${colors.branco};
        font-weight: bold;
    }

    @media (max-width: ${breakpoints.tablet}) {
        justify-content: center;
        width: 80%;
        margin: 16px auto 0 auto;
        padding: 16px 0;

        img {
            width: 65px;
            height: 65px;
            margin-right: 32px;
        }
    }
`

export const Activity = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    padding: 8px 0px;
    border-radius: 10px;
    background-color: ${colors.cinzaEscuro};
    cursor: pointer;

    div {
        display: flex;
        align-items: center;
    }

    span {
        display: inline-block;
        height: 12px;
        width: 12px;
        margin: 0 6px 0 8px;
        border-radius: 50%;

        &.open {
            background-color: ${colors.verde};
        }

        &.closed {
            background-color: ${colors.vermelho};
        }
    }

    p {
        text-align: center;
        font-size: 12px;
        color: ${colors.texto};
    }

    i {
        margin-left: 6px;
        margin-right: 6px;
        color: ${colors.branco};
    }
`

export const InputsContainer = styled.div`
    display: flex;
    width: 40%;
`

export const InputGroup = styled.div`
    width: 100%;
    margin-right: 8px;
    margin-bottom: 16px;
`

export const DropdownMenu = styled.ul`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 110px;
    left: 0;
    right: 0;
    display: none;
    background-color: ${colors.cinzaClaro};
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 8px;
    width: 100%;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 10;

    li {
        list-style: none;
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.3s;
        color: ${colors.branco};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;

        i {
            font-size: 16px;
        }

        &:hover {
            background-color: ${colors.cinzaEscuro};
        }
    }

    &.active {
        display: flex;
    }
`

export const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 12px;

    h4 {
        font-size: 16px;
        color: ${colors.branco};
        font-weight: bold;
        margin-bottom: 4px;
    }

    p {
        font-size: 12px;
        color: ${colors.texto};
        margin-bottom: 8px;
    }

    @media (max-width: ${breakpoints.tablet}) {
        h4 {
            font-size: 14px;
        }
    }
`

export const StatusSelect = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 8px;
    background-color: ${colors.cinzaEscuro};
    color: ${colors.branco};
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 8px center;

    &:hover {
        border-color: ${colors.branco};
    }

    &:focus {
        border-color: ${colors.corPrimaria};
        outline: none;
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
