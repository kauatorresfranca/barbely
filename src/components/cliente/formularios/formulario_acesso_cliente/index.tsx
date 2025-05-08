import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as S from './styles'
import logo from '../../../../assets/images/logo.png'
import api from '../../../../services/api'

const FormularioLoginCliente = () => {
    const [formData, setFormData] = useState({ email: '', senha: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { slug } = useParams()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch(`${api.baseURL}/clientes/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, senha: formData.senha }),
            })

            const data = await response.json()

            if (response.ok) {
                sessionStorage.setItem('access_token_cliente', data.access)
                sessionStorage.setItem('refresh_token_cliente', data.refresh)

                const clienteResponse = await fetch(`${api.baseURL}/clientes/${data.cliente_id}/`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${data.access}` },
                })

                const clienteData = await clienteResponse.json()

                if (clienteResponse.ok) {
                    sessionStorage.setItem('cliente', JSON.stringify(clienteData))
                }

                window.dispatchEvent(new Event('storage'))
                navigate(`/barbearia/${slug}`)
            } else {
                setError(data.detail || 'Erro ao fazer login.')
            }
        } catch {
            setError('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Acesse sua conta</h2>
            <p>Agende horários com as melhores barbearias.</p>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.Form onSubmit={handleLogin}>
                <S.inputGroup>
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
                </S.inputGroup>
                <S.inputGroup>
                    <label htmlFor="senha">Senha</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Senha"
                            required
                        />
                        <i
                            className={showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}
                            onClick={() => setShowPassword(!showPassword)}
                            role="button"
                            tabIndex={0}
                            aria-label="Mostrar ou esconder senha"
                        ></i>
                    </div>
                </S.inputGroup>
                <button type="submit">Entrar</button>
                <Link to={`/barbearia/${slug}/esqueci-senha`}>Esqueci minha senha</Link>
                <Link to={`/barbearia/${slug}/cadastro`} className="criarConta">
                    <span>Não possui conta?</span> Faça seu cadastro
                </Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioLoginCliente
