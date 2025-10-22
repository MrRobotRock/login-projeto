import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.senha !== formData.confirmarSenha){
      alert("As senhas não conferem!");
      return;
    }
    alert("Cadastro realizado!");
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Registrar</h2>
        <p className="subtitle">Crie sua conta</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nome" 
            placeholder="Nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required
          />
          <input 
            type="text" 
            name="usuario" 
            placeholder="Usuário" 
            value={formData.usuario} 
            onChange={handleChange} 
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <input 
            type="password" 
            name="senha" 
            placeholder="Senha" 
            value={formData.senha} 
            onChange={handleChange} 
            required
          />
          <input 
            type="password" 
            name="confirmarSenha" 
            placeholder="Confirmar Senha" 
            value={formData.confirmarSenha} 
            onChange={handleChange} 
            required
          />
          <button type="submit">Registrar</button>
        </form>
        <p className="footer-text">
          Já tem conta? <a href="#">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default App;