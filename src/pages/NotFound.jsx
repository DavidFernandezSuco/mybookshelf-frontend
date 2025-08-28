// ===== pages/NotFound.jsx =====
export const NotFound = () => {
  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "24px" }}>📚❓</div>
        <h4
          style={{
            margin: 0,
            marginBottom: "16px",
            fontFamily: '"Google Sans", sans-serif',
            fontWeight: 400,
          }}
        >
          Página No Encontrada
        </h4>
        <p
          style={{
            margin: 0,
            color: "#9aa0a6",
            fontSize: "1rem",
            marginBottom: "32px",
          }}
        >
          La página que buscas no existe en tu biblioteca digital.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "12px 24px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#8ab4f8",
            color: "#202124",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: '"Google Sans", sans-serif',
          }}
        >
          🏠 Volver al Dashboard
        </button>
      </div>
    </div>
  );
};
