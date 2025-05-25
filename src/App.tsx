import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginBarbearia from "./pages/formularios/loginBarbearia";
import CadastroBarbearia from "./pages/formularios/cadastroBarbearia";
import ProtectedRoute from "./pages/protectedRoute";
import Dashboard from "./pages/dashboard";
import PaginaBarbearia from "./components/cliente/pagina_barbearia";
import FormularioEsqueciSenha from "./components/cliente/formularios/fomulario_esqueci_senha";
import FormularioResetSenha from "./components/cliente/formularios/formulario_reset_senha";
import FormularioEsqueciSenhaBarbearia from "./components/barbearia/formularios/formulario_esqueci_senha";
import FormularioResetSenhaBarbearia from "./components/barbearia/formularios/formulario_reset_senha";
import Planos from "./components/barbearia/sub_sidebars/financeiro/planos"; // Ajuste o caminho conforme sua estrutura
import Success from "./pages/success"; // Ajuste o caminho
import Cancel from "./pages/cancel"; // Ajuste o caminho

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginBarbearia />} />
        <Route path="/cadastro" element={<CadastroBarbearia />} />
        <Route
          path="/esqueci-senha-barbearia"
          element={<FormularioEsqueciSenhaBarbearia />}
        />
        <Route
          path="/reset-password-barbearia/:token"
          element={<FormularioResetSenhaBarbearia />}
        />
        <Route path="/barbearia/:slug/esqueci-senha" element={<FormularioEsqueciSenha />} />
        <Route
          path="/barbearia/:slug/reset-password/:token"
          element={<FormularioResetSenha />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscriptions" element={<Planos />} />
        </Route>
        <Route
          path="/cliente/dashboard"
          element={<h1>funcionou, você fez o login com sucesso !</h1>}
        />
        <Route path="/barbearia/:slug" element={<PaginaBarbearia />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
