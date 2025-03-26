import { useState, useEffect } from "react";

export default function AddProduct() {
  const [mode, setMode] = useState("product"); // "product" o "type_product"
  
  // Campos para producto
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [typeProductId, setTypeProductId] = useState(""); // para la FK type_product_id

  // Lista de type_productos
  const [typeProducts, setTypeProducts] = useState([]);

  // Campo para type_product
  const [typeName, setTypeName] = useState("");

  const token = localStorage.getItem("token");

  // Al montar: obtener la lista de type_products
  useEffect(() => {
    fetchTypeProducts();
  }, []);

  // 1. Función para cargar la lista de type_productos
  const fetchTypeProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/type_products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.error("Error al obtener type_products");
        return;
      }
      const data = await response.json();
      setTypeProducts(data);
    } catch (error) {
      console.error("Error al hacer fetch de type_products:", error);
    }
  };

  // 2. Función principal para crear producto o type_product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "product") {
        // Crear producto
        const response = await fetch("http://localhost:4000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            nombre, 
            descripcion, 
            precio, 
            stock,
            type_product_id: typeProductId !== "" ? parseInt(typeProductId) : null,
          }),
        });
        if (!response.ok) {
          console.error("Error al crear producto");
          return;
        }
        console.log("Producto creado correctamente");
        // Limpiar campos
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setStock("");
        setTypeProductId("");
      } else {
        // Crear type_product
        const response = await fetch("http://localhost:4000/api/type_products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre: typeName }),
        });
        if (!response.ok) {
          console.error("Error al crear type_product");
          return;
        }
        console.log("Type_product creado correctamente");
        // Limpiar
        setTypeName("");

        // 3. Volvemos a cargar la lista de typeProducts 
        // para que aparezca en el <select> sin recargar la página.
        fetchTypeProducts();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {mode === "product" ? "Agregar Producto" : "Agregar Tipo de Producto"}
      </h1>

      {/* Toggle para modo */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded mr-2 ${
            mode === "product" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setMode("product")}
        >
          Producto
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "type_product" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setMode("type_product")}
        >
          Type Product
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        {mode === "product" ? (
          <>
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

            {/* Select para type_product */}
            <div>
              <label className="block mb-1">Tipo de Producto</label>
              <select
                className="border p-2 w-full"
                value={typeProductId}
                onChange={(e) => setTypeProductId(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                {typeProducts
                  .filter((t) => t.is_active) // sólo activos
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {/* Modo: crear type_product */}
            <div>
              <label className="block mb-1">Nombre del tipo</label>
              <input
                className="border p-2 w-full"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
            </div>
          </>
        )}

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {mode === "product" ? "Agregar Producto" : "Agregar Type Product"}
        </button>
      </form>
    </div>
  );
}
