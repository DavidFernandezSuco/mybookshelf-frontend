// ===== SERVICIO COMPLETO PARA ANALYTICS =====
// Este archivo conecta con tu AnalyticsController backend

import api from "./api";

export const analyticsService = {
  // ===== DASHBOARD Y MÉTRICAS PRINCIPALES =====

  // Obtener estadísticas principales del dashboard
  getDashboard: async () => {
    try {
      console.log("📊 Pidiendo estadísticas del dashboard...");
      const response = await api.get("/analytics/dashboard");
      console.log("✅ Dashboard stats obtenidas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error obteniendo dashboard stats:", error);
      throw error;
    }
  },

  // Métricas rápidas para widgets
  getQuickMetrics: async () => {
    try {
      console.log("⚡ Obteniendo métricas rápidas...");
      const response = await api.get("/analytics/quick");
      console.log("✅ Métricas rápidas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error métricas rápidas:", error);
      throw error;
    }
  },

  // Estadísticas de productividad (páginas/día, ritmo lectura)
  getProductivityStats: async () => {
    try {
      console.log("📈 Calculando productividad de lectura...");
      const response = await api.get("/analytics/productivity");
      console.log("✅ Stats productividad:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error stats productividad:", error);
      throw error;
    }
  },

  // ===== ANÁLISIS TEMPORAL =====

  // Progreso anual (libros por año, comparativas)
  getYearlyProgress: async (year = null) => {
    try {
      const yearParam = year ? `?year=${year}` : "";
      console.log(
        `📅 Obteniendo progreso anual${year ? ` para ${year}` : ""}...`
      );
      const response = await api.get(`/analytics/yearly-progress${yearParam}`);
      console.log("✅ Progreso anual:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error progreso anual:", error);
      throw error;
    }
  },

  // Progreso mensual (tendencias mes a mes)
  getMonthlyProgress: async (year = null) => {
    try {
      const yearParam = year ? `?year=${year}` : "";
      console.log(
        `📊 Obteniendo tendencias mensuales${year ? ` para ${year}` : ""}...`
      );
      const response = await api.get(`/analytics/monthly-progress${yearParam}`);
      console.log("✅ Progreso mensual:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error progreso mensual:", error);
      throw error;
    }
  },

  // ===== ANALYTICS PERSONALIZADOS =====

  // Análisis de géneros más leídos
  getGenreAnalytics: async () => {
    try {
      console.log("🏷️ Analizando popularidad de géneros...");
      const response = await api.get("/analytics/genres");
      console.log("✅ Analytics géneros:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error analytics géneros:", error);
      throw error;
    }
  },

  // Análisis de autores favoritos
  getAuthorAnalytics: async () => {
    try {
      console.log("👨‍💼 Analizando autores favoritos...");
      const response = await api.get("/analytics/authors");
      console.log("✅ Analytics autores:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error analytics autores:", error);
      throw error;
    }
  },

  // Análisis de hábitos de lectura (días de semana, horas, etc.)
  getReadingHabits: async () => {
    try {
      console.log("📖 Analizando patrones de lectura...");
      const response = await api.get("/analytics/reading-habits");
      console.log("✅ Hábitos de lectura:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error hábitos lectura:", error);
      throw error;
    }
  },

  // ===== COMPARATIVAS Y BENCHMARKS =====

  // Comparar con año anterior
  getYearOverYearComparison: async (currentYear = null) => {
    try {
      const yearParam = currentYear ? `?year=${currentYear}` : "";
      console.log("🔄 Comparando con año anterior...");
      const response = await api.get(`/analytics/year-over-year${yearParam}`);
      console.log("✅ Comparativa año anterior:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error comparativa anual:", error);
      throw error;
    }
  },

  // Progreso hacia metas anuales
  getGoalProgress: async (goalYear = null) => {
    try {
      const yearParam = goalYear ? `?year=${goalYear}` : "";
      console.log("🎯 Calculando progreso de metas...");
      const response = await api.get(`/analytics/goal-progress${yearParam}`);
      console.log("✅ Progreso metas:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error progreso metas:", error);
      throw error;
    }
  },

  // ===== FUNCIONALIDADES AVANZADAS =====

  // Exportar datos para análisis externo
  exportAnalyticsData: async (format = "json", dateRange = null) => {
    try {
      console.log(`📤 Exportando analytics en formato ${format}...`);
      const params = new URLSearchParams({ format });
      if (dateRange) {
        params.append("startDate", dateRange.start);
        params.append("endDate", dateRange.end);
      }
      const response = await api.get(`/analytics/export?${params}`);
      console.log("✅ Datos exportados:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error exportando analytics:", error);
      throw error;
    }
  },

  // Generar reporte personalizado
  generateCustomReport: async (reportConfig) => {
    try {
      console.log("📋 Generando reporte personalizado...", reportConfig);
      const response = await api.post("/analytics/custom-report", reportConfig);
      console.log("✅ Reporte generado:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error generando reporte:", error);
      throw error;
    }
  },

  // ===== CACHE Y OPTIMIZACIÓN =====

  // Refrescar caché de analytics
  refreshCache: async () => {
    try {
      console.log("🔄 Refrescando caché de analytics...");
      const response = await api.post("/analytics/refresh-cache");
      console.log("✅ Cache refrescado");
      return response;
    } catch (error) {
      console.error("❌ Error refrescando cache:", error);
      throw error;
    }
  },

  // Obtener estado del sistema de analytics
  getSystemHealth: async () => {
    try {
      console.log("🔍 Verificando salud del sistema analytics...");
      const response = await api.get("/analytics/health");
      console.log("✅ Sistema analytics:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error verificando sistema:", error);
      throw error;
    }
  },
};
