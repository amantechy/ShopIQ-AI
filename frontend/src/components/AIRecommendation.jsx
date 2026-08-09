import { useState } from "react";

function AIRecommendation({ products }) {
  const [aiExplanation, setAiExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  if (products.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(
    ...products.map((product) => product.Price)
  );

  const scoredProducts = products.map((product) => {
    const priceScore = lowestPrice / product.Price;
    const ratingScore = product.Rating / 5;

    const deliveryDays = parseInt(product.Delivery);
    const deliveryScore = 1 / deliveryDays;

    const totalScore =
      priceScore * 0.5 +
      ratingScore * 0.3 +
      deliveryScore * 0.2;

    return {
      ...product,
      priceScore,
      ratingScore,
      deliveryScore,
      totalScore,
    };
  });

  const bestProduct = scoredProducts.reduce((best, current) =>
    current.totalScore > best.totalScore ? current : best
  );

  const getAIExplanation = async () => {
    setLoading(true);
    setAiExplanation("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/ai-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bestProduct: bestProduct,
            products: products,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setAiExplanation("AI error: " + data.error);
      } else {
        setAiExplanation(data.explanation);
      }
    } catch (error) {
      setAiExplanation(
        "Could not connect to the AI service."
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        margin: "40px auto",
        padding: "25px",
        width: "90%",
        maxWidth: "800px",
        border: "2px solid #555",
        borderRadius: "15px",
        textAlign: "left",
      }}
    >
      <h2>🤖 ShopIQ AI Recommendation</h2>

      <h3>
        🏆 Recommended: {bestProduct.Platform}
      </h3>

      <p>
        <strong>Price:</strong> ₹
        {bestProduct.Price.toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {bestProduct.Rating}
      </p>

      <p>
        <strong>Delivery:</strong> {bestProduct.Delivery}
      </p>

      <hr />

      <h3>📊 Decision Breakdown</h3>

      <p>
        💰 Price Score:{" "}
        {(bestProduct.priceScore * 100).toFixed(1)}%
      </p>

      <p>
        ⭐ Rating Score:{" "}
        {(bestProduct.ratingScore * 100).toFixed(1)}%
      </p>

      <p>
        🚚 Delivery Score:{" "}
        {(bestProduct.deliveryScore * 100).toFixed(1)}%
      </p>

      <p>
        🧮 Overall Score:{" "}
        {(bestProduct.totalScore * 100).toFixed(1)}%
      </p>

      <hr />

      <button onClick={getAIExplanation}>
        {loading ? "🤖 AI is thinking..." : "✨ Ask ShopIQ AI"}
      </button>

      {aiExplanation && (
        <div style={{ marginTop: "20px" }}>
          <h3>💡 AI Explanation</h3>

          <p>{aiExplanation}</p>
        </div>
      )}
    </div>
  );
}

export default AIRecommendation;