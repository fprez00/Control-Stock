import React from "react";

const Product = ({
  prod,
  isEdited,
  editProd,
  onDelete,
  onEdit,
  onCancel,
  onChangeField,
  onSave,
}) => {
  // ¿Estamos editando justo este producto?
  const isThisBeingEdited = isEdited && editProd && editProd.id === prod.id;

  if (isThisBeingEdited) {
    // Modo edición: mostramos inputs para (nombre, precio, stock, etc.)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 border p-2 mb-2">
        <div>
          <label className="font-semibold block">Nombre:</label>
          <input
            className="border p-1 w-full"
            value={editProd.nombre}
            onChange={(e) => onChangeField("nombre", e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold block">Precio:</label>
          <input
            className="border p-1 w-full"
            type="number"
            value={editProd.precio}
            onChange={(e) => onChangeField("precio", e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold block">Stock:</label>
          <input
            className="border p-1 w-full"
            type="number"
            value={editProd.stock}
            onChange={(e) => onChangeField("stock", e.target.value)}
          />
        </div>
        <div>
          <p className="font-semibold">
            Creado por: <span className="font-normal">{prod.created_by}</span>
          </p>
          <p className="font-semibold">
            Activo: <span className="font-normal">{prod.is_active ? "Sí" : "No"}</span>
          </p>
        </div>

        {/* Botones Guardar/Cancelar */}
        <div className="flex gap-2 sm:col-span-2 md:col-span-3 lg:col-span-5">
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Guardar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  } else {
    // Modo normal: mostramos <p> con la info + Editar/Eliminar
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 border p-2 mb-2"
      >
        <p className="font-semibold">Nombre: <span className="font-normal">{prod.nombre}</span></p>
        <p className="font-semibold">Precio: <span className="font-normal">{prod.precio}</span></p>
        <p className="font-semibold">Stock: <span className="font-normal">{prod.stock}</span></p>
        <p className="font-semibold">Creado por: <span className="font-normal">{prod.created_by}</span></p>
        <p className="font-semibold">Activo: <span className="font-normal">{prod.is_active ? "Sí" : "No"}</span></p>

        <div className="flex gap-2 sm:col-span-2 md:col-span-3 lg:col-span-5">
          <button
            onClick={() => onEdit(prod)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(prod)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  }
};

export default Product;
