// ===== SERVICIO COMPLETO PARA GOOGLE BOOKS INTEGRATION =====
// Este servicio maneja toda la integración con Google Books API a través de tu backend

import api from "./api";

export const googleBooksService = {
  // ===== BÚSQUEDA EN GOOGLE BOOKS =====

  // Búsqueda básica en Google Books
  search: async (query, maxResults = 20, startIndex = 0) => {
    try {
      console.log(`🌐 Buscando en Google Books: "${query}"`);
      const response = await api.get("/books/search-external", {
        params: {
          q: query,
          maxResults,
          startIndex,
        },
      });
      console.log("✅ Resultados Google Books:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda Google Books:", error);
      throw error;
    }
  },

  // Búsqueda avanzada con filtros específicos
  advancedSearch: async (searchParams) => {
    try {
      console.log("🔍 Búsqueda avanzada Google Books:", searchParams);
      const response = await api.get("/books/search-external-advanced", {
        params: searchParams,
      });
      console.log("✅ Resultados búsqueda avanzada:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda avanzada:", error);
      throw error;
    }
  },

  // Buscar por ISBN específico
  searchByISBN: async (isbn) => {
    try {
      console.log(`📚 Buscando por ISBN: ${isbn}`);
      const response = await api.get(`/books/search-external?q=isbn:${isbn}`);
      console.log("✅ Resultado por ISBN:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda por ISBN:", error);
      throw error;
    }
  },

  // Buscar por título exacto
  searchByTitle: async (title, author = null) => {
    try {
      let query = `intitle:"${title}"`;
      if (author) {
        query += ` inauthor:"${author}"`;
      }
      console.log(
        `📖 Buscando título exacto: ${title}${author ? ` por ${author}` : ""}`
      );
      const response = await api.get("/books/search-external", {
        params: { q: query, maxResults: 10 },
      });
      console.log("✅ Resultados por título:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda por título:", error);
      throw error;
    }
  },

  // Buscar por autor
  searchByAuthor: async (author, maxResults = 40) => {
    try {
      console.log(`👨‍💼 Buscando libros de: ${author}`);
      const response = await api.get("/books/search-external", {
        params: {
          q: `inauthor:"${author}"`,
          maxResults,
        },
      });
      console.log("✅ Libros del autor:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda por autor:", error);
      throw error;
    }
  },

  // ===== IMPORTACIÓN Y ENRIQUECIMIENTO =====

  // Importar libro completo desde Google Books
  importBook: async (googleBookId, additionalData = {}) => {
    try {
      console.log(`📥 Importando libro desde Google Books: ${googleBookId}`);
      const response = await api.post("/books/import-google", {
        googleBookId,
        ...additionalData,
      });
      console.log("✅ Libro importado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error importando libro:", error);
      throw error;
    }
  },

  // Importar desde datos completos de Google Books
  importFromData: async (googleBookData, userPreferences = {}) => {
    try {
      console.log(
        "📥 Importando desde datos completos...",
        googleBookData.volumeInfo?.title
      );
      const response = await api.post("/books/import-google", {
        googleBookData,
        userPreferences,
      });
      console.log("✅ Libro importado desde datos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error importando desde datos:", error);
      throw error;
    }
  },

  // Enriquecer libro existente con datos de Google Books
  enrichExistingBook: async (bookId, googleBookData = null) => {
    try {
      console.log(`✨ Enriqueciendo libro ${bookId} con datos de Google...`);
      const payload = googleBookData ? { googleBookData } : {};
      const response = await api.patch(
        `/books/${bookId}/enrich-google`,
        payload
      );
      console.log("✅ Libro enriquecido:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error enriqueciendo libro:", error);
      throw error;
    }
  },

  // ===== BÚSQUEDA HÍBRIDA =====

  // Búsqueda híbrida (local + Google Books)
  hybridSearch: async (query, options = {}) => {
    try {
      const {
        includeExternal = true,
        maxResults = 20,
        prioritizeLocal = true,
      } = options;

      console.log(`🔍🌐 Búsqueda híbrida: "${query}"`);
      const response = await api.get("/books/search-hybrid", {
        params: {
          q: query,
          includeExternal,
          maxResults,
          prioritizeLocal,
        },
      });
      console.log("✅ Resultados híbridos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error búsqueda híbrida:", error);
      throw error;
    }
  },

  // ===== AUTOCOMPLETADO Y SUGERENCIAS =====

  // Autocompletado inteligente para formularios
  getAutocomplete: async (query, field = "all") => {
    try {
      console.log(`🤖 Autocompletado para "${query}" en campo: ${field}`);
      const response = await api.get("/books/autocomplete", {
        params: { q: query, field },
      });
      console.log("✅ Sugerencias autocompletado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error autocompletado:", error);
      throw error;
    }
  },

  // Sugerencias para crear nuevo libro
  getSuggestions: async (title, author = null) => {
    try {
      console.log(
        `💡 Obteniendo sugerencias para: "${title}"${
          author ? ` por ${author}` : ""
        }`
      );
      const response = await api.get("/books/suggestions", {
        params: { title, author },
      });
      console.log("✅ Sugerencias obtenidas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo sugerencias:", error);
      throw error;
    }
  },

  // ===== UTILIDADES Y HELPERS =====

  // Obtener detalles completos de un libro por Google Books ID
  getBookDetails: async (googleBookId) => {
    try {
      console.log(`📖 Obteniendo detalles completos: ${googleBookId}`);
      const response = await api.get(`/google-books/details/${googleBookId}`);
      console.log("✅ Detalles completos:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo detalles:", error);
      throw error;
    }
  },

  // Verificar disponibilidad de un libro
  checkAvailability: async (isbn) => {
    try {
      console.log(`🔍 Verificando disponibilidad: ${isbn}`);
      const response = await api.get("/google-books/availability", {
        params: { isbn },
      });
      console.log("✅ Estado disponibilidad:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error verificando disponibilidad:", error);
      throw error;
    }
  },

  // Obtener libros relacionados/similares
  getRelatedBooks: async (googleBookId, maxResults = 10) => {
    try {
      console.log(`🔗 Obteniendo libros relacionados: ${googleBookId}`);
      const response = await api.get("/google-books/related", {
        params: { bookId: googleBookId, maxResults },
      });
      console.log("✅ Libros relacionados:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error libros relacionados:", error);
      throw error;
    }
  },

  // ===== DETECCIÓN DE DUPLICADOS =====

  // Verificar si libro ya existe en biblioteca
  checkDuplicate: async (googleBookData) => {
    try {
      console.log(
        "🔍 Verificando duplicados...",
        googleBookData.volumeInfo?.title
      );
      const response = await api.post("/books/check-duplicate", {
        googleBookData,
      });
      console.log("✅ Verificación duplicados:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error verificando duplicados:", error);
      throw error;
    }
  },

  // Encontrar posibles duplicados por título y autor
  findPotentialDuplicates: async (title, author) => {
    try {
      console.log(
        `🔍 Buscando duplicados potenciales: "${title}" por ${author}`
      );
      const response = await api.get("/books/find-duplicates", {
        params: { title, author },
      });
      console.log("✅ Duplicados potenciales:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error buscando duplicados:", error);
      throw error;
    }
  },

  // ===== BATCH OPERATIONS =====

  // Importar múltiples libros en lote
  batchImport: async (googleBookIds, preferences = {}) => {
    try {
      console.log("📦 Importación en lote:", googleBookIds);
      const response = await api.post("/books/batch-import-google", {
        bookIds: googleBookIds,
        preferences,
      });
      console.log("✅ Importación lote completada:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error importación lote:", error);
      throw error;
    }
  },

  // Enriquecer múltiples libros existentes
  batchEnrich: async (bookIds) => {
    try {
      console.log("✨ Enriquecimiento en lote:", bookIds);
      const response = await api.post("/books/batch-enrich-google", {
        bookIds,
      });
      console.log("✅ Enriquecimiento lote completado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error enriquecimiento lote:", error);
      throw error;
    }
  },

  // ===== CONFIGURACIÓN Y CACHE =====

  // Configurar preferencias de importación
  setImportPreferences: async (preferences) => {
    try {
      console.log("⚙️ Configurando preferencias importación:", preferences);
      const response = await api.post("/google-books/preferences", preferences);
      console.log("✅ Preferencias guardadas");
      return response;
    } catch (error) {
      console.error("❌ Error guardando preferencias:", error);
      throw error;
    }
  },

  // Limpiar caché de búsquedas de Google Books
  clearSearchCache: async () => {
    try {
      console.log("🧹 Limpiando caché Google Books...");
      const response = await api.delete("/google-books/cache");
      console.log("✅ Caché limpiado");
      return response;
    } catch (error) {
      console.error("❌ Error limpiando caché:", error);
      throw error;
    }
  },

  // ===== HELPERS PARA UI =====

  // Formatear datos de Google Books para UI
  formatBookForUI: (googleBookData) => {
    const book = googleBookData.volumeInfo || {};
    return {
      id: googleBookData.id,
      title: book.title || "Sin título",
      subtitle: book.subtitle || "",
      authors: book.authors || ["Autor desconocido"],
      publisher: book.publisher || "Editorial desconocida",
      publishedDate: book.publishedDate || "",
      description: book.description || "Sin descripción",
      isbn:
        book.industryIdentifiers?.find((id) => id.type === "ISBN_13")
          ?.identifier || "",
      pageCount: book.pageCount || 0,
      categories: book.categories || [],
      averageRating: book.averageRating || 0,
      ratingsCount: book.ratingsCount || 0,
      thumbnail: book.imageLinks?.thumbnail || "",
      smallThumbnail: book.imageLinks?.smallThumbnail || "",
      previewLink: book.previewLink || "",
      infoLink: book.infoLink || "",
      language: book.language || "es",
    };
  },

  // Validar datos mínimos requeridos
  validateBookData: (googleBookData) => {
    const book = googleBookData.volumeInfo || {};
    const errors = [];

    if (!book.title) errors.push("Título requerido");
    if (!book.authors || book.authors.length === 0)
      errors.push("Al menos un autor requerido");

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};
