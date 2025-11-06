import { useState } from "react";
import './CodigoVerificacao.css';

const CodigoVerificacao = () => {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const validarCodigo = (e) => {
    e.preventDefault();
    if (codigo.trim() === "") {
      setErro("Por favor, insira o código de verificação.");
    } else if (codigo.length !== 6) {
      setErro("O código deve conter 6 dígitos.");
    } else {
      setErro("");
      alert("Código validado com sucesso! (Depois conectaremos ao back-end)");

    }

  };

  return (

    <div className="codigo-container">
      <div className="codigo-card">
        <h2>Verificação de Código</h2>
        <p>Insira o código enviado para seu e-mail.</p>
        <form onSubmit={validarCodigo}>
          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="codigo-input"
            maxLength={6}
          />

          {erro && <p className="erro">{erro}</p>}
          <button type="submit" className="botao-confirmar">
            Validar Código
          </button>
        </form>

      </div>

    </div>

  );

};

export default CodigoVerificacao;