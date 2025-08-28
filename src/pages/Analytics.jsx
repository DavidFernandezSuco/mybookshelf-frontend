// ===== pages/Analytics.jsx =====
export const Analytics = () => {
  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h4
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              fontWeight: 400,
            }}
          >
            📊 Analytics Avanzado
          </h4>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            Estadísticas detalladas y análisis de patrones de lectura
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            border: "1px solid #5f6368",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📈</div>
          <h5
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              color: "#e8eaed",
            }}
          >
            Analytics Dashboard - Phase 5
          </h5>
          <p style={{ margin: 0, color: "#9aa0a6", marginBottom: "24px" }}>
            Gráficos interactivos + métricas de productividad
          </p>

          <div
            style={{
              backgroundColor: "#28292c",
              border: "1px solid #5f6368",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "0.75rem",
              color: "#9aa0a6",
              textAlign: "left",
            }}
          >
            <div
              style={{ fontWeight: 500, color: "#e8eaed", marginBottom: "8px" }}
            >
              🔧 Features analíticas previstas:
            </div>
            <div>• Gráficos de progreso anual/mensual</div>
            <div>• Métricas de productividad (páginas/día)</div>
            <div>• Análisis de tendencias de lectura</div>
            <div>• Top rankings (libros, autores, géneros)</div>
            <div>• Comparativas año sobre año</div>
          </div>
        </div>
      </div>
    </div>
  );
};
