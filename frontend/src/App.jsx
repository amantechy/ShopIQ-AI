function App() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Arial",
      }}
    >
      <h1>🛒 ShopIQ AI</h1>

      <h3>Shop Smarter. Save More.</h3>

      <input
        type="text"
        placeholder="Search for a product..."
        style={{
          width: "350px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      />

      <br />
      <br />

      <button
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}

export default App;