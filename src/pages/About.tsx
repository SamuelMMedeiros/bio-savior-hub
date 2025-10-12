import { Target, Eye, Heart, Users, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-forest.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Promover a educação científica sobre animais peçonhentos, incentivando práticas ambientalmente responsáveis e a conservação da biodiversidade.",
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser referência em informações científicas sobre animais peçonhentos no Brasil, contribuindo para a harmonia entre humanos e natureza.",
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Ciência, respeito pela natureza, educação acessível, conservação ambiental e responsabilidade socioambiental.",
    },
  ];

  const timeline = [
    { year: "2020", event: "Fundação do BioStats com foco em educação ambiental" },
    { year: "2021", event: "Lançamento da plataforma digital e galeria de animais" },
    { year: "2022", event: "Parceria com instituições de pesquisa científica" },
    { year: "2023", event: "Expansão do banco de dados com mais de 100 espécies catalogadas" },
    { year: "2024", event: "Reconhecimento como referência em educação sobre animais peçonhentos" },
  ];

  const team = [
    {
      name: "Dr. Carlos Silva",
      role: "Biólogo e Diretor Científico",
      description: "Especialista em herpetologia com mais de 15 anos de experiência.",
    },
    {
      name: "Dra. Ana Santos",
      role: "Bióloga e Coordenadora de Pesquisa",
      description: "Doutora em ecologia com foco em conservação de espécies.",
    },
    {
      name: "Prof. João Oliveira",
      role: "Educador Ambiental",
      description: "Responsável por programas educacionais e divulgação científica.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 animate-fade-in">
          <h1 className="text-heading-xl text-white font-bold mb-4">Sobre o BioStats</h1>
          <p className="text-body-large text-white/90 max-w-2xl mx-auto">
            Ciência, educação e conservação da biodiversidade brasileira
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-accent-light rounded-2xl mb-4">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-heading-s text-primary mb-3">{value.title}</h3>
                  <p className="text-body-medium text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-l text-primary mb-4">Nossa Equipe</h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Profissionais dedicados à ciência e educação ambiental
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-heading-xs mb-2">{member.name}</h3>
                  <p className="text-body-medium text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-body-small text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-l text-primary mb-4">Nossa História</h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Uma jornada de crescimento e dedicação à educação ambiental
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="inline-flex p-3 bg-accent-light rounded-xl">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-heading-xs text-primary mt-2 font-bold">{item.year}</p>
                </div>
                <Card className="flex-1 border-0 shadow-md">
                  <CardContent className="p-6">
                    <p className="text-body-medium">{item.event}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-heading-l mb-4">Junte-se a Nós</h2>
          <p className="text-body-large mb-8 max-w-2xl mx-auto opacity-90">
            Faça parte da nossa missão de promover a educação ambiental e a conservação da biodiversidade brasileira
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading-l text-primary mb-4">O Que Dizem Sobre Nós</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Eduarda",
                role: "Professora de Biologia",
                text: "Material excepcional para uso em sala de aula. Os alunos adoram!",
              },
              {
                name: "Pedro Henrique",
                role: "Pesquisador",
                text: "Informações científicas precisas e acessíveis. Recomendo muito!",
              },
              {
                name: "Júlia Costa",
                role: "Estudante de Ciências",
                text: "O BioStats me ajudou muito no meu TCC sobre biodiversidade.",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-md animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <p className="text-body-medium mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="text-body-medium font-semibold">{testimonial.name}</p>
                    <p className="text-body-small text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
