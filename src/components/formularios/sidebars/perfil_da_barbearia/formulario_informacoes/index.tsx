import { useRef, useState } from "react";
import * as S from "./styles";

const HorarioFuncionamentoForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClickImagem = () => {
    inputRef.current?.click();
  };

  return (
    <S.Container>
      <h2>Informações da Barbearia</h2>
      <S.Form>
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
          <label htmlFor="nome_responsavel">Nome do Responsável</label>
          <S.Input
            type="text"
            id="nome_responsavel"
            name="nome_responsavel"
            placeholder="Nome do Responsável"
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="nome_barbearia">Nome Da Barbearia</label>
          <S.Input
            type="text"
            id="nome_barbearia"
            name="nome_barbearia"
            placeholder="Nome da Barbearia"
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="cpf">CPF</label>
          <S.Input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF"
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="cnpj">CNPJ</label>
          <S.Input
            type="text"
            id="cnpj"
            name="cnpj"
            placeholder="CNPJ"
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="sobre">Sobre a Barbearia</label>
          <S.TextArea
            className="sobre"
            id="sobre"
            name="sobre"
            placeholder="Escreva sobre sua barbearia"
            required
          />
        </S.inputGroup>
        <S.Button type="submit">Salvar alterações</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default HorarioFuncionamentoForm;
