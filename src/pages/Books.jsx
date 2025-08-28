// ===== src/pages/Books.jsx =====
// Crea este archivo EXACTAMENTE así

import React from "react";
import { useSearchParams } from "react-router-dom";

const Books = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h4
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              fontWeight: 400,
            }}
          >
            📚 Mi Biblioteca
          </h4>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            {status
              ? `Filtrado por: ${status}`
              : search
              ? "Modo búsqueda activo"
              : "Gestiona todos tus libros"}
          </p>
        </div>

        {/* Content placeholder */}
        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            border: "1px solid #5f6368",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📖</div>
          <h5
            style={{
              margin: 0,
              marginBottom: "8px",
              fontFamily: '"Google Sans", sans-serif',
              color: "#e8eaed",
            }}
          >
            Página de Libros - Phase 3
          </h5>
          <p style={{ margin: 0, color: "#9aa0a6", marginBottom: "24px" }}>
            {status && `Filtro activo: ${status}`}
            {search && "Búsqueda activa"}
            {!status && !search && "Lista completa de libros con CRUD"}
          </p>

          {/* Development info */}
          <div
            style={{
              backgroundColor: "#28292c",
              border: "1px solid #5f6368",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "0.75rem",
              color: "#9aa0a6",
              textAlign: "left",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{ fontWeight: 500, color: "#e8eaed", marginBottom: "8px" }}
            >
              🔧 Phase 3 - Implementación prevista:
            </div>
            <div>• Lista paginada con filtros (API: /api/books)</div>
            <div>• Búsqueda local e híbrida (Google Books)</div>
            <div>• CRUD completo (crear, editar, eliminar)</div>
            <div>• Gestión de progreso de lectura</div>
            <div>• Import desde Google Books API</div>
            <div>• Estados: WISHLIST → READING → FINISHED</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
