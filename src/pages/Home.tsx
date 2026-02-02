import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
    Shield,
    BookOpen,
    Users,
    ArrowRight,
    MapPin,
    Tag,
    Search,
    BrainIcon,
    Leaf,
    StarIcon,
    BookCheck,
    ShieldCheck,
    Zap
} from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import AttackDashboard from "@/components/AttackDashboard";
import AttackMap from "@/components/AttackMap";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// Assets (Certifique-se de que os caminhos estão corretos no seu projeto)
import heroImage from "@/assets/hero-forest.jpg";
import artibeusImage from "@/assets/artibeus-lituratus.jfif";
import eumopsImage from "@/assets/Eumops glaucinus.jpeg";
import laticaudatusImage from "@/assets/Nyctinomops laticaudatus.jpeg";
import bannerImage from "@/assets/banner.jpeg";

const FEATURE_MAP: {
    [key: string]: { title: string; icon: React.ElementType; color: string };
} = {
    feeding: { title: "Alimentação", icon: Leaf, color: "text-primary" },
    body: { title: "Características", icon: Search, color: "text-secondary" },
    behavior: { title: "Comportamento", icon: BrainIcon, color: "text-primary" },
    importance: { title: "Importância", icon: StarIcon, color: "text-yellow-600" },
    curiosities: { title: "Curiosidades", icon: BookOpen, color: "text-secondary" },
    attacks: { title: "Casos registrados", icon: BookCheck, color: "text-orange-600" },
};

const Home = () => {
    const featuredAnimals = [
        {
            id: 1,
            name: "Morcego-de-cauda-livre",
            cientificName: "Eumops glaucinus",
            image: eumopsImage,
            description: "Morcego insetívoro conhecido por seu voo alto e rápido. Controla populações de insetos.",
            descriptionFull: {
                feeding: "Insetos",
                body: ["11-13 cm", "Cauda longa exposta", "Orelhas grandes"],
                behavior: ["Voa alto", "Evita contato humano"],
                importance: "Controle natural de mosquitos",
                curiosities: ["Comum em cidades brasileiras"],
                attacks: "20 casos registrados",
            },
            tags: ["Insetívoro", "Urbano"],
            location: "MG",
        },
        // Adicione os outros animais conforme necessário
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section Imersiva */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
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
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary rounded-full px-8 text-lg">
                                Saiba Mais
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Monitoramento em Tempo Real (Dashboard + Mapa) */}
            <section className="py-20 bg-background">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-3xl font-bold text-secondary mb-4">Monitoramento em Tempo Real</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-grafite">
                            Acompanhe as estatísticas de acidentes e avistamentos na nossa região para se manter seguro.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="p-4 shadow-xl border-primary/10 hover-lift">
                            <AttackDashboard />
                        </Card>
                        <Card className="p-0 overflow-hidden shadow-xl border-secondary/10 h-[500px] hover-lift">
                            <AttackMap />
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Interativas */}
            <section className="py-20 bg-secondary/5">
                <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center p-6 hover-lift animate-scale-in">
                        <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
                            <Zap className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Identificação Instantânea</h3>
                        <p className="text-sm text-muted-foreground text-grafite">Envie uma foto e nossa IA identifica o animal e o nível de risco em segundos.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 hover-lift animate-scale-in" style={{ animationDelay: "0.1s" }}>
                        <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Prevenção Educativa</h3>
                        <p className="text-sm text-muted-foreground text-grafite">Aprenda protocolos de segurança baseados em dados científicos e reais.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 hover-lift animate-scale-in" style={{ animationDelay: "0.2s" }}>
                        <div className="bg-primary/20 p-4 rounded-2xl mb-4 text-primary">
                            <Users className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Comunidade Engajada</h3>
                        <p className="text-sm text-muted-foreground text-grafite">Conectamos cidadãos e pesquisadores para a conservação local.</p>
                    </div>
                </div>
            </section>

            {/* Galeria em Destaque com Modais */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-primary mb-12">Espécies em Destaque</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {featuredAnimals.map((animal) => (
                            <Dialog key={animal.id}>
                                <DialogTrigger asChild>
                                    <div className="cursor-pointer">
                                        <AnimalCard {...animal} />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-border">
                                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${animal.image})` }} />
                                    <div className="p-6">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl italic text-primary">{animal.cientificName}</DialogTitle>
                                            <DialogDescription className="text-secondary font-bold">{animal.name}</DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4 space-y-4">
                                            <p className="text-grafite text-sm">{animal.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {animal.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </section>

            <ScrollToTopButton />
        </div>
    );
};

export default Home;