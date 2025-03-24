import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
// Renombramos "decode" para evitar confusiones:
import jwt_decode from "jwt-decode";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Revisar si hay un token en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setUserName(decoded.username || "Usuario");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar userName={userName} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Página de Inicio</h1>
        {/* Aquí podrías mostrar la lista de productos, etc. */}
        <p>Selecciona una opción en la barra de navegación para continuar.</p>
      </div>
    </div>
  );
}
