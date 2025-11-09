import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Send } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
    email: z.string().email("E-mail inválido").max(255),
    message: z
        .string()
        .min(10, "Mensagem deve ter pelo menos 10 caracteres")
        .max(1000),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/.netlify/functions/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Mensagem enviada com sucesso!", {
                    description:
                        "Agradecemos o contato. Você receberá uma resposta em breve.",
                });
                form.reset();
            } else {
                toast.error("Falha ao enviar mensagem", {
                    description:
                        "Tente novamente mais tarde ou envie um e-mail direto.",
                });
            }
        } catch (error) {
            console.error("Erro ao enviar:", error);
            toast.error("Erro inesperado ao enviar a mensagem.");
        }

        setIsSubmitting(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-body-medium font-medium">
                                Nome
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Seu nome completo"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-body-medium font-medium">
                                E-mail
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="seu@email.com"
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
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-body-medium font-medium">
                                Mensagem
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Escreva sua mensagem aqui..."
                                    className="min-h-[150px] rounded-xl resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground"
                    size="lg"
                >
                    {isSubmitting ? (
                        "Enviando..."
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensagem
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ContactForm;
