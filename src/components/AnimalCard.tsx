import * as React from "react";
import { MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Importa a função de utilidade para classes

// Define a interface estendendo as propriedades padrão de uma DIV
// Isso garante que ele aceite todas as props injetadas pelo DialogTrigger (incluindo 'ref' e 'onClick')
interface AnimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    image: string;
    description: string;
    tags: string[];
    location?: string;
    // A propriedade onClick foi removida daqui, pois já está em React.HTMLAttributes
}

// O componente deve usar React.forwardRef para repassar a referência do DialogTrigger
const AnimalCard = React.forwardRef<HTMLDivElement, AnimalCardProps>(
    (
        { name, image, description, tags, location, className, ...props },
        ref
    ) => {
        return (
            <div
                ref={ref} // CRUCIAL: Repassa a referência
                className={cn(
                    "card-nature overflow-hidden group cursor-pointer hover-lift",
                    className
                )}
                {...props} // CRUCIAL: Repassa as props injetadas pelo DialogTrigger (incluindo o evento de clique)
            >
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-heading-xs text-white font-bold">
                        {name}
                    </h3>
                </div>

                <div className="p-5 space-y-4">
                    <p className="text-body-medium text-muted-foreground line-clamp-2">
                        {description}
                    </p>

                    {location && (
                        <div className="flex items-center gap-2 text-body-small text-muted-foreground">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span>{location}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-accent" />
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-accent-light text-accent rounded-full text-body-small"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

AnimalCard.displayName = "AnimalCard";

export default AnimalCard;
