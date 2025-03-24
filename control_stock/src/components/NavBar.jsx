import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el token
    localStorage.removeItem("token");
    // Redirigir al login
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        ¡Bienvenido, {userName}!
      </div>
      <div className="space-x-4">
        {/* Opción para ver la lista de productos */}
        <Link
          to="/products"
          className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
        >
          Ver Productos
        </Link>

        {/* Opción para agregar producto */}
        <Link
          to="/add-product"
          className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
        >
          Agregar Producto
        </Link>

        {/* Botón de Logout */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
