import { useState } from "react";
import {
    BookOpen,
    MapPin,
    Tag,
    SearchIcon,
    BrainIcon,
    Leaf,
    StarIcon,
    BookCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    // Componentes do Dialog (Modal)
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import AnimalCard from "@/components/AnimalCard";
import heroImage from "@/assets/hero-forest.jpg";
import glossoophagaImage from "@/assets/glossophaga-soricina.jfif";
import molossusImage from "@/assets/Molossus molossus.jpeg";
import macrotisImage from "@/assets/Nyctinomops macrotis.jpeg";
import peropterysImage from "@/assets/Peropteryx macrotis.jpeg";
import { AttackChart } from "@/components/AttackChart";
import { ATTACK_DATA, AttackData } from "@/data/attackData";

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

const OutrosAnimais = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const animals = [
        // 1. Molossus molossus (Morcego-de-cauda-grossa) - ATUALIZADO
        {
            id: 1,
            name: "Morcego-de-cauda-grossa",
            cientificName: "Molossus molossus",
            image: molossusImage,
            description:
                "Morcego urbano muito comum, conhecido por ser um dos morcegos mais rápidos em voo e por sua dieta insetívora.",
            descriptionFull: {
                feeding:
                    "Carnívoro, alimentando-se unicamente de insetos (mosquitos e pernilongos)",
                body: [
                    "Porte pequeno (cerca de 8 cm) e peso de 10 a 30 gramas",
                    "Coloração marrom-escura, quase negra, e cauda livre (grossa)",
                    "Membros anteriores adaptados em formato de asa membranosa",
                ],
                behavior: [
                    "Hábitos noturnos e gregários, formando colônias grandes",
                    "Sua atividade inicia-se ao entardecer, com revoadas saindo dos abrigos",
                    "Os mais rápidos em voo da família Molossidae",
                ],
                importance:
                    "Colabora para o controle de insetos e pragas urbanas",
                curiosities: [
                    "Sua adaptação ao meio urbano é facilitada pela iluminação pública que atrai insetos",
                    "Pode abrigar-se em forros de casas, ocos de árvores e vãos de edificações",
                ],
                attacks: "2 casos registrados",
            },
            tags: ["Insetívoro", "Urbano", "Voo rápido"],
            location:
                "Todas as Américas, desde os EUA até o Uruguai, comum em áreas urbanas",
        },
        // 2. Nyctinomops macrotis (Morcego-de-orelha-grande)
        {
            id: 2,
            name: "Morcego-de-orelha-grande",
            cientificName: "Nyctinomops macrotis",
            image: macrotisImage, // Usando imagem placeholder
            description:
                "O maior morcego de seu gênero, conhecido por suas asas largas e voo extremamente rápido.",
            descriptionFull: {
                feeding:
                    "Insetívoro (dieta presumida, com base na morfologia da asa)",
                body: [
                    "O maior integrante do gênero Nyctinomops (cerca de 20,6 g)",
                    "Envergadura de 41 a 43 cm",
                    "Pelo brilhante e cor variável (marrom pálido a enegrecido)",
                    "Possui orelhas grandes, característica que deu nome à espécie",
                ],
                behavior: [
                    "Com base na morfologia da asa, possui voo rápido (pode exceder 40 km/h)",
                    "Estilo de vida terrestre e comportamento sazonal migratório",
                    "Visto em elevações de até 2.600 metros",
                ],
                importance:
                    "Controle de insetos em grandes altitudes e áreas abertas",
                curiosities: [
                    "Sua grande extensão geográfica faz com que seja avaliado como 'Pouco Preocupante' (LC) pela IUCN",
                    "O holótipo (espécime tipo) foi coletado em Cuba",
                ],
                attacks: "1 caso registrado",
            },
            tags: ["Insetívoro", "Migratório", "Voo Rápido"],
            location:
                "América do Norte, Central e do Sul (México, Brasil, EUA, Argentina, etc.)",
        },
        // 3. Glossophaga soricina (Morcego-beija-flor)
        {
            id: 3,
            name: "Morcego-beija-flor",
            cientificName: "Glossophaga soricina",
            image: glossoophagaImage, // Usando imagem placeholder
            description:
                "Pequeno morcego nectarívoro, fundamental para a polinização, conhecido por seu voo pairado.",
            descriptionFull: {
                feeding: "Néctar e pólen",
                body: [
                    "Pequeno porte (antebraço de 31 a 38 mm); fêmeas maiores que os machos",
                    "Focinho alongado, língua comprida e extensível, com papilas para coletar néctar",
                    "Possui folha nasal triangular (família Phyllostomidae)",
                ],
                behavior: [
                    "Realiza voo pairado (semelhante ao beija-flor)",
                    "Pode ter grandes colônias em ambiente urbano (1.000 a 2.000 indivíduos)",
                    "Apresenta mais de um pico reprodutivo por ano (poliestria bimodal)",
                ],
                importance:
                    "Polinizador essencial de diversas espécies de plantas, incluindo o pequi",
                curiosities: [
                    "O nome é devido à capacidade de voar e se alimentar de forma semelhante ao beija-flor",
                    "Adaptações que lidam com o alto nível de glicemia da dieta",
                ],
                attacks: "1 caso registrado",
            },
            tags: ["Nectarívoro", "Polinizador", "Urbano"],
            location: "Amplamente distribuído na região Neotropical",
        },
        // 4. Peropteryx macrotis (Morcego-de-orelha-pequena)
        {
            id: 4,
            name: "Morcego-de-orelha-pequena",
            cientificName: "Peropteryx macrotis",
            image: peropterysImage,
            description:
                "Morcego insetívoro conhecido por seu focinho longo e por ter um saco glandular exclusivo na asa.",
            descriptionFull: {
                feeding: "Insetívoro",
                body: [
                    "Menor morcego do gênero *Peropteryx*",
                    "Focinho longo e sem pelos",
                    "Possui um saco glandular exclusivo na membrana da asa, em frente aos braços",
                ],
                behavior: [
                    "Vive em pequenas colônias",
                    "Abriga-se em cavidades de troncos, cavernas e fendas de rochas",
                    "Reprodução ocorre ao longo do ano, com um filhote por gestação",
                ],
                importance: "Controle de insetos",
                curiosities: [
                    "A gestação dura entre 4 e 4,5 meses",
                    "O filhote é gestado no corno esquerdo do útero bicorno da mãe",
                ],
                attacks: "1 caso registrado",
            },
            tags: ["Insetívoro", "Cavernícola", "Social"],
            location:
                "América Central e metade norte da América do Sul, abaixo de 1.000m",
        },
    ];

    const allTags = Array.from(
        new Set(animals.flatMap((animal) => animal.tags))
    );

    const filteredAnimals = animals.filter((animal) => {
        const matchesSearch =
            animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    <h1 className="text-heading-xl text-white font-bold mb-4">
                        Galeria de Animais
                    </h1>
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
                            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredAnimals.map((animal, index) => (
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
                                                ).map(([key, value], idx) => {
                                                    // Ignora se não houver valor
                                                    if (!value) return null;

                                                    const feature =
                                                        FEATURE_MAP[key];
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
                                                                {feature.title}
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
                                                                    {value}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        {/* Localização e Tags - Reorganizados para o final */}
                                        {animal.location && (
                                            <div className="flex items-center gap-2 text-body-medium text-muted-foreground border-t pt-4">
                                                <MapPin className="w-5 h-5 text-accent" />
                                                <span className="font-semibold">
                                                    Localização:
                                                </span>
                                                <span>{animal.location}</span>
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
                                                Para mais informações e manejo,
                                                entre em contato com o CCZ
                                                local.
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {/* FIM DA IMPLEMENTAÇÃO DO MODAL */}
                        </div>
                    ))}
                </div>
            </section>

            {/* Attack Chart Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 animate-fade-in">
                        <h2 className="text-heading-m text-primary mb-4">
                            Casos de Ataques por Bairro
                        </h2>
                        <p className="text-body-large text-muted-foreground">
                            Dados registrados de ocorrências em diferentes
                            bairros em Patos de Minas/ MG entre os anos de 2021
                            e 2025.
                        </p>
                    </div>

                    <div className="bg-card rounded-2xl shadow-lg p-6 animate-scale-in">
                        <AttackChart data={ATTACK_DATA} />
                    </div>
                </div>
            </section>

            {/* Interactive Map */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 animate-fade-in">
                        <h2 className="text-heading-m text-primary mb-4">
                            Distribuição Geográfica
                        </h2>
                        <p className="text-body-large text-muted-foreground">
                            Veja onde esses animais podem ser encontrados
                        </p>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-lg h-[500px] animate-scale-in">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.174562724508!2d-46.515188725985794!3d-18.566167197290277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae8b336d9068c1%3A0xce40462b1302bffb!2sCentro%20de%20Controle%20de%20Zoonoses!5e0!3m2!1spt-BR!2sbr!4v1762138346175!5m2!1spt-BR!2sbr"
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
                        A preservação dos habitats naturais é fundamental para a
                        sobrevivência dessas espécies. Juntos, podemos fazer a
                        diferença na conservação da biodiversidade brasileira.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-heading-m text-primary mb-4">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                            Tire suas dúvidas sobre animais peçonhentos
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto animate-slide-up">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-0 shadow-md rounded-xl overflow-hidden bg-card"
                                >
                                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50">
                                        <span className="text-body-medium font-semibold">
                                            {faq.question}
                                        </span>
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
