import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./pages/Menu";
import api from "./services/api";
import RecuperarSenha from "./pages/RedefinirSenha/RecuperarSenha";
import "./App.css";
import CodigoVerificacao from "./pages/RedefinirSenha/CodigoVerificacao";
import RedefinirSenha from "./pages/RedefinirSenha/RedefinirSenha";
import ConfiguracaoAdmin from "./pages/ConfiguracaoAdmin/ConfiguracaoAdmin";
import FormConsultoria from "./pages/FormConsultoria/FormConsultoria";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            api.auth.isAuthenticated() ? (
              <Navigate to="/menu" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

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
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/verificar-codigo" element={<CodigoVerificacao />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        <Route path="/menu/form-consultoria" element={<FormConsultoria />} />
        <Route path="/menu/config-admin" element={<ConfiguracaoAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
