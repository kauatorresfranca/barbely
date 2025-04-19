import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as S from './styles'
import logo from '../../../../assets/images/logo.png'

const FormularioResetSenha = () => {
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const { token, slug } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            const response = await fetch(
                'http://localhost:8000/api/clientes/password/reset/confirm/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, new_password: newPassword }),
                },
            )

            const data = await response.json()

            if (response.ok) {
                setMessage('Senha redefinida com sucesso! Faça login.')
                setTimeout(() => navigate(`/barbearia/${slug}/login`), 3000)
            } else {
                setError(data.error || 'Erro ao redefinir a senha.')
            }
        } catch {
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
                <Link to={`/barbearia/${slug}/login`}>Voltar para o login</Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioResetSenha
