// ===== COMPONENTE TEMPORAL PARA TESTING DE SERVICIOS =====
// Crea este archivo en src/components/testing/ServiceTester.jsx

import React, { useState } from "react";
import { analyticsService } from "../../services/analyticsService";
import { googleBooksService } from "../../services/googleBooksService";
import { bookService } from "../../services/bookService";

const ServiceTester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // Helper para manejar tests
  const runTest = async (testName, testFunction) => {
    setLoading((prev) => ({ ...prev, [testName]: true }));
    setErrors((prev) => ({ ...prev, [testName]: null }));

    try {
      console.log(`🧪 Ejecutando test: ${testName}`);
      const result = await testFunction();
      setResults((prev) => ({ ...prev, [testName]: result.data }));
      console.log(`✅ Test ${testName} exitoso:`, result.data);
    } catch (error) {
      console.error(`❌ Test ${testName} falló:`, error);
      setErrors((prev) => ({ ...prev, [testName]: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, [testName]: false }));
    }
  };

  // === TESTS ANALYTICS SERVICE ===
  const testAnalyticsDashboard = () => {
    runTest("analytics-dashboard", () => analyticsService.getDashboard());
  };

  const testAnalyticsQuick = () => {
    runTest("analytics-quick", () => analyticsService.getQuickMetrics());
  };

  const testAnalyticsProductivity = () => {
    runTest("analytics-productivity", () =>
      analyticsService.getProductivityStats()
    );
  };

  const testAnalyticsYearly = () => {
    runTest("analytics-yearly", () => analyticsService.getYearlyProgress());
  };

  // === TESTS GOOGLE BOOKS SERVICE ===
  const testGoogleBooksSearch = () => {
    runTest("google-search", () =>
      googleBooksService.search("harry potter", 5)
    );
  };

  const testGoogleBooksISBN = () => {
    runTest("google-isbn", () =>
      googleBooksService.searchByISBN("9788478884457")
    );
  };

  const testGoogleBooksAuthor = () => {
    runTest("google-author", () =>
      googleBooksService.searchByAuthor("Stephen King", 5)
    );
  };

  const testHybridSearch = () => {
    runTest("hybrid-search", () =>
      googleBooksService.hybridSearch("tolkien", { maxResults: 5 })
    );
  };

  const testAutocomplete = () => {
    runTest("autocomplete", () => googleBooksService.getAutocomplete("harry"));
  };

  // === TESTS BOOK SERVICE (YA EXISTENTE) ===
  const testBooksAll = () => {
    runTest("books-all", () => bookService.getAllBooks(0, 5));
  };

  const testBooksReading = () => {
    runTest("books-reading", () => bookService.getCurrentlyReading());
  };

  // === RENDER COMPONENT ===
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#202124",
        color: "#e8eaed",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            color: "#8ab4f8",
            marginBottom: "24px",
            fontFamily: '"Google Sans", sans-serif',
          }}
        >
          🧪 Service Tester - Phase 2 Verification
        </h2>

        {/* ANALYTICS SERVICE TESTS */}
        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #5f6368",
          }}
        >
          <h3 style={{ color: "#81c995", marginBottom: "16px" }}>
            📊 Analytics Service Tests
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <TestButton
              onClick={testAnalyticsDashboard}
              loading={loading["analytics-dashboard"]}
              error={errors["analytics-dashboard"]}
              success={results["analytics-dashboard"]}
            >
              Dashboard Stats
            </TestButton>
            <TestButton
              onClick={testAnalyticsQuick}
              loading={loading["analytics-quick"]}
              error={errors["analytics-quick"]}
              success={results["analytics-quick"]}
            >
              Quick Metrics
            </TestButton>
            <TestButton
              onClick={testAnalyticsProductivity}
              loading={loading["analytics-productivity"]}
              error={errors["analytics-productivity"]}
              success={results["analytics-productivity"]}
            >
              Productivity Stats
            </TestButton>
            <TestButton
              onClick={testAnalyticsYearly}
              loading={loading["analytics-yearly"]}
              error={errors["analytics-yearly"]}
              success={results["analytics-yearly"]}
            >
              Yearly Progress
            </TestButton>
          </div>
        </div>

        {/* GOOGLE BOOKS SERVICE TESTS */}
        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #5f6368",
          }}
        >
          <h3 style={{ color: "#fdd663", marginBottom: "16px" }}>
            🌐 Google Books Service Tests
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <TestButton
              onClick={testGoogleBooksSearch}
              loading={loading["google-search"]}
              error={errors["google-search"]}
              success={results["google-search"]}
            >
              Basic Search
            </TestButton>
            <TestButton
              onClick={testGoogleBooksISBN}
              loading={loading["google-isbn"]}
              error={errors["google-isbn"]}
              success={results["google-isbn"]}
            >
              ISBN Search
            </TestButton>
            <TestButton
              onClick={testGoogleBooksAuthor}
              loading={loading["google-author"]}
              error={errors["google-author"]}
              success={results["google-author"]}
            >
              Author Search
            </TestButton>
            <TestButton
              onClick={testHybridSearch}
              loading={loading["hybrid-search"]}
              error={errors["hybrid-search"]}
              success={results["hybrid-search"]}
            >
              Hybrid Search
            </TestButton>
            <TestButton
              onClick={testAutocomplete}
              loading={loading["autocomplete"]}
              error={errors["autocomplete"]}
              success={results["autocomplete"]}
            >
              Autocomplete
            </TestButton>
          </div>
        </div>

        {/* BOOK SERVICE TESTS (EXISTENTE) */}
        <div
          style={{
            backgroundColor: "#303134",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #5f6368",
          }}
        >
          <h3 style={{ color: "#f28b82", marginBottom: "16px" }}>
            📚 Book Service Tests (Existing)
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <TestButton
              onClick={testBooksAll}
              loading={loading["books-all"]}
              error={errors["books-all"]}
              success={results["books-all"]}
            >
              All Books
            </TestButton>
            <TestButton
              onClick={testBooksReading}
              loading={loading["books-reading"]}
              error={errors["books-reading"]}
              success={results["books-reading"]}
            >
              Currently Reading
            </TestButton>
          </div>
        </div>

        {/* RESULTS DISPLAY */}
        <div
          style={{
            backgroundColor: "#28292c",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #5f6368",
          }}
        >
          <h4 style={{ color: "#9aa0a6", marginBottom: "12px" }}>
            📋 Test Results (Check Console for Details)
          </h4>
          <pre
            style={{
              color: "#e8eaed",
              fontSize: "0.75rem",
              backgroundColor: "#202124",
              padding: "12px",
              borderRadius: "4px",
              overflow: "auto",
              maxHeight: "200px",
            }}
          >
            {JSON.stringify({ results, errors }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Componente helper para botones de test
const TestButton = ({ children, onClick, loading, error, success }) => {
  let bgColor = "#5f6368";
  let textColor = "#e8eaed";
  let icon = "🧪";

  if (loading) {
    bgColor = "#8ab4f8";
    textColor = "#202124";
    icon = "⏳";
  } else if (error) {
    bgColor = "#f28b82";
    textColor = "#202124";
    icon = "❌";
  } else if (success) {
    bgColor = "#81c995";
    textColor = "#202124";
    icon = "✅";
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        backgroundColor: bgColor,
        color: textColor,
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: '"Google Sans", sans-serif',
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease",
      }}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default ServiceTester;
