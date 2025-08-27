// ===== FUNCIONES PARA TRABAJAR CON LIBROS =====
// Este archivo contiene todas las funciones que van a "pedir cosas" a tu API

// Importamos la configuración que hicimos en api.js
import api from "./api";

// Creamos un objeto que contiene todas nuestras funciones
export const bookService = {
  // ===== OBTENER TODOS LOS LIBROS =====
  // Esta función llama a GET /api/books para traer tu lista de libros
  getAllBooks: async () => {
    try {
      console.log("📚 Pidiendo todos los libros...");
      const response = await api.get("/books");
      console.log("✅ Libros obtenidos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo libros:", error);
      throw error;
    }
  },

  // ===== OBTENER ESTADÍSTICAS DEL DASHBOARD =====
  // Esta función llama a GET /api/analytics/dashboard para las estadísticas
  getDashboard: async () => {
    try {
      console.log("📊 Pidiendo estadísticas del dashboard...");
      const response = await api.get("/analytics/dashboard");
      console.log("✅ Estadísticas obtenidas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo estadísticas:", error);
      throw error;
    }
  },

  // ===== BUSCAR LIBROS =====
  // Esta función llama a GET /api/books/search?query=algo
  searchBooks: async (query) => {
    try {
      console.log("🔍 Buscando libros con:", query);
      const response = await api.get(`/books/search?query=${query}`);
      console.log("✅ Resultados de búsqueda:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error buscando libros:", error);
      throw error;
    }
  },

  // ===== CREAR NUEVO LIBRO =====
  // Esta función llama a POST /api/books para crear un libro nuevo
  createBook: async (bookData) => {
    try {
      console.log("➕ Creando nuevo libro:", bookData);
      const response = await api.post("/books", bookData);
      console.log("✅ Libro creado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error creando libro:", error);
      throw error;
    }
  },
};
