import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { useBarbeariaAtual } from "../../../../../hooks/useBarbeariaAtual";
import { IMaskInput } from 'react-imask';

const BarbeariaPerfilForm = () => {
  const barbaria = useBarbeariaAtual();
  const slug = barbaria?.slug;
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome_proprietario: "",
    nome_barbearia: "",
    telefone: "",
    cpf: "",
    cnpj: "",
    descricao: "",
    imagem: null as File | null,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBarbearia = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`);
        const data = await response.json();

        setFormData(prev => ({
          ...prev,
          nome_proprietario: data.nome_proprietario || "",
          nome_barbearia: data.nome_barbearia || "",
          telefone: data.telefone || "",
          cpf: data.cpf || "",
          cnpj: data.cnpj || "",
          descricao: data.descricao || "",
        }));

        if (data.imagem) {
          const isFullUrl = data.imagem.startsWith("http");
          setPreview(isFullUrl ? data.imagem : `http://localhost:8000${data.imagem}`);
        }
      } catch (error) {
        console.error("Erro ao buscar barbearia:", error);
      }
    };

    if (slug) fetchBarbearia();
  }, [slug]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, imagem: file }));
    }
  };

  const handleClickImagem = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token_barbearia");
    const form = new FormData();

    form.append("nome_proprietario", formData.nome_proprietario);
    form.append("nome_barbearia", formData.nome_barbearia);
    form.append("telefone", formData.telefone);
    form.append("cpf", formData.cpf);
    form.append("cnpj", formData.cnpj);
    form.append("descricao", formData.descricao);

    if (formData.imagem) {
      form.append("imagem", formData.imagem);
    }

    try {
      const response = await fetch("http://localhost:8000/api/barbearias/update/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

        if (response.ok) {
            alert('dados enviados com sucesso!')
        }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao salvar alterações:", errorData);
        return;
      }

      console.log("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <S.Container>
      <h2>Informações da Barbearia</h2>
      <p className="subtitle">Gerencie os dados principais da sua barbearia, como nome, contato, descrição.</p>
      <S.Form onSubmit={handleSubmit}>
        <S.ImagemWrapper>
          <S.ImagemContainer>
            <S.ImagemPerfil
              src={preview || "https://via.placeholder.com/150x150"}
              alt="Foto da Sua Barbearia"
              onClick={handleClickImagem}
            />
            <i className="ri-pencil-line"></i>
          </S.ImagemContainer>
          <S.HiddenInput
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImagemChange}
          />
        </S.ImagemWrapper>

        <S.inputGroup>
          <label htmlFor="nome_proprietario">Nome do Responsável</label>
          <S.Input
            type="text"
            id="nome_proprietario"
            name="nome_proprietario"
            value={formData.nome_proprietario}
            onChange={handleChange}
            required
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="nome_barbearia">Nome Da Barbearia</label>
          <S.Input
            type="text"
            id="nome_barbearia"
            name="nome_barbearia"
            value={formData.nome_barbearia}
            onChange={handleChange}
            required
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="telefone">Número Da Barbearia</label>
          <S.Input
            as={IMaskInput}
            mask="(00) 0 0000-0000"
            type="text"
            id="telefone"
            name="telefone"
            placeholder="telefone"
            value={formData.telefone}
            required
            onAccept={(value: string | undefined) =>
              setFormData(prev => ({ ...prev, telefone: value || '' }))
            }
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="cpf">CPF</label>
          <S.Input
            as={IMaskInput}
            mask="000-000-000-00"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="cpf"
            value={formData.cpf}
            required
            onAccept={(value: string | undefined) =>
              setFormData(prev => ({ ...prev, cpf: value || '' }))
            }
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="cnpj">CNPJ</label>
          <S.Input
            as={IMaskInput}
            mask="00.000.000/0000-00"
            type="text"
            id="cnpj"
            name="cnpj"
            placeholder="cnpj"
            value={formData.cnpj}
            required
            onAccept={(value: string | undefined) =>
              setFormData(prev => ({ ...prev, cnpj: value || '' }))
            }
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="descricao">Descrição da Barbearia</label>
          <S.TextArea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </S.inputGroup>

        <S.Button type="submit">Salvar alterações</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default BarbeariaPerfilForm;
