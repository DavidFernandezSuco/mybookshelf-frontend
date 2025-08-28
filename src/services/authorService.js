// ===== SERVICIO PARA GESTIÓN DE AUTORES =====
import api from "./api";

export const authorService = {
  // Obtener todos los autores con paginación
  getAllAuthors: async (
    page = 0,
    size = 10,
    sortBy = "lastName",
    sortDir = "asc"
  ) => {
    try {
      console.log(`👨‍💼 Obteniendo autores - página ${page}`);
      const response = await api.get(
        `/authors?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
      );
      console.log("✅ Autores obtenidos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo autores:", error);
      throw error;
    }
  },

  // Crear nuevo autor
  createAuthor: async (authorData) => {
    try {
      console.log("➕ Creando nuevo autor:", authorData);
      const response = await api.post("/authors", authorData);
      console.log("✅ Autor creado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error creando autor:", error);
      throw error;
    }
  },

  // Autocompletado de autores para formularios
  getAuthorAutocomplete: async (query) => {
    try {
      console.log("🔍 Autocompletado autores:", query);
      const response = await api.get(
        `/authors/autocomplete?q=${encodeURIComponent(query)}`
      );
      console.log("✅ Sugerencias autores:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en autocompletado autores:", error);
      throw error;
    }
  },
};
