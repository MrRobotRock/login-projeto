import Navbar from "./Navbar.jsx";
import Contato from "./contato.jsx"; 
import Footer from "./Footer.jsx";
import PopularServicesCarousel from "./PopularServicesCarousel";
import "./Home.css";

function App() {
  return (
    <div>
      <Navbar />

      <main className="hero-section" id="Início">
        <div className="hero-text">
          <h1>Frase curta</h1>
          <h2>Breve descrição da empresa</h2>
        </div>
        <div className="hero-image">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcidadeecia.com.br%2Fwp-content%2Fuploads%2F2023%2F08%2Floja-de-tintas.jpeg&f=1&nofb=1&ipt=05c947fbab335b9a5346710e3d1a98acdbe8dfd1a840353f9115c447a94fbdb5"
            alt="Imagem para representar a empresa"
          />
        </div>
      </main>

      <PopularServicesCarousel />
    
      <div id="Fale conosco">
        <Contato />
      </div>

      <Footer />
    </div>
  );
}

export default App;
