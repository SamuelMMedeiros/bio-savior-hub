import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Controle de scroll para efeito de transparência
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Garante que o menu mobile feche ao clicar em um link
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Links baseados nas rotas definidas no seu App.tsx
  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/about" },
    { name: "Galeria", path: "/galeria" },
    { name: "Curiosidades", path: "/curiosidades" },
    { name: "Contato", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md py-2 border-border" 
          : "bg-transparent py-4 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo BioXplore */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Bio</span>
              <span className="text-secondary">Xplore</span>
            </span>
          </Link>

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  location.pathname === link.path 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <ThemeToggle />
              <Link to="/admin">
                <Button size="sm" className="bg-primary hover:bg-accent text-white rounded-full px-5">
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Toggle Mobile e Tema */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Aberto */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 bg-background md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-lg font-semibold transition-colors",
                location.pathname === link.path ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="w-full">
            <Button className="w-full bg-primary mt-4">
              Painel Administrativo
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;