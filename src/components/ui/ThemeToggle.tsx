import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Alternar tema"
            title="Alternar tema"
        >
            {theme === "light" ? (
                <Moon
                    size={22}
                    className="text-purple-400 transition-all duration-300"
                />
            ) : (
                <Sun
                    size={22}
                    className="text-yellon-500 transition-all duration-300"
                />
            )}
        </button>
    );
}
