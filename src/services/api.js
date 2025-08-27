// ===== CONFIGURACIÓN BASE PARA LA API =====
// Este archivo configura cómo React va a "hablar" con tu backend Spring Boot

// Importamos axios - es como un "cartero" que lleva mensajes entre React y tu API
import axios from "axios";

// Creamos la configuración base para todas las llamadas a tu API
const api = axios.create({
  // La dirección de tu backend Spring Boot
  baseURL: "http://localhost:8080/api",

  // Le decimos que siempre envíe datos en formato JSON
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores (si algo sale mal)
api.interceptors.response.use(
  // Si todo va bien, devolver la respuesta
  (response) => response,

  // Si hay error, mostrar información útil en la consola
  (error) => {
    console.error("❌ Error en API:", error.message);

    // Si el backend no responde
    if (error.code === "ECONNREFUSED") {
      console.error(
        "🔌 Backend no está corriendo. ¿Está tu Spring Boot activo en localhost:8080?"
      );
    }

    return Promise.reject(error);
  }
);

// Exportamos la configuración para usarla en otros archivos
export default api;
