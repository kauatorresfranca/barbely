import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import LoginBarbearia from './pages/loginBarbearia'
import CadastroBarbearia from './pages/cadastroBarbearia'
import ProtectedRoute from './pages/protectedRoute'
import Dashboard from './pages/dashboard'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginBarbearia />} />
                <Route path="/cadastro" element={<CadastroBarbearia />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
