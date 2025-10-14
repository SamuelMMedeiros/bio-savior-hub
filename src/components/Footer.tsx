import { Leaf, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-heading-xs font-bold">BioStats</span>
            </div>
            <p className="text-body-small opacity-90">
              Educação científica sobre morcegos para promover práticas ambientalmente responsáveis.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-heading-xs font-bold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-body-small opacity-90 hover:opacity-100 hover:text-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-body-small opacity-90 hover:opacity-100 hover:text-accent transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/outros-animais" className="text-body-small opacity-90 hover:opacity-100 hover:text-accent transition-colors">
                  Outros Animais
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-body-small opacity-90 hover:opacity-100 hover:text-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-heading-xs font-bold">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@biostats.com"
                className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-body-small opacity-75">
            © {currentYear} BioStats. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
