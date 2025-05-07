import { useState } from 'react'
import * as S from './styles'

const Chat = () => {
    // Usuários simulados
    const [usuarios] = useState([
        { id: 1, nome: 'Suporte', ultimaMensagem: 'Claro! Como posso ajudar?', hora: '10:02' },
        { id: 2, nome: 'Cliente 1', ultimaMensagem: 'Oi, tudo bem?', hora: '09:45' },
        { id: 3, nome: 'Cliente 2', ultimaMensagem: 'Quero agendar um horário.', hora: '08:30' },
    ])

    // Mensagens simuladas por usuário
    const [mensagensPorUsuario] = useState({
        1: [
            {
                id: 1,
                texto: 'Olá! Como posso ajudar você hoje?',
                remetente: 'suporte',
                hora: '10:00',
            },
            {
                id: 2,
                texto: 'Quero saber sobre agendamentos.',
                remetente: 'cliente',
                hora: '10:01',
            },
            {
                id: 3,
                texto: 'Claro! Você pode agendar pelo menu Agendamentos.',
                remetente: 'suporte',
                hora: '10:02',
            },
        ],
        2: [
            { id: 1, texto: 'Oi, tudo bem?', remetente: 'cliente', hora: '09:45' },
            {
                id: 2,
                texto: 'Tudo ótimo por aqui! E contigo?',
                remetente: 'suporte',
                hora: '09:46',
            },
        ],
        3: [
            { id: 1, texto: 'Quero agendar um horário.', remetente: 'cliente', hora: '08:30' },
            { id: 2, texto: 'Claro, vou te ajudar com isso!', remetente: 'suporte', hora: '08:32' },
        ],
    })

    const [usuarioAtivo, setUsuarioAtivo] = useState<number | null>(1) // Primeiro usuário como padrão
    const [novaMensagem, setNovaMensagem] = useState('')
    const [isUsuariosOpen, setIsUsuariosOpen] = useState(false)

    const handleEnviar = () => {
        if (novaMensagem.trim() && usuarioAtivo) {
            const novasMensagens = [
                ...mensagensPorUsuario[usuarioAtivo],
                {
                    id: Date.now(),
                    texto: novaMensagem,
                    remetente: 'cliente',
                    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]
            mensagensPorUsuario[usuarioAtivo] = novasMensagens
            setNovaMensagem('')
        }
    }

    const toggleUsuarios = () => {
        setIsUsuariosOpen(!isUsuariosOpen)
    }

    return (
        <S.Container>
            <S.Main>
                {/* Lista de usuários (esquerda) */}
                <S.UsuariosContainer isOpen={isUsuariosOpen}>
                    <S.UsuariosHeader>
                        <h2>Conversas</h2>
                    </S.UsuariosHeader>
                    <S.UsuariosList>
                        {usuarios.map((usuario) => (
                            <S.UsuarioItem
                                key={usuario.id}
                                active={usuarioAtivo === usuario.id}
                                onClick={() => {
                                    setUsuarioAtivo(usuario.id)
                                    setIsUsuariosOpen(false)
                                }}
                            >
                                <S.Avatar>{usuario.nome.charAt(0)}</S.Avatar>
                                <S.UsuarioInfo>
                                    <S.Nome>{usuario.nome}</S.Nome>
                                    <S.UltimaMensagem>{usuario.ultimaMensagem}</S.UltimaMensagem>
                                </S.UsuarioInfo>
                                <S.Hora>{usuario.hora}</S.Hora>
                            </S.UsuarioItem>
                        ))}
                    </S.UsuariosList>
                </S.UsuariosContainer>

                {/* Área de chat (direita) */}
                {usuarioAtivo ? (
                    <S.ChatContainer>
                        <S.Header>
                            <S.BackButton onClick={toggleUsuarios}>
                                <i className="ri-arrow-left-line"></i>
                            </S.BackButton>
                            <h2>{usuarios.find((u) => u.id === usuarioAtivo)?.nome}</h2>
                        </S.Header>
                        <S.MensagensContainer>
                            {mensagensPorUsuario[usuarioAtivo].map((msg) => (
                                <S.Mensagem key={msg.id} remetente={msg.remetente}>
                                    <S.Texto>{msg.texto}</S.Texto>
                                    <S.Hora>{msg.hora}</S.Hora>
                                </S.Mensagem>
                            ))}
                        </S.MensagensContainer>
                        <S.InputContainer>
                            <S.Input
                                type="text"
                                value={novaMensagem}
                                onChange={(e) => setNovaMensagem(e.target.value)}
                                placeholder="Digite sua mensagem..."
                            />
                            <S.Botao onClick={handleEnviar}>Enviar</S.Botao>
                        </S.InputContainer>
                    </S.ChatContainer>
                ) : (
                    <S.EmptyChat>Selecione uma conversa para começar.</S.EmptyChat>
                )}
            </S.Main>
        </S.Container>
    )
}

export default Chat
