// ===== SERVICIO COMPLETO PARA LIBROS =====
// Este archivo contiene TODOS los endpoints relacionados con libros

import api from "./api";

export const bookService = {
  // ===== OBTENER LIBROS =====

  // Obtener todos los libros con paginación
  getAllBooks: async (
    page = 0,
    size = 10,
    sortBy = "title",
    sortDir = "asc"
  ) => {
    try {
      console.log(`📚 Obteniendo libros - página ${page}, tamaño ${size}`);
      const response = await api.get(
        `/books?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
      );
      console.log("✅ Libros obtenidos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo libros:", error);
      throw error;
    }
  },

  // Obtener un libro específico por ID
  getBookById: async (id) => {
    try {
      console.log(`📖 Obteniendo libro ID: ${id}`);
      const response = await api.get(`/books/${id}`);
      console.log("✅ Libro obtenido:", response.data);
      return response;
    } catch (error) {
      console.error(`❌ Error obteniendo libro ${id}:`, error);
      throw error;
    }
  },

  // Obtener libros que se están leyendo actualmente
  getCurrentlyReading: async () => {
    try {
      console.log("📖 Obteniendo libros en lectura...");
      const response = await api.get("/books/currently-reading");
      console.log("✅ Libros en lectura:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo libros en lectura:", error);
      throw error;
    }
  },

  // Filtrar libros por estado (READING, FINISHED, WISHLIST, PAUSED)
  getBooksByStatus: async (status) => {
    try {
      console.log(`🏷️ Filtrando libros por estado: ${status}`);
      const response = await api.get(`/books/status/${status}`);
      console.log("✅ Libros filtrados:", response.data);
      return response;
    } catch (error) {
      console.error(`❌ Error filtrando por estado ${status}:`, error);
      throw error;
    }
  },

  // ===== BÚSQUEDA =====

  // Buscar libros en tu biblioteca local
  searchBooks: async (query) => {
    try {
      console.log("🔍 Buscando libros localmente:", query);
      const response = await api.get(
        `/books/search?query=${encodeURIComponent(query)}`
      );
      console.log("✅ Resultados búsqueda local:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en búsqueda local:", error);
      throw error;
    }
  },

  // Buscar en Google Books (externo)
  searchGoogleBooks: async (query, maxResults = 20) => {
    try {
      console.log("🌐 Buscando en Google Books:", query);
      const response = await api.get(
        `/books/search-external?q=${encodeURIComponent(
          query
        )}&maxResults=${maxResults}`
      );
      console.log("✅ Resultados Google Books:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en búsqueda Google Books:", error);
      throw error;
    }
  },

  // Búsqueda híbrida (local + Google Books)
  searchHybrid: async (query, includeExternal = true) => {
    try {
      console.log("🔍🌐 Búsqueda híbrida:", query);
      const response = await api.get(
        `/books/search-hybrid?q=${encodeURIComponent(
          query
        )}&includeExternal=${includeExternal}`
      );
      console.log("✅ Resultados híbridos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en búsqueda híbrida:", error);
      throw error;
    }
  },

  // ===== CREAR Y MODIFICAR =====

  // Crear nuevo libro
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

  // Actualizar progreso de lectura
  updateProgress: async (id, progressData) => {
    try {
      console.log(`📊 Actualizando progreso libro ${id}:`, progressData);
      const response = await api.patch(`/books/${id}/progress`, progressData);
      console.log("✅ Progreso actualizado:", response.data);
      return response;
    } catch (error) {
      console.error(`❌ Error actualizando progreso ${id}:`, error);
      throw error;
    }
  },

  // Importar libro desde Google Books
  importFromGoogle: async (googleBookData) => {
    try {
      console.log("📥 Importando desde Google Books:", googleBookData);
      const response = await api.post("/books/import-google", googleBookData);
      console.log("✅ Libro importado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error importando desde Google:", error);
      throw error;
    }
  },

  // Enriquecer libro existente con datos de Google Books
  enrichWithGoogle: async (id) => {
    try {
      console.log(`✨ Enriqueciendo libro ${id} con datos de Google...`);
      const response = await api.patch(`/books/${id}/enrich-google`);
      console.log("✅ Libro enriquecido:", response.data);
      return response;
    } catch (error) {
      console.error(`❌ Error enriqueciendo libro ${id}:`, error);
      throw error;
    }
  },

  // ===== ELIMINAR =====

  // Eliminar libro
  deleteBook: async (id) => {
    try {
      console.log(`🗑️ Eliminando libro ${id}...`);
      const response = await api.delete(`/books/${id}`);
      console.log("✅ Libro eliminado");
      return response;
    } catch (error) {
      console.error(`❌ Error eliminando libro ${id}:`, error);
      throw error;
    }
  },

  // ===== FUNCIONALIDADES INTELIGENTES =====

  // Autocompletado para formularios
  getAutocomplete: async (query) => {
    try {
      console.log("🤖 Autocompletado:", query);
      const response = await api.get(
        `/books/autocomplete?q=${encodeURIComponent(query)}`
      );
      console.log("✅ Sugerencias:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en autocompletado:", error);
      throw error;
    }
  },

  // Sugerencias para crear libro
  getSuggestions: async (title) => {
    try {
      console.log("💡 Obteniendo sugerencias para:", title);
      const response = await api.get(
        `/books/suggestions?title=${encodeURIComponent(title)}`
      );
      console.log("✅ Sugerencias obtenidas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo sugerencias:", error);
      throw error;
    }
  },

  // ===== ESTADÍSTICAS Y ANALYTICS =====

  // Obtener estadísticas del dashboard
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
};
