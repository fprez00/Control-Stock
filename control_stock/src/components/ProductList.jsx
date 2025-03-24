import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error("Error al obtener productos");
          return;
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
      {products.map((prod) => (
        <div key={prod.id} className="border p-2 mb-2">
          <p>Nombre: {prod.nombre}</p>
          <p>Precio: {prod.precio}</p>
          <p>Stock: {prod.stock}</p>
        </div>
      ))}
    </div>
  );
}
