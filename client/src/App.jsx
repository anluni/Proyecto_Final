import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { FaLinkedin } from "react-icons/fa"; // ✅ IMPORTANTE
import "./App.css";
import Mision from "./pages/Mision";
import Vision from "./pages/Vision";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <div className="app-container">
            <Navigation />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mision" element={<Mision />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/catalogo" element={<Catalogo />} />
              </Routes>
            </main>

            {/* ✅ FOOTER CON LINKEDIN */}
            <footer className="py-4 mt-5 text-center text-secondary small">
              <p>
                © {new Date().getFullYear()} SRM Tu tienda Tecnológica. Todos los derechos reservados.
              </p>

              <a 
                href="https://www.linkedin.com/in/andrea-luna-58173852/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#0A66C2", fontSize: "28px" }}
              >
                <FaLinkedin />
              </a>
            </footer>

          </div>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
