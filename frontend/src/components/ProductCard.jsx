function ProductCard({ product, isCheapest, isBestOverall  }) {
  return (
    <div
  style={{
    border: isBestOverall
       ? "2px solid #7b2cbf"
       : isCheapest
       ? "2px solid #4caf50"
       : "1px solid #555",
    borderRadius: "12px",
    padding: "20px",
    width: "100%",
    minHeight: "480px",
    boxSizing: "border-box",
    textAlign: "left",
    position: "relative",
}}
    >
      {isBestOverall && (
  <div
    style={{
      display: "inline-block",
      padding: "5px 10px",
      marginBottom: "10px",
      marginRight: "8px",
      borderRadius: "6px",
      backgroundColor: "#7b2cbf",
      color: "white",
      fontWeight: "bold",
    }}
  >
    🏆 BEST OVERALL
  </div>
)}

{isCheapest && (
  <div
    style={{
      display: "inline-block",
      padding: "5px 10px",
      marginBottom: "10px",
      borderRadius: "6px",
      backgroundColor: "#4caf50",
      color: "white",
      fontWeight: "bold",
    }}
  >
    💰 BEST PRICE
  </div>
)}

      <h2>{product.Platform}</h2>

      <p>
        <strong>Product:</strong> {product.Product}
      </p>

      <p>
        <strong>Price:</strong> ₹
        {product.Price.toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {product.Rating}
      </p>

      <p>
        <strong>Delivery:</strong> {product.Delivery}
      </p>

      <p>
        <strong>Seller:</strong> {product.Seller}
      </p>

      <a
        href={product.Link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Buy Now</button>
      </a>
    </div>
  );
}

export default ProductCard;