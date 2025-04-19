import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import LoginBarbearia from './pages/formularios/loginBarbearia'
import CadastroBarbearia from './pages/formularios/cadastroBarbearia'
import ProtectedRoute from './pages/protectedRoute'
import Dashboard from './pages/dashboard'
import PaginaBarbearia from './components/cliente/pagina_barbearia'
import LoginCliente from './pages/formularios/loginCliente'
import CadastroCliente from './pages/formularios/cadastroCliente'
import FormularioEsqueciSenha from './components/cliente/formularios/fomulario_esqueci_senha'
import FormularioResetSenha from './components/cliente/formularios/formulario_reset_senha'
import FormularioEsqueciSenhaBarbearia from './components/barbearia/formularios/formulario_esqueci_senha'
import FormularioResetSenhaBarbearia from './components/barbearia/formularios/formulario_reset_senha'

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
                <Route path="/barbearia/:slug/login" element={<LoginCliente />} />
                <Route path="/barbearia/:slug/cadastro" element={<CadastroCliente />} />
                <Route path="/barbearia/:slug/esqueci-senha" element={<FormularioEsqueciSenha />} />
                <Route
                    path="/barbearia/:slug/reset-password/:token"
                    element={<FormularioResetSenha />}
                />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route
                    path="/cliente/dashboard"
                    element={<h1>funcionou, você fez o login com sucesso !</h1>}
                />
                <Route path="/barbearia/:slug" element={<PaginaBarbearia />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    )
}

export default App
