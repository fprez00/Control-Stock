import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        console.error("Error en login");
        return;
      }
      const data = await response.json();
  
      // Guardar token (por ejemplo, en localStorage)
      localStorage.setItem("token", data.token);
  
      // Redirigir al Home
      navigate("/");
    } catch (error) {
      console.error("Error al hacer login:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-3">
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
          Ingresar
        </button>

        {/* Enlace a la página de registro */}
        <div className="text-center">
          <Link to="/register" className="text-blue-500 underline">
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
