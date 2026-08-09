import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import AIRecommendation from "./components/AIRecommendation";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async (product) => {
    setSearchQuery(product);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/products"
      );

      const data = await response.json();

      const searchText = product
        .toLowerCase()
        .replace(/\s+/g, "");

      const results = data.filter(
        (item) =>
          item.Product.toLowerCase().replace(/\s+/g, "") ===
          searchText
      );

      setProducts(results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const lowestPrice =
    products.length > 0
      ? Math.min(...products.map((product) => product.Price))
      : 0;

  const cheapestProduct =
    products.length > 0
      ? products.reduce((cheapest, current) =>
          current.Price < cheapest.Price
            ? current
            : cheapest
        )
      : null;

  const bestOverallProduct =
    products.length > 0
      ? products.reduce((best, current) => {
          const currentScore =
            (lowestPrice / current.Price) * 0.5 +
            (current.Rating / 5) * 0.3 +
            (1 / parseInt(current.Delivery)) * 0.2;

          const bestScore =
            (lowestPrice / best.Price) * 0.5 +
            (best.Rating / 5) * 0.3 +
            (1 / parseInt(best.Delivery)) * 0.2;

          return currentScore > bestScore
            ? current
            : best;
        })
      : null;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
        width: "100%",
      }}
    >
      <h1>🛒 ShopIQ AI</h1>

      <h3>Shop Smarter. Save More.</h3>

      <SearchBar onSearch={handleSearch} />

      {searchQuery && (
        <h2>
          Results for: <strong>{searchQuery}</strong>
        </h2>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "20px",
          width: "90%",
          maxWidth: "1200px",
          margin: "30px auto",
        }}
      >
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            isCheapest={
              cheapestProduct &&
              product.Platform ===
                cheapestProduct.Platform
            }
            isBestOverall={
              bestOverallProduct &&
              product.Platform ===
                bestOverallProduct.Platform
            }
          />
        ))}
      </div>

      <AIRecommendation products={products} />
    </div>
  );
}

export default App;