// src/pages/Menu.jsx

import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Home } from 'lucide-react';
import authService from '../services/authService';
import './Menu.css';

export default function Menu() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Bem-vindo, {user?.nome || 'Usuário'}!</h1>
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

        <div className="menu-card">
          <Settings size={40} />
          <h3>Configurações</h3>
          <p>Ajuste suas preferências</p>
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