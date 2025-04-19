import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as S from './styles' // Ajuste o caminho se necessário
import logo from '../../../../assets/images/logo.png'

const LoginBarbearia = () => {
    const [formData, setFormData] = useState({ email: '', senha: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:8000/api/barbearias/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.senha }),
            })

            const data = await response.json()

            if (response.ok && data.barbearia_id) {
                sessionStorage.setItem('access_token_barbearia', data.access_token)
                sessionStorage.setItem('refresh_token_barbearia', data.refresh_token)
                sessionStorage.setItem('barbearia_token', data.barbearia_id)

                const barbeariaResponse = await fetch(
                    `http://localhost:8000/api/barbearias/${data.barbearia_id}/`,
                    {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${data.access_token}` },
                    },
                )

                const barbeariaData = await barbeariaResponse.json()

                if (barbeariaResponse.ok) {
                    sessionStorage.setItem('barbearia', JSON.stringify(barbeariaData))
                }

                window.dispatchEvent(new Event('storage'))
                navigate('/dashboard')
            } else {
                setError(data.error || 'Erro ao fazer login.')
            }
        } catch {
            setError('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Acesse sua conta</h2>
            <p>Administre sua barbearia de maneira simples e eficiente</p>

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
                <Link to="/esqueci-senha-barbearia">Esqueci minha senha</Link>
                <Link to="/cadastro" className="criarConta">
                    <span>Não possui conta?</span> Criar conta
                </Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default LoginBarbearia
