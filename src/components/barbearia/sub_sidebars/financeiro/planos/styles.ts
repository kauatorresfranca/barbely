import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background: ${colors.cinzaClaro};
    border-radius: 12px;
    color: ${colors.branco};
`

export const Header = styled.div`
    text-align: center;
    margin-bottom: 40px;

    h2 {
        font-size: 32px;
        font-weight: bold;
        color: ${colors.branco};
        margin-bottom: 12px;
    }

    .subtitle {
        font-size: 16px;
        color: ${colors.texto};
        line-height: 1.5;
    }
`

export const PlanosGrid = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;

    @media (max-width: ${breakpoints.desktop}) {
        flex-direction: column;
        align-items: center;
    }
`

export const PlanoCard = styled.div<{ atual: boolean; recomendado: boolean }>`
    position: relative;
    background: linear-gradient(135deg, ${colors.cinzaClaro}, ${colors.cinzaEscuro});
    border: 2px solid
        ${(props) =>
            props.atual
                ? colors.corPrimaria
                : props.recomendado
                ? colors.cinzaTransparent
                : colors.cinzaTransparent};
    border-radius: 12px;
    padding: 24px;
    width: 300px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    }

    h3 {
        font-size: 24px;
        font-weight: bold;
        background-color: ${colors.branco};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 16px;
        text-align: center;
    }

    ul {
        list-style: none;
        margin-bottom: 24px;
        min-height: 150px; /* Garante alinhamento visual entre os cards */

        li {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            color: ${colors.texto};
            font-size: 14px;
        }
    }
`

export const RecomendadoBadge = styled.div`
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

export const PrecoWrapper = styled.div`
    text-align: center;
    margin-bottom: 20px;

    .preco {
        font-size: 28px;
        font-weight: bold;
        color: ${colors.corPrimaria};
        display: block;
    }

    .preco-anual {
        font-size: 14px;
        color: ${colors.texto};
        display: block;
        margin-top: 4px;
    }
`

export const CheckIcon = styled.i`
    color: ${colors.corPrimaria};
    margin-right: 8px;
    font-size: 16px;
`

export const Botao = styled.button`
    width: 100%;
    padding: 12px;
    background: linear-gradient(90deg, ${colors.corPrimaria}, ${colors.cinzaEscuro});
    color: ${colors.branco};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: transform 0.2s ease, background 0.3s ease;

    &:hover:not(:disabled) {
        transform: scale(1.05);
        background: linear-gradient(90deg, ${colors.cinzaEscuro}, ${colors.corPrimaria});
    }

    &:disabled {
        background: ${colors.cinzaTransparent};
        cursor: not-allowed;
        transform: none;
    }
`
