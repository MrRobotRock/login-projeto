import Navbar from "./Navbar.jsx";
import Contato from "./contato.jsx"; 
import Footer from "./Footer.jsx";
import PopularServicesCarousel from "./PopularServicesCarousel";
import { Sparkles, Shield, Leaf, Microscope, Zap, Award, ChevronRight } from "lucide-react";
import "./Home.css";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const scrollToContact = () => {
    document.getElementById("Fale conosco")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <main className="hero-section" id="Início">
        <div className="hero-text">
          <div className="badge-innovation">
            <Sparkles size={16} />
            <span>Inovação em Nanotecnologia</span>
          </div>
          <h1>Tintas Inteligentes à Base de Nanopartículas</h1>
          <h2>A CENANOINK revoluciona o mercado com tintas sustentáveis de alta performance</h2>
          <p className="hero-description">
            Desenvolvemos e produzimos tintas modificadas com nanopartículas de fabricação própria.
            Tecnologia eco-friendly, sustentável e com reaproveitamento de resíduos sólidos para soluções
            que protegem, inovam e respeitam o meio ambiente.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate("/login")}>
  Solicitar Consultoria
  <ChevronRight size={20} />
</button>

            <button className="btn-secondary" onClick={() => document.getElementById("Imagens")?.scrollIntoView({ behavior: "smooth" })}>
              Conheça Nossas Soluções
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-decoration"></div>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcidadeecia.com.br%2Fwp-content%2Fuploads%2F2023%2F08%2Floja-de-tintas.jpeg&f=1&nofb=1&ipt=05c947fbab335b9a5346710e3d1a98acdbe8dfd1a840353f9115c447a94fbdb5"
            alt="Inovação em tintas nanotecnológicas"
          />
        </div>
      </main>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <Microscope size={32} />
            </div>
            <h3>Nanotecnologia</h3>
            <p>100% desenvolvida internamente</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Leaf size={32} />
            </div>
            <h3>Sustentável</h3>
            <p>Reaproveitamento de resíduos</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Shield size={32} />
            </div>
            <h3>Alta Performance</h3>
            <p>Proteção e durabilidade superiores</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Award size={32} />
            </div>
            <h3>Atóxicas</h3>
            <p>Pigmentos nanoestruturados seguros</p>
          </div>
        </div>
      </section>

      <section className="technology-section">
        <div className="tech-content">
          <div className="tech-text">
            <span className="section-label">Nossa Tecnologia</span>
            <h2>Nanopartículas que Transformam</h2>
            <p className="tech-intro">
              A CENANOINK domina a produção de nanopartículas funcionais que conferem propriedades
              únicas às tintas. Nossa tecnologia está em fase de certificação e representa o futuro
              dos revestimentos inteligentes.
            </p>
            
            <div className="tech-features">
              <div className="tech-feature">
                <Zap className="feature-icon" size={24} />
                <div>
                  <h4>Modificação de Cor</h4>
                  <p>Pigmentos nanoestruturados com cores vibrantes e duradouras</p>
                </div>
              </div>
              <div className="tech-feature">
                <Shield className="feature-icon" size={24} />
                <div>
                  <h4>Proteção Múltipla</h4>
                  <p>Ação antimicrobiana, antiincrustante e anticorrosiva</p>
                </div>
              </div>
              <div className="tech-feature">
                <Sparkles className="feature-icon" size={24} />
                <div>
                  <h4>Propriedades Especiais</h4>
                  <p>Proteção UV, condução elétrica e sensores inteligentes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-image">
            <div className="tech-card">
              <h3>🎨 Linha Exclusiva</h3>
              <p>Pigmentos nanoestruturados sustentáveis e atóxicos desenvolvidos especialmente pela CENANOINK</p>
            </div>
            <div className="tech-card">
              <h3>🔬 Processo Próprio</h3>
              <p>Fabricação eco-friendly com reaproveitamento de resíduos sólidos</p>
            </div>
            <div className="tech-card">
              <h3>✅ Em Certificação</h3>
              <p>Produtos em fase de testes adicionais para garantir máxima qualidade</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="Imagens">
        <div className="services-header">
          <span className="section-label">Nossas Soluções</span>
          <h2>Aplicações das Nanopartículas</h2>
          <p>Desenvolvemos aditivos nanoestruturados para diversas aplicações industriais</p>
        </div>
        <PopularServicesCarousel />
      </section>

      <section className="applications-section">
        <div className="applications-content">
          <span className="section-label">Aplicações</span>
          <h2>Onde Nossas Tintas Fazem a Diferença</h2>
          
          <div className="applications-grid">
            <div className="application-card">
              <div className="application-number">01</div>
              <h3>Indústria Naval</h3>
              <p>Proteção antiincrustante e anticorrosiva para embarcações em ambientes marinhos agressivos</p>
            </div>
            
            <div className="application-card">
              <div className="application-number">02</div>
              <h3>Construção Civil</h3>
              <p>Revestimentos com proteção UV, ação antimicrobiana e sensores de pH do solo</p>
            </div>
            
            <div className="application-card">
              <div className="application-number">03</div>
              <h3>Setor Automotivo</h3>
              <p>Tintas com alta resistência a riscos, proteção anticorrosiva e propriedades condutoras</p>
            </div>
            
            <div className="application-card">
              <div className="application-number">04</div>
              <h3>Áreas Hospitalares</h3>
              <p>Revestimentos antimicrobianos que inibem proliferação de bactérias e vírus</p>
            </div>
            
            <div className="application-card">
              <div className="application-number">05</div>
              <h3>Eletrônica</h3>
              <p>Tintas condutoras de eletricidade para aplicações em circuitos e componentes</p>
            </div>
            
            <div className="application-card">
              <div className="application-number">06</div>
              <h3>Agricultura</h3>
              <p>Sensores inteligentes de corrosão e pH para monitoramento de solo e estruturas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <span className="section-label">Por que CENANOINK</span>
          <h2>Compromisso com Inovação e Sustentabilidade</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🔬</div>
              <h3>Pesquisa Avançada</h3>
              <p>Desenvolvimento próprio de nanopartículas com propriedades únicas e diferenciadas</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌱</div>
              <h3>Sustentabilidade</h3>
              <p>Processo eco-friendly com reaproveitamento de resíduos sólidos industriais</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Alta Performance</h3>
              <p>Tintas com durabilidade superior e propriedades inteligentes comprovadas</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Consultoria Especializada</h3>
              <p>Suporte técnico completo para desenvolvimento de soluções personalizadas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto para Inovar com Nanotecnologia?</h2>
          <p>Entre em contato e descubra como nossas tintas inteligentes podem transformar seu projeto</p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
  Solicitar Consultoria
  <ChevronRight size={20} />
</button>

        </div>
      </section>

      <section id="Fale conosco" className="contact-section">
        <Contato />
      </section>

      <Footer />
    </div>
  );
}

export default Home;