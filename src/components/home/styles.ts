import styled from "styled-components"
import { Link } from "react-router-dom"
import { colors } from "../../../styles"

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${colors.cinzaEscuro};
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
`

export const Header = styled.header`
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${colors.cinzaClaro};
    border-radius: 40px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    img {
        width: 160px;
    }
`

export const Button = styled(Link)`
    background: ${colors.corPrimaria};
    color: "black";
    border: 2px solid ${colors.corPrimaria};
    margin-right: 8px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${colors.corPrimaria};
        color: black;
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