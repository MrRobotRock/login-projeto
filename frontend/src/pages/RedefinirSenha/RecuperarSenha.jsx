import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RecuperarSenha.css'

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.error || 'Algo deu errado');
      }

      navigate('/verificar-codigo', { state: { email } });

    } catch (err) {
      setError(err.message || 'Erro ao enviar código. Tente novamente.');
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button
          className="back-button"
          onClick={() => navigate('/login')}
          type="button"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="login-header">
          <h1>Recuperar Senha</h1>
          <p>Digite seu e-mail para receber o código de recuperação</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Código'}
          </button>
        </form>

        <p className="register-link">
          Lembrou sua senha?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Fazer login
          </a>
        </p>
      </div>
    </div>
  );
}