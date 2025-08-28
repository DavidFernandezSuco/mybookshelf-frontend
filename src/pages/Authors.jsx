// ===== pages/Authors.jsx =====
export const Authors = () => {
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
            👥 Gestión de Autores
          </h4>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            Organiza y gestiona información de autores
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
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✍️</div>
          <h5
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              color: "#e8eaed",
            }}
          >
            Gestión de Autores - Phase 4
          </h5>
          <p style={{ margin: 0, color: "#9aa0a6", marginBottom: "24px" }}>
            CRUD completo + estadísticas + filtros geográficos
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
              🔧 API disponible (10 endpoints):
            </div>
            <div>• /api/authors - CRUD completo</div>
            <div>• /api/authors/search - Búsqueda avanzada</div>
            <div>• /api/authors/statistics - Stats por autor</div>
            <div>• /api/authors/nationality - Filtro geográfico</div>
            <div>• /api/authors/prolific - Ranking productividad</div>
          </div>
        </div>
      </div>
    </div>
  );
};
