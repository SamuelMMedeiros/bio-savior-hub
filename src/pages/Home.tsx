import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Shield,
    BookOpen,
    Users,
    ArrowRight,
    MapPin,
    Tag,
    SearchIcon,
    BrainIcon,
    Leaf,
    StarIcon,
    BookCheck,
} from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import heroImage from "@/assets/hero-forest.jpg";
import soricinaImage from "@/assets/glossophaga-soricina.jfif";
import artibeusImage from "@/assets/artibeus-lituratus.jfif";
import desmodusImage from "@/assets/desmodus_rotundus.jfif";
import morcegoDesmodus from "@/assets/morcego_desmodus_rotundus.jfif";
import {
    // Componentes do Dialog (Modal)
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// Mapeamento de chaves para títulos amigáveis e ícones no modal
const FEATURE_MAP: {
    [key: string]: { title: string; icon: React.ElementType; color: string };
} = {
    feeding: { title: "Alimentação", icon: Leaf, color: "text-green-600" },
    body: {
        title: "Características do Corpo",
        icon: SearchIcon,
        color: "text-blue-600",
    },
    behavior: {
        title: "Comportamento",
        icon: BrainIcon,
        color: "text-purple-600",
    },
    importance: {
        title: "Importância Ecológica",
        icon: StarIcon,
        color: "text-yellow-600",
    },
    curiosities: {
        title: "Curiosidades",
        icon: BookOpen,
        color: "text-red-600",
    },
    attacks: {
        title: "Casos registrados",
        icon: BookCheck,
        color: "text-orange-600",
    },
};

const Home = () => {
    const featuredAnimals = [
        {
            id: 1,
            name: "Morcego-de-cauda-livre",
            cientificName: "Eumops glaucinus",
            image: desmodusImage,
            description:
                "Morcego insetívoro conhecido por seu voo alto e rápido. Controla populações de insetos.",
            descriptionFull: {
                feeding: "Insetos",
                body: [
                    "11-13 cm, corpo esguio",
                    "Pelagem marrom-acinzentada brilhante",
                    "Cauda longa totalmente exposta",
                    "Orelhas grandes unidas na base",
                    "Focinho fino e alongado",
                    "Asas estreitas (voo rápido e alto)",
                ],
                behavior: [
                    "Voa alto e raramente se aproxima do solo",
                    "Prefere locais altos e quentes (telhados, torres)",
                    "Evita contato com humanos",
                ],
                importance: "Controle natural de mosquitos e insetos",
                curiosities: [
                    "Uma das espécies mais comuns em cidades no Brasil",
                    "Pode formar grupos grandes em estruturas altas",
                    "Voa tão alto que às vezes é confundido com andorinhas ao entardecer",
                ],
                attacks: "20 casos registrados",
            },
            tags: ["Insetívoro", "Urbano", "Voo rápido"],
            location: "Áreas urbanas e periurbanas de MG",
        },
        {
            id: 2,
            name: "Morcego-das-frutas",
            cientificName: "Artibeus lituratus",
            image: artibeusImage,
            description:
                "Morcego frugívoro de grande porte, ajuda na dispersão de sementes e polinização.",
            descriptionFull: {
                feeding: "Frutas e néctar",
                body: [
                    "Grande porte (15-20 cm)",
                    "Pelagem marrom-escura",
                    "Manchas brancas na face",
                ],
                behavior: [
                    "Noturno e sociável",
                    "Vive em árvores e telhados",
                    "Tolerante a ruído",
                ],
                importance:
                    "Dispersor de sementes de frutas nativas e polinizador de grande alcance",
                curiosities: [
                    "É um dos morcegos mais adaptáveis ao ambiente urbano",
                    "Sua dieta variada contribui para a regeneração florestal",
                ],
                attacks: "20 casos registrados",
            },
            tags: ["Frugívoro", "Urbano", "Polinizador"],
            location: "Regiões urbanas, praças, quintais e telhados",
        },
        {
            id: 3,
            name: "Morcego-beija-flor",
            cientificName: "Glossophaga soricina",
            image: soricinaImage,
            description:
                "Pequeno morcego que se alimenta de néctar e frutas. Vital para a polinização de muitas plantas.",
            descriptionFull: {
                feeding: "Néctar e pólen",
                body: [
                    "Pequeno porte (5-7 cm)",
                    "Focinho longo",
                    "Língua longa e fina para alcançar o néctar",
                ],
                behavior: [
                    "Muito ativo em jardins",
                    "Voa rápido e paira no ar ao se alimentar, como um beija-flor",
                ],
                importance:
                    "Polinizador essencial de plantas com flores noturnas, incluindo algumas culturas agrícolas",
                curiosities: [
                    "Seu nome vem da semelhança com o beija-flor ao se alimentar",
                    "Capaz de consumir o seu peso em néctar por noite",
                ],
                attacks: "20 casos registrados",
            },
            tags: ["Nectárivoro", "Urbano", "Pequeno", "Polinizador"],
            location: "Áreas urbanas, jardins e quintais. Comum em MG",
        },
    ];

    const services = [
        {
            icon: Shield,
            title: "Informação Confiável",
            description:
                "Dados científicos verificados sobre animais peçonhentos e seus habitats.",
        },
        {
            icon: BookOpen,
            title: "Educação Ambiental",
            description:
                "Conteúdo educativo para promover práticas sustentáveis e conscientes.",
        },
        {
            icon: Users,
            title: "Comunidade Engajada",
            description:
                "Conectamos pessoas interessadas em conservação e biodiversidade.",
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
                        Conheça os Morcegos
                        <br />
                        Mais Comuns de Patos de Minas
                    </h1>
                    <p className="text-body-large md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Informações científicas confiáveis para promover a
                        convivência harmoniosa com a natureza
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
                                O BioStats é dedicado à educação científica
                                sobre morcegos, promovendo o respeito e a
                                conservação da biodiversidade brasileira.
                            </p>
                            <p className="text-body-large text-muted-foreground">
                                Acreditamos que o conhecimento é fundamental
                                para a convivência harmoniosa entre humanos e a
                                fauna nativa, contribuindo para práticas
                                ambientalmente responsáveis.
                            </p>
                        </div>
                        <div className="animate-scale-in">
                            <img
                                src={morcegoDesmodus}
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
                        <h2 className="text-heading-l text-primary mb-4">
                            Nossos Serviços
                        </h2>
                        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                            Oferecemos informações científicas e educação
                            ambiental de qualidade
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
                                <h3 className="text-heading-xs mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-body-medium text-muted-foreground">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Animals Gallery - MODIFICADO para incluir o Modal com detalhes completos */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-heading-l text-primary mb-4">
                            Galeria em Destaque
                        </h2>
                        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                            Conheça algumas das espécies de morcegos mais comuns
                            em Minas Gerais.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredAnimals.map((animal, index) => (
                            <div
                                key={animal.id}
                                className="animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* ESTRUTURA DO MODAL */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <AnimalCard {...animal} />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
                                        {/* Imagem do Animal no topo */}
                                        <div className="relative h-60 overflow-hidden">
                                            <img
                                                src={animal.image}
                                                alt={animal.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>

                                        <div className="p-6 pt-0 space-y-6">
                                            {" "}
                                            {/* Espaçamento principal padronizado */}
                                            <DialogHeader className="pt-4">
                                                {/* Título: Nome Científico (Itálico) */}
                                                <DialogTitle className="text-primary text-3xl font-bold italic">
                                                    {animal.cientificName}
                                                </DialogTitle>
                                                {/* Subtítulo: Nome Comum */}
                                                <DialogDescription className="text-heading-xs text-muted-foreground pt-1">
                                                    {animal.name}
                                                </DialogDescription>
                                            </DialogHeader>
                                            {/* Informação Resumida - descrição original do card */}
                                            <p className="text-body-large text-muted-foreground">
                                                {animal.description}
                                            </p>
                                            {/* DETALHES COMPLETOS (descriptionFull) - Bloco Destacado */}
                                            {animal.descriptionFull && (
                                                <div className="space-y-6 pt-4 border-t bg-muted/50 p-4 rounded-lg">
                                                    {Object.entries(
                                                        animal.descriptionFull
                                                    ).map(
                                                        ([key, value], idx) => {
                                                            // Ignora se não houver valor
                                                            if (!value)
                                                                return null;

                                                            const feature =
                                                                FEATURE_MAP[
                                                                    key
                                                                ];
                                                            const IconComponent =
                                                                feature.icon;

                                                            // Estilo para separar cada tópico
                                                            const isLastItem =
                                                                idx ===
                                                                Object.entries(
                                                                    animal.descriptionFull
                                                                ).length -
                                                                    1;

                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className={
                                                                        !isLastItem
                                                                            ? "pb-4 border-b border-muted"
                                                                            : "pb-0"
                                                                    }
                                                                >
                                                                    {/* Título da Seção (ex: Alimentação) - Maior Ênfase */}
                                                                    <h3
                                                                        className={`flex items-center gap-2 text-lg font-bold ${feature.color} mb-3`}
                                                                    >
                                                                        <IconComponent className="w-5 h-5" />
                                                                        {
                                                                            feature.title
                                                                        }
                                                                    </h3>

                                                                    {/* Conteúdo da Seção */}
                                                                    {Array.isArray(
                                                                        value
                                                                    ) ? (
                                                                        // Se for um array, renderiza como lista (ul > li)
                                                                        <ul className="text-body-medium text-muted-foreground space-y-1 list-disc pl-8">
                                                                            {value.map(
                                                                                (
                                                                                    item,
                                                                                    i
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>
                                                                    ) : (
                                                                        // Se for string simples, renderiza como parágrafo
                                                                        <p className="text-body-medium text-muted-foreground pl-7">
                                                                            {
                                                                                value
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                            {/* Localização e Tags - Reorganizados para o final */}
                                            {animal.location && (
                                                <div className="flex items-center gap-2 text-body-medium text-muted-foreground border-t pt-4">
                                                    <MapPin className="w-5 h-5 text-accent" />
                                                    <span className="font-semibold">
                                                        Localização:
                                                    </span>
                                                    <span>
                                                        {animal.location}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-start gap-2 pt-2 border-t flex-wrap">
                                                <Tag className="w-5 h-5 text-accent self-start mt-0.5" />
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="font-semibold text-body-medium text-muted-foreground mr-1">
                                                        Características:
                                                    </span>
                                                    {animal.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 bg-accent-light text-accent rounded-full text-body-small font-medium"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t">
                                                <p className="text-body-small text-muted-foreground">
                                                    Para mais informações e
                                                    manejo, entre em contato com
                                                    o CCZ local.
                                                </p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                {/* FIM DA IMPLEMENTAÇÃO DO MODAL */}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/outros-animais">
                            <Button
                                size="lg"
                                className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                            >
                                Veja mais
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-primary-foreground">
                <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
                    <h2 className="text-heading-l mb-4">
                        Ficou com Alguma Dúvida?
                    </h2>
                    <p className="text-body-large mb-8 max-w-2xl mx-auto opacity-90">
                        Entre em contato com o CCZ de Patos de Minas para mais
                        informações sobre animais peçonhentos
                    </p>
                    <Link to="/contato">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="rounded-full"
                        >
                            Enviar Mensagem
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
