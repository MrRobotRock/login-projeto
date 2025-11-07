import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Menu from "./pages/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./services/authService";
import RecuperarSenha from "./pages/RecuperarSenha";
import "./App.css";
import CodigoVerificacao from "./pages/CodigoVerificacao";
import RedefinirSenha from "./pages/RedefinirSenha/RedefinirSenha";
import ConfiguracaoAdmin from "./pages/ConfiguracaoAdmin/ConfiguracaoAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authService.isAuthenticated() ? (
              <Navigate to="/menu" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            authService.isAuthenticated() ? (
              <Navigate to="/menu" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/registro"
          element={
            authService.isAuthenticated() ? (
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
        <Route path="/codigo-verificacao" element={<CodigoVerificacao />} />
        <Route path="/verificar-codigo" element={<CodigoVerificacao />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/menu/config-admin" element={<ConfiguracaoAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
