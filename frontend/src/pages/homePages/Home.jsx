import Navbar from "./Navbar.jsx";
import Contato from "./contato.jsx"; 
import Footer from "./Footer.jsx";
import PopularServicesCarousel from "./PopularServicesCarousel";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <main className="hero-section" id="Início">
        <div className="hero-text">
          <h1>Soluções em Tintas e Revestimentos</h1>
          <h2>Consultoria especializada para o seu projeto com qualidade e inovação</h2>
          <p className="hero-description">
            Oferecemos serviços de consultoria técnica, desenvolvimento de produtos 
            e soluções personalizadas para indústrias e profissionais do setor.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcidadeecia.com.br%2Fwp-content%2Fuploads%2F2023%2F08%2Floja-de-tintas.jpeg&f=1&nofb=1&ipt=05c947fbab335b9a5346710e3d1a98acdbe8dfd1a840353f9115c447a94fbdb5"
            alt="Loja de tintas profissional"
          />
        </div>
      </main>

      <section className="services-section" id="Imagens">
        <PopularServicesCarousel />
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Por que escolher nossa consultoria?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>Expertise Técnica</h3>
              <p>Equipe especializada com anos de experiência no setor</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔬</div>
              <h3>Inovação</h3>
              <p>Soluções personalizadas e tecnologias de ponta</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3>Qualidade</h3>
              <p>Compromisso com resultados de excelência</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Suporte</h3>
              <p>Acompanhamento completo em todas as etapas</p>
            </div>
          </div>
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