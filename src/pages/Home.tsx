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
} from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import AttackDashboard from "@/components/AttackDashboard";
import AttackMap from "@/components/AttackMap";

// Assets
import heroImage from "@/assets/hero-forest.jpg";
import artibeusImage from "@/assets/artibeus-lituratus.jfif";
import eumopsImage from "@/assets/Eumops glaucinus.jpeg";
import laticaudatusImage from "@/assets/Nyctinomops laticaudatus.jpeg";
import bannerImage from "@/assets/banner.jpeg";

const FEATURE_MAP: {
  [key: string]: { title: string; icon: React.ElementType; color: string };
} = {
  feeding: { title: "Alimentação", icon: Leaf, color: "text-green-600" },
  body: { title: "Características", icon: Search, color: "text-blue-600" },
  behavior: { title: "Comportamento", icon: BrainIcon, color: "text-purple-600" },
  importance: { title: "Importância", icon: StarIcon, color: "text-yellow-600" },
  curiosities: { title: "Curiosidades", icon: BookOpen, color: "text-indigo-600" },
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
    {
      id: 2,
      name: "Morcego-frutívoro-grande",
      cientificName: "Artibeus lituratus",
      image: artibeusImage,
      description: "Grande morcego comedor de frutos, importante dispersor de sementes em matas e cidades.",
      descriptionFull: {
        feeding: "Frutos, flores e folhas",
        body: ["Linhas faciais brancas", "Sem cauda externa", "60-90g"],
        behavior: ["Noturno", "Vive em grupos em árvores"],
        importance: "Reflorestamento natural",
        curiosities: ["Pode comer o próprio peso em frutos por noite"],
        attacks: "5 casos registrados",
      },
      tags: ["Frugívoro", "Polinizador"],
      location: "MG",
    },
    {
      id: 3,
      name: "Morcego-de-cauda-curta",
      cientificName: "Nyctinomops laticaudatus",
      image: laticaudatusImage,
      description: "Espécie insetívora que habita frequentemente telhados e vãos de edificações urbanas.",
      descriptionFull: {
        feeding: "Insetos voadores",
        body: ["Tamanho médio", "Orelhas unidas na base", "Pelagem marrom"],
        behavior: ["Colonial", "Rápido voador"],
        importance: "Controle de pragas agrícolas",
        curiosities: ["Pode formar colônias de milhares de indivíduos"],
        attacks: "12 casos registrados",
      },
      tags: ["Insetívoro", "Urbano"],
      location: "MG",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
            <Shield className="h-4 w-4 text-green-400" />
            <span>Monitoramento & Prevenção</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Ciência a Serviço da <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Segurança Pública
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Plataforma dedicada ao monitoramento de animais peçonhentos e educação preventiva para a população de Patos de Minas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-green-900/20 group"
            >
              Começar Exploração
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-full px-8 h-14 text-lg"
              >
                Conhecer o Projeto
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-background relative z-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Panorama de Dados</h2>
              <p className="text-muted-foreground text-lg">
                Visualização em tempo real das ocorrências e monitoramento de espécies em nossa região.
              </p>
            </div>
            <Link to="/galeria">
              <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                Ver galeria completa <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12">
              <AttackDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              <span>Geolocalização</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mapa de Ocorrências</h2>
            <p className="text-muted-foreground text-lg">
              Identifique as áreas com maior incidência de avistamentos e acidentes para redobrar a atenção.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[600px]">
            <AttackMap />
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-3xl font-bold whitespace-nowrap px-4">Espécies em Foco</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden bg-green-900 p-8 md:p-16 text-center"
            style={{
              backgroundImage: `linear-gradient(rgba(22, 101, 52, 0.9), rgba(22, 101, 52, 0