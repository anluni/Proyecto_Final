import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { FaLinkedin } from "react-icons/fa"; // ✅ IMPORTANTE
import "./App.css";

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
              </Routes>
            </main>

            {/* ✅ FOOTER CON LINKEDIN */}
            <footer className="py-4 mt-5 text-center text-secondary small">
              <p>
                © {new Date().getFullYear()} SRM Asesorías Económicas Financieras. Todos los derechos reservados.
              </p>

              <a 
                href="https://www.linkedin.com/in/sergio-rocha-marin-00393751/" 
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
