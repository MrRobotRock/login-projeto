import { useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./RedefinirSenha.css";

export default function RedefinirSenha() {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState({
    novaSenha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState({
    confirmarSenha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    // setSuccess("");

    // if (novaSenha !== confirmarSenha) {
    //   setError("As senhas não conferem!");
    //   return;
    // }

    setLoading(true);
  };
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
        <button
          className="back-button"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>
        <div className="rs-header">
          <h2>Redefina sua senha</h2>
          <p>Elabore sua nova senha</p>
        </div>

        {/* {error && <p className="erro">{error}</p>}
        {success && <div className="success-message">{success}</div>} */}

        <form onSubmit={handleSubmit} className="login-form">
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
                type={showConfirmPassword ? "text" : "password"}
                id="confirmarSenha"
                name="confirmarSenha"
                value={confirmarSenha.senha}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Enviando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
