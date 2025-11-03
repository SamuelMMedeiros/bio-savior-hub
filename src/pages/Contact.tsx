import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import heroImage from "@/assets/hero-forest.jpg";

const Contact = () => {
    const contactInfo = [
        {
            icon: Mail,
            title: "E-mail",
            content: "contato@biostats.com",
            link: "mailto:contato@biostats.com",
        },
        {
            icon: Phone,
            title: "Telefone",
            content: "+55 (34) 3822-9624",
            link: "tel:+553438229624",
        },
        {
            icon: MapPin,
            title: "Localização",
            content: "Patos de Minas/MG, Brasil",
        },
        {
            icon: Clock,
            title: "Horário",
            content: "Seg-Sex: 7h às 18h",
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
                        Entre em Contato
                    </h1>
                    <p className="text-body-large text-white/90 max-w-2xl mx-auto">
                        Estamos aqui para responder suas dúvidas sobre animais
                        peçonhentos
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-slide-up">
                            <h2 className="text-heading-m text-primary mb-6">
                                Envie uma Mensagem
                            </h2>
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-heading-m text-primary mb-6">
                                Informações de Contato
                            </h2>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <Card
                                        key={index}
                                        className="border-0 shadow-md hover:shadow-lg transition-all hover-lift"
                                    >
                                        <CardContent className="p-6 flex items-start gap-4">
                                            <div className="flex-shrink-0 p-3 bg-accent-light rounded-xl">
                                                <info.icon className="w-6 h-6 text-accent" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-body-medium font-semibold mb-1">
                                                    {info.title}
                                                </h3>
                                                {info.link ? (
                                                    <a
                                                        href={info.link}
                                                        className="text-body-medium text-muted-foreground hover:text-accent transition-colors"
                                                    >
                                                        {info.content}
                                                    </a>
                                                ) : (
                                                    <p className="text-body-medium text-muted-foreground">
                                                        {info.content}
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <Card className="border-0 shadow-md bg-accent-light/30 mt-8">
                                <CardContent className="p-6">
                                    <h3 className="text-heading-xs text-primary mb-3">
                                        Precisa de Ajuda Imediata?
                                    </h3>
                                    <p className="text-body-medium text-muted-foreground mb-4">
                                        Em caso de acidente com animal
                                        peçonhento, procure atendimento médico
                                        imediatamente. Ligue para:
                                    </p>
                                    <div className="bg-background p-4 rounded-xl">
                                        <p className="text-heading-s text-destructive font-bold text-center">
                                            SAMU: 192
                                        </p>
                                        <p className="text-body-small text-center text-muted-foreground mt-1">
                                            Emergências médicas 24h
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 animate-fade-in">
                        <h2 className="text-heading-m text-primary mb-4">
                            Nossa Localização
                        </h2>
                        <p className="text-body-large text-muted-foreground">
                            Encontre-nos em Patos de Minas-MG, Brasil
                        </p>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] animate-scale-in">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1710670943517!2d-46.51469519419557!3d-18.566324856989578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae8b336d9068c1%3A0xce40462b1302bffb!2sCentro%20de%20Controle%20de%20Zoonoses!5e0!3m2!1spt-BR!2sbr!4v1760409470345!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de localização"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-primary-foreground">
                <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
                    <h2 className="text-heading-l mb-4">Dúvidas Frequentes?</h2>
                    <p className="text-body-large mb-8 max-w-2xl mx-auto opacity-90">
                        Confira nossa seção de perguntas frequentes na página de
                        Outros Animais para encontrar respostas rápidas
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Contact;
