import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProtectedRoute from "./components/ProtectedRoute"; // Importação do arquivo atualizado
import Menu from "./pages/Menu";
import api from "./services/api";
import RecuperarSenha from "./pages/RedefinirSenha/RecuperarSenha";
import "./App.css";
import CodigoVerificacao from "./pages/RedefinirSenha/CodigoVerificacao";
import RedefinirSenha from "./pages/RedefinirSenha/RedefinirSenha";
import ConfiguracaoAdmin from "./pages/ConfiguracaoAdmin/ConfiguracaoAdmin";
import FormConsultoria from "./pages/FormConsultoria/FormConsultoria";
import Home from "./pages/homePages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/login"
          element={
            api.auth.isAuthenticated() ? (
              <Navigate to="/menu" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/registro"
          element={
            api.auth.isAuthenticated() ? (
              <Navigate to="/menu" replace />
            ) : (
              <Registro />
            )
          }
        />

        {/* --- ROTAS PROTEGIDAS --- */}
        
        {/* Menu: Acesso básico para qualquer logado */}
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        {/* Consultoria: Requer permissão 'consultations:create' */}
        <Route 
          path="/menu/form-consultoria" 
          element={
            <ProtectedRoute requiredPermission="consultations:create">
              <FormConsultoria />
            </ProtectedRoute>
          } 
        />

        {/* Config Admin: Requer permissão 'users:view_all' (ou ser ADMIN) */}
        <Route 
          path="/menu/config-admin" 
          element={
            <ProtectedRoute requiredPermission="users:view_all">
              <ConfiguracaoAdmin />
            </ProtectedRoute>
          } 
        />

        {/* --- FIM ROTAS PROTEGIDAS --- */}

        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/verificar-codigo" element={<CodigoVerificacao />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
      </Routes>
    </Router>
  );
}

export default App;