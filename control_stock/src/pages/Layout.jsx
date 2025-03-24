import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import jwt_decode from "jwt-decode";

export default function Layout() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserName(decoded.username || "Usuario");
      } catch (error) {
        console.error("Error al decodificar token:", error);
        setUserName("");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar userName={userName} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
