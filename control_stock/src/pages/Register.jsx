import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Campos de ejemplo
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          nombre,
        }),
      });
      if (!response.ok) {
        // Manejar error
        console.error("Error en el registro");
        return;
      }
      // Registro exitoso => redirigir al login
      navigate("/login");
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Registro</h2>

        <div className="mb-3">
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Registrarse
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 underline">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
