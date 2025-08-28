// ===== pages/Genres.jsx =====
export const Genres = () => {
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
            🏷️ Gestión de Géneros
          </h4>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            Organiza libros por categorías y analiza popularidad
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
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📂</div>
          <h5
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              color: "#e8eaed",
            }}
          >
            Gestión de Géneros - Phase 4
          </h5>
          <p style={{ margin: 0, color: "#9aa0a6", marginBottom: "24px" }}>
            Categorización inteligente + análisis de popularidad
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
            <div>• /api/genres - CRUD completo</div>
            <div>• /api/genres/popular - Ranking popularidad</div>
            <div>• /api/genres/stats - Estadísticas generales</div>
            <div>• /api/genres/cleanup - Herramientas mantenimiento</div>
            <div>• /api/genres/with-books - Solo géneros activos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
