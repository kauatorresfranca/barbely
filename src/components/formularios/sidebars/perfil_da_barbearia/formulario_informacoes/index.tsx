import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { useBarbeariaAtual } from "../../../../../hooks/useBarbeariaAtual";

const HorarioFuncionamentoForm = () => {
  const barbaria = useBarbeariaAtual()
  const slug = barbaria?.slug
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    nome_proprietario: string;
    nome_barbearia: string;
    telefone: string;
    cpf: string;
    cnpj: string;
    descricao: string;
    imagem: File | null;
  }>({
    nome_proprietario: '',
    nome_barbearia: '',
    telefone: '',
    cpf: '',
    cnpj: '',
    descricao: '',
    imagem: null,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBarbearia = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`);
        const data = await response.json();

        setFormData(prev => ({
          ...prev,
          nome_proprietario: data.nome_proprietario || '',
          nome_barbearia: data.nome_barbearia || '',
          telefone: data.telefone || '',
          cpf: data.cpf || '',
          cnpj: data.cnpj || '',
          descricao: data.descricao || '',
          imagem: null,
        }));

        if (data.imagem) {
          setPreview(data.imagem); // Mostra imagem da barbearia
        }
      } catch (error) {
        console.error("Erro ao buscar barbearia:", error);
      }
    };

    if (slug) {
      fetchBarbearia();
    }
  }, [slug]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, imagem: file }));
    }
  };

  const handleClickImagem = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");
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
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao salvar alterações:", errorData);
        return;
      }

      console.log("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  return (
    <S.Container>
      <h2>Informações da Barbearia</h2>
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
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="cpf">CPF</label>
          <S.Input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </S.inputGroup>

        <S.inputGroup>
          <label htmlFor="cnpj">CNPJ</label>
          <S.Input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
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

export default HorarioFuncionamentoForm;
