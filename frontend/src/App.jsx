import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import RedefinirSenha from "./pages/RedefinirSenha/RedefinirSenha";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* A rota abaixo serve para redirecionar para a terceira tela da redefinição de senha, deve ser mudada para a primeira tela: "usuário deve inserir email e ter um botao de 'enviar código'" que foi decidido anteriormente. */}
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
