// ===== APLICACIÓN PRINCIPAL DE REACT =====
// Este archivo es lo que ve el usuario en el navegador

// Importamos React y funciones que necesitamos
import React, { useState, useEffect } from "react";

// Importamos nuestro servicio para obtener libros
import { bookService } from "./services/bookService";

// Importamos estilos CSS
import "./App.css";

function App() {
  // ===== ESTADOS DEL COMPONENTE =====
  // Estos son como "variables" que React puede cambiar y actualizar la pantalla

  // Lista de libros (empieza vacía)
  const [books, setBooks] = useState([]);

  // ¿Está cargando? (empieza en true)
  const [loading, setLoading] = useState(true);

  // ¿Hay algún error? (empieza sin error)
  const [error, setError] = useState(null);

  // Estadísticas del dashboard
  const [stats, setStats] = useState(null);

  // ===== FUNCIÓN PARA OBTENER LIBROS =====
  const fetchBooks = async () => {
    try {
      console.log("🔄 Iniciando conexión con API...");
      setLoading(true); // Mostrar "cargando..."

      // Pedir libros a la API
      const booksResponse = await bookService.getAllBooks();

      // Obtener los libros de la respuesta
      // Si viene paginado (content), usar eso. Si no, usar todo
      const booksList = booksResponse.data.content || booksResponse.data;
      setBooks(booksList);

      console.log(
        "✅ ¡Conexión exitosa! Libros encontrados:",
        booksList.length
      );

      // Intentar obtener estadísticas también
      try {
        const statsResponse = await bookService.getDashboard();
        setStats(statsResponse.data);
        console.log("📊 Estadísticas obtenidas:", statsResponse.data);
      } catch (statsError) {
        console.warn(
          "⚠️ No se pudieron obtener estadísticas:",
          statsError.message
        );
      }

      setError(null); // No hay error
    } catch (err) {
      console.error("❌ Error conectando con la API:", err.message);
      setError(
        "No se pudo conectar con el backend. ¿Está tu Spring Boot corriendo en localhost:8080?"
      );
    } finally {
      setLoading(false); // Ya no está cargando
    }
  };

  // ===== SE EJECUTA AL CARGAR LA PÁGINA =====
  // useEffect se ejecuta automáticamente cuando se abre la página
  useEffect(() => {
    fetchBooks(); // Llamar a la función para obtener libros
  }, []); // El [] significa "solo una vez al cargar"

  // ===== MIENTRAS ESTÁ CARGANDO =====
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>📚 MyBookShelf</h1>
          <div>🔄 Conectando con tu biblioteca...</div>
          <p>Verificando conexión con localhost:8080...</p>
        </header>
      </div>
    );
  }

  // ===== SI HAY ERROR =====
  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>📚 MyBookShelf</h1>
          <div style={{ color: "#ff6b6b", marginBottom: "20px" }}>
            ❌ {error}
          </div>

          <div style={{ textAlign: "left", maxWidth: "600px" }}>
            <h3>🔧 Para solucionarlo:</h3>
            <ol>
              <li>Verifica que tu backend Spring Boot esté corriendo</li>
              <li>Ve a tu IDE y ejecuta tu aplicación Spring Boot</li>
              <li>Espera a ver "Started Application in X.XXX seconds"</li>
              <li>
                Prueba ir a <code>http://localhost:8080/api/books</code> en tu
                navegador
              </li>
            </ol>
          </div>

          <button
            onClick={fetchBooks}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🔄 Reintentar conexión
          </button>
        </header>
      </div>
    );
  }

  // ===== PANTALLA PRINCIPAL (cuando todo funciona) =====
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 MyBookShelf - ¡CONEXIÓN EXITOSA! ✅</h1>

        {/* MOSTRAR ESTADÍSTICAS SI LAS TENEMOS */}
        {stats && (
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>📊 Estadísticas de tu Biblioteca:</h3>
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <div>📚 Total: {stats.totalBooks}</div>
              <div>📖 Leyendo: {stats.booksReading}</div>
              <div>✅ Terminados: {stats.booksFinished}</div>
              <div>❤️ Lista deseos: {stats.booksWishlist}</div>
            </div>
          </div>
        )}

        {/* MOSTRAR INFORMACIÓN DE LIBROS */}
        <div style={{ marginBottom: "20px" }}>
          <h2>📖 Libros encontrados: {books.length}</h2>
        </div>

        {/* SI TIENES LIBROS, MOSTRARLOS */}
        {books.length > 0 ? (
          <div style={{ maxWidth: "800px", textAlign: "left" }}>
            <h3>🎉 Tus libros desde React:</h3>
            <div
              style={{
                display: "grid",
                gap: "15px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              {books.slice(0, 10).map((book, index) => (
                <div
                  key={book.id || index}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px 0", color: "#61dafb" }}>
                    {book.title}
                  </h4>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    👤 Autores:{" "}
                    {book.authors
                      ?.map((a) => a.fullName || a.name)
                      .join(", ") || "Sin autor"}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    📊 Estado:{" "}
                    <span style={{ color: getStatusColor(book.status) }}>
                      {book.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    📄 Progreso: {book.currentPage}/{book.totalPages} páginas
                    {book.progressPercentage &&
                      ` (${book.progressPercentage.toFixed(1)}%)`}
                  </div>
                </div>
              ))}
            </div>

            {books.length > 10 && (
              <p style={{ textAlign: "center", opacity: "0.7" }}>
                ... y {books.length - 10} libros más
              </p>
            )}
          </div>
        ) : (
          // SI NO TIENES LIBROS
          <div style={{ maxWidth: "600px" }}>
            <h3>📝 Tu biblioteca está vacía</h3>
            <p>¡Perfecto para empezar a añadir libros con React!</p>
            <div
              style={{
                background: "rgba(74, 222, 128, 0.1)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "20px",
              }}
            >
              <strong>✅ ¡Todo funciona correctamente!</strong>
              <br />
              Tu API responde, React se conecta, solo falta añadir libros.
            </div>
          </div>
        )}

        <div style={{ fontSize: "14px", marginTop: "30px", opacity: "0.7" }}>
          🚀 React 18 + Spring Boot + Material-UI = ¡Tu stack está listo!
        </div>
      </header>
    </div>
  );
}

// ===== FUNCIÓN AUXILIAR PARA COLORES DE ESTADO =====
function getStatusColor(status) {
  switch (status) {
    case "READING":
      return "#4CAF50"; // Verde
    case "FINISHED":
      return "#2196F3"; // Azul
    case "WISHLIST":
      return "#FF9800"; // Naranja
    case "PAUSED":
      return "#9E9E9E"; // Gris
    default:
      return "#FFF"; // Blanco
  }
}

// Exportamos el componente para que React pueda usarlo
export default App;
