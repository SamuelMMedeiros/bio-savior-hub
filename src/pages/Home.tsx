import { ArrowRight, ShieldCheck, Zap, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AttackDashboard from "@/components/AttackDashboard";
import AttackMap from "@/components/AttackMap";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/src/assets/hero-forest.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            <span className="text-primary">Bio</span>
            <span className="text-white">Xplore</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
            Tecnologia e Ciência unidas para proteger a população e preservar a biodiversidade de Patos de Minas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-accent text-white rounded-full px-8 flex gap-2 text-lg">
              <Search className="h-5 w-5" /> Identificar com IA
            </Button>
            <Link to="/curiosities">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary rounded-full px-8 text-lg">
                Explorar Curiosidades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Dados e Mapa */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col mb-12 text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Monitoramento em Tempo Real</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acompanhe as estatísticas de acidentes e avistamentos na nossa região para se manter seguro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-4 shadow-xl border-primary/10">
              <AttackDashboard />
            </Card>
            <Card className="p-0 overflow-hidden shadow-xl border-secondary/10 h-[500px]">
              <AttackMap />
            </Card>
          </div>
        </div>
      </section>

      {/* Features de IA / Interatividade */}
      <section className="py-20 bg-secondary/5">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 hover-lift">
            <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Identificação Instantânea</h3>
            <p className="text-sm text-muted-foreground">Envie uma foto e nossa IA identifica o animal e o nível de risco em segundos.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 hover-lift">
            <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Prevenção Educativa</h3>
            <p className="text-sm text-muted-foreground">Aprenda protocolos de segurança baseados em dados científicos e reais.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 hover-lift">
            <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
              <ArrowRight className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Acesso Rápido</h3>
            <p className="text-sm text-muted-foreground">Encontre postos de saúde e números de emergência com apenas um clique.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;