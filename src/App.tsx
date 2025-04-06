import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import LoginBarbearia from './pages/formularios/loginBarbearia'
import CadastroBarbearia from './pages/formularios/cadastroBarbearia'
import ProtectedRoute from './pages/protectedRoute'
import Dashboard from './pages/dashboard'
import PaginaBarbearia from './components/pagina_barbearia'
import LoginCliente from './pages/formularios/loginCliente'
import CadastroCliente from './pages/formularios/cadastroCliente'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginBarbearia />} />
                <Route path="/cadastro" element={<CadastroBarbearia />} />
                <Route path="/barbearia/:slug/login" element={<LoginCliente />} />
                <Route path="/barbearia/:slug/cadastro" element={<CadastroCliente />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/cliente/dashboard" element={<h1>funcionou, você fez o login com sucesso !</h1>}/>
                <Route path="/barbearia/:slug" element={<PaginaBarbearia />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
