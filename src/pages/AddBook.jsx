// ===== AddBook.jsx - FORMULARIO INTELIGENTE CON GOOGLE BOOKS =====
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleBooksService } from "../services/googleBooksService";
import { bookService } from "../services/bookService";

const AddBook = () => {
  const navigate = useNavigate();

  // ===== ESTADOS =====
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [importError, setImportError] = useState(null);

  // Estados para formulario manual
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualBook, setManualBook] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    pages: "",
    status: "WISHLIST",
  });

  // ===== BÚSQUEDA EN GOOGLE BOOKS =====
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      console.log("🔍 Buscando en Google Books:", query);
      const response = await googleBooksService.search(query, 10);

      // Formatear resultados para UI
      const formattedResults = response.data.map((book) =>
        googleBooksService.formatBookForUI(book)
      );

      setSearchResults(formattedResults);
      console.log("✅ Resultados encontrados:", formattedResults.length);
    } catch (error) {
      console.error("❌ Error búsqueda Google Books:", error);
      setSearchError("Error buscando libros. Intenta de nuevo.");
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para búsqueda automática
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ===== IMPORTAR LIBRO DESDE GOOGLE BOOKS =====
  const handleImportBook = async (googleBook) => {
    setIsImporting(true);
    setImportError(null);

    try {
      console.log("📥 Importando libro:", googleBook.title);

      // TEMPORALMENTE: Saltamos verificación de duplicados por CORS
      // TODO: Configurar CORS en backend para /api/books/check-duplicate
      console.log("⚠️ Saltando verificación duplicados por CORS error");

      // SOLUCIÓN: Formato correcto de datos + fechas válidas
      const bookData = {
        title: googleBook.title || "Título de prueba",
        author: googleBook.authors ? googleBook.authors[0] : "Autor de prueba",
        isbn: googleBook.isbn || null,
        description: googleBook.description || null,
        totalPages: googleBook.pageCount || null,
        publisher: googleBook.publisher || null,
        // FIX: Formato correcto de fecha (YYYY-MM-DD) o null
        publishedDate:
          googleBook.publishedDate && googleBook.publishedDate.length >= 4
            ? googleBook.publishedDate.length === 4
              ? `${googleBook.publishedDate}-01-01` // Año solo -> YYYY-01-01
              : googleBook.publishedDate.substring(0, 10) // Truncar a YYYY-MM-DD
            : null,
        status: "WISHLIST",
      };

      console.log("🔍 DEBUG - Datos mínimos:", bookData);
      const createResponse = await bookService.createBook(bookData);

      console.log("✅ Libro creado exitosamente:", createResponse.data);

      // Mostrar éxito y navegar
      alert(`✅ ¡"${googleBook.title}" agregado exitosamente!`);
      navigate("/books");
    } catch (error) {
      console.error("❌ Error importando libro:", error);
      setImportError("Error guardando el libro. Intenta de nuevo.");
    } finally {
      setIsImporting(false);
    }
  };

  // ===== CREAR LIBRO MANUALMENTE =====
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setIsImporting(true);
    setImportError(null);

    try {
      console.log("📝 Creando libro manualmente:", manualBook);

      const bookData = {
        title: manualBook.title,
        author: manualBook.author,
        isbn: manualBook.isbn,
        description: manualBook.description,
        pages: parseInt(manualBook.pages) || 0,
        status: manualBook.status,
      };

      const response = await bookService.createBook(bookData);
      console.log("✅ Libro creado manualmente:", response.data);

      alert(`✅ ¡"${manualBook.title}" creado exitosamente!`);
      navigate("/books");
    } catch (error) {
      console.error("❌ Error creando libro:", error);
      setImportError("Error creando el libro. Verifica los datos.");
    } finally {
      setIsImporting(false);
    }
  };

  // ===== RENDER =====
  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#202124",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontFamily: '"Google Sans", sans-serif',
                fontWeight: 400,
                color: "#e8eaed",
              }}
            >
              ➕ Añadir Nuevo Libro
            </h4>
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #5f6368",
                backgroundColor: "transparent",
                color: "#8ab4f8",
                fontSize: "0.875rem",
                cursor: "pointer",
                fontFamily: '"Google Sans", sans-serif',
              }}
            >
              {showManualForm ? "🌐 Búsqueda Google" : "📝 Formulario Manual"}
            </button>
          </div>
          <p
            style={{
              margin: 0,
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            {showManualForm
              ? "Crea un libro desde cero con tus propios datos"
              : "Busca y añade libros desde Google Books instantáneamente"}
          </p>
        </div>

        {!showManualForm ? (
          // ===== BÚSQUEDA GOOGLE BOOKS =====
          <>
            {/* Search Bar */}
            <div
              style={{
                backgroundColor: "#303134",
                borderRadius: "12px",
                border: "1px solid #5f6368",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#e8eaed",
                  }}
                >
                  🔍 Buscar en Google Books
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca por título, autor, ISBN..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #5f6368",
                    backgroundColor: "#28292c",
                    color: "#e8eaed",
                    fontSize: "0.875rem",
                    fontFamily: '"Google Sans", sans-serif',
                    outline: "none",
                  }}
                />
              </div>

              {isSearching && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#9aa0a6",
                    fontSize: "0.875rem",
                  }}
                >
                  🔍 Buscando...
                </div>
              )}

              {searchError && (
                <div
                  style={{
                    backgroundColor: "#3c1e1e",
                    border: "1px solid #f28b82",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#f28b82",
                    fontSize: "0.875rem",
                  }}
                >
                  {searchError}
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div
                style={{
                  backgroundColor: "#303134",
                  borderRadius: "12px",
                  border: "1px solid #5f6368",
                  padding: "24px",
                }}
              >
                <h5
                  style={{
                    margin: "0 0 20px 0",
                    color: "#e8eaed",
                    fontFamily: '"Google Sans", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  📚 Resultados ({searchResults.length})
                </h5>

                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  {searchResults.map((book, index) => (
                    <div
                      key={book.id || index}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "16px",
                        backgroundColor: "#28292c",
                        borderRadius: "8px",
                        border: "1px solid #5f6368",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {/* Book Cover */}
                      <div
                        style={{
                          width: "80px",
                          height: "120px",
                          flexShrink: 0,
                          backgroundColor: "#202124",
                          borderRadius: "4px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {book.thumbnail ? (
                          <img
                            src={book.thumbnail}
                            alt={book.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "2rem" }}>📖</span>
                        )}
                      </div>

                      {/* Book Info */}
                      <div style={{ flex: 1 }}>
                        <h6
                          style={{
                            margin: "0 0 8px 0",
                            color: "#e8eaed",
                            fontSize: "1rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {book.title}
                          {book.subtitle && (
                            <span style={{ color: "#9aa0a6" }}>
                              {" "}
                              - {book.subtitle}
                            </span>
                          )}
                        </h6>

                        <p
                          style={{
                            margin: "0 0 8px 0",
                            color: "#9aa0a6",
                            fontSize: "0.875rem",
                          }}
                        >
                          👨‍💼 {book.authors.join(", ")}
                        </p>

                        <p
                          style={{
                            margin: "0 0 8px 0",
                            color: "#9aa0a6",
                            fontSize: "0.75rem",
                          }}
                        >
                          📅 {book.publishedDate} • 📄 {book.pageCount} páginas
                          {book.isbn && ` • 📚 ${book.isbn}`}
                        </p>

                        {book.description && (
                          <p
                            style={{
                              margin: "0 0 12px 0",
                              color: "#9aa0a6",
                              fontSize: "0.75rem",
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {book.description}
                          </p>
                        )}

                        {book.averageRating > 0 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "12px",
                            }}
                          >
                            <span style={{ color: "#fdd663" }}>⭐</span>
                            <span
                              style={{
                                color: "#9aa0a6",
                                fontSize: "0.75rem",
                              }}
                            >
                              {book.averageRating}/5 ({book.ratingsCount}{" "}
                              reseñas)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleImportBook(book)}
                          disabled={isImporting}
                          style={{
                            padding: "10px 20px",
                            borderRadius: "24px",
                            border: "none",
                            backgroundColor: isImporting
                              ? "#5f6368"
                              : "#8ab4f8",
                            color: isImporting ? "#9aa0a6" : "#202124",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            cursor: isImporting ? "not-allowed" : "pointer",
                            fontFamily: '"Google Sans", sans-serif',
                            transition: "all 0.2s ease",
                          }}
                        >
                          {isImporting ? "⏳ Guardando..." : "➕ Añadir"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Import Error */}
            {importError && (
              <div
                style={{
                  backgroundColor: "#3c1e1e",
                  border: "1px solid #f28b82",
                  borderRadius: "8px",
                  padding: "16px",
                  marginTop: "16px",
                  color: "#f28b82",
                  fontSize: "0.875rem",
                }}
              >
                {importError}
              </div>
            )}
          </>
        ) : (
          // ===== FORMULARIO MANUAL =====
          <div
            style={{
              backgroundColor: "#303134",
              borderRadius: "12px",
              border: "1px solid #5f6368",
              padding: "24px",
            }}
          >
            <h5
              style={{
                margin: "0 0 20px 0",
                color: "#e8eaed",
                fontFamily: '"Google Sans", sans-serif',
                fontWeight: 500,
              }}
            >
              📝 Crear Libro Manualmente
            </h5>

            <form onSubmit={handleManualSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                      color: "#e8eaed",
                      fontWeight: 500,
                    }}
                  >
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualBook.title}
                    onChange={(e) =>
                      setManualBook((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #5f6368",
                      backgroundColor: "#28292c",
                      color: "#e8eaed",
                      fontSize: "0.875rem",
                      fontFamily: '"Google Sans", sans-serif',
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                      color: "#e8eaed",
                      fontWeight: 500,
                    }}
                  >
                    Autor *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualBook.author}
                    onChange={(e) =>
                      setManualBook((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #5f6368",
                      backgroundColor: "#28292c",
                      color: "#e8eaed",
                      fontSize: "0.875rem",
                      fontFamily: '"Google Sans", sans-serif',
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                      color: "#e8eaed",
                      fontWeight: 500,
                    }}
                  >
                    ISBN
                  </label>
                  <input
                    type="text"
                    value={manualBook.isbn}
                    onChange={(e) =>
                      setManualBook((prev) => ({
                        ...prev,
                        isbn: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #5f6368",
                      backgroundColor: "#28292c",
                      color: "#e8eaed",
                      fontSize: "0.875rem",
                      fontFamily: '"Google Sans", sans-serif',
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                      color: "#e8eaed",
                      fontWeight: 500,
                    }}
                  >
                    Páginas
                  </label>
                  <input
                    type="number"
                    value={manualBook.pages}
                    onChange={(e) =>
                      setManualBook((prev) => ({
                        ...prev,
                        pages: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #5f6368",
                      backgroundColor: "#28292c",
                      color: "#e8eaed",
                      fontSize: "0.875rem",
                      fontFamily: '"Google Sans", sans-serif',
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                      color: "#e8eaed",
                      fontWeight: 500,
                    }}
                  >
                    Estado
                  </label>
                  <select
                    value={manualBook.status}
                    onChange={(e) =>
                      setManualBook((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #5f6368",
                      backgroundColor: "#28292c",
                      color: "#e8eaed",
                      fontSize: "0.875rem",
                      fontFamily: '"Google Sans", sans-serif',
                      outline: "none",
                    }}
                  >
                    <option value="WISHLIST">📝 Lista de Deseos</option>
                    <option value="READING">📖 Leyendo</option>
                    <option value="FINISHED">✅ Terminado</option>
                    <option value="PAUSED">⏸️ En Pausa</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "0.875rem",
                    color: "#e8eaed",
                    fontWeight: 500,
                  }}
                >
                  Descripción
                </label>
                <textarea
                  value={manualBook.description}
                  onChange={(e) =>
                    setManualBook((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #5f6368",
                    backgroundColor: "#28292c",
                    color: "#e8eaed",
                    fontSize: "0.875rem",
                    fontFamily: '"Google Sans", sans-serif',
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/books")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "24px",
                    border: "1px solid #5f6368",
                    backgroundColor: "transparent",
                    color: "#9aa0a6",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isImporting}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "24px",
                    border: "none",
                    backgroundColor: isImporting ? "#5f6368" : "#8ab4f8",
                    color: isImporting ? "#9aa0a6" : "#202124",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: isImporting ? "not-allowed" : "pointer",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  {isImporting ? "⏳ Creando..." : "➕ Crear Libro"}
                </button>
              </div>
            </form>

            {/* Import Error */}
            {importError && (
              <div
                style={{
                  backgroundColor: "#3c1e1e",
                  border: "1px solid #f28b82",
                  borderRadius: "8px",
                  padding: "16px",
                  marginTop: "16px",
                  color: "#f28b82",
                  fontSize: "0.875rem",
                }}
              >
                {importError}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#28292c",
            border: "1px solid #5f6368",
            borderRadius: "8px",
            padding: "16px",
            marginTop: "24px",
            fontSize: "0.75rem",
            color: "#9aa0a6",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              color: "#e8eaed",
              marginBottom: "8px",
            }}
          >
            💡 Consejos de uso:
          </div>
          <div>• Para mejores resultados, busca por título + autor</div>
          <div>• Los libros se añaden en "Lista de Deseos" por defecto</div>
          <div>
            • Puedes cambiar el estado después desde la página de libros
          </div>
          <div>• La búsqueda es automática mientras escribes</div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
