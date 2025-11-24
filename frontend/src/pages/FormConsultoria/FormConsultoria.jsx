import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ScrollText } from "lucide-react";
import api from "../../services/api"; 
import "./FormConsultoria.css";

export default function FormConsultoria() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    descricao: "",
    consentimento: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/consultorias", formData);

      alert("✅ " + response.data.message);
      
      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        descricao: "",
        consentimento: false,
      });

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate("/menu");
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.errors?.[0]?.message 
        || err.response?.data?.message 
        || err.message 
        || "Erro ao enviar solicitação";
      
      setError(errorMessage);
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fc-container">
      <div className="fc-card">
        <button
          className="back-button"
          onClick={() => navigate("/menu")}
          type="button"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <form className="fc-form" onSubmit={handleSubmit}>
          <ScrollText size={40} color="#4caf50" />
          <h2>Solicitação de Consultoria</h2>
          <p>
            Preencha os campos abaixo com as suas credenciais para solicitar e
            prosseguir com a nossa consultoria
          </p>

          {error && (
            <div style={{
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
              color: "#c00"
            }}>
              ⚠️ {error}
            </div>
          )}

          <div className="fc-input">
            <input
              className="fc-input"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              required
            />
            <input
              className="fc-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              required
            />
            <input
              className="fc-input"
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Telefone / WhatsApp"
              required
            />
            <input
              className="fc-input"
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nome da sua empresa"
              required
            />
            <textarea
              className="fc-input"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Escreva a sua solicitação para a gente (mínimo 50 caracteres)"
              rows={8}
              minLength={50}
              required
            ></textarea>
            <label>
              <input
                className="fc-checkbox"
                type="checkbox"
                name="consentimento"
                checked={formData.consentimento}
                onChange={handleChange}
                required
              />
              Concordo que meus dados serão usados apenas para fins de contato e
              proposta de consultoria.
            </label>
          </div>

          <button 
            type="submit" 
            className="botao-confirmar" 
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </form>
      </div>
    </div>
  );
}