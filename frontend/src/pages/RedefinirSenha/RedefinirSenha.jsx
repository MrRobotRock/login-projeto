import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "./RedefinirSenha.css";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState({
    novaSenha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState({
    confirmarSenha: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setNovaSenha({
      ...novaSenha,
      [e.target.name]: e.target.value,
    });
    setConfirmarSenha({
      ...confirmarSenha,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rs-container">
      <div className="rs-card">
        <div className="rs-header">
          <h1>Redefina sua senha</h1>
          <p>Elabore sua nova senha</p>
        </div>

        <div className="form-group">
          <label htmlFor="senha">Nova Senha</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="novaSenha"
              name="novaSenha"
              value={novaSenha.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>
        {/* confirmarSenha */}
        <div className="form-group">
          <label htmlFor="confirmar-senha">Confirmar Senha</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              value={confirmarSenha.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div className="forgot-password">
          <a href="/">Voltar para página de Login</a>
        </div>
      </div>
    </div>
  );
}
