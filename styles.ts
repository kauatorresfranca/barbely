import { createGlobalStyle } from "styled-components"

export const breakpoints = {
    desktop: '1024px',
    tablet: '768px'
}

export const colors = {
    corPrimaria: '#00c1fe',
    cinzaEscuro: '#181b20',
    cinzaClaro: '#2e333a',
    branco: '#ffffff',
    titulo: '',
    texto: '#aeb0b2',
    destaque: '',
}

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        color: #fff;
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    body {
        background-color: ${colors.cinzaEscuro};
    }

    .container {
        
    }
`

