import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Register from '../pages/Register';
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta Home (si quieres que sea pública, quítale PrivateRoute) */}
        <Route path="/" element={<Home />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
