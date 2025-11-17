import { LogOut, User, Settings, Home, Scroll } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const user = api.auth.getCurrentUser();

  const handleLogout = () => {
    api.auth.logout();
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Bem-vindo, {user?.nome || "Usuário"}!</h1>
        <p>O que você gostaria de fazer hoje?</p>
      </div>

      <div className="menu-cards">
        <div className="menu-card">
          <Home size={40} />
          <h3>Início</h3>
          <p>Acesse a página inicial</p>
        </div>

        <div className="menu-card">
          <User size={40} />
          <h3>Perfil</h3>
          <p>Visualize e edite seu perfil</p>
        </div>

        <div
          className="menu-card clickable"
          onClick={() => navigate("/menu/form-consultoria")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              navigate("/menu/config-admin");
          }}
        >
          <Scroll size={40} />
          <h3>Solicitação de consultoria</h3>
          <p>Solicite a nossa consultoria</p>
        </div>

        <div
          className="menu-card clickable"
          onClick={() => navigate("/menu/config-admin")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              navigate("/menu/config-admin");
          }}
        >
          <Settings size={40} />
          <h3>Configurações</h3>
          <p>Configuração de usuários</p>
        </div>
      </div>

      <div className="user-info">
        <div className="user-details">
          <User size={24} />
          <div>
            <p className="user-name">{user?.nome}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </div>
  );
}