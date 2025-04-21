import styled from 'styled-components'
import { colors } from '../../../../../styles'

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
`

export const ButtonContainer = styled.div`
    margin-bottom: 24px;
`

export const ToggleFormButton = styled.button`
    padding: 12px 24px;
    background: #4caf50;
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background: #45a049;
    }
`

export const Form = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
    padding: 16px;
    background: ${colors.texto}1a;
    border-radius: 4px;
    animation: slideIn 0.3s ease-in-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 8px;
        color: ${colors.branco};
        font-size: 14px;
    }
`

export const Input = styled.input`
    padding: 8px;
    border: none;
    border-radius: 4px;
    background: ${colors.texto}33;
    color: ${colors.branco};
    font-size: 14px;

    &::placeholder {
        color: ${colors.texto};
    }

    &[type='date']::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`

export const Select = styled.select`
    padding: 8px;
    border: none;
    border-radius: 4px;
    background: ${colors.texto}33;
    color: ${colors.branco};
    font-size: 14px;
`

export const SubmitButton = styled.button`
    grid-column: span 4;
    padding: 12px;
    background: #4caf50;
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background: #45a049;
    }
`

export const FilterGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    label {
        color: ${colors.branco};
        font-size: 14px;
    }
`

export const CostList = styled.ul`
    list-style: none;
    padding: 0;
`

export const CostItem = styled.li`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 16px 0;
    border-bottom: 1px solid ${colors.texto}33;
    align-items: center;

    &:last-child {
        border-bottom: none;
    }
`

export const CostDescription = styled.span`
    color: ${colors.branco};
    font-size: 16px;
`

export const CostValue = styled.span`
    color: ${colors.branco};
    font-size: 16px;
    text-align: right;
`

export const CostDate = styled.span`
    color: ${colors.texto};
    font-size: 14px;
    text-align: center;
`

export const CostType = styled.span`
    color: ${colors.texto};
    font-size: 14px;
    text-align: right;
`

export const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`

export const EditButton = styled.button`
    padding: 6px 12px;
    background: #2196f3;
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
        background: #1976d2;
    }
`

export const DeleteButton = styled.button`
    padding: 6px 12px;
    background: #f44336;
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
        background: #d32f2f;
    }
`
export const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 15px;
    font-size: 14px;
`
