// src/pages/Home.tsx

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
const FEATURE_MAP = {
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
};

const Home = () => {
    // CORREÇÃO: Dados completos para todos os cards
    const featuredAnimals = [
        {
            id: 1,
            name: "Morcego-de-cauda-livre",
            cientificName: "Eumops glaucinus", // NOVO
            image: desmodusImage,
            description:
                "Morcego insetívoro conhecido por seu voo alto e rápido.",
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
            },
            tags: ["Insetívoro", "Urbano", "Voo rápido"],
            location: "Áreas urbanas e periurbanas de MG",
        },
        {
            id: 2,
            name: "Morcego-das-frutas",
            cientificName: "Artibeus lituratus", // NOVO
            image: artibeusImage,
            description:
                "Morcego frugívoro de grande porte, ajuda na dispersão de sementes.",
            descriptionFull: {
                feeding: "Frutas e néctar",
                body: [
                    "Grande porte (15-20 cm)",
                    "Pelagem marrom-escura",
                    "Manchas brancas na face",
                ],
                behavior: [
                    "Noturno",
                    "Vive em árvores e telhados",
                    "Tolerante a ruído",
                ],
                importance:
                    "Dispersor de sementes de frutas nativas e polinizador",
                curiosities: [
                    "Causa prejuízos em pomares se houver superpopulação",
                ],
            },
            tags: ["Frugívoro", "Urbano", "Polinizador"],
            location: "Regiões urbanas, praças, quintais e telhados",
        },
        {
            id: 3,
            name: "Morcego-beija-flor",
            cientificName: "Glossophaga soricina", // NOVO
            image: soricinaImage,
            description:
                "Pequeno morcego que se alimenta de néctar e frutas. Polinizador importante.",
            descriptionFull: {
                feeding: "Néctar e pólen",
                body: [
                    "Pequeno porte (5-7 cm)",
                    "Focinho longo",
                    "Língua longa e fina",
                ],
                behavior: [
                    "Ativo em jardins",
                    "Voa rápido e paira como beija-flor",
                ],
                importance:
                    "Polinizador de plantas com flores noturnas, como o pequi",
                curiosities: [
                    "Seu nome vem da semelhança com o beija-flor ao se alimentar",
                ],
            },
            tags: ["Nectárivoro", "Urbano", "Pequeno", "Polinizador"],
            location: "Áreas urbanas, jardins e quintais. Comum em MG",
        },
    ];

    const services = [
        // ... (seção services permanece a mesma)
    ];

    return (
        <div className="min-h-screen">
            {/* ... Hero Section e About Section permanecem as mesmas ... */}

            {/* Featured Animals Gallery - MODIFICADO para incluir o Modal com detalhes completos */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* ... Títulos da seção permanecem os mesmos ... */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredAnimals.map((animal, index) => (
                            <div
                                key={animal.id}
                                className="animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
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
                                            <DialogHeader className="pt-4">
                                                {/* Título: Nome Científico */}
                                                <DialogTitle className="text-primary text-3xl font-bold italic">
                                                    {animal.cientificName ||
                                                        animal.name}
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

                                            {/* DETALHES COMPLETOS (descriptionFull) */}
                                            {animal.descriptionFull && (
                                                <div className="space-y-6 pt-4 border-t">
                                                    {Object.entries(
                                                        animal.descriptionFull
                                                    ).map(([key, value]) => {
                                                        // Ignora se não houver valor
                                                        if (!value) return null;

                                                        const feature =
                                                            FEATURE_MAP[
                                                                key as keyof typeof FEATURE_MAP
                                                            ];

                                                        return (
                                                            <div key={key}>
                                                                {/* Título da Seção (ex: Alimentação) */}
                                                                <h3
                                                                    className={`flex items-center gap-2 text-heading-xs font-semibold ${
                                                                        feature?.color ||
                                                                        "text-primary"
                                                                    } mb-2`}
                                                                >
                                                                    {feature?.icon && (
                                                                        <feature.icon className="w-5 h-5" />
                                                                    )}
                                                                    {feature?.title ||
                                                                        key
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            key.slice(
                                                                                1
                                                                            )}
                                                                </h3>

                                                                {/* Conteúdo da Seção */}
                                                                {Array.isArray(
                                                                    value
                                                                ) ? (
                                                                    // Se for um array, renderiza como lista (ul > li)
                                                                    <ul className="text-body-medium text-muted-foreground space-y-1 list-disc pl-5">
                                                                        {value.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="pl-1"
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
                                                                    <p className="text-body-medium text-muted-foreground ml-7">
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
                            </div>
                        ))}
                    </div>
                    {/* ... Restante do código da seção ... */}
                </div>
            </section>

            {/* ... CTA Section permanece a mesma ... */}
        </div>
    );
};

export default Home;
