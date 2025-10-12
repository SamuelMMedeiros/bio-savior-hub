import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-8">
          <h1 className="text-[120px] font-bold text-primary leading-none mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
        </div>
        
        <h2 className="text-heading-m text-primary mb-4">Página Não Encontrada</h2>
        <p className="text-body-large text-muted-foreground mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-full"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Página Anterior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
