import { useState, useEffect } from "react";
import * as S from "./styles";
import { useBarbeariaAtual } from "../../../../../hooks/useBarbeariaAtual";

const Localizacao = () => {
  const [form, setForm] = useState({
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    endereco: "",
    numero: "",
    complemento: "",
  });

  const barbearia = useBarbeariaAtual();
  const slug = barbearia?.slug;

  // Preenche os campos se já existir endereço cadastrado
  useEffect(() => {
    const fetchEndereco = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/endereco-barbearia-publico/${slug}/`);

        if (response.ok) {
          const data = await response.json();
          setForm({
            cep: data.cep || "",
            estado: data.estado || "",
            cidade: data.cidade || "",
            bairro: data.bairro || "",
            endereco: data.endereco || "",
            numero: data.numero || "",
            complemento: data.complemento || "",
          });
        } else {
          console.error("Erro ao buscar endereço");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    };

    if (slug) {
      fetchEndereco();
    }
  }, [slug]);

  // Atualiza o estado do form ao digitar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Busca dados do CEP ao completar 8 dígitos
  useEffect(() => {
    const fetchCEP = async () => {
      if (form.cep.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setForm((prev) => ({
              ...prev,
              estado: data.uf,
              cidade: data.localidade,
              bairro: data.bairro,
              endereco: data.logradouro,
            }));
          }
        } catch (err) {
          console.error("Erro ao buscar CEP:", err);
        }
      }
    };

    fetchCEP();
  }, [form.cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("access_token");

    if (!token) {
      alert("Você precisa estar logado para salvar o endereço.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/endereco-barbearia/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro ao salvar endereço:", errorData);
        alert("Erro ao salvar endereço.");
        return;
      }

      alert("Endereço salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <S.Container>
      <h2>Localização da Barbearia</h2>
      <S.Form onSubmit={handleSubmit}>
        <S.inputGroup>
          <label htmlFor="cep">CEP</label>
          <S.Input
            type="text"
            id="cep"
            name="cep"
            placeholder="CEP"
            value={form.cep}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="estado">Estado</label>
          <S.Input
            type="text"
            id="estado"
            name="estado"
            placeholder="Estado"
            value={form.estado}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="cidade">Cidade</label>
          <S.Input
            type="text"
            id="cidade"
            name="cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="endereco">Endereço</label>
          <S.Input
            type="text"
            id="endereco"
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="numero">Número</label>
          <S.Input
            type="text"
            id="numero"
            name="numero"
            placeholder="Número"
            value={form.numero}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="complemento">Complemento</label>
          <S.Input
            type="text"
            id="complemento"
            name="complemento"
            placeholder="Complemento"
            value={form.complemento}
            onChange={handleChange}
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="bairro">Bairro</label>
          <S.Input
            type="text"
            id="bairro"
            name="bairro"
            placeholder="Bairro"
            value={form.bairro}
            onChange={handleChange}
            required
          />
        </S.inputGroup>
        <S.Button type="submit">Salvar alterações</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default Localizacao;
