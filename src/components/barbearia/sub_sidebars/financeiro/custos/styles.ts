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

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const ButtonContainer = styled.div`
    margin-bottom: 24px;
`

export const ToggleFormButton = styled.button`
    padding: 8px;
    height: 40px;
    background: linear-gradient(45deg, ${colors.corPrimaria}, ${colors.corPrimaria}AA);
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background: ${colors.corPrimaria};
    }
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); // Escurecimento ajustado como no exemplo
    display: flex;
    align-items: center; // Centraliza verticalmente
    justify-content: center; // Centraliza horizontalmente
    z-index: 1000;
`

export const ModalContent = styled.div`
    background-color: ${colors.cinzaClaro};
    padding: 2rem; // Ajustado como no exemplo
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    position: relative; // Necessário para o botão de fechar absoluto
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
        color: ${colors.branco};
        margin: 0;
        text-align: center; // Centraliza o título
        flex: 1; // Faz o título ocupar o espaço central
    }
`

export const CloseButton = styled.button`
    position: absolute; // Posicionamento absoluto como no exemplo
    top: 8px;
    right: 12px;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.branco};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 4px;
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
    width: 100%;
    height: 52px;
    padding: 12px;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: #181b20;
    transition: border 0.4s ease-in-out;

    &:hover {
        border: 1px solid ${colors.branco};
    }

    &:focus {
        border: 1px solid ${colors.corPrimaria};
        outline: none;
    }

    &::placeholder {
        color: ${colors.cinzaClaro};
        font-weight: bold;
    }

    &[type='date']::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`

export const Select = styled.select`
    border: none;
    height: 42px;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
    font-size: 14px;
    cursor: pointer;
    width: 100%; // Garante que o select ocupe todo o espaço disponível
    box-sizing: border-box; // Evita que padding cause overflow

    option {
        background-color: ${colors.cinzaEscuro};
    }
`

export const SubmitButton = styled.button`
    padding: 12px;
    background: ${colors.corPrimariaEscura};
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    width: 100%; // Garante que o botão ocupe toda a largura

    &:hover {
        background: #45a049;
    }
`

export const HeaderCostGroup = styled.div`
    display: flex;
    justify-content: space-between;
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

export const CostHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 16px 0;
    border-bottom: 1px solid ${colors.texto}33;
    align-items: center;
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
    max-width: 100%; // Limita a largura ao espaço da coluna
    white-space: nowrap; // Impede que o texto quebre em várias linhas
    overflow: hidden; // Esconde o texto que ultrapassa
    text-overflow: ellipsis; // Adiciona "..." ao texto cortado
`

export const CostValue = styled.span`
    color: ${colors.branco};
    font-size: 16px;
    text-align: center; // Centraliza o texto na coluna
`

export const CostDate = styled.span`
    color: ${colors.texto};
    font-size: 14px;
    text-align: center; // Centraliza o texto na coluna
`

export const CostType = styled.span`
    color: ${colors.texto};
    font-size: 14px;
    text-align: center; // Centraliza o texto na coluna
`

export const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`

export const EditButton = styled.button`
    padding: 6px 12px;
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
`

export const DeleteButton = styled.button`
    padding: 6px 12px;
    background: ${colors.vermelho};
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
