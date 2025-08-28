// ===== APP.JS SIMPLIFICADO - SOLO DEFAULT IMPORTS =====
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/common/Layout";

// ===== IMPORTS SIMPLIFICADOS - SOLO PÁGINAS CRÍTICAS =====
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";

import "./App.css";

// ===== TEMA (mantienes el mismo) =====
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8ab4f8",
      light: "#aecbfa",
      dark: "#669df6",
    },
    secondary: {
      main: "#81c995",
      light: "#a8dab5",
      dark: "#5bb974",
    },
    background: {
      default: "#202124",
      paper: "#303134",
    },
    surface: {
      main: "#303134",
      light: "#3c4043",
      dark: "#28292c",
    },
    text: {
      primary: "#e8eaed",
      secondary: "#9aa0a6",
      disabled: "#5f6368",
    },
    divider: "#5f6368",
    success: { main: "#81c995" },
    warning: { main: "#fdd663" },
    error: { main: "#f28b82" },
    info: { main: "#8ab4f8" },
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
          "&:hover": { boxShadow: "none" },
        },
        contained: {
          backgroundColor: "#8ab4f8",
          color: "#202124",
          "&:hover": { backgroundColor: "#aecbfa" },
        },
      },
    },
  },
});

// ===== PLACEHOLDER COMPONENTES TEMPORALES =====
// (Para evitar problemas de imports mientras creamos los archivos)

const PlaceholderPage = ({ title, emoji }) => (
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
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{emoji}</div>
      <h4
        style={{
          margin: 0,
          marginBottom: "8px",
          fontFamily: '"Google Sans", sans-serif',
          color: "#e8eaed",
        }}
      >
        {title}
      </h4>
      <p style={{ margin: 0, color: "#9aa0a6" }}>
        Página en desarrollo - Phase 3+
      </p>
    </div>
  </div>
);

// Componentes placeholder
const AddBook = () => <PlaceholderPage title="Añadir Libro" emoji="➕" />;
const Authors = () => <PlaceholderPage title="Autores" emoji="👥" />;
const Genres = () => <PlaceholderPage title="Géneros" emoji="🏷️" />;
const Analytics = () => <PlaceholderPage title="Analytics" emoji="📊" />;
const NotFound = () => (
  <PlaceholderPage title="Página No Encontrada" emoji="📚❓" />
);

// ===== APP COMPONENT =====
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {/* Página principal - Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Gestión de Libros */}
            <Route path="/books" element={<Books />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/books/:id" element={<Books />} />

            {/* Gestión de Autores */}
            <Route path="/authors" element={<Authors />} />
            <Route path="/authors/:id" element={<Authors />} />

            {/* Gestión de Géneros */}
            <Route path="/genres" element={<Genres />} />

            {/* Analytics Avanzado */}
            <Route path="/analytics" element={<Analytics />} />

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
