import { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IMaskInput } from 'react-imask'
import { Cliente } from '../../../../models/cliente'
import { authFetch } from '../../../../utils/authFetch'
import * as S from './styles'
import { colors } from '../../../../../styles'

const MinhaContaModal = ({
    onClose,
    cliente,
    updateCliente,
}: {
    onClose: () => void
    cliente: Cliente | null
    updateCliente: (cliente: Cliente) => void
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        nome: cliente?.user?.nome || '',
        email: cliente?.user?.email || '',
        telefone: cliente?.user?.telefone || '',
        imagem: null as File | null,
    })
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        console.log('Cliente recebido:', cliente)
        console.log('FotoPerfil inicial:', cliente?.fotoPerfil)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        })
        if (modalRef.current) {
            modalRef.current.focus()
        }
        if (cliente?.fotoPerfil) {
            const isFullUrl = cliente.fotoPerfil.startsWith('http')
            setPreview(
                isFullUrl ? cliente.fotoPerfil : `http://localhost:8000${cliente.fotoPerfil}`,
            )
        }
        return () => {
            document.removeEventListener('keydown', () => {})
        }
    }, [onClose, cliente])

    const handleImageClick = () => {
        if (!isEditing) return // Impedir alteração da foto fora do modo de edição
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            setError('Nenhum arquivo selecionado.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Imagem muito grande. Máximo 5MB.')
            return
        }
        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecione uma imagem válida.')
            return
        }

        setFormData((prev) => ({ ...prev, imagem: file }))
        setPreview(URL.createObjectURL(file))
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
        setError(null)
        if (isEditing) {
            setFormData({
                nome: cliente?.user?.nome || '',
                email: cliente?.user?.email || '',
                telefone: cliente?.user?.telefone || '',
                imagem: null,
            })
            const isFullUrl = cliente?.fotoPerfil?.startsWith('http')
            setPreview(
                cliente?.fotoPerfil
                    ? isFullUrl
                        ? cliente.fotoPerfil
                        : `http://localhost:8000${cliente.fotoPerfil}`
                    : null,
            )
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cliente?.id) {
            setError('Cliente inválido.')
            return
        }

        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!telefoneRegex.test(formData.telefone)) {
            setError('Telefone inválido. Use o formato (11) 99999-9999.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Email inválido.')
            return
        }

        const form = new FormData()
        if (formData.nome !== cliente?.user?.nome) {
            form.append('user.nome', formData.nome)
        }
        if (formData.email !== cliente?.user?.email) {
            form.append('user.email', formData.email)
        }
        if (formData.telefone !== cliente?.user?.telefone) {
            form.append('user.telefone', formData.telefone)
        }
        if (cliente.barbearia) {
            form.append('barbearia', cliente.barbearia.toString())
        } else {
            setError('Barbearia não especificada.')
            return
        }
        if (formData.imagem) {
            form.append('imagem', formData.imagem)
        }

        try {
            console.log('Enviando dados para:', `http://localhost:8000/api/clientes/${cliente.id}/`)
            const response = await authFetch(`http://localhost:8000/api/clientes/${cliente.id}/`, {
                method: 'PATCH',
                body: form,
            })
            if (response.ok) {
                const updatedCliente = await response.json()
                console.log('Perfil atualizado:', updatedCliente)
                if (!updatedCliente.fotoPerfil) {
                    console.warn('fotoPerfil retornou null após upload.')
                }
                updateCliente(updatedCliente)
                setIsEditing(false)
                onClose()
            } else {
                const errorText = await response.text()
                console.error('Erro ao atualizar perfil:', errorText)
                setError(`Erro ao atualizar perfil: ${errorText}`)
            }
        } catch (error) {
            console.error('Erro de conexão:', error)
            setError('Erro ao conectar com o servidor.')
        }
    }

    const imageSrc =
        preview ||
        (cliente?.fotoPerfil
            ? cliente.fotoPerfil.startsWith('http')
                ? cliente.fotoPerfil
                : `http://localhost:8000${cliente.fotoPerfil}`
            : null)
    console.log('imageSrc:', imageSrc)

    return (
        <S.ModalOverlay>
            <S.ModalContent ref={modalRef} tabIndex={-1}>
                <S.CloseButton onClick={onClose} aria-label="Fechar modal">
                    ×
                </S.CloseButton>
                <S.ProfileHeader>
                    <S.ImageWrapper onClick={handleImageClick} aria-label="Alterar foto de perfil">
                        {imageSrc ? (
                            <S.ProfileImage
                                src={imageSrc}
                                alt="Foto de Perfil"
                                onError={() => console.error('Erro ao carregar imagem:', imageSrc)}
                            />
                        ) : (
                            <FaUserCircle size={80} color={colors.texto} />
                        )}
                    </S.ImageWrapper>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        aria-label="Selecionar nova foto de perfil"
                    />
                    <S.UserName>{cliente?.user?.nome || 'Usuário'}</S.UserName>
                </S.ProfileHeader>
                <S.ModalBody>
                    {isEditing ? (
                        <S.Form onSubmit={handleFormSubmit}>
                            <S.InputGroup>
                                <label htmlFor="nome">Nome</label>
                                <S.Input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label htmlFor="email">Email</label>
                                <S.Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label htmlFor="telefone">Telefone</label>
                                <S.Input
                                    as={IMaskInput}
                                    mask="(00) 00000-0000"
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onAccept={(value: string | undefined) =>
                                        setFormData((prev) => ({ ...prev, telefone: value || '' }))
                                    }
                                    required
                                    placeholder="(11) 99999-9999"
                                />
                            </S.InputGroup>
                            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                            <S.ButtonGroup>
                                <S.ModalButton type="submit">Salvar</S.ModalButton>
                                <S.CancelButton type="button" onClick={handleEditToggle}>
                                    Cancelar
                                </S.CancelButton>
                            </S.ButtonGroup>
                        </S.Form>
                    ) : (
                        <>
                            <S.InfoList>
                                <S.InfoItem>
                                    <strong>Nome:</strong> {cliente?.user?.nome || 'Não informado'}
                                </S.InfoItem>
                                <S.InfoItem>
                                    <strong>Email:</strong>{' '}
                                    {cliente?.user?.email || 'Não informado'}
                                </S.InfoItem>
                                <S.InfoItem>
                                    <strong>Telefone:</strong>{' '}
                                    {cliente?.user?.telefone || 'Não informado'}
                                </S.InfoItem>
                            </S.InfoList>
                            <S.ModalButton onClick={handleEditToggle}>Editar Perfil</S.ModalButton>
                        </>
                    )}
                </S.ModalBody>
            </S.ModalContent>
        </S.ModalOverlay>
    )
}

export default MinhaContaModal
