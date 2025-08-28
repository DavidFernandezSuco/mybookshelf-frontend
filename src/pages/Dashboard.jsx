// ===== DASHBOARD PÁGINA EXTRAÍDA =====
// pages/Dashboard.jsx - Todo el código de dashboard movido aquí

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "../services/bookService";

const Dashboard = () => {
  const navigate = useNavigate();

  // ===== ESTADO PARA DATOS REALES =====
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    booksReading: 0,
    booksFinished: 0,
    booksWishlist: 0,
    booksAbandoned: 0,
    booksOnHold: 0,
    booksFinishedThisYear: 0,
    completionRate: 0,
    averagePages: 0,
    yearOverYearGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== CARGAR DATOS REALES =====
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        console.log("📊 Cargando datos del dashboard...");
        const response = await bookService.getDashboard();
        console.log("✅ Datos recibidos:", response.data);

        setDashboardData(response.data);
        setError(null);
      } catch (error) {
        console.error("❌ Error cargando dashboard:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // ===== HANDLERS PARA NAVEGACIÓN =====
  const handleAddBook = () => navigate("/books/add");
  const handleViewBooks = () => navigate("/books");
  const handleViewAnalytics = () => navigate("/analytics");
  const handleSearchBooks = () => navigate("/books?search=true");

  // ===== MOSTRAR LOADING =====
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          color: "#e8eaed",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>📊</div>
          <div>Cargando tu biblioteca...</div>
        </div>
      </div>
    );
  }

  // ===== MOSTRAR ERROR =====
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          color: "#f28b82",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>❌</div>
          <div style={{ marginBottom: "8px" }}>Error conectando con la API</div>
          <div style={{ fontSize: "0.875rem", color: "#9aa0a6" }}>{error}</div>
        </div>
      </div>
    );
  }

  // ===== DASHBOARD PRINCIPAL =====
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#202124",
        minHeight: "calc(100vh - 64px)",
        color: "#e8eaed",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div>
              <h4 style={{ margin: 0, marginBottom: "4px", fontWeight: 400 }}>
                Dashboard
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#9aa0a6",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                }}
              >
                {dashboardData.totalBooks > 0
                  ? `${dashboardData.totalBooks} libros en tu biblioteca • Buenos días`
                  : "Comienza añadiendo tu primer libro • Buenos días"}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleViewAnalytics}
                style={{
                  padding: "10px 20px",
                  borderRadius: "24px",
                  border: "1px solid #5f6368",
                  backgroundColor: "transparent",
                  color: "#8ab4f8",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: '"Google Sans", sans-serif',
                  transition: "all 0.2s ease",
                }}
              >
                ⚙️ Configurar
              </button>
              <button
                onClick={handleAddBook}
                style={{
                  padding: "10px 20px",
                  borderRadius: "24px",
                  border: "none",
                  backgroundColor: "#8ab4f8",
                  color: "#202124",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: '"Google Sans", sans-serif',
                  transition: "all 0.2s ease",
                }}
              >
                ➕ Nuevo Libro
              </button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div
            style={{
              fontSize: "0.75rem",
              color: "#5f6368",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: '"Google Sans", sans-serif',
            }}
          >
            <span>📚 MyBookShelf</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>

        {/* Key Metrics Grid - CON TODOS LOS DATOS REALES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            {
              title: "Total Libros",
              value: dashboardData.totalBooks || 0,
              change:
                dashboardData.totalBooks > 0
                  ? `${dashboardData.totalBooks} en total`
                  : "Biblioteca vacía",
              positive: dashboardData.totalBooks > 0,
              icon: "📚",
              color: "#8ab4f8",
              onClick: handleViewBooks,
            },
            {
              title: "Leyendo",
              value: dashboardData.booksReading || 0,
              change: `${dashboardData.booksReading || 0} activos`,
              positive: true,
              icon: "📖",
              color: "#81c995",
              onClick: () => navigate("/books?status=reading"),
            },
            {
              title: "Terminados",
              value: dashboardData.booksFinished || 0,
              change: `${dashboardData.booksFinishedThisYear || 0} este año`,
              positive: true,
              icon: "✅",
              color: "#fdd663",
              onClick: () => navigate("/books?status=finished"),
            },
            {
              title: "Lista Deseos",
              value: dashboardData.booksWishlist || 0,
              change: "Por leer",
              positive: true,
              icon: "❤️",
              color: "#f28b82",
              onClick: () => navigate("/books?status=wishlist"),
            },
            {
              title: "En Pausa",
              value: dashboardData.booksOnHold || 0,
              change: "Pausados",
              positive: dashboardData.booksOnHold === 0,
              icon: "⏸️",
              color: "#fdd663",
              onClick: () => navigate("/books?status=paused"),
            },
            {
              title: "Abandonados",
              value: dashboardData.booksAbandoned || 0,
              change: "Descartados",
              positive: dashboardData.booksAbandoned === 0,
              icon: "❌",
              color: "#f28b82",
              onClick: () => navigate("/books?status=abandoned"),
            },
          ].map((metric, i) => (
            <div
              key={i}
              onClick={metric.onClick}
              style={{
                backgroundColor: "#303134",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #5f6368",
                transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#3c4043",
                  border: "1px solid #8ab4f8",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: metric.positive ? "#81c995" : "#f28b82",
                    backgroundColor: metric.positive
                      ? "rgba(129, 201, 149, 0.1)"
                      : "rgba(242, 139, 130, 0.1)",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  {metric.change}
                </div>
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "#e8eaed",
                  lineHeight: 1,
                  marginBottom: "8px",
                  fontFamily: '"Google Sans", sans-serif',
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#9aa0a6",
                  fontWeight: 400,
                  fontFamily: '"Google Sans", sans-serif',
                }}
              >
                {metric.title}
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay libros */}
        {dashboardData.totalBooks === 0 && (
          <div
            style={{
              backgroundColor: "#303134",
              borderRadius: "12px",
              border: "1px solid #5f6368",
              padding: "48px",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📚</div>
            <h5
              style={{
                margin: 0,
                marginBottom: "8px",
                fontFamily: '"Google Sans", sans-serif',
                color: "#e8eaed",
              }}
            >
              ¡Comienza tu biblioteca digital!
            </h5>
            <p
              style={{
                margin: 0,
                color: "#9aa0a6",
                marginBottom: "24px",
              }}
            >
              Añade tu primer libro para empezar a trackear tu progreso de
              lectura
            </p>
            <button
              onClick={handleAddBook}
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
              ➕ Añadir Primer Libro
            </button>
          </div>
        )}

        {/* Main Content Grid - Solo si hay libros */}
        {dashboardData.totalBooks > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Currently Reading */}
            <div
              style={{
                backgroundColor: "#303134",
                borderRadius: "12px",
                border: "1px solid #5f6368",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  borderBottom: "1px solid #5f6368",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h6
                  style={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: '"Google Sans", sans-serif',
                    fontWeight: 500,
                    color: "#e8eaed",
                  }}
                >
                  📖 Leyendo Actualmente
                </h6>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9aa0a6",
                    backgroundColor: "#3c4043",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontWeight: 500,
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  {dashboardData.booksReading} libros
                </span>
              </div>
              <div style={{ padding: "20px 24px", textAlign: "center" }}>
                <div style={{ color: "#9aa0a6", marginBottom: "16px" }}>
                  📖 Conecta la lista de libros en progreso
                </div>
                <button
                  onClick={() => navigate("/books?status=reading")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "24px",
                    border: "1px solid #5f6368",
                    backgroundColor: "transparent",
                    color: "#8ab4f8",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: '"Google Sans", sans-serif',
                    transition: "all 0.2s ease",
                  }}
                >
                  Ver Todos los Libros
                </button>
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Quick Actions */}
              <div
                style={{
                  backgroundColor: "#303134",
                  borderRadius: "12px",
                  border: "1px solid #5f6368",
                  padding: "24px",
                }}
              >
                <h6
                  style={{
                    margin: 0,
                    marginBottom: "20px",
                    fontFamily: '"Google Sans", sans-serif',
                    fontWeight: 500,
                    color: "#e8eaed",
                  }}
                >
                  ⚡ Acciones Rápidas
                </h6>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {[
                    {
                      icon: "➕",
                      text: "Añadir Libro",
                      color: "#8ab4f8",
                      onClick: handleAddBook,
                    },
                    {
                      icon: "🔍",
                      text: "Buscar en Google Books",
                      color: "#81c995",
                      onClick: handleSearchBooks,
                    },
                    {
                      icon: "📊",
                      text: "Ver Analytics",
                      color: "#fdd663",
                      onClick: handleViewAnalytics,
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "24px",
                        border: "1px solid #5f6368",
                        backgroundColor: "transparent",
                        color: "#e8eaed",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                        width: "100%",
                        fontFamily: '"Google Sans", sans-serif',
                      }}
                    >
                      <span>{action.icon}</span>
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Goal */}
              <div
                style={{
                  backgroundColor: "#303134",
                  borderRadius: "12px",
                  border: "1px solid #5f6368",
                  padding: "24px",
                }}
              >
                <h6
                  style={{
                    margin: 0,
                    marginBottom: "20px",
                    fontFamily: '"Google Sans", sans-serif',
                    fontWeight: 500,
                    color: "#e8eaed",
                  }}
                >
                  🎯 Meta Anual 2024
                </h6>
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#9aa0a6",
                        fontFamily: '"Google Sans", sans-serif',
                      }}
                    >
                      {dashboardData.booksFinished} de 50 libros
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#81c995",
                        fontFamily: '"Google Sans", sans-serif',
                      }}
                    >
                      {Math.round((dashboardData.booksFinished / 50) * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#5f6368",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(
                          (dashboardData.booksFinished / 50) * 100,
                          100
                        )}%`,
                        height: "100%",
                        backgroundColor: "#81c995",
                        borderRadius: "4px",
                        transition: "width 2s ease",
                      }}
                    />
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: "#9aa0a6",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  {dashboardData.booksFinished < 50
                    ? `¡Vas bien! Faltan ${
                        50 - dashboardData.booksFinished
                      } libros para tu meta.`
                    : "¡Felicitaciones! Has superado tu meta anual."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Panel de Desarrollo - Con datos reales */}
        <div
          style={{
            backgroundColor: "#28292c",
            border: "1px solid #5f6368",
            borderRadius: "8px",
            padding: "16px",
            marginTop: "32px",
            fontSize: "0.75rem",
            color: "#9aa0a6",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: 500,
              color: "#e8eaed",
            }}
          >
            🔧 Panel de Desarrollo - Phase 2 ROUTING ✅
          </div>
          <div style={{ marginBottom: "4px" }}>
            • Dashboard extraído como página independiente ✅
          </div>
          <div style={{ marginBottom: "4px" }}>
            • Navegación con React Router implementada ✅
          </div>
          <div style={{ marginBottom: "4px" }}>
            • Botones conectados a rutas: {handleAddBook ? "✅" : "❌"}
          </div>
          <div style={{ color: "#8ab4f8" }}>
            ¡Perfecto! Próximo paso: Crear páginas Books, Authors, etc.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
