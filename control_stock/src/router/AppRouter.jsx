import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";         // Nuestro Layout
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta "raíz" que usará <Layout /> como contenedor */}
          {/* Rutas públicas */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
            <Route path="products" element={<ProductList />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
