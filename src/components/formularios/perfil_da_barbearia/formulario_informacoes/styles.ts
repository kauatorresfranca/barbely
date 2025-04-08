import styled from "styled-components";
import { colors } from "../../../../../styles";

export const Container = styled.div`
  width: 680px;
  background: ${colors.cinzaClaro};
  padding: 20px;
  border-radius: 8px;
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const inputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  width: 100%;

  label {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.texto};
  }

  i {
    position: absolute;
    right: 10px;
    color: ${colors.texto};

    &:hover {
      cursor: pointer;
    }
  }
`

export const Input = styled.input`
    width: 100%;
    height: 52px;
    padding: 12px;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: #181b20;
    transition: border 0.4s ease-in-out;

    &:hover {
      border: 1px solid ${colors.branco};
    }

    &:focus {
      border: 1px solid ${colors.corPrimaria};
      outline: none;
    }

    &::placeholder {
      color: ${colors.cinzaClaro};
      font-weight: bold;
    }
`

export const TextArea = styled.textarea`
    width: 100%;
    height: 120px;
    padding: 12px;
    resize: none;
    border: 1px solid ${colors.cinzaTransparent};
    border-radius: 3px;
    background-color: transparent;
    transition: border 0.4s ease-in-out;

    &:hover {
      border: 1px solid ${colors.branco};
    }

    &:focus {
      border: 1px solid ${colors.corPrimaria};
      outline: none;
    }

    &::placeholder {
      color: ${colors.texto};
      font-weight: 500;
    }
`

export const Button = styled.button`
  background: ${colors.corPrimaria};
  color: #000;
  padding: 14px;
  margin-top: 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

export const ImagemWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 4px;
    border-radius: 50%;
    background-color: ${colors.corPrimaria};
    color: ${colors.cinzaEscuro};
  }
`;

export const ImagemContainer = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
`

export const ImagemPerfil = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
