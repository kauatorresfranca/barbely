import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IMaskInput } from 'react-imask'
import * as S from './styles'
import api from '../../../../services/api'

interface FormularioCadastroClienteProps {
    onSwitchToLogin: () => void
}

const FormularioCadastroCliente = ({ onSwitchToLogin }: FormularioCadastroClienteProps) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmarSenha: '',
        telefone: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [barbeariaId, setBarbeariaId] = useState<number | null>(null)
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            fetch(`${api.baseURL}/barbearias/buscar-por-slug/${slug}/`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Resposta de /api/barbearias/buscar-por-slug/:', data)
                    if (data.id) {
                        setBarbeariaId(data.id)
                    } else {
                        setError('Barbearia não encontrada.')
                    }
                })
                .catch((err) => {
                    console.error('Erro ao buscar barbearia:', err)
                    setError('Erro ao buscar barbearia.')
                })
        }
    }, [slug])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccessMessage(null)

        if (formData.password !== formData.confirmarSenha) {
            setError('As senhas não coincidem')
            return
        }

        if (!barbeariaId) {
            setError('Barbearia não carregada.')
            return
        }

        const payload = {
            user: {
                email: formData.email,
                nome: `${formData.first_name} ${formData.last_name}`,
                telefone: formData.telefone,
                password: formData.password,
            },
            nome: `${formData.first_name} ${formData.last_name}`,
            telefone: formData.telefone,
            barbearia: barbeariaId,
        }

        console.log('Payload enviado para /api/clientes/:', payload)

        try {
            const response = await fetch(`${api.baseURL}/clientes/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setSuccessMessage('Cadastro realizado com sucesso!')
                setTimeout(() => {
                    onSwitchToLogin()
                }, 2000)
            } else {
                const errorData = await response.json()
                setError('Erro ao cadastrar: ' + JSON.stringify(errorData))
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            setError('Erro na requisição.')
        }
    }

    return (
        <>
            <h2>Criar uma conta</h2>
            <p>Preencha seus dados para se cadastrar como cliente.</p>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
            <S.Form onSubmit={handleSubmit}>
                <S.InputGroup>
                    <label htmlFor="first_name">Nome</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                    />
                </S.InputGroup>
                <S.InputGroup>
                    <label htmlFor="last_name">Sobrenome</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Seu sobrenome"
                        required
                    />
                </S.InputGroup>
                <S.InputGroup>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        required
                    />
                </S.InputGroup>
                <S.InputGroup>
                    <label htmlFor="telefone">Telefone</label>
                    <IMaskInput
                        mask="(00) 00000-0000"
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        required
                    />
                </S.InputGroup>
                <S.InputGroup>
                    <label htmlFor="password">Senha</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            required
                        />
                        <i
                            className={showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>
                </S.InputGroup>
                <S.InputGroup>
                    <label htmlFor="confirmarSenha">Confirmar senha</label>
                    <div className="input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmarSenha"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            placeholder="Confirmar senha"
                            required
                        />
                        <i
                            className={showConfirmPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></i>
                    </div>
                </S.InputGroup>
                <button type="submit">Cadastrar</button>
                <Link
                    to="#"
                    onClick={(e) => {
                        e.preventDefault()
                        onSwitchToLogin()
                    }}
                >
                    <span>Já possui cadastro?</span> Faça login
                </Link>
            </S.Form>
        </>
    )
}

export default FormularioCadastroCliente
