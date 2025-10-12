import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users, ArrowRight } from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import heroImage from "@/assets/hero-forest.jpg";
import jararacaImage from "@/assets/animal-jararaca.jpg";
import aranhaImage from "@/assets/animal-aranha.jpg";
import morcegoImage from "@/assets/animal-morcego.jpg";
import escorpiaoImage from "@/assets/animal-escorpiao.jpg";

const Home = () => {
  const featuredAnimals = [
    {
      id: 1,
      name: "Jararaca",
      image: jararacaImage,
      description: "Serpente peçonhenta comum na Mata Atlântica brasileira. Responsável pela maioria dos acidentes ofídicos no país.",
      tags: ["Serpente", "Peçonhento", "Mata Atlântica"],
      location: "Sudeste e Sul do Brasil",
    },
    {
      id: 2,
      name: "Aranha Marrom",
      image: aranhaImage,
      description: "Aracnídeo de hábitos noturnos, conhecido pelo padrão de violino em seu cefalotórax.",
      tags: ["Aracnídeo", "Urbano", "Noturno"],
      location: "Regiões urbanas",
    },
    {
      id: 3,
      name: "Morcego Vampiro",
      image: morcegoImage,
      description: "Mamífero voador essencial para o ecossistema. Importante polinizador e controlador de pragas.",
      tags: ["Mamífero", "Noturno", "Polinizador"],
      location: "América Latina",
    },
  ];

  const services = [
    {
      icon: Shield,
      title: "Informação Confiável",
      description: "Dados científicos verificados sobre animais peçonhentos e seus habitats.",
    },
    {
      icon: BookOpen,
      title: "Educação Ambiental",
      description: "Conteúdo educativo para promover práticas sustentáveis e conscientes.",
    },
    {
      icon: Users,
      title: "Comunidade Engajada",
      description: "Conectamos pessoas interessadas em conservação e biodiversidade.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 animate-fade-in">
          <h1 className="text-heading-xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
            Conheça os Animais<br />Peçonhentos do Brasil
          </h1>
          <p className="text-body-large md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Informações científicas confiáveis para promover a convivência harmoniosa com a natureza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/outros-animais">
              <Button className="btn-hero">
                Explorar Galeria
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button className="btn-outline-hero">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-accent-light/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-heading-l text-primary mb-6">
                Nossa Missão
              </h2>
              <p className="text-body-large text-muted-foreground mb-4">
                O BioStats é dedicado à educação científica sobre animais peçonhentos,
                incluindo morcegos, promovendo o respeito e a conservação da biodiversidade brasileira.
              </p>
              <p className="text-body-large text-muted-foreground">
                Acreditamos que o conhecimento é fundamental para a convivência harmoniosa
                entre humanos e a fauna nativa, contribuindo para práticas ambientalmente responsáveis.
              </p>
            </div>
            <div className="animate-scale-in">
              <img
                src={escorpiaoImage}
                alt="Escorpião"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-l text-primary mb-4">Nossos Serviços</h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Oferecemos informações científicas e educação ambiental de qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-nature p-8 text-center hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 bg-accent-light rounded-2xl mb-4">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-heading-xs mb-3">{service.title}</h3>
                <p className="text-body-medium text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-l text-primary mb-4">Galeria em Destaque</h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos animais peçonhentos mais importantes do Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAnimals.map((animal, index) => (
              <div
                key={animal.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimalCard {...animal} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/outros-animais">
              <Button size="lg" className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90">
                Ver Todos os Animais
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <h2 className="text-heading-l mb-4">Ficou com Alguma Dúvida?</h2>
          <p className="text-body-large mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato conosco para mais informações sobre animais peçonhentos
          </p>
          <Link to="/contato">
            <Button size="lg" variant="secondary" className="rounded-full">
              Enviar Mensagem
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
