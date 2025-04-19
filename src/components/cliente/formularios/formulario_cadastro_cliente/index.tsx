import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IMaskInput } from 'react-imask'

import * as S from './styles'

import logo from '../../../../assets/images/logo.png'

const FormularioCadastroCliente = () => {
    const { slug } = useParams()
    const [barbeariaId, setBarbeariaId] = useState<number | null>(null)

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

    useEffect(() => {
        if (slug) {
            fetch(`http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Resposta de /api/barbearias/buscar-por-slug/:', data) // Adicionar log
                    if (data.id) {
                        setBarbeariaId(data.id)
                    } else {
                        alert('Barbearia não encontrada.')
                    }
                })
                .catch((err) => {
                    console.error('Erro ao buscar barbearia:', err)
                    alert('Erro ao buscar barbearia.')
                })
        }
    }, [slug])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmarSenha) {
            alert('As senhas não coincidem')
            return
        }

        if (!barbeariaId) {
            alert('Barbearia não carregada.')
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
            const response = await fetch('http://localhost:8000/api/clientes/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                alert('Cadastro realizado com sucesso!')
            } else {
                const errorData = await response.json()
                alert('Erro ao cadastrar: ' + JSON.stringify(errorData))
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            alert('Erro na requisição.')
        }
    }

    return (
        <S.FormularioContainer>
            <img src={logo} alt="Logo" />
            <h2>Criar uma conta</h2>
            <p>Preencha seus dados para se cadastrar como cliente.</p>

            <S.Form onSubmit={handleSubmit}>
                <S.inputGroup>
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
                </S.inputGroup>
                <S.inputGroup>
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
                </S.inputGroup>
                <button type="submit">Cadastrar</button>
                <Link to={`/barbearia/${slug}/login`}>
                    <span>Já possui cadastro?</span> Faça login
                </Link>
            </S.Form>
        </S.FormularioContainer>
    )
}

export default FormularioCadastroCliente
