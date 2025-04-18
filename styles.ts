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
    verde: '#32d800',
    vermelho: 'red',
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
