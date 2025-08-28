// ===== LAYOUT.JSX CORREGIDO =====
// src/components/common/Layout.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton, // ← CAMBIO IMPORTANTE
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

// Ancho del sidebar cuando está abierto
const drawerWidth = 240;

// Componente principal Layout
const Layout = ({ children }) => {
  // Estado para controlar si el sidebar está abierto (mobile)
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hooks para navegación y ubicación actual
  const navigate = useNavigate();
  const location = useLocation();

  // Hook para detectar el tema de Material-UI
  const theme = useTheme();

  // Hook para detectar si estamos en mobile (pantalla pequeña)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Función para abrir/cerrar el sidebar en mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función para navegar y cerrar mobile drawer
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Opciones del menú sidebar con navegación
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
      description: "Vista general de tu biblioteca",
    },
    {
      text: "Mi Biblioteca",
      icon: <BookIcon />,
      path: "/books",
      description: "Gestionar todos tus libros",
    },
    {
      text: "Añadir Libro",
      icon: <AddIcon />,
      path: "/books/add",
      description: "Agregar nuevos libros",
    },
    {
      text: "Autores",
      icon: <PersonIcon />,
      path: "/authors",
      description: "Gestionar autores",
    },
    {
      text: "Géneros",
      icon: <CategoryIcon />,
      path: "/genres",
      description: "Organizar por categorías",
    },
    {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
      description: "Estadísticas de lectura",
    },
  ];

  // Contenido del Drawer/Sidebar
  const drawerContent = (
    <div>
      {/* Logo/Título en la parte superior del sidebar */}
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          onClick={() => handleNavigation("/")}
          sx={{
            cursor: "pointer",
            fontFamily: '"Google Sans", sans-serif',
            fontWeight: 500,
            color: "#e8eaed",
          }}
        >
          📚 MyBookShelf
        </Typography>
      </Toolbar>

      {/* Lista de opciones del menú */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton // ← CAMBIO: Era ListItem button, ahora ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
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
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                color: location.pathname === item.path ? "#202124" : "#9aa0a6",
                "& .MuiSvgIcon-root": {
                  fontSize: "20px",
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.875rem",
                  fontWeight: location.pathname === item.path ? 500 : 400,
                  color:
                    location.pathname === item.path ? "#202124" : "#e8eaed",
                  lineHeight: 1.25,
                  fontFamily: '"Google Sans", sans-serif',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Sección de información en la parte inferior */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 2,
          borderTop: "1px solid #5f6368",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#9aa0a6",
            fontSize: "0.75rem",
            textAlign: "center",
            fontFamily: '"Google Sans", sans-serif',
          }}
        >
          Phase 2: Routing & Navigation ✅
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#5f6368",
            fontSize: "0.65rem",
            textAlign: "center",
            fontFamily: '"Google Sans", sans-serif',
          }}
        >
          MyBookShelf v0.2.0
        </Typography>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* BARRA SUPERIOR (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#202124",
          color: "#e8eaed",
          boxShadow: "none",
          borderBottom: "1px solid #5f6368",
          height: "64px",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
            height: "64px",
            paddingLeft: "24px !important",
            paddingRight: "24px !important",
          }}
        >
          {/* Botón hamburguesa (solo visible en mobile) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título principal con navegación breadcrumb */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: '"Google Sans", sans-serif',
                fontWeight: 400,
                fontSize: "1.125rem",
              }}
            >
              MyBookShelf - Gestión Personal de Biblioteca
            </Typography>

            {/* Breadcrumb dinámico */}
            <Typography
              variant="body2"
              sx={{
                color: "#9aa0a6",
                fontSize: "0.75rem",
                fontFamily: '"Google Sans", sans-serif',
              }}
            >
              {(() => {
                const currentItem = menuItems.find(
                  (item) => item.path === location.pathname
                );
                return currentItem ? currentItem.description : "Navegación";
              })()}
            </Typography>
          </Box>

          {/* Botón de búsqueda rápida */}
          <IconButton
            color="inherit"
            onClick={() => handleNavigation("/books?search=true")}
            sx={{
              mr: 1,
              "&:hover": {
                backgroundColor: "rgba(138, 180, 248, 0.1)",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR/DRAWER */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Drawer para MOBILE (temporal) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#202124",
              borderRight: "1px solid #5f6368",
              boxShadow: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Drawer para DESKTOP (permanente) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#202124",
              borderRight: "1px solid #5f6368",
              boxShadow: "none",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* CONTENIDO PRINCIPAL */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "#202124",
        }}
      >
        {/* Espaciador para la AppBar */}
        <Toolbar />

        {/* Aquí se renderiza el contenido de cada página */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
