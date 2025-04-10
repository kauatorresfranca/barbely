import * as S from "./styles";

const Localizacao = () => {

  return (
    <S.Container>
      <h2>Localização da Barbearia</h2>
      <S.Form>
        <S.inputGroup>
          <label htmlFor="CEP">CEP</label>
          <S.Input
            type="text"
            id="CEP"
            name="CEP"
            placeholder="CEP"
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
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="endereco">Endereço</label>
          <S.Input
            type="text"
            id="endereco"
            name="endereco"
            placeholder="Endereco"
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
            required
          />
        </S.inputGroup>
        <S.inputGroup>
          <label htmlFor="bairro">Bairro</label>
          <S.Input
            type="text"
            id="bairro"
            name="bairro"
            placeholder="Bairro"
            required
          />
        </S.inputGroup>
        <S.Button type="submit">Salvar alterações</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default Localizacao;
