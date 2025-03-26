import { useEffect, useState } from "react";
import Product from "./chilldrentComponents/Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);         // Lista de type_productos
  const [isEdited, setIsEdited] = useState(false);
  const [editProd, setEditProd] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchTypeProducts(); // Cargar también la lista de type_productos
  }, []);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
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

  // Obtener lista de type_productos
  const fetchTypeProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/type_products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("Error al obtener type_productos");
        return;
      }
      const data = await res.json();
      setTypes(data);  // Guardamos la lista de tipos en el state
    } catch (error) {
      console.error("Error al hacer fetch de type_productos:", error);
    }
  };

  // Eliminar lógicamente
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

  // Inicia modo edición
  const handleEdit = (prod) => {
    setIsEdited(true);
    setEditProd({ ...prod });
  };

  // Cancelar edición
  const handleCancel = () => {
    setIsEdited(false);
    setEditProd(null);
  };

  // Manejo de cambios de campo
  const handleChange = (field, value) => {
    setEditProd((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Guardar cambios
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
          type_product_id: editProd.type_product_id, // Importante para actualizar el tipo
        }),
      });

      if (!res.ok) {
        console.error("Error al actualizar producto");
        return;
      }
      console.log("Producto actualizado con éxito");
      setIsEdited(false);
      setEditProd(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // Función auxiliar para obtener el nombre del tipo según ID
  const getTypeName = (typeId) => {
    const found = types.find((t) => t.id === typeId);
    return found ? found.nombre : "Sin tipo";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
      {products.map((prod) =>
        prod.is_active ? (
          <Product
            key={prod.id}
            prod={prod}
            isEdited={isEdited}
            editProd={editProd}
            typeName={getTypeName(prod.type_product_id)} // Se lo pasamos
            typeList={types} // Lista completa para el <select>
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onChangeField={handleChange}
            onSave={handleSave}
          />
        ) : null
      )}
    </div>
  );
}
