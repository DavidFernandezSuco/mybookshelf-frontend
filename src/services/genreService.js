// ===== SERVICIO PARA GESTIÓN DE GÉNEROS =====
import api from "./api";

export const genreService = {
  // Obtener géneros ordenados
  getAllGenres: async () => {
    try {
      console.log("🏷️ Obteniendo géneros ordenados...");
      const response = await api.get("/genres/ordered");
      console.log("✅ Géneros obtenidos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo géneros:", error);
      throw error;
    }
  },

  // Crear nuevo género
  createGenre: async (genreData) => {
    try {
      console.log("➕ Creando nuevo género:", genreData);
      const response = await api.post("/genres", genreData);
      console.log("✅ Género creado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error creando género:", error);
      throw error;
    }
  },

  // Autocompletado de géneros para formularios
  getGenreAutocomplete: async (query) => {
    try {
      console.log("🔍 Autocompletado géneros:", query);
      const response = await api.get(
        `/genres/autocomplete?q=${encodeURIComponent(query)}`
      );
      console.log("✅ Sugerencias géneros:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en autocompletado géneros:", error);
      throw error;
    }
  },
};
