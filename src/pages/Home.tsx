import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
    ShieldCheck,
    Users,
    Search,
    Zap,
    Leaf
} from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
// IMPORTANTE: Importações nomeadas com chaves {} para AttackDashboard e AttackMap
import { AttackDashboard } from "@/components/AttackDashboard";
import { AttackMap } from "@/components/AttackMap";
import { Card } from "@/components/ui/card";

const Home = () => {
    // Dados simplificados para evitar erro de imagem não encontrada
    const featuredAnimals = [
        {
            id: 1,
            name: "Morcego-de-cauda-livre",
            cientificName: "Eumops glaucinus",
            image: "/placeholder.svg", // Usando o placeholder seguro do seu projeto
            description: "Morcego insetívoro essencial para o controle de pragas urbanas em Patos de Minas.",
            tags: ["Insetívoro", "Urbano"],
            location: "MG",
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Hero Section - Cores BioXplore */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-secondary">
                <div className="absolute inset-0 z-0 opacity-40 bg-[url('/src/assets/hero-forest.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background/90" />

                <div className="container relative z-10 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        <span className="text-primary">Bio</span>Xplore
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                        Ciência e tecnologia na prevenção de acidentes com animais peçonhentos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-primary hover:bg-accent text-white rounded-full px-8">
                            <Search className="mr-2 h-5 w-5" /> Identificar Animal
                        </Button>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-secondary rounded-full px-8">
                                Conhecer Projeto
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dashboard e Mapa - Estrutura Segura */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-secondary">Estatísticas</h2>
                        <Card className="p-4 border-primary/20 bg-card">
                            <AttackDashboard />
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-secondary">Mapa</h2>
                        <Card className="p-0 overflow-hidden h-[400px] border-secondary/20">
                            <AttackMap />
                        </Card>
                    </div>
                </div>
            </section>

            {/* Destaques IA */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-card rounded-xl border border-border">
                        <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">Identificação IA</h3>
                        <p className="text-muted-foreground text-sm">Reconhecimento rápido de espécies através de fotos.</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-xl border border-border">
                        <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">Segurança</h3>
                        <p className="text-muted-foreground text-sm">Protocolos baseados em dados reais de Patos de Minas.</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-xl border border-border">
                        <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">Comunidade</h3>
                        <p className="text-muted-foreground text-sm">Sua participação ajuda no mapeamento da biodiversidade.</p>
                    </div>
                </div>
            </section>

            {/* Galeria Simples */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Fauna Regional</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredAnimals.map((animal) => (
                        <div key={animal.id} className="hover:scale-105 transition-transform">
                            <AnimalCard {...animal} />
                        </div>
                    ))}
                </div>
            </section>

            <ScrollToTopButton />
        </div>
    );
};

export default Home;