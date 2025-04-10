import { useState } from "react";
import * as S from "./styles"
import { authFetch } from "../../../../../utils/authFetch";

const diasDaSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const HorarioFuncionamentoForm = () => {
  const [horarios, setHorarios] = useState(
    diasDaSemana.map((dia) => ({
      dia,
      aberto: dia !== "Domingo",
      abre_as: dia !== "Domingo" ? "08:00" : "",
      fecha_as: dia !== "Domingo" ? "19:00" : "",
    }))
  );

  const handleCheckboxChange = (index: number) => {
    const novosHorarios = [...horarios];
    novosHorarios[index].aberto = !novosHorarios[index].aberto;
    if (!novosHorarios[index].aberto) {
      novosHorarios[index].abre_as = "";
      novosHorarios[index].fecha_as = "";
    }
    setHorarios(novosHorarios);
  };

  const handleTimeChange = (
    index: number,
    campo: "abre_as" | "fecha_as",
    valor: string
  ) => {
    const novosHorarios = [...horarios];
    novosHorarios[index][campo] = valor;
    setHorarios(novosHorarios);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");

    const mapaDias = {
      "Domingo": 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      "Sábado": 6,
    };

    const dadosParaEnviar = horarios.map((h) => ({
      dia_semana: mapaDias[h.dia as keyof typeof mapaDias],
      aberto: h.aberto,
      fechado: !h.aberto, // <- incluir fechado explicitamente
      horario_abertura: h.aberto ? h.abre_as : null,
      horario_fechamento: h.aberto ? h.fecha_as : null,
    }));

    console.log("Enviando para API:", dadosParaEnviar);

    try {
      const response = await authFetch("http://localhost:8000/api/horarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      const responseData = await response.json(); // Lê a resposta uma única vez

      if (response.ok) {
        alert("Alterações salvas com sucesso!");
      } else {
        console.error("Erro do servidor:", responseData);
        alert("Erro ao salvar horários.");
      }
      console.log("Status:", response.status);
      console.log("Resposta do servidor:", responseData);

    } catch (error) {
      console.error("Erro ao enviar os horários:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };


  return (
    <S.Container>
      <h2>Horário de Funcionamento</h2>
      <S.Form onSubmit={handleSubmit}>
        <S.Table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Abre às</th>
              <th>Fecha às</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario, index) => (
              <tr key={horario.dia}>
                <td>
                  <S.CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={horario.aberto}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span className="checkmark"></span>
                    {horario.dia}
                  </S.CheckboxWrapper>
                </td>
                <td>
                  <S.Input
                    type="time"
                    value={horario.abre_as}
                    onChange={(e) =>
                      handleTimeChange(index, "abre_as", e.target.value)
                    }
                    disabled={!horario.aberto}
                  />
                </td>
                <td>
                  <S.Input
                    type="time"
                    value={horario.fecha_as}
                    onChange={(e) =>
                      handleTimeChange(index, "fecha_as", e.target.value)
                    }
                    disabled={!horario.aberto}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
        <S.Button type="submit">Salvar alterações</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default HorarioFuncionamentoForm;
