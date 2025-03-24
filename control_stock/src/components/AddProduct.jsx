import { useState } from "react";

export default function AddProduct() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion, precio, stock }),
      });
      if (!response.ok) {
        console.error("Error al crear producto");
        return;
      }
      console.log("Producto creado con éxito");
      // Podrías limpiar el formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error en el servidor", error });
      }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            className="border p-2 w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <input
            className="border p-2 w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Precio</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar
        </button>
      </form>
    </div>
  );
}
