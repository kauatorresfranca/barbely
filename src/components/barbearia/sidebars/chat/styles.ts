import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

interface UsuariosContainerProps {
    isOpen: boolean
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${colors.cinzaEscuro};
    color: ${colors.branco};
`

export const Main = styled.main`
    flex: 1;
    display: flex;
    height: 100%;
`

export const UsuariosContainer = styled.div<UsuariosContainerProps>`
    width: 300px;
    background: ${colors.cinzaClaro};
    border-right: 1px solid ${colors.cinzaTransparent};
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;

    @media (max-width: ${breakpoints.tablet}) {
        position: absolute;
        z-index: 10;
        width: 100%;
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    }
`

export const UsuariosHeader = styled.div`
    padding: 16px;
    border-bottom: 1px solid ${colors.cinzaTransparent};

    h2 {
        font-size: 18px;
        font-weight: bold;
    }
`

export const UsuariosList = styled.ul`
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 0;
`

export const UsuarioItem = styled.li<{ active: boolean }>`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    background: ${({ active }) => (active ? colors.corPrimaria : 'transparent')};
    transition: background 0.2s;

    &:hover {
        background: ${colors.corPrimaria}50;
    }
`

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${colors.corPrimaria};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    margin-right: 12px;
`

export const UsuarioInfo = styled.div`
    flex: 1;
`

export const Nome = styled.p`
    font-size: 16px;
    font-weight: bold;
`

export const UltimaMensagem = styled.p`
    font-size: 14px;
    color: ${colors.texto};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Hora = styled.span`
    font-size: 12px;
    color: ${colors.texto};
`

export const ChatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const Header = styled.div`
    padding: 16px;
    border-bottom: 1px solid ${colors.cinzaTransparent};
    display: flex;
    align-items: center;

    h2 {
        font-size: 18px;
        font-weight: bold;
    }
`

export const BackButton = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: ${colors.branco};
    cursor: pointer;
    margin-right: 16px;

    @media (max-width: ${breakpoints.tablet}) {
        display: block;
    }
`

export const MensagensContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Mensagem = styled.div<{ remetente: 'suporte' | 'cliente' }>`
    max-width: 70%;
    align-self: ${({ remetente }) => (remetente === 'cliente' ? 'flex-end' : 'flex-start')};
    background: ${({ remetente }) =>
        remetente === 'cliente' ? colors.corPrimaria : colors.cinzaClaro};
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Texto = styled.p`
    font-size: 14px;
`

export const InputContainer = styled.div`
    padding: 16px;
    border-top: 1px solid ${colors.cinzaTransparent};
    display: flex;
    gap: 8px;
`

export const Input = styled.input`
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: ${colors.cinzaClaro};
    color: ${colors.branco};
    font-size: 14px;

    &::placeholder {
        color: ${colors.texto};
    }
`

export const Botao = styled.button`
    padding: 12px 24px;
    background: ${colors.corPrimaria};
    color: ${colors.branco};
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: ${colors.corPrimaria}cc;
    }
`

export const EmptyChat = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.texto};
    font-size: 16px;
`
