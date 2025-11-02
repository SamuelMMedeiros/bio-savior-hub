import { MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnimalCardProps {
    name: string;
    image: string;
    description: string;
    tags: string[];
    location?: string;
}

const AnimalCard = ({
    name,
    image,
    description,
    tags,
    location,
}: AnimalCardProps) => {
    return (
        <div className="card-nature overflow-hidden group cursor-pointer hover-lift">
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
};

export default AnimalCard;
