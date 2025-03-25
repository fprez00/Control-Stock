import { useEffect, useState } from "react";
import Product from "./chilldrentComponents/Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isEdited, setIsEdited] = useState(false); 
  const [editProd, setEditProd] = useState(null); // aquí guardamos el producto en edición
  const token = localStorage.getItem("token");

  // Cargar la lista de productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener productos del backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error("Error al obtener productos");
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al hacer fetch de productos:", error);
    }
  };

  // Función para eliminar lógicamente (onDelete)
  const handleDelete = async (prod) => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${prod.id}/disable`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: false }),
      });

      if (!res.ok) {
        console.error("Error al eliminar producto");
        return;
      }
      console.log("Producto eliminado (lógicamente)");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para iniciar el modo edición en UN producto
  const handleEdit = (prod) => {
    setIsEdited(true);
    // Clonamos el producto a editar (para manipularlo sin cambiar la lista original)
    setEditProd({ ...prod });
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setIsEdited(false);
    setEditProd(null);
  };

  // Función que maneja cambio de valor en los inputs (nombre, precio, stock, etc.)
  const handleChange = (field, value) => {
    // Actualizamos el campo en editProd
    setEditProd((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Función para guardar cambios (petición al backend)
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${editProd.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: editProd.nombre,
          precio: editProd.precio,
          stock: editProd.stock,
        }),
      });
  
      if (!res.ok) {
        console.error("Error al actualizar producto");
        return;
      }
      console.log("Producto actualizado con éxito");
  
      // Salir de modo edición
      setIsEdited(false);
      setEditProd(null);
  
      // Recargar la lista
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
      {products.map((prod) => (
        <Product
          key={prod.id}
          prod={prod}
          // estado global de si estamos editando algo
          isEdited={isEdited}
          // el producto que actualmente se está editando (o null)
          editProd={editProd}
          // funciones
          onDelete={handleDelete}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onChangeField={handleChange}
          onSave={handleSave}
        />
      ))}
    </div>
  );
}
