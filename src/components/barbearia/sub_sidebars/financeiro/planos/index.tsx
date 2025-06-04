import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { authFetch } from "../../../../../utils/authFetch";
import * as S from "./styles";

// Inicialize o Stripe com a chave pública de teste
const stripePromise = loadStripe("pk_test_51RSRkFIOZGJoeO45adKRWF1qbDwH7HdYsLEgPjgvatkyA57dLKvuwRV7kf3syWLJOR6KEhIRsemcuUmqzz6whxkV00w5W1uw86");

const Planos = () => {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const planos = [
    {
      nome: "Básico",
      preco: "R$ 49,90/mês",
      precoAnual: "R$ 479,90/ano",
      monthlyPriceId: "price_1RSY1fIOZGJoeO45WzvaApFA",
      yearlyPriceId: "price_1RSY1gIOZGJoeO456ARh7UNk",
      recursos: [
        "Até 2 funcionários",
        "Até 50 agendamentos/mês",
        "Suporte básico via e-mail",
      ],
      atual: true,
      recomendado: false,
    },
    {
      nome: "Profissional",
      preco: "R$ 99,90/mês",
      precoAnual: "R$ 959,90/ano",
      monthlyPriceId: "price_1RSY1gIOZGJoeO45K1Qk5aLt",
      yearlyPriceId: "price_1RSY1hIOZGJoeO45yMV6cbrk",
      recursos: [
        "Até 5 funcionários",
        "Até 150 agendamentos/mês",
        "Relatórios básicos",
        "Integração com PIX e cartão",
        "Personalização de tema",
        "Suporte via chat",
      ],
      atual: false,
      recomendado: true,
    },
    {
      nome: "Premium",
      preco: "R$ 199,90/mês",
      precoAnual: "R$ 1.919,90/ano",
      monthlyPriceId: "price_1RSY1hIOZGJoeO45Ep1etc5d",
      yearlyPriceId: "price_1RSY1iIOZGJoeO451I1vyzEM",
      recursos: [
        "Funcionários ilimitados",
        "Agendamentos ilimitados",
        "Relatórios avançados",
        "Personalização de marca",
        "Personalização de tema",
        "Suporte prioritário (chat e telefone)",
      ],
      atual: false,
      recomendado: false,
    },
  ];

  const handleSubscribe = async (
    priceId: string,
    planName: string,
    billingCycle: "monthly" | "yearly",
    planIndex: number
  ) => {
    setLoading(planIndex);
    setError(null);

    try {
      const response = await authFetch("/subscriptions/create-checkout-session/", {
        method: "POST",
        body: JSON.stringify({
          price_id: priceId,
          plan_name: planName,
          billing_cycle: billingCycle,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar a sessão de checkout: " + (await response.text()));
      }

      const data = await response.json();
      const { sessionId } = data;

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Falha ao inicializar o Stripe.");
      }
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        setError(stripeError.message || 'Erro desconhecido ao redirecionar para o checkout.');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Erro ao processar a assinatura.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Planos de Assinatura</h2>
        <p className="subtitle">
          Escolha o plano ideal para a sua barbearia e otimize sua gestão.
        </p>
      </S.Header>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <S.PlanosGrid>
        {planos.map((plano, index) => (
          <S.PlanoCard
            key={index}
            atual={plano.atual}
            recomendado={plano.recomendado}
          >
            {plano.recomendado && <S.RecomendadoBadge>Recomendado</S.RecomendadoBadge>}
            <h3>{plano.nome}</h3>
            <S.PrecoWrapper>
              <span className="preco">{plano.preco}</span>
              <span className="preco-anual">ou {plano.precoAnual}</span>
            </S.PrecoWrapper>
            <ul>
              {plano.recursos.map((recurso, i) => (
                <li key={i}>
                  <S.CheckIcon className="ri-check-line" />
                  {recurso}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "10px" }}>
              <S.Botao
                disabled={plano.atual || loading === index}
                onClick={() =>
                  handleSubscribe(plano.monthlyPriceId, plano.nome, "monthly", index)
                }
              >
                {plano.atual ? "Plano Atual" : loading === index ? "Carregando..." : "Mensal"}
              </S.Botao>
              <S.Botao
                disabled={plano.atual || loading === index}
                onClick={() =>
                  handleSubscribe(plano.yearlyPriceId, plano.nome, "yearly", index)
                }
              >
                {plano.atual ? "Plano Atual" : loading === index ? "Carregando..." : "Anual"}
              </S.Botao>
            </div>
          </S.PlanoCard>
        ))}
      </S.PlanosGrid>
    </S.Container>
  );
};

export default Planos;
