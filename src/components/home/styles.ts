import styled from "styled-components"
import { Link } from "react-router-dom"
import { colors } from "../../../styles"

export const Container = styled.div`
    background-color: ${colors.cinzaEscuro};
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
`

export const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${colors.cinzaClaro};
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    img {
        width: 160px;
    }
`

export const Button = styled(Link)`
    background: ${colors.corPrimaria};
    color: black;
    border: 2px solid ${colors.corPrimaria};
    margin-right: 8px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        opacity: 0.9;
    }
`

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid #444;
    background: #333;
    color: white;
`

export const BannerSection = styled.section`
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.cinzaClaro};
    padding: 2rem;
    border-radius: 15px;

    div {
        max-width: 50%;

        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        }
    }

    img {
        width: 300px;
        border-radius: 10px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;

        div {
            max-width: 100%;
        }

        img {
            margin-top: 1.5rem;
            width: 100%;
        }
    }
`

export const FeaturesSection = styled.section`
    width: 100%;
    margin-top: 3rem;
    background-color: #2e2e2e;
    padding: 2rem;
    border-radius: 15px;

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    ul {
        list-style: none;
        padding: 0;
        font-size: 1.1rem;
        line-height: 2rem;
        max-width: 600px;
        margin: 0 auto;

        li::before {
            content: "✔️ ";
        }
    }
`

export const Footer = styled.footer`
    margin-top: 4rem;
    padding: 1rem;
    font-size: 0.9rem;
    color: #aaa;
    text-align: center;
`
