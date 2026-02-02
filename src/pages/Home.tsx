import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
    Shield,
    BookOpen,
    Users,
    Search,
    BrainIcon,
    Leaf,
    StarIcon,
    BookCheck,
    ShieldCheck,
    Zap
} from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
// CORREÇÃO: Importações nomeadas com chaves {} para alinhar com a exportação dos componentes
import { AttackDashboard } from "@/components/AttackDashboard";
import { AttackMap } from "@/components/AttackMap";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// Assets - Verificados de acordo com a estrutura do seu projeto
import heroImage from "@/assets/hero-forest.jpg";
import eumopsImage from "@/assets/Eumops glaucinus.jpeg";

const Home = () => {
    // Lista simplificada para garantir a renderização inicial
    const featuredAnimals = [
        {
            id: 1,
            name: "Morcego-de-cauda-livre",
            cientificName: "Eumops glaucinus",
            image: eumopsImage,
            description: "Morcego insetívoro conhecido por seu voo alto e rápido. Ajuda no controle natural de pragas urbanas.",
            tags: ["Insetívoro", "Urbano"],
            location: "MG",
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        <span className="text-primary">Bio</span>Xplore
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Monitoramento e educação para a convivência segura com a fauna silvestre em Patos de Minas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-primary hover:bg-accent rounded-full px-8">
                            <Search className="mr-2 h-5 w-5" /> Identificar Animal
                        </Button>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black rounded-full px-8">
                                Conhecer Projeto
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Monitoramento */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-secondary">Estatísticas Locais</h2>
                        <Card className="p-4 border-primary/20">
                            <AttackDashboard />
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-secondary">Mapa de Ocorrências</h2>
                        <Card className="p-0 overflow-hidden h-[400px] border-secondary/20">
                            <AttackMap />
                        </Card>
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">IA de Identificação</h3>
                        <p className="text-muted-foreground">Tecnologia para reconhecimento rápido de espécies de risco.</p>
                    </div>
                    <div className="text-center p-6">
                        <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">Protocolos Oficiais</h3>
                        <p className="text-muted-foreground">Orientações baseadas em diretrizes de saúde pública.</p>
                    </div>
                    <div className="text-center p-6">
                        <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-xl mb-2">Ciência Cidadã</h3>
                        <p className="text-muted-foreground">Sua participação ajuda a mapear a biodiversidade local.</p>
                    </div>
                </div>
            </section>

            {/* Espécies em Destaque */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Fauna em Foco</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredAnimals.map((animal) => (
                        <Dialog key={animal.id}>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer transition-transform hover:scale-105">
                                    <AnimalCard {...animal} />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="bg-card">
                                <DialogHeader>
                                    <DialogTitle className="text-primary italic">{animal.cientificName}</DialogTitle>
                                    <DialogDescription className="text-secondary font-semibold">
                                        {animal.name}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-2 text-grafite">
                                    <p>{animal.description}</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </section>

            <ScrollToTopButton />
        </div>
    );
};

export default Home;