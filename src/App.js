// DASHBOARD PROFESIONAL - DARK MODE GOOGLE STYLE
// Reemplaza tu App.js con este código

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/common/Layout";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8ab4f8", // Azul Google suave
      light: "#aecbfa",
      dark: "#669df6",
    },
    secondary: {
      main: "#81c995", // Verde Google suave
      light: "#a8dab5",
      dark: "#5bb974",
    },
    background: {
      default: "#202124", // Gris oscuro Google (fondo principal)
      paper: "#303134", // Gris menos oscuro (cards/elementos)
    },
    surface: {
      main: "#303134", // Superficie de elementos
      light: "#3c4043", // Hover states
      dark: "#28292c", // Estados pressed
    },
    text: {
      primary: "#e8eaed", // Blanco suave principal
      secondary: "#9aa0a6", // Gris claro secundario
      disabled: "#5f6368", // Gris oscuro deshabilitado
    },
    divider: "#5f6368", // Divisores sutiles
    success: {
      main: "#81c995", // Verde suave
    },
    warning: {
      main: "#fdd663", // Amarillo suave
    },
    error: {
      main: "#f28b82", // Rojo suave
    },
    info: {
      main: "#8ab4f8", // Azul info
    },
  },
  typography: {
    fontFamily:
      '"Google Sans", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h4: {
      fontWeight: 400,
      fontSize: "1.875rem",
      color: "#e8eaed",
      letterSpacing: "-0.025em",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "#e8eaed",
      letterSpacing: "-0.025em",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
      color: "#e8eaed",
      letterSpacing: "-0.025em",
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: "#9aa0a6",
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: "#9aa0a6",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#202124",
          color: "#e8eaed",
          boxShadow: "none",
          borderBottom: "1px solid #5f6368",
          height: "64px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "64px !important",
          height: "64px",
          paddingLeft: "24px !important",
          paddingRight: "24px !important",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#202124",
          borderRight: "1px solid #5f6368",
          boxShadow: "none",
          width: "240px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          margin: "2px 12px",
          padding: "10px 16px",
          minHeight: "40px",
          backgroundColor: "transparent",
          transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#3c4043",
          },
          "&.Mui-selected": {
            backgroundColor: "#8ab4f8",
            color: "#202124",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#aecbfa",
            },
            "& .MuiListItemIcon-root": {
              color: "#202124",
            },
            "& .MuiListItemText-primary": {
              color: "#202124",
              fontWeight: 500,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
          color: "#9aa0a6",
          "& .MuiSvgIcon-root": {
            fontSize: "20px",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "#e8eaed",
          lineHeight: 1.25,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#303134",
          boxShadow: "none",
          borderRadius: "12px",
          border: "1px solid #5f6368",
          transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#3c4043",
            border: "1px solid #8ab4f8",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
          padding: "10px 24px",
          boxShadow: "none",
          fontFamily: '"Google Sans", sans-serif',
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#8ab4f8",
          color: "#202124",
          "&:hover": {
            backgroundColor: "#aecbfa",
          },
        },
        outlined: {
          borderColor: "#5f6368",
          color: "#8ab4f8",
          "&:hover": {
            backgroundColor: "rgba(138, 180, 248, 0.08)",
            borderColor: "#8ab4f8",
          },
        },
        text: {
          color: "#8ab4f8",
          "&:hover": {
            backgroundColor: "rgba(138, 180, 248, 0.08)",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
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
                  <h4
                    style={{ margin: 0, marginBottom: "4px", fontWeight: 400 }}
                  >
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
                    Miércoles, 27 de Agosto • Buenos días
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
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
                      "&:hover": {
                        backgroundColor: "rgba(138, 180, 248, 0.08)",
                        borderColor: "#8ab4f8",
                      },
                    }}
                  >
                    ⚙️ Configurar
                  </button>
                  <button
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
                      "&:hover": {
                        backgroundColor: "#aecbfa",
                      },
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

            {/* Key Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[
                {
                  title: "Total Libros",
                  value: "247",
                  change: "+12%",
                  positive: true,
                  icon: "📚",
                  color: "#8ab4f8",
                },
                {
                  title: "En Progreso",
                  value: "12",
                  change: "+3",
                  positive: true,
                  icon: "📖",
                  color: "#81c995",
                },
                {
                  title: "Terminados",
                  value: "89",
                  change: "+8",
                  positive: true,
                  icon: "✅",
                  color: "#fdd663",
                },
                {
                  title: "Promedio/Mes",
                  value: "6.2",
                  change: "+1.4",
                  positive: true,
                  icon: "📈",
                  color: "#f28b82",
                },
              ].map((metric, i) => (
                <div
                  key={i}
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

            {/* Main Content Grid */}
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
                    3 libros
                  </span>
                </div>
                <div style={{ padding: "0" }}>
                  {[
                    {
                      title: "Clean Code",
                      author: "Robert C. Martin",
                      progress: 65,
                      pages: "464p",
                    },
                    {
                      title: "The Pragmatic Programmer",
                      author: "Andy Hunt",
                      progress: 23,
                      pages: "352p",
                    },
                    {
                      title: "Design Patterns",
                      author: "Gang of Four",
                      progress: 88,
                      pages: "395p",
                    },
                  ].map((book, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "20px 24px",
                        borderBottom: i < 2 ? "1px solid #3c4043" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#3c4043",
                        },
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            color: "#e8eaed",
                            marginBottom: "4px",
                            fontFamily: '"Google Sans", sans-serif',
                          }}
                        >
                          {book.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#9aa0a6",
                            fontFamily: '"Google Sans", sans-serif',
                          }}
                        >
                          {book.author} • {book.pages}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          minWidth: "140px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "6px",
                            backgroundColor: "#5f6368",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${book.progress}%`,
                              height: "100%",
                              backgroundColor:
                                book.progress > 80
                                  ? "#81c995"
                                  : book.progress > 50
                                  ? "#fdd663"
                                  : "#8ab4f8",
                              borderRadius: "3px",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#e8eaed",
                            minWidth: "35px",
                            textAlign: "right",
                            fontFamily: '"Google Sans", sans-serif',
                          }}
                        >
                          {book.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                  }}
                >
                  <button
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
                      "&:hover": {
                        backgroundColor: "rgba(138, 180, 248, 0.08)",
                        borderColor: "#8ab4f8",
                      },
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
                      { icon: "➕", text: "Añadir Libro", color: "#8ab4f8" },
                      {
                        icon: "🔍",
                        text: "Buscar en Google Books",
                        color: "#81c995",
                      },
                      { icon: "📊", text: "Ver Analytics", color: "#fdd663" },
                    ].map((action, i) => (
                      <button
                        key={i}
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
                          "&:hover": {
                            backgroundColor: "#3c4043",
                            borderColor: action.color,
                          },
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
                        89 de 120 libros
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#81c995",
                          fontFamily: '"Google Sans", sans-serif',
                        }}
                      >
                        74%
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
                          width: "74%",
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
                    ¡Vas muy bien! Faltan 31 libros para alcanzar tu meta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
