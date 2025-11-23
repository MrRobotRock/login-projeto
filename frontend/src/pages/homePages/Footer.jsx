import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <p className="footer-title">Contato</p>
        <p>Email: contato@empresa.com</p>
        <p>Telefone: (11) 99999-9999</p>
      </div>

      <div className="footer-section">
        <p className="footer-title">Institucional</p>
        <a href="/sobre" className="footer-link">Sobre Nós</a>
        <a href="/politicas" className="footer-link">Políticas da Empresa</a>
        <a href="/termos" className="footer-link">Termos & Condições</a>
      </div>

      <div className="footer-section">
        <p className="footer-title">Siga-nos</p>
        <div className="footer-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon fontSize="large" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon fontSize="large" />
          </a>
        </div>
      </div>
    </footer>
  );
}
