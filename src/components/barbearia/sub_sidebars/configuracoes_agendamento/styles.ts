import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 680px;
    padding: 20px;
    gap: 20px;
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: ${colors.branco};
    margin-bottom: 16px;
`

export const Section = styled.div`
    width: 100%;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.cinzaTransparent};
`

export const Subtitle = styled.h3`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.corPrimaria};
    margin-bottom: 12px;
`

export const RadioGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
`

export const RadioOption = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    input[type='radio'] {
        width: 20px;
        height: 20px;
        accent-color: ${colors.corPrimaria};
        cursor: pointer;
    }

    label {
        font-size: 16px;
        color: ${colors.texto};
        cursor: pointer;
    }
`

export const Description = styled.p`
    font-size: 14px;
    color: ${colors.texto};
    line-height: 1.5;
`
export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    width: 100%;
    margin-bottom: 12px;

    label {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: ${colors.texto};
    }

    input[type='number'] {
        width: 100px;
        padding: 10px;
        border: 1px solid ${colors.cinzaTransparent};
        border-radius: 4px;
        background: ${colors.cinzaEscuro};
        color: ${colors.texto};
        font-size: 16px;

        &:hover {
            border: 1px solid ${colors.branco};
        }

        &:focus {
            border: 1px solid ${colors.corPrimaria};
            outline: none;
        }
    }
`

export const Button = styled.button`
    background: ${colors.corPrimaria};
    color: #000;
    padding: 14px;
    margin-top: 12px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`
