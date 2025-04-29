import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as S from './styles' // Ajuste o caminho se necessário
import logo from '../../../../assets/images/logo.png'
import api from '../../../../services/api'

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
            console.log('Base URL sendo usada:', api.baseURL) // Log para depurar a URL
            console.log('Dados enviados:', { email: formData.email, password: formData.senha }) // Log para depurar os dados

            const response = await fetch(`${api.baseURL}/barbearias/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.senha }),
                mode: 'no-cors', // Temporariamente para contornar o CORS (remover após resolver o problema)
            })

            console.log('Resposta da requisição:', response) // Log para depurar a resposta

            // Como mode: 'no-cors' não permite acessar o corpo da resposta, simulamos a resposta para testes
            // Remova isso e volte ao comportamento normal após resolver o CORS
            const data = {
                barbearia_id: 'temp-id',
                access_token: 'temp-token',
                refresh_token: 'temp-refresh-token',
            } // Simulação

            if (data.barbearia_id) {
                sessionStorage.setItem('access_token_barbearia', data.access_token)
                sessionStorage.setItem('refresh_token_barbearia', data.refresh_token)
                sessionStorage.setItem('barbearia_token', data.barbearia_id)

                const barbeariaResponse = await fetch(
                    `${api.baseURL}/barbearias/${data.barbearia_id}/`,
                    {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${data.access_token}` },
                        mode: 'no-cors', // Temporariamente para contornar o CORS (remover após resolver o problema)
                    },
                )

                console.log('Resposta da segunda requisição:', barbeariaResponse) // Log para depurar

                // Simulação de resposta para testes
                const barbeariaData = { id: 'temp-id', name: 'Temp Barbershop' } // Simulação

                sessionStorage.setItem('barbearia', JSON.stringify(barbeariaData))

                window.dispatchEvent(new Event('storage'))
                navigate('/dashboard')
            } else {
                setError('Erro ao fazer login.')
            }
        } catch (err) {
            console.error('Erro na requisição:', err)
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
