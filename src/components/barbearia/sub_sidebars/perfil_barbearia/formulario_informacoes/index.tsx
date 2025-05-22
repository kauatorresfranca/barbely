import { useEffect, useRef, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../../utils/authFetch'
import { useBarbeariaAtual, useSetBarbeariaAtual } from '../../../../../hooks/useBarbeariaAtual'
import * as S from './styles'
import api from '../../../../../services/api'
import { Toast } from '../../../../../components/toast'
import user from '../../../../../assets/images/user.png' // Importar a imagem padrão

const BarbeariaPerfilForm = () => {
    const barbearia = useBarbeariaAtual()
    const setBarbeariaAtual = useSetBarbeariaAtual()
    const slug = barbearia?.slug
    const [preview, setPreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        nome_proprietario: '',
        nome_barbearia: '',
        telefone: '',
        cpf: '',
        cnpj: '',
        descricao: '',
        imagem: null as File | null,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchBarbearia = async () => {
            if (!slug) {
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setHasError(false)
            try {
                const response = await authFetch(
                    `${api.baseURL}/barbearias/buscar-por-slug/${slug}/`,
                )
                if (response.ok) {
                    const data = await response.json()
                    setFormData((prev) => ({
                        ...prev,
                        nome_proprietario: data.nome_proprietario || '',
                        nome_barbearia: data.nome_barbearia || '',
                        telefone: data.telefone || '',
                        cpf: data.cpf || '',
                        cnpj: data.cnpj || '',
                        descricao: data.descricao || '',
                    }))
                    if (data.imagem) {
                        const isFullUrl =
                            data.imagem.startsWith('http') || data.imagem.startsWith('https')
                        setPreview(isFullUrl ? data.imagem : `${api.baseURL}${data.imagem}`)
                    } else {
                        setPreview(user) // Usar imagem padrão 'user' se não houver imagem
                    }
                } else {
                    console.error('Erro ao buscar barbearia')
                    setHasError(true)
                }
            } catch (error) {
                console.error('Erro ao buscar barbearia:', error)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBarbearia()
    }, [slug])

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            setFormData((prev) => ({ ...prev, imagem: file }))
        }
    }

    const handleClickImagem = () => {
        inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = sessionStorage.getItem('access_token_barbearia')
        if (!barbearia || !barbearia.id) {
            alert('ID da barbearia não encontrado.')
            return
        }

        const form = new FormData()
        form.append('nome_proprietario', formData.nome_proprietario)
        form.append('nome_barbearia', formData.nome_barbearia)
        form.append('telefone', formData.telefone)
        form.append('cpf', formData.cpf)
        form.append('cnpj', formData.cnpj)
        form.append('descricao', formData.descricao)
        if (formData.imagem) {
            form.append('imagem', formData.imagem)
        }

        try {
            const response = await fetch(`${api.baseURL}/barbearias/${barbearia.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            })

            if (response.ok) {
                const updatedResponse = await authFetch(
                    `${api.baseURL}/barbearias/buscar-por-slug/${slug}/`,
                )
                const updatedData = await updatedResponse.json()
                setBarbeariaAtual(updatedData)
                setPreview(updatedData.imagem || user) // Usar 'user' se a imagem não for retornada
                setToastMessage('Dados enviados com sucesso!')
                setShowToast(true)
            } else {
                const errorData = await response.json()
                console.error('Erro ao salvar alterações:', errorData)
                alert('Erro ao salvar alterações.')
            }
        } catch (error) {
            console.error('Erro:', error)
            alert('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.Container>
            <h2>Informações da Barbearia</h2>
            <p className="subtitle">
                Gerencie os dados principais da sua barbearia, como nome, contato, descrição.
            </p>

            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

            {isLoading ? (
                <S.LoadingContainer>
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                </S.LoadingContainer>
            ) : (
                <>
                    {hasError && (
                        <S.Message>
                            Erro ao carregar os dados. Você pode preencher o formulário abaixo.
                        </S.Message>
                    )}
                    <S.Form onSubmit={handleSubmit}>
                        <S.ImagemWrapper>
                            <S.ImagemContainer>
                                <S.ImagemPerfil
                                    src={preview || user} // Usar 'user' como fallback
                                    alt="Foto da Sua Barbearia"
                                    onClick={handleClickImagem}
                                    onError={(e) => {
                                        console.error('Erro ao carregar imagem da barbearia:', preview)
                                        e.currentTarget.src = user // Fallback para 'user' em caso de erro
                                    }}
                                />
                                <i className="ri-pencil-line"></i>
                            </S.ImagemContainer>
                            <S.HiddenInput
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                onChange={handleImagemChange}
                            />
                        </S.ImagemWrapper>

                        <S.inputGroup>
                            <label htmlFor="nome_proprietario">Nome do Responsável</label>
                            <S.Input
                                type="text"
                                id="nome_proprietario"
                                name="nome_proprietario"
                                value={formData.nome_proprietario}
                                onChange={handleChange}
                                required
                            />
                        </S.inputGroup>

                        <S.inputGroup>
                            <label htmlFor="nome_barbearia">Nome Da Barbearia</label>
                            <S.Input
                                type="text"
                                id="nome_barbearia"
                                name="nome_barbearia"
                                value={formData.nome_barbearia}
                                onChange={handleChange}
                                required
                            />
                        </S.inputGroup>

                        <S.inputGroup>
                            <label htmlFor="telefone">Número Da Barbearia</label>
                            <S.Input
                                as={IMaskInput}
                                mask="(00) 0 0000-0000"
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                value={formData.telefone}
                                required
                                onAccept={(value: string | undefined) =>
                                    setFormData((prev) => ({ ...prev, telefone: value || '' }))
                                }
                            />
                        </S.inputGroup>

                        <S.inputGroup>
                            <label htmlFor="cpf">CPF</label>
                            <S.Input
                                as={IMaskInput}
                                mask="000-000-000-00"
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="cpf"
                                value={formData.cpf}
                                required
                                onAccept={(value: string | undefined) =>
                                    setFormData((prev) => ({ ...prev, cpf: value || '' }))
                                }
                            />
                        </S.inputGroup>

                        <S.inputGroup>
                            <label htmlFor="cnpj">CNPJ</label>
                            <S.Input
                                as={IMaskInput}
                                mask="00.000.000/0000-00"
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                placeholder="cnpj"
                                value={formData.cnpj}
                                required
                                onAccept={(value: string | undefined) =>
                                    setFormData((prev) => ({ ...prev, cnpj: value || '' }))
                                }
                            />
                        </S.inputGroup>

                        <S.inputGroup>
                            <label htmlFor="descricao">Descrição da Barbearia</label>
                            <S.TextArea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                            />
                        </S.inputGroup>

                        <S.Button type="submit">Salvar alterações</S.Button>
                    </S.Form>
                </>
            )}
        </S.Container>
    )
}

export default BarbeariaPerfilForm
