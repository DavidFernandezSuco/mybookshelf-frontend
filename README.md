# 📚 MyBookShelf Frontend

> **Aplicación React para gestión personal de biblioteca conectada con API Spring Boot**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5-purple?logo=material-ui)](https://mui.com/)
[![Spring Boot API](https://img.shields.io/badge/API-Spring%20Boot-green?logo=spring)](https://spring.io/)
[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)]()

## 🎯 **Descripción del Proyecto**

MyBookShelf es una aplicación **fullstack** para la gestión personal de bibliotecas que permite:

- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- 📚 **Gestión completa de libros** (CRUD)
- 🔍 **Búsqueda híbrida** (local + Google Books API)
- ➕ **Importación 1-clic** desde fuentes externas
- 📱 **Diseño responsive** y moderno
- ⚡ **Performance optimizada** con React 18

## 🛠️ **Stack Tecnológico**

### **Frontend**

- **React 18** - Biblioteca de UI con Hooks
- **Material-UI v5** - Sistema de diseño moderno
- **Axios** - Cliente HTTP para API calls
- **React Router v6** - Navegación SPA

### **Backend**

- **Spring Boot** - API REST (repositorio separado)
- **Google Books API** - Integración para búsqueda externa
- **Base de datos** - Persistencia de libros y estadísticas

## 🚀 **Características Principales**

### ✅ **Implementado**

- [x] Conexión exitosa React ↔ Spring Boot API
- [x] Dashboard con estadísticas básicas
- [x] Estructura de servicios para API calls
- [x] Manejo de estados de carga y errores
- [x] Configuración completa del entorno de desarrollo

### 🔄 **En Desarrollo**

- [ ] Interfaz Material-UI completa
- [ ] Formularios de gestión de libros
- [ ] Sistema de búsqueda avanzada
- [ ] Integración con Google Books API
- [ ] Sistema de navegación completo
- [ ] Optimizaciones de performance

### 🎯 **Planeado**

- [ ] Testing automatizado
- [ ] Deployment en producción
- [ ] PWA capabilities
- [ ] Funcionalidades offline

## 🖥️ **Capturas de Pantalla**

### Dashboard Principal

![Dashboard](docs/screenshots/dashboard.png)
_Dashboard mostrando conexión exitosa con API y estadísticas_

## ⚡ **Instalación y Ejecución**

### **Prerrequisitos**

- Node.js 18+
- npm o yarn
- Backend Spring Boot corriendo en `localhost:8080`

### **Pasos de instalación**

```bash
# Clonar repositorio
git clone https://github.com/TU-USUARIO/mybookshelf-frontend.git
cd mybookshelf-frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 🏗️ **Arquitectura del Proyecto**

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Layout, navegación, utilidades
│   ├── books/          # Componentes específicos de libros
│   └── dashboard/      # Componentes de analytics
├── pages/              # Páginas principales de la app
├── services/           # Servicios para comunicación con APIs
│   ├── api.js         # Configuración base Axios
│   └── bookService.js # Endpoints específicos de libros
├── hooks/              # Custom hooks reutilizables
└── utils/              # Utilidades y helpers
```

## 🔧 **Configuración del Entorno**

### **Variables de Entorno**

```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_GOOGLE_BOOKS_API_KEY=tu-api-key
```

### **Scripts Disponibles**

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run lint       # Análisis de código
```

## 🤝 **Integración con Backend**

Esta aplicación se comunica con una **API Spring Boot** que proporciona:

- **Endpoints REST** para gestión de libros
- **Sistema de analytics** para estadísticas
- **Integración con Google Books** para búsqueda externa
- **Autenticación** y autorización (planeado)

**Repositorio del Backend:** [mybookshelf-api](enlace-cuando-exista)

## 📈 **Roadmap de Desarrollo**

### **Fase 1: Setup y Conexión** ✅

- Configuración del proyecto React
- Instalación de dependencias
- Primera conexión con API
- Estructura de servicios

### **Fase 2: UI/UX con Material-UI** 🔄

- Layout profesional con sidebar y navbar
- Componentes Material-UI
- Sistema de navegación
- Diseño responsive

### **Fase 3: Funcionalidades Core**

- CRUD completo de libros
- Dashboard con gráficos
- Sistema de búsqueda
- Gestión de estados avanzada

### **Fase 4: Integraciones**

- Google Books API
- Importación de libros
- Búsqueda híbrida
- Funcionalidades offline

### **Fase 5: Production Ready**

- Testing automatizado
- Optimizaciones de performance
- Deployment y CI/CD
- Documentation completa

## 💡 **Decisiones Técnicas**

### **¿Por qué React?**

- Ecosistema maduro y amplio soporte
- Hooks para lógica de estado moderna
- Excelente rendimiento con Virtual DOM
- Gran comunidad y recursos de aprendizaje

### **¿Por qué Material-UI?**

- Componentes accesibles y profesionales
- Sistema de theming flexible
- Excelente documentación
- Compatibilidad con React 18

### **¿Por qué Axios?**

- Interceptors para manejo centralizado de errores
- Sintaxis clara y promesas nativas
- Amplio soporte para configuraciones
- Excelente para APIs REST

## 🎓 **Aprendizajes del Proyecto**

Este proyecto me ha permitido desarrollar habilidades en:

- **React moderno** con Hooks y Context
- **Integración de APIs** REST con manejo de errores
- **UI/UX design** con sistemas de diseño establecidos
- **Arquitectura frontend** escalable y mantenible
- **Tooling moderno** de desarrollo JavaScript
- **Git workflow** y mejores prácticas de versionado

## 📞 **Contacto**

**Desarrollador:** Tu Nombre  
**Email:** tu-email@gmail.com  
**LinkedIn:** [tu-perfil-linkedin]  
**Portfolio:** [tu-portfolio]

---

⭐ **¡Si te gusta este proyecto, no dudes en darle una estrella!** ⭐
