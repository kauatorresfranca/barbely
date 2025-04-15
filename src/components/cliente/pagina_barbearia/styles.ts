import styled from 'styled-components'
import { breakpoints, colors } from '../../../../styles'
import { Link } from 'react-router-dom'

export const Container = styled.div`
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 120px;
    height: 70px;
    width: 100%;
    background-color: ${colors.cinzaClaro};

    img {
        left: 16px;
        width: 160px;
    }

    @media (max-width: ${breakpoints.desktop}) {
        padding: 20px;
    }
`

export const ButtonGroup = styled.div`

`

export const UserResume = styled.div`
    display: flex;
    align-items: center;
    right: 16px;
    cursor: pointer;

    span {
        font-weight: 300;
    }

    p {
        font-weight: 700;
    }

    img {
        width: 40px;
    }
`

export const DropdownMenu = styled.ul`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 60px;
    right: 80px;
    display: none;
    background-color: ${colors.cinzaClaro};
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 8px;
    width: 200px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
    z-index: 10;

    li {
        list-style: none;
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.3s;
        color: ${colors.branco};
        border-radius: 8px;

        &:hover {
            background-color: ${colors.cinzaEscuro};
        }
    }

    &.active {
        display: flex;
    }
`;


export const Button = styled(Link)`
    background: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: 2px solid ${colors.corPrimaria};
    margin-right: 8px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${colors.corPrimaria};
        color: ${colors.branco};
    }
`

export const BarbeariaProfile = styled.div`
    padding: 20px 120px;

    img {
        height: 120px;
        width: 120px;
        border-radius: 25px;
        margin-right: 16px;
    }

    h3 {
        font-size: 22px;
        font-weight: bold;
        margin-top: 16px;
        margin-bottom: 16px;

        i {
            font-size: 24px;
            font-weight: 500;
            padding: 8px;
            background-color: ${colors.cinzaClaro};
            color: ${colors.branco};
            border-radius: 15px
        }
    }

    p {
        font-size: 14px;
        color: ${colors.texto};
    }

    @media (max-width: ${breakpoints.desktop}) {
        padding: 20px;

        img {
            height: 110px;
            width: 110px;
        }
    }
`

export const BarbeariaResume = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: 0 0 32px 0;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
    }
`

export const ResumeGroup = styled.div`
    display: flex;
    align-items: center;

    h5 {
        font-weight: 400;
        margin-top: 6px;

        i {
            font-size: 16px;
        }
    }

    p {
        margin-top: 8px;
    }

    @media(max-width: ${breakpoints.tablet}) {
        p {
            margin-top: 4px;
            font-size: 12px;
        }
    }
`

export const AgendarHorario = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    height: 50px;
    width: 30%;
    border: 2px solid ${colors.corPrimaria};
    margin: 8px 0;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${colors.corPrimaria};
        color: ${colors.branco};
    }

    @media(max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const BarbeariaInfos = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 80px;

    @media (max-width: ${breakpoints.tablet}) {
        display: flex;
        flex-direction: column;
    }
`

export const AboutUs = styled.div`
    display: flex;
    flex-direction: column;
    margin: 32px 0;

    p {
        width: 100%;
    }
`

export const Hours = styled.div`
    margin: 32px 0;
`

export const TableHours = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    gap: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};

    @media(max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`


export const Day = styled.div`
    display: flex;
    justify-content: space-between;

    p {
        color: ${colors.branco}
    }
`

export const Services = styled.div`
    margin: 32px 0;
`

export const ServicesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Service = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    width: 100%;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};

    @media(max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`
