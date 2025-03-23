import pool from "./config/db.js";

// Verificar si las variables de entorno se están cargando correctamente
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error.message);
  } finally {
    process.exit();
  }
})();
