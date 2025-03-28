import { useState } from "react";

const Formulario = () => {
    const [formData, setFormData] = useState({ nome: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8000/api/barbearias/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        console.log("Cadastro realizado com sucesso!");
    } else {
        console.error("Erro ao enviar os dados.");
    }
    } catch (error) {
    console.error("Erro na requisição:", error);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
    />
    <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-mail"
    />
    <button type="submit">Enviar</button>
    </form>
);
};

export default Formulario;
