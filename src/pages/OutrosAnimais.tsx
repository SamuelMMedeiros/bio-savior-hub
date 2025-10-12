import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimalCard from "@/components/AnimalCard";
import heroImage from "@/assets/hero-forest.jpg";
import jararacaImage from "@/assets/animal-jararaca.jpg";
import aranhaImage from "@/assets/animal-aranha.jpg";
import morcegoImage from "@/assets/animal-morcego.jpg";
import escorpiaoImage from "@/assets/animal-escorpiao.jpg";

const OutrosAnimais = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const animals = [
    {
      id: 1,
      name: "Jararaca",
      image: jararacaImage,
      description: "Serpente peçonhenta comum na Mata Atlântica brasileira. Responsável pela maioria dos acidentes ofídicos no país. Possui corpo robusto, cabeça triangular e coloração variável.",
      tags: ["Serpente", "Peçonhento", "Mata Atlântica"],
      location: "Sudeste e Sul do Brasil",
      coordinates: { lat: -23.5505, lng: -46.6333 },
    },
    {
      id: 2,
      name: "Aranha Marrom",
      image: aranhaImage,
      description: "Aracnídeo de hábitos noturnos, conhecido pelo padrão de violino em seu cefalotórax. Vive em ambientes urbanos e rurais, preferindo locais escuros e secos.",
      tags: ["Aracnídeo", "Urbano", "Noturno"],
      location: "Regiões urbanas",
      coordinates: { lat: -23.5505, lng: -46.6333 },
    },
    {
      id: 3,
      name: "Morcego Vampiro",
      image: morcegoImage,
      description: "Mamífero voador essencial para o ecossistema. Importante polinizador e controlador de pragas. Possui hábitos noturnos e vive em colônias em cavernas.",
      tags: ["Mamífero", "Noturno", "Polinizador"],
      location: "América Latina",
      coordinates: { lat: -15.7801, lng: -47.9292 },
    },
    {
      id: 4,
      name: "Escorpião Amarelo",
      image: escorpiaoImage,
      description: "Aracnídeo de coloração amarelada, comum em ambientes urbanos. É considerado o mais perigoso do Brasil devido à sua toxina potente. Possui hábitos noturnos.",
      tags: ["Aracnídeo", "Urbano", "Peçonhento"],
      location: "Todo o Brasil",
      coordinates: { lat: -15.7801, lng: -47.9292 },
    },
  ];

  const allTags = Array.from(new Set(animals.flatMap((animal) => animal.tags)));

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || animal.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const faqs = [
    {
      question: "O que fazer em caso de acidente com animal peçonhento?",
      answer: "Procure atendimento médico imediatamente. Ligue para o SAMU (192) e não tente fazer curativos caseiros. Mantenha a calma e, se possível, fotografe o animal para identificação.",
    },
    {
      question: "Como prevenir acidentes com animais peçonhentos?",
      answer: "Use calçados fechados em áreas de risco, verifique roupas e calçados antes de usar, mantenha jardins limpos, vede frestas e buracos em paredes e mantenha ambientes organizados.",
    },
    {
      question: "Todos os morcegos são perigosos?",
      answer: "Não. A maioria dos morcegos são inofensivos e desempenham papel importante no ecossistema. Apenas algumas espécies se alimentam de sangue, e raramente atacam humanos.",
    },
    {
      question: "Como identificar uma serpente peçonhenta?",
      answer: "Serpentes peçonhentas geralmente têm cabeça triangular, fosseta loreal (entre olho e narina), pupilas em fenda vertical e comportamento defensivo. Em caso de dúvida, mantenha distância.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[350px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 animate-fade-in">
          <h1 className="text-heading-xl text-white font-bold mb-4">Galeria de Animais</h1>
          <p className="text-body-large text-white/90 max-w-2xl mx-auto">
            Conheça a diversidade de animais peçonhentos do Brasil
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative animate-slide-up">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar animais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 rounded-full text-body-medium"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
              <Badge
                onClick={() => setSelectedTag(null)}
                className={`cursor-pointer rounded-full px-4 py-2 text-body-small transition-all ${
                  !selectedTag
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent-light"
                }`}
              >
                Todos
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-body-small transition-all ${
                    selectedTag === tag
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent-light"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animals Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map((animal, index) => (
              <div
                key={animal.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimalCard {...animal} />
              </div>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-body-large text-muted-foreground">
                Nenhum animal encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-heading-m text-primary mb-4">Distribuição Geográfica</h2>
            <p className="text-body-large text-muted-foreground">
              Veja onde esses animais podem ser encontrados
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-[500px] animate-scale-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15776526.879219813!2d-55.491477!3d-14.235004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrasil!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de distribuição de animais"
            />
          </div>
        </div>
      </section>

      {/* Conservation CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-heading-l mb-4">Apoie a Conservação</h2>
          <p className="text-body-large mb-8 max-w-2xl mx-auto opacity-90">
            A preservação dos habitats naturais é fundamental para a sobrevivência dessas espécies. 
            Juntos, podemos fazer a diferença na conservação da biodiversidade brasileira.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-m text-primary mb-4">Perguntas Frequentes</h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre animais peçonhentos
            </p>
          </div>

          <div className="max-w-3xl mx-auto animate-slide-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0 shadow-md rounded-xl overflow-hidden bg-card"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50">
                    <span className="text-body-medium font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-body-medium text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutrosAnimais;
