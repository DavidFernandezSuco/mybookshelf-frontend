// src/components/common/Layout.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
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
} from "@mui/icons-material";

// Ancho del sidebar cuando está abierto
const drawerWidth = 240;

// Componente principal Layout
const Layout = ({ children }) => {
  // Estado para controlar si el sidebar está abierto (mobile)
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hook para detectar el tema de Material-UI
  const theme = useTheme();

  // Hook para detectar si estamos en mobile (pantalla pequeña)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Función para abrir/cerrar el sidebar en mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Opciones del menú sidebar
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Mi Biblioteca", icon: <BookIcon />, path: "/books" },
    { text: "Añadir Libro", icon: <AddIcon />, path: "/add-book" },
    { text: "Buscar Libros", icon: <SearchIcon />, path: "/search" },
    { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
  ];

  // Contenido del Drawer/Sidebar
  const drawerContent = (
    <div>
      {/* Logo/Título en la parte superior del sidebar */}
      <Toolbar>
        <Typography variant="h6" noWrap>
          📚 MyBookShelf
        </Typography>
      </Toolbar>

      {/* Lista de opciones del menú */}
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* BARRA SUPERIOR (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
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

          {/* Título principal */}
          <Typography variant="h6" noWrap component="div">
            MyBookShelf - Gestión Personal de Biblioteca
          </Typography>
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
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
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
