import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as S from './styles'
import api from '../../../../services/api'

interface FormularioLoginClienteProps {
    onLoginSuccess: () => void
    onLoginError?: (message: string) => void
    onSwitchToCadastro: () => void
}

const FormularioLoginCliente = ({
    onLoginSuccess,
    onLoginError,
    onSwitchToCadastro,
}: FormularioLoginClienteProps) => {
    const [formData, setFormData] = useState({ email: '', senha: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const { slug } = useParams()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
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

                if (clienteResponse.ok) {
                    const clienteData = await clienteResponse.json()
                    sessionStorage.setItem('cliente', JSON.stringify(clienteData))
                } else {
                    const errorMsg = 'Erro ao buscar os dados do cliente.'
                    setError(errorMsg)
                    if (onLoginError) onLoginError(errorMsg)
                    return
                }

                window.dispatchEvent(new Event('storage'))
                if (onLoginSuccess) onLoginSuccess()
            } else {
                const errorMsg = data.detail || 'Erro ao fazer login.'
                setError(errorMsg)
                if (onLoginError) onLoginError(errorMsg)
            }
        } catch {
            const errorMsg = 'Erro ao conectar com o servidor.'
            setError(errorMsg)
            if (onLoginError) onLoginError(errorMsg)
        }
    }

    return (
        <>
            <h2>Acesse sua conta</h2>
            <p>Agende horários com as melhores barbearias.</p>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.Form onSubmit={handleSubmit}>
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
                </S.InputGroup>
                <button type="submit">Entrar</button>
                <Link to={`/barbearia/${slug}/esqueci-senha`}>Esqueci minha senha</Link>
                <Link
                    to="#"
                    className="criarConta"
                    onClick={(e) => {
                        e.preventDefault()
                        onSwitchToCadastro()
                    }}
                >
                    <span>Não possui conta?</span> Faça seu cadastro
                </Link>
            </S.Form>
        </>
    )
}

export default FormularioLoginCliente
