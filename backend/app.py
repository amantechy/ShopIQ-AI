from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from google import genai

app = Flask(__name__)
CORS(app)

# Load product data
products = pd.read_csv("data/products.csv")

# Gemini client
client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


@app.route("/")
def home():
    return "ShopIQ AI Backend is running 🚀"


@app.route("/products")
def get_products():
    return jsonify(products.to_dict(orient="records"))


@app.route("/ai-recommendation", methods=["POST"])
def ai_recommendation():
    data = request.get_json()

    best_product = data.get("bestProduct")
    all_products = data.get("products")

    prompt = f"""
You are ShopIQ AI, a shopping assistant.

Analyze these shopping options:

{all_products}

The recommendation algorithm selected:

{best_product}

Explain to the customer in 2-3 concise sentences why this
product is the best overall choice.

Consider:
- Price
- Rating
- Delivery speed

If another product is cheaper, mention that fact.
Do not invent any information that is not provided.

Return only the explanation, without headings.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )

        return jsonify({
            "explanation": response.text
        })

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)