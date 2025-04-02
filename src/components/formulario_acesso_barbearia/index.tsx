import { useState } from "react"
import {Link} from 'react-router-dom'
import * as S from './styles'
import logo  from '../../assets/images/logo.png'

const FormularioLogin = () => {
    const [formData, setFormData] = useState({ email: "", senha: "" })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("http://localhost:8000/api/barbearias/login/", {
        method: "POST",  // Aqui está o problema! Certifique-se de que está usando POST
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.senha }),
    });

    const data = await response.json();

    if (response.ok) {
        alert("Login realizado com sucesso!");
        console.log("ID da barbearia:", data.barbearia_id);
    } else {
        alert("Erro: " + data.error);
    }
}

return (
    <S.FormularioContainer>
        <img src={logo} />
        <h2>Acesse sua conta</h2>
        <p>Gerencie sua barbearia de forma fácil e rápida</p>
    <S.Form onSubmit={handleLogin}>
    <S.inputGroup>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
    </S.inputGroup>
    <S.inputGroup>
        <label htmlFor="senha">Senha</label>
        <div className="input-wrapper">
            <input type={showPassword ? "text":  "password"} id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" />
            <i className={showPassword ? "ri-eye-fill" : "ri-eye-off-fill"} onClick={() => setShowPassword(!showPassword)}></i>
        </div>
    </S.inputGroup>
    <button type="submit">Entrar</button>
    <a href="#">Esqueci minha senha</a>
    <Link to='/cadastro' className="criarConta"><span>Não possui conta ?</span> Criar conta</Link>
    </S.Form>
    </S.FormularioContainer>
)
}

export default FormularioLogin
