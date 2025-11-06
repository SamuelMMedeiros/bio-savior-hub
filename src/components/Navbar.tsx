import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Início", path: "/" },
        { name: "Sobre", path: "/sobre" },
        { name: "Galeria", path: "/galeria" },
        { name: "Contato", path: "/contato" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm shadow-md z-50 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="bg-gradient-primary p-2 rounded-lg">
                            <Leaf className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-heading-xs font-bold text-primary">
                            BioStats
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-body-medium font-medium transition-colors hover:text-primary ${
                                    isActive(link.path)
                                        ? "text-primary border-b-2 border-primary pb-1"
                                        : "text-foreground"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/admin">
                            <Button
                                variant="default"
                                size="sm"
                                className="rounded-full"
                            >
                                Admin
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-body-medium font-medium py-2 px-4 rounded-lg transition-colors ${
                                        isActive(link.path)
                                            ? "bg-accent text-accent-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/admin" onClick={() => setIsOpen(false)}>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="w-full rounded-full"
                                >
                                    Admin
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
