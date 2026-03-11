import { Routes, Route } from "react-router-dom"; 
import ScrollToTop from "../ScrollToTop";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Galeria from "../../pages/Galeria";
import Admin from "../../pages/Admin";
import Curiosities from "../../pages/Curiosities";
import NotFound from "../../pages/NotFound";

const OriginalSite = () => (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-[#0f0b1f] dark:to-[#1b1133] dark:text-white transition-colors duration-700">
        <ScrollToTop />
        <Navbar /> {/* Este é o Navbar ANTIGO do site original */}
        <main className="flex-1">
            <Routes>
                {/* Rotas Internas do Site Antigo */}
                <Route path="/" element={<Home />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/curiosities" element={<Curiosities />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
        <Footer /> {/* Footer ANTIGO */}
    </div>
);

export default OriginalSite;
