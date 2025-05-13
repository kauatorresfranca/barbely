import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../../styles'

export const Container = styled.div`
    width: 680px;
    background: ${colors.cinzaClaro};
    padding: 20px;
    border-radius: 8px;
    color: #fff;

    h2 {
        margin-bottom: 12px;
        color: ${colors.branco};
    }
    p {
        margin-bottom: 24px;
        color: ${colors.texto};
    }

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
    }
`

export const PaymentList = styled.ul`
    list-style: none;
    padding: 0;
`

export const PaymentItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid ${colors.texto}33;

    span {
        font-size: 16px;
        color: ${colors.branco};
    }

    &:last-child {
        border-bottom: none;
    }
`

export const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;

    &:before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    ${ToggleSwitch} input:checked + & {
        background-color: ${colors.corPrimariaEscura};
    }

    ${ToggleSwitch} input:checked + &:before {
        transform: translateX(26px);
    }
`

export const Button = styled.button`
    background: ${colors.corPrimaria};
    color: #000;
    padding: 14px;
    margin-top: 24px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`
