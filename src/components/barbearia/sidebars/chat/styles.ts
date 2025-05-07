import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${colors.cinzaClaro};
    border-radius: 8px;
    overflow: hidden;
`

export const Main = styled.div`
    display: flex;
    height: 100%;
`

export const UsuariosContainer = styled.div<{ isOpen: boolean }>`
    width: 300px;
    background: ${colors.cinzaClaro};
    border-right: 1px solid ${colors.cinzaTransparent};
    display: flex;
    flex-direction: column;

    @media (max-width: ${breakpoints.tablet}) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
        transition: transform 0.3s ease;
        z-index: 10;
    }
`

export const UsuariosHeader = styled.div`
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    padding: 12px 20px;
    border-bottom: 1px solid ${colors.cinzaTransparent};

    h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }
`

export const UsuariosList = styled.div`
    flex: 1;
    overflow-y: auto;
`

export const UsuarioItem = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid ${colors.cinzaTransparent};
    background: ${(props) => (props.active ? colors.cinzaTransparent : 'transparent')};
    cursor: pointer;

    &:hover {
        background: ${colors.cinzaClaro};
    }
`

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    margin-right: 12px;
`

export const UsuarioInfo = styled.div`
    flex: 1;
`

export const Nome = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.cinzaEscuro};
`

export const UltimaMensagem = styled.div`
    font-size: 12px;
    color: ${colors.texto};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ChatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: ${breakpoints.tablet}) {
        display: ${(props) => (props.isOpen ? 'none' : 'flex')};
    }
`

export const Header = styled.div`
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    padding: 12px 20px;
    border-bottom: 1px solid ${colors.cinzaTransparent};
    display: flex;
    align-items: center;

    h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }
`

export const BackButton = styled.button`
    background: none;
    border: none;
    color: ${colors.branco};
    font-size: 18px;
    margin-right: 12px;
    cursor: pointer;
    display: none;

    @media (max-width: ${breakpoints.tablet}) {
        display: block;
    }
`

export const MensagensContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: ${colors.branco};
`

export const Mensagem = styled.div<{ remetente: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.remetente === 'cliente' ? 'flex-end' : 'flex-start')};
    margin-bottom: 16px;
    max-width: 70%;
    background: ${(props) =>
        props.remetente === 'cliente' ? colors.corPrimaria : colors.cinzaEscuro};
    color: ${colors.cinzaEscuro};
    padding: 10px 15px;
    border-radius: 8px;
`

export const Texto = styled.p`
    margin: 0;
    font-size: 14px;
    word-wrap: break-word;
`

export const Hora = styled.span`
    font-size: 12px;
    color: ${colors.texto};
    align-self: flex-end;
    margin-top: 4px;
`

export const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: ${colors.branco};
    border-top: 1px solid ${colors.cinzaTransparent};

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
    }
`

export const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid ${colors.cinzaTransparent};
    color: ${colors.cinzaEscuro};
    border-radius: 4px;
    margin-right: 10px;
    font-size: 14px;

    &:focus {
        border-color: ${colors.corPrimaria};
        outline: none;
    }

    @media (max-width: ${breakpoints.tablet}) {
        margin-right: 0;
        margin-bottom: 10px;
    }
`

export const Botao = styled.button`
    padding: 10px 20px;
    background: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: ${colors.corPrimariaEscura};
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const EmptyChat = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.texto};
    font-size: 16px;
    background: ${colors.cinzaClaro};
`
