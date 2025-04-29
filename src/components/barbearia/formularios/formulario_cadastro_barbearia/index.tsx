import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as S from './styles'

import logo from '../../../../assets/images/logo.png'

const FormularioCadastro = () => {
    const [formData, setFormData] = useState({
        nome_barbearia: '',
        nome_proprietario: '',
        email: '',
        password: '',
        confirmarSenha: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({
        password: '',
        confirmarSenha: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Limpa erros ao digitar
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = { password: '', confirmarSenha: '' }

        // Verifica se a senha tem pelo menos 8 caracteres
        if (formData.password.length < 8) {
            newErrors.password = 'A senha deve ter pelo menos 8 caracteres'
            isValid = false
        }

        // Verifica se as senhas coincidem
        if (formData.password !== formData.confirmarSenha) {
            newErrors.confirmarSenha = 'As senhas não coincidem'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const response = await fetch('http://localhost:8000/api/barbearias/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_barbearia: formData.nome_barbearia,
                    nome_proprietario: formData.nome_proprietario,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            if (response.ok) {
                alert('Cadastro realizado com sucesso!')
                setFormData({
                    nome_barbearia: '',
                    nome_proprietario: '',
                    email: '',
                    password: '',
                    confirmarSenha: '',
                })
                setErrors({ password: '', confirmarSenha: '' })
            } else {
                const errorData = await response.json()
                alert(`Erro ao enviar os dados: ${errorData.message || 'Tente novamente.'}`)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            alert('Erro ao conectar com o servidor.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Criar uma conta</h2>
            <p>Comece agora a gerenciar sua barbearia de forma fácil e prática.</p>
            <S.Form onSubmit={handleSubmit}>
                <S.inputGroup>
                    <label htmlFor="nome_barbearia">Nome da barbearia</label>
                    <input
                        type="text"
                        id="nome_barbearia"
                        name="nome_barbearia"
                        value={formData.nome_barbearia}
                        onChange={handleChange}
                        placeholder="Ex: Barbearia Norte-Oeste"
                        required
                    />
                </S.inputGroup>
                <S.inputGroup>
                    <label htmlFor="nome_proprietario">Nome do proprietário</label>
                    <input
                        type="text"
                        id="nome_proprietario"
                        name="nome_proprietario"
                        value={formData.nome_proprietario}
                        onChange={handleChange}
                        placeholder="Ex: José Lima"
                        required
                    />
                </S.inputGroup>
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
                    {errors.password && <p>{errors.password}</p>}
                </S.inputGroup>
                <S.inputGroup>
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
                    {errors.confirmarSenha && <p>{errors.confirmarSenha}</p>}
                </S.inputGroup>
                <button type="submit">Cadastrar</button>
                <Link to="/login">
                    <span>Já possui cadastro?</span> Faça login
                </Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioCadastro
