import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

// Definir a interface para os detalhes da assinatura
interface SubscriptionDetails {
  plan_name: string;
  billing_cycle: string;
  status: string;
}

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      const fetchSubscriptionDetails = async () => {
        try {
          const response = await authFetch(`/subscriptions/check-session/${sessionId}/`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Erro ao buscar detalhes da sessão");
          }
          const data = await response.json();
          setSubscriptionDetails(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
      };
      fetchSubscriptionDetails();
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Pagamento Concluído!</h1>
      <p>Sua assinatura foi ativada com sucesso.</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {subscriptionDetails && (
        <div>
          <h2>Detalhes da Assinatura</h2>
          <p><strong>Plano:</strong> {subscriptionDetails.plan_name}</p>
          <p><strong>Ciclo de Cobrança:</strong> {subscriptionDetails.billing_cycle}</p>
          <p><strong>Status:</strong> {subscriptionDetails.status}</p>
        </div>
      )}
      <p>
        <a href="/subscriptions">Voltar aos Planos</a>
      </p>
    </div>
  );
};

export default SuccessPage;
