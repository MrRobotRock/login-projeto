import { useState } from "react";
import "./App.css";
import "./Register.css";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados de cadastro:", formData);
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Crie sua conta</h2>
        <p>Preencha os campos abaixo para se registrar</p>

        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="seuusuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="********"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-register">
          Cadastrar
        </button>

        <p className="redirect-text">
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </form>
    </div>
  );
}

export default App;
