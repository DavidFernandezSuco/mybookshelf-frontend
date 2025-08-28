// ===== pages/AddBook.jsx =====
export const AddBook = () => {
  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h4
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              fontWeight: 400,
            }}
          >
            ➕ Añadir Nuevo Libro
          </h4>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            Agrega libros manualmente o importa desde Google Books
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
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📝</div>
          <h5
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              color: "#e8eaed",
            }}
          >
            Formulario de Creación - Phase 3
          </h5>
          <p style={{ margin: 0, color: "#9aa0a6", marginBottom: "24px" }}>
            Formulario inteligente con integración Google Books
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
              🔧 Features previstas:
            </div>
            <div>• Formulario con validaciones (título, autor, ISBN)</div>
            <div>• Búsqueda automática en Google Books</div>
            <div>• Autocompletado inteligente</div>
            <div>• Preview de datos antes de guardar</div>
            <div>• Detección de duplicados</div>
          </div>
        </div>
      </div>
    </div>
  );
};
