import { useState } from "react"
import * as S from './styles'
import logo  from '../../../../assets/images/logo.png'
import { Link } from "react-router-dom"

const FormularioCadastro = () => {
    const [formData, setFormData] = useState({ nome_barbearia: "", nome_proprietario: "" , email: "", password:"", confirmarSenha:""});
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/api/barbearias/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        alert("Cadastro realizado com sucesso!")
    } else {
        alert("Erro ao enviar os dados.")
    }
    } catch (error) {
    console.error("Erro na requisição:", error)
    }
}

return (
    <S.FormularioContainer>
        <img src={logo} alt="" />
        <h2>Criar uma conta</h2>
        <p>Comece agora a gerenciar sua barbearia de forma fácil e prática.</p>
    <S.Form onSubmit={handleSubmit}>
    <S.inputGroup>
        <label htmlFor="nome_barbearia">Nome da barbearia</label>
        <input type="text" id="nome_barbearia" name="nome_barbearia" value={formData.nome_barbearia} onChange={handleChange} placeholder="Ex: Barbearia norte-oeste" />
    </S.inputGroup>
    <S.inputGroup>
        <label htmlFor="nome_proprietario">Nome do proprietario</label>
        <input type="text" id="nome_proprietario" name="nome_proprietario" value={formData.nome_proprietario} onChange={handleChange} placeholder="Ex: José lima" />
    </S.inputGroup>
    <S.inputGroup>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
    </S.inputGroup>
    <S.inputGroup>
        <label htmlFor="password">Senha</label>
        <div className="input-wrapper">
            <input type={showPassword ? "text":  "password"} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" />
            <i className={showPassword ? "ri-eye-fill" : "ri-eye-off-fill"} onClick={() => setShowPassword(!showPassword)}></i>
        </div>
    </S.inputGroup>
    <S.inputGroup>
        <label htmlFor="confirmarSenha">Confirmar senha</label>
        <div className="input-wrapper">
            <input type={showConfirmPassword ? "text":  "password"} id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} placeholder="Confirmar senha" />
            <i className={showConfirmPassword ? "ri-eye-fill" : "ri-eye-off-fill"} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
        </div>
    </S.inputGroup>
    <button type="submit">Cadastrar</button>
    <Link to='/login'><span>Já possui cadastro?</span> Faça login</Link>
    </S.Form>
    </S.FormularioContainer>
);
};

export default FormularioCadastro
