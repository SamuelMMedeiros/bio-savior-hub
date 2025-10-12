import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { toast } from "sonner";
import { Lock, Upload, MapPin, Tag, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres").max(1000),
  tags: z.string().min(1, "Adicione pelo menos uma tag"),
  location: z.string().min(2, "Localização é obrigatória").max(200),
  image: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const Admin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      location: "",
      image: "",
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demo - in production, use proper backend authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Autenticado com sucesso!");
    } else {
      toast.error("Senha incorreta");
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Animal data:", {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
    });

    toast.success("Animal cadastrado com sucesso!", {
      description: "O animal foi adicionado à galeria.",
    });

    form.reset();
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md border-0 shadow-lg animate-scale-in">
          <CardHeader className="text-center">
            <div className="inline-flex p-4 bg-accent-light rounded-2xl mx-auto mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-heading-m">Painel Administrativo</CardTitle>
            <CardDescription>
              Esta área é restrita. Por favor, faça login para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="text-body-medium font-medium mb-2 block">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-primary text-primary-foreground"
                size="lg"
              >
                Entrar
              </Button>
              <p className="text-body-small text-muted-foreground text-center">
                Demo: Use a senha "admin123"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-heading-l text-primary mb-4">Painel Administrativo</h1>
            <p className="text-body-large text-muted-foreground">
              Cadastre novos animais na galeria
            </p>
          </div>

          <Alert className="mb-8 border-accent bg-accent-light/30 animate-slide-up">
            <AlertCircle className="h-5 w-5 text-accent" />
            <AlertDescription className="text-body-medium">
              <strong className="font-semibold">Nota:</strong> Para funcionalidade completa de cadastro e armazenamento, 
              conecte o Lovable Cloud para adicionar banco de dados e autenticação real.
            </AlertDescription>
          </Alert>

          <Card className="border-0 shadow-lg animate-scale-in">
            <CardHeader>
              <CardTitle className="text-heading-s">Cadastrar Novo Animal</CardTitle>
              <CardDescription>
                Preencha as informações sobre o animal peçonhento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-medium font-medium">
                          Nome do Animal
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Jararaca"
                            {...field}
                            className="rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-medium font-medium">
                          Descrição Detalhada
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva as características, habitat e comportamento..."
                            className="min-h-[150px] rounded-xl resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Mínimo de 20 caracteres
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-medium font-medium">
                          URL da Imagem
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="https://exemplo.com/imagem.jpg"
                              {...field}
                              className="pl-10 rounded-xl"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Cole a URL de uma imagem do animal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-medium font-medium">
                          Tags
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="Serpente, Peçonhento, Mata Atlântica"
                              {...field}
                              className="pl-10 rounded-xl"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Separe as tags por vírgula
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-medium font-medium">
                          Localização Geográfica
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="Ex: Sudeste e Sul do Brasil"
                              {...field}
                              className="pl-10 rounded-xl"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Região onde o animal pode ser encontrado
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                      size="lg"
                    >
                      {isSubmitting ? "Cadastrando..." : "Cadastrar Animal"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      className="rounded-full"
                      size="lg"
                    >
                      Limpar
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="ghost"
              className="rounded-full"
            >
              <Lock className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
