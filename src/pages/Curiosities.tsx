import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-forest.jpg";
import { ShieldCheck, Lightbulb, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const curiosities = [
    {
        icon: Lightbulb,
        title: "Importância dos Morcegos",
        text: "Os morcegos são essenciais para o equilíbrio ecológico, atuando no controle de insetos, polinização e dispersão de sementes. Sem eles, ecossistemas inteiros seriam afetados.",
    },
    {
        icon: ShieldCheck,
        title: "Espécies em Patos de Minas",
        text: "Em Patos de Minas, existem diversas espécies de morcegos, sendo a maioria inofensiva ao ser humano. Eles preferem áreas arborizadas e abrigos tranquilos.",
    },
    {
        icon: AlertTriangle,
        title: "Cuidados e Prevenção",
        text: "Caso encontre um morcego em casa, evite o contato direto. Proteja-se com luvas, feche o local e acione a vigilância sanitária ou um profissional capacitado.",
    },
];

export default function Curiosidades() {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section
                className="relative h-[400px] flex items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-hero" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 animate-fade-in">
                    <h1 className="text-heading-xl md:text-6xl lg:text-7xl text-white font-bold mb-4">
                        Curiosidades
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                        Conheça fatos interessantes e aprenda como conviver de
                        forma segura com esses animais incríveis.
                    </p>
                </div>
            </section>

            {/* Fatos Interessantes */}
            <section className="container mx-auto px-4 sm:px-6 py-20 animate-fade-in">
                <h2 className="text-heading-l text-center text-foreground mb-12">
                    Fatos Interessantes
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {curiosities.map(({ icon: Icon, title, text }, index) => (
                        <Card
                            key={index}
                            className="card-nature text-center transition-transform duration-300 hover:-translate-y-2 animate-scale-in"
                        >
                            <CardContent className="pt-8 pb-10">
                                <div className="flex justify-center mb-6">
                                    <Icon className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-heading-s font-semibold text-foreground mb-3">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {text}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Conteúdo */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 max-w-5xl">
                    {/* Introdução */}
                    <Card className="shadow-md border border-border">
                        <CardContent className="p-6 sm:p-8 space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                🦇 Mitos e Fatos: Por Que os Morcegos Urbanos
                                Não Atacam Humanos
                            </h2>
                            <p className="text-muted-foreground">
                                A maior parte do medo em relação aos morcegos
                                deriva de mitos associados aos
                                morcegos-vampiros. O fato é que as espécies
                                encontradas nas áreas urbanas de Patos de Minas
                                não têm sangue humano como parte de sua dieta —
                                e são essenciais para o equilíbrio ambiental da
                                cidade.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Fato 1 */}
                    <Card className="shadow-md border border-border">
                        <CardContent className="p-6 sm:p-8 space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                🦇 Fato 1: Eles Comem Insetos e Frutas, Não
                                Sangue Humano
                            </h2>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>
                                    Das 1.400 espécies de morcegos no mundo,
                                    apenas três são hematófagas (vampiros), e
                                    elas se alimentam primariamente do sangue de
                                    animais domésticos e silvestres, como o
                                    gado.
                                </li>
                                <li>
                                    As espécies mais comuns em Patos de Minas,
                                    como <i>Eumops glaucinus</i> e{" "}
                                    <i>Nyctinomops laticaudatus</i>, são
                                    insetívoras, consumindo milhares de insetos
                                    por noite.
                                </li>
                                <li>
                                    Outras espécies, como{" "}
                                    <i>Artibeus lituratus</i> e{" "}
                                    <i>Glossophaga soricina</i>, são frugívoras
                                    e nectarívoras, ajudando na dispersão de
                                    sementes e polinização de plantas.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Fato 2 */}
                    <Card className="shadow-md border border-border">
                        <CardContent className="p-6 sm:p-8 space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                🦇 Fato 2: O Morcego Não Ataca — Ele Busca
                                Abrigo ou Está Doente
                            </h2>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>
                                    Morcegos são animais noturnos e naturalmente
                                    evitam o contato com humanos.
                                </li>
                                <li>
                                    A presença deles em áreas urbanas ocorre
                                    principalmente pela expansão urbana e
                                    degradação dos habitats naturais, o que os
                                    força a procurar abrigo em forros e
                                    edifícios.
                                </li>
                                <li>
                                    Um morcego encontrado caído no chão ou
                                    voando durante o dia é quase sempre um
                                    animal doente, desorientado ou ferido.
                                    Nessas condições, ele pode morder por
                                    defesa, não por ataque.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Fato 3 */}
                    <Card className="shadow-md border border-border">
                        <CardContent className="p-6 sm:p-8 space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                🦇 Fato 3: O Medo Atrapalha a Saúde Pública
                            </h2>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>
                                    O desconhecimento sobre a biologia dos
                                    morcegos gera medo e atitudes inadequadas,
                                    como a expulsão de colônias e o uso de
                                    métodos letais.
                                </li>
                                <li>
                                    A agressão a esses animais prejudica a
                                    conservação ambiental e dificulta o controle
                                    da raiva.
                                </li>
                                <li>
                                    A forma mais segura de lidar com um morcego
                                    é não tocá-lo e acionar o CCZ para que ele
                                    seja analisado quanto ao vírus da raiva.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Orientações e Prevenção */}
                    <Card className="shadow-md border border-border">
                        <CardContent className="p-6 sm:p-8 space-y-6">
                            <h2 className="text-2xl font-semibold text-foreground">
                                🧭 Orientações e Prevenção
                            </h2>

                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    🛑 Emergência: Fui Mordido por um Morcego. O
                                    Que Fazer?
                                </h3>
                                <p className="text-muted-foreground">
                                    A raiva é uma doença letal, transmitida
                                    geralmente por mordedura, arranhadura ou
                                    lambedura em mucosas por um animal
                                    infectado. Em caso de acidente envolvendo
                                    morcegos, siga imediatamente os passos
                                    abaixo:
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold text-primary">
                                    Passo 1: Lave a Ferida Imediatamente
                                </h4>
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">
                                        Ação:
                                    </strong>{" "}
                                    Lave o local da mordida, arranhadura ou
                                    contato abundantemente com água e sabão, por
                                    vários minutos.
                                    <br />
                                    <strong className="text-foreground">
                                        Importância:
                                    </strong>{" "}
                                    Essa é a medida de primeiro socorro mais
                                    importante, pois ajuda a inativar o vírus.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold text-primary">
                                    Passo 2: Procure o Serviço de Saúde
                                </h4>
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">
                                        Ação:
                                    </strong>{" "}
                                    Dirija-se imediatamente à Unidade de Saúde
                                    ou Pronto Atendimento mais próximo.
                                    <br />
                                    <strong className="text-foreground">
                                        Importância:
                                    </strong>{" "}
                                    Mesmo que o ferimento pareça pequeno, um
                                    profissional deve avaliar a necessidade de
                                    Profilaxia Antirrábica Pós-Exposição. A
                                    raiva é quase sempre letal em humanos não
                                    tratados.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold text-primary">
                                    Passo 3: Acione o Centro de Controle de
                                    Zoonoses (CCZ)
                                </h4>
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">
                                        Ação:
                                    </strong>{" "}
                                    Ligue para o CCZ de Patos de Minas:{" "}
                                    <strong className="text-foreground">
                                        (34) 3822-9624
                                    </strong>
                                    .
                                    <br />
                                    <strong className="text-foreground">
                                        Importância:
                                    </strong>{" "}
                                    O morcego (vivo ou morto) envolvido no
                                    acidente deve ser recolhido e encaminhado
                                    para análise laboratorial, o que orienta as
                                    ações de saúde pública.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold text-primary">
                                    ⚠️ Lembre-se: Nunca Toque no Animal!
                                </h4>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                    <li>
                                        Se o morcego estiver caído no chão, vivo
                                        ou morto, nunca o toque diretamente.
                                    </li>
                                    <li>
                                        Isole o local e evite que cães ou gatos
                                        tenham contato com o animal.
                                    </li>
                                    <li>
                                        Não pratique o extermínio — entregue o
                                        morcego às autoridades competentes.
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Orientações Finais */}
            <section className="relative py-20 bg-muted/30 border-t border-border animate-fade-in">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-heading-l text-foreground mb-6">
                        Como Agir Corretamente
                    </h2>
                    <p className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-10">
                        Ao entender o papel dos morcegos e como agir diante de
                        encontros com eles, contribuímos para a preservação e
                        segurança de todos.
                    </p>

                    <Link to="/contato">
                        <div className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-medium shadow-md hover:bg-primary/90 transition-colors">
                            Saiba mais com as autoridades locais
                        </div>
                    </Link>
                </div>
            </section>

            <ScrollToTopButton />
        </div>
    );
}
