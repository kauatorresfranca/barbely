import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as S from './styles'
import logo from '../../../../assets/images/logo.png'

const FormularioEsqueciSenha = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const { slug } = useParams()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            const response = await fetch('http://localhost:8000/api/clientes/password/reset/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, slug }),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage('Verifique seu e-mail para redefinir sua senha.')
            } else {
                setError(data.error || 'Erro ao processar a solicitação.')
            }
        } catch {
            setError('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Redefinir Senha</h2>
            <p>Informe seu e-mail para receber um link de redefinição.</p>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            {message && <S.SuccessMessage>{message}</S.SuccessMessage>}

            <S.Form onSubmit={handleSubmit}>
                <S.inputGroup>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        required
                    />
                </S.inputGroup>
                <button type="submit">Enviar</button>
                <Link to={`/barbearia/${slug}/login`}>Voltar para o login</Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioEsqueciSenha
