import React from "react";

const Cancel: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Pagamento Cancelado</h2>
      <p>Você cancelou o pagamento. Tente novamente se desejar.</p>
      <a href="/subscriptions">Voltar aos Planos</a>
    </div>
  );
};

export default Cancel;
