import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as S from './styles'
import logo from '../../../../assets/images/logo.png'
import api from '../../../../services/api'

const FormularioResetSenhaBarbearia = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        console.log('Enviando:', { token, new_password: newPassword })

        try {
            const response = await fetch(`${api.baseURL}/barbearias/password/reset/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, new_password: newPassword }),
            })

            const data = await response.json()
            console.log('Resposta do servidor:', data)

            if (response.ok) {
                setMessage('Senha redefinida com sucesso! Faça login.')
                setTimeout(() => navigate('/login'), 3000)
            } else {
                setError(data.error || 'Erro ao redefinir a senha.')
            }
        } catch (err) {
            console.error('Erro na requisição:', err)
            setError('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Redefinir Senha</h2>
            <p>Insira sua nova senha.</p>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            {message && <S.SuccessMessage>{message}</S.SuccessMessage>}

            <S.Form onSubmit={handleSubmit}>
                <S.inputGroup>
                    <label htmlFor="newPassword">Nova Senha</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nova senha"
                            required
                            minLength={8}
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
                <S.inputGroup>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmar senha"
                            required
                            minLength={8}
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
                <button type="submit">Redefinir Senha</button>
                <Link to="/login">Voltar para o login</Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioResetSenhaBarbearia
