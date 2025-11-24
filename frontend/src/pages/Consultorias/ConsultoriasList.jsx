import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Plus, Edit2, CheckCircle, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ConsultoriasList.css";
import VincularResponsavelModal from "./VincularResponsavelModal";
import MudarStatusModal from "./MudarStatusModal";

export default function ConsultoriasList() {
  const navigate = useNavigate();
  const [consultorias, setConsultorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultoria, setSelectedConsultoria] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMudarStatusModal, setShowMudarStatusModal] = useState(false);
  const [selectedConsultoriaForStatus, setSelectedConsultoriaForStatus] = useState(null);

  const currentUser = api.auth.getCurrentUser();

  useEffect(() => {
    fetchConsultorias();
  }, [statusFilter, currentPage, itemsPerPage]);

  const fetchConsultorias = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await api.get(`/api/consultorias?${params}`);
      setConsultorias(response.data.data || []);
      setTotalPages(response.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar consultorias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredConsultorias = consultorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openVincularModal = (consultoria) => {
    setSelectedConsultoria(consultoria);
    setShowModal(true);
  };

  const handleVincular = async (responsavelId) => {
    try {
      await api.patch(`/api/consultorias/${selectedConsultoria.id}`, {
        responsavelId,
      });
      setSuccessMessage("Responsável vinculado com sucesso!");
      setShowModal(false);
      fetchConsultorias();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao vincular responsável:", error);
    }
  };

  const openMudarStatusModal = (consultoria) => {
    setSelectedConsultoriaForStatus(consultoria);
    setShowMudarStatusModal(true);
  };

  const handleStatusChange = (newStatus) => {
    setSuccessMessage(`Status alterado para: ${getStatusLabel(newStatus)}`);
    fetchConsultorias();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pendente":
        return <AlertCircle size={18} className="status-icon pendente" />;
      case "em_atendimento":
        return <Clock size={18} className="status-icon em-atendimento" />;
      case "confirmada":
        return <CheckCircle size={18} className="status-icon confirmada" />;
      case "concluida":
        return <CheckCircle size={18} className="status-icon concluida" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pendente: "Pendente",
      em_analise: "Em Análise",
      confirmada: "Confirmada",
      concluida: "Concluída",
      cancelada: "Cancelada",
    };
    return labels[status] || status;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="consultorias-container">
      <div className="consultorias-card">
        <div className="consultorias-header">
          <h1>Solicitações de Consultoria</h1>
          <p>Gerencie e acompanhe as solicitações recebidas</p>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/menu")}
          type="button"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <div className="consultorias-controls">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou empresa..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters-group">
            <div className="dropdown-container">
              <button
                className="filter-button"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                {statusFilter ? getStatusLabel(statusFilter) : "Todos os Status"}
                <ChevronDown size={18} />
              </button>
              {showStatusDropdown && (
                <div className="dropdown-menu">
                  <button
                    className={`dropdown-item ${!statusFilter ? "active" : ""}`}
                    onClick={() => {
                      setStatusFilter("");
                      setShowStatusDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    Todos os Status
                  </button>
                  {["pendente", "em_analise", "confirmada", "concluida", "cancelada"].map(
                    (status) => (
                      <button
                        key={status}
                        className={`dropdown-item ${statusFilter === status ? "active" : ""}`}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowStatusDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        {getStatusLabel(status)}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="pagination-selector">
              <span className="per-page-label">Exibir:</span>
              <div className="dropdown-container">
                <button
                  className="dropdown-button"
                  onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                >
                  {itemsPerPage}
                  <ChevronDown size={18} />
                </button>
                {showPerPageDropdown && (
                  <div className="dropdown-menu">
                    {[10, 30, 50].map((num) => (
                      <button
                        key={num}
                        className={`dropdown-item ${itemsPerPage === num ? "active" : ""}`}
                        onClick={() => {
                          setItemsPerPage(num);
                          setShowPerPageDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            <div className="consultorias-table-container">
              <table className="consultorias-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Empresa</th>
                    <th>Status</th>
                    <th>Responsável</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultorias.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-results">
                        Nenhuma solicitação encontrada
                      </td>
                    </tr>
                  ) : (
                    filteredConsultorias.map((consultoria) => (
                      <tr key={consultoria.id}>
                        <td className="consultoria-name">{consultoria.nome}</td>
                        <td>{consultoria.email}</td>
                        <td>{consultoria.empresa}</td>
                        <td>
                          <span className={`status-badge ${consultoria.status}`}>
                            {getStatusIcon(consultoria.status)}
                            {getStatusLabel(consultoria.status)}
                          </span>
                        </td>
                        <td>
                          {consultoria.responsavel ? (
                            <div className="responsavel-info">
                              <span className="responsavel-name">
                                {consultoria.responsavel.nome}
                              </span>
                            </div>
                          ) : (
                            <span className="sem-responsavel">Sem responsável</span>
                          )}
                        </td>
                        <td>{formatDate(consultoria.criadoEm)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-button"
                              onClick={() => openMudarStatusModal(consultoria)}
                              title="Alterar status"
                            >
                              <Clock size={16} />
                            </button>
                            <button
                              className="action-button"
                              onClick={() => openVincularModal(consultoria)}
                              title="Vincular responsável"
                            >
                              <Edit2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && selectedConsultoria && (
        <VincularResponsavelModal
          consultoria={selectedConsultoria}
          onClose={() => setShowModal(false)}
          onVincular={handleVincular}
          currentUser={currentUser}
        />
      )}

      {showMudarStatusModal && selectedConsultoriaForStatus && (
        <MudarStatusModal
          consultoria={selectedConsultoriaForStatus}
          onClose={() => setShowMudarStatusModal(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
