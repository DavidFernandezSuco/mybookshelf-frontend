// ===== Books.jsx - PÁGINA FUNCIONAL DE LIBROS =====
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bookService } from "../services/bookService";

const Books = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ===== ESTADOS =====
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "all"
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Configuración paginación
  const PAGE_SIZE = 12;

  // ===== CARGAR LIBROS =====
  const loadBooks = async (page = 0, status = "all", search = "") => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (status !== "all") {
        // Filtrar por estado específico
        console.log(`📚 Cargando libros con estado: ${status}`);
        response = await bookService.getBooksByStatus(status.toUpperCase());

        // Simular paginación client-side para filtros por estado
        const allBooks = response.data;
        const startIndex = page * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedBooks = allBooks.slice(startIndex, endIndex);

        setBooks(paginatedBooks);
        setTotalElements(allBooks.length);
        setTotalPages(Math.ceil(allBooks.length / PAGE_SIZE));
      } else if (search.trim()) {
        // Búsqueda por query
        console.log(`🔍 Buscando libros: "${search}"`);
        response = await bookService.searchBooks(search);
        setBooks(response.data);
        setTotalElements(response.data.length);
        setTotalPages(1); // Search results in single page
      } else {
        // Cargar todos los libros con paginación
        console.log(`📖 Cargando todos los libros - página ${page}`);
        response = await bookService.getAllBooks(
          page,
          PAGE_SIZE,
          "createdAt",
          "desc"
        );

        if (response.data.content) {
          // Respuesta paginada del backend
          setBooks(response.data.content);
          setTotalElements(response.data.totalElements);
          setTotalPages(response.data.totalPages);
        } else {
          // Respuesta como array simple
          setBooks(response.data);
          setTotalElements(response.data.length);
          setTotalPages(1);
        }
      }

      console.log("✅ Libros cargados:", response.data);
    } catch (error) {
      console.error("❌ Error cargando libros:", error);
      setError("Error cargando los libros. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  // ===== EFECTOS =====
  useEffect(() => {
    loadBooks(currentPage, selectedStatus, searchQuery);
  }, [currentPage, selectedStatus]);

  // Efecto para búsqueda con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setCurrentPage(0);
        loadBooks(0, "all", searchQuery);
      } else if (!searchQuery && selectedStatus === "all") {
        loadBooks(0, selectedStatus);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ===== HANDLERS =====
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(0);
    setSearchQuery("");

    // Actualizar URL
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookClick = (bookId) => {
    // TODO: Implementar página de detalle
    console.log("📖 Ver detalle del libro:", bookId);
    // navigate(`/books/${bookId}`);
  };

  // ===== LOADING STATE =====
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
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>📚</div>
          <div>Cargando tu biblioteca...</div>
        </div>
      </div>
    );
  }

  // ===== ERROR STATE =====
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
          <div style={{ marginBottom: "8px" }}>Error cargando libros</div>
          <div style={{ fontSize: "0.875rem", color: "#9aa0a6" }}>{error}</div>
          <button
            onClick={() => loadBooks(currentPage, selectedStatus, searchQuery)}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #5f6368",
              backgroundColor: "transparent",
              color: "#8ab4f8",
              cursor: "pointer",
              fontFamily: '"Google Sans", sans-serif',
            }}
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ===== RENDER PRINCIPAL =====
  return (
    <div
      style={{
        padding: "24px",
        color: "#e8eaed",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#202124",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h4
              style={{
                margin: 0,
                marginBottom: "4px",
                fontFamily: '"Google Sans", sans-serif',
                fontWeight: 400,
                color: "#e8eaed",
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
              {totalElements} {totalElements === 1 ? "libro" : "libros"}
              {selectedStatus !== "all" &&
                ` • Filtrado por: ${getStatusLabel(selectedStatus)}`}
              {searchQuery && ` • Búsqueda: "${searchQuery}"`}
            </p>
          </div>

          <button
            onClick={() => navigate("/books/add")}
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
            ➕ Añadir Libro
          </button>
        </div>

        {/* Search & Filters */}
        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            border: "1px solid #5f6368",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Search Bar */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Buscar por título, autor, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Status Filters */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "all", label: "Todos", emoji: "📚", count: totalElements },
              { key: "wishlist", label: "Lista Deseos", emoji: "❤️" },
              { key: "reading", label: "Leyendo", emoji: "📖" },
              { key: "finished", label: "Terminados", emoji: "✅" },
              { key: "paused", label: "En Pausa", emoji: "⏸️" },
              { key: "abandoned", label: "Abandonados", emoji: "❌" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleStatusFilter(filter.key)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border:
                    selectedStatus === filter.key
                      ? "2px solid #8ab4f8"
                      : "1px solid #5f6368",
                  backgroundColor:
                    selectedStatus === filter.key
                      ? "rgba(138, 180, 248, 0.1)"
                      : "transparent",
                  color: selectedStatus === filter.key ? "#8ab4f8" : "#9aa0a6",
                  fontSize: "0.875rem",
                  fontWeight: selectedStatus === filter.key ? 500 : 400,
                  cursor: "pointer",
                  fontFamily: '"Google Sans", sans-serif',
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => handleBookClick(book.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "32px",
                }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid #5f6368",
                    backgroundColor: "transparent",
                    color: currentPage === 0 ? "#5f6368" : "#e8eaed",
                    cursor: currentPage === 0 ? "not-allowed" : "pointer",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  ← Anterior
                </button>

                <span
                  style={{
                    color: "#9aa0a6",
                    fontSize: "0.875rem",
                  }}
                >
                  Página {currentPage + 1} de {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid #5f6368",
                    backgroundColor: "transparent",
                    color:
                      currentPage >= totalPages - 1 ? "#5f6368" : "#e8eaed",
                    cursor:
                      currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div
            style={{
              backgroundColor: "#303134",
              borderRadius: "12px",
              border: "1px solid #5f6368",
              padding: "48px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
              {searchQuery ? "🔍" : selectedStatus !== "all" ? "📂" : "📚"}
            </div>
            <h5
              style={{
                margin: 0,
                marginBottom: "8px",
                fontFamily: '"Google Sans", sans-serif',
                color: "#e8eaed",
              }}
            >
              {searchQuery
                ? "Sin resultados de búsqueda"
                : selectedStatus !== "all"
                ? `No hay libros en ${getStatusLabel(selectedStatus)}`
                : "Tu biblioteca está vacía"}
            </h5>
            <p
              style={{
                margin: 0,
                color: "#9aa0a6",
                marginBottom: "24px",
              }}
            >
              {searchQuery
                ? `No se encontraron libros que coincidan con "${searchQuery}"`
                : selectedStatus !== "all"
                ? `No tienes libros con el estado ${getStatusLabel(
                    selectedStatus
                  )}`
                : "Comienza añadiendo tu primer libro"}
            </p>

            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              {(searchQuery || selectedStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleStatusFilter("all");
                  }}
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
                  🔄 Ver todos los libros
                </button>
              )}

              <button
                onClick={() => navigate("/books/add")}
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
                }}
              >
                ➕ Añadir Libro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== COMPONENTE BOOK CARD CON PORTADAS =====
const BookCard = ({ book, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      WISHLIST: "#f28b82",
      READING: "#81c995",
      FINISHED: "#fdd663",
      PAUSED: "#8ab4f8",
      ABANDONED: "#9aa0a6",
    };
    return colors[status] || "#9aa0a6";
  };

  const getStatusEmoji = (status) => {
    const emojis = {
      WISHLIST: "❤️",
      READING: "📖",
      FINISHED: "✅",
      PAUSED: "⏸️",
      ABANDONED: "❌",
    };
    return emojis[status] || "📚";
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#303134",
        borderRadius: "12px",
        border: "1px solid #5f6368",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#3c4043";
        e.currentTarget.style.borderColor = "#8ab4f8";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#303134";
        e.currentTarget.style.borderColor = "#5f6368";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Book Cover */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#202124",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {book.thumbnail ? (
          <img
            src={book.thumbnail.replace("http://", "https://")}
            alt={book.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              // Fallback si la imagen no carga
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback cuando no hay imagen */}
        <div
          style={{
            display: book.thumbnail ? "none" : "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#28292c",
            color: "#9aa0a6",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "8px" }}>📖</div>
            <div style={{ fontSize: "0.75rem" }}>Sin portada</div>
          </div>
        </div>

        {/* Status Badge overlay */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: `${getStatusColor(book.status)}`,
            color: "#202124",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <span>{getStatusEmoji(book.status)}</span>
          <span>{getStatusLabel(book.status)}</span>
        </div>

        {/* Pages badge */}
        {book.totalPages > 0 && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#e8eaed",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            📄 {book.totalPages}p
          </div>
        )}
      </div>

      {/* Book Info */}
      <div style={{ padding: "16px" }}>
        {/* Book Title */}
        <h6
          style={{
            margin: "0 0 8px 0",
            color: "#e8eaed",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.title}
        </h6>

        {/* Author */}
        <p
          style={{
            margin: "0 0 8px 0",
            color: "#9aa0a6",
            fontSize: "0.875rem",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          👨‍💼 {book.author}
        </p>

        {/* Description */}
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

        {/* Footer Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "#5f6368",
            marginTop: "auto",
          }}
        >
          <span>{book.isbn && `📚 ${book.isbn.slice(-4)}`}</span>
          <span>
            {book.createdAt && new Date(book.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

// ===== HELPER FUNCTIONS =====
const getStatusLabel = (status) => {
  const labels = {
    WISHLIST: "Lista Deseos",
    READING: "Leyendo",
    FINISHED: "Terminado",
    PAUSED: "En Pausa",
    ABANDONED: "Abandonado",
    all: "Todos",
  };
  return labels[status] || status;
};

export default Books;
