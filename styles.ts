import { createGlobalStyle } from 'styled-components'

export const breakpoints = {
    desktop: '1024px',
    tablet: '768px',
}

export const colors = {
    corPrimaria: '#00c1fe',
    corPrimariaEscura: '#0056b3',
    texto: '#aeb0b2',
    cinzaEscuro: '#181b20',
    cinzaClaro: '#2e333a',
    cinzaTransparent: 'rgba(134, 126, 126, 0.53)',
    branco: '#ffffff',
    verde: 'rgb(83, 223, 27)',
    verdeTransparent: 'rgba(83, 223, 27, 0.65)',
    vermelho: 'rgb(202, 54, 54)',
    vermelhoTransparent: 'rgba(202, 54, 54, 0.53)',
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
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
}
`
