# 🛒 ShopIQ AI

### Shop Smarter. Save More.

ShopIQ AI is an AI-powered product comparison web application that helps users compare products across multiple shopping platforms and choose the best overall option.

Instead of checking Amazon, Flipkart, and Croma separately, users can search for a product in one place and see its price, rating, delivery time, seller, and purchase link.

ShopIQ then uses a scoring algorithm to identify the best overall option and Gemini AI to explain the recommendation in natural language.

---

## 🚀 Problem

Online shoppers often have to open multiple shopping platforms to compare:

- Product prices
- Ratings
- Delivery times
- Sellers

This takes time and makes it difficult to decide which option provides the best overall value.

---

## 💡 Our Solution

ShopIQ AI brings these comparisons into one interface.

The user searches for a product, and ShopIQ:

1. Finds the product across supported platforms.
2. Displays price, rating, delivery time, and seller.
3. Identifies the cheapest option.
4. Calculates the best overall option.
5. Explains the recommendation using Gemini AI.
6. Provides a direct "Buy Now" link.

---

## ✨ Key Features

### 🔎 Product Search

Users can search for supported products using the search bar.

### 💰 Price Comparison

Compare prices across:

- Amazon
- Flipkart
- Croma

### 💰 Best Price

ShopIQ automatically identifies the cheapest available option.

### 🏆 Best Overall

ShopIQ calculates an overall score using:

- Price
- Rating
- Delivery speed

### 🤖 Gemini AI Explanation

Gemini generates a natural-language explanation of why a particular product is recommended.

### 📊 Decision Breakdown

Users can see the individual scores used by the recommendation system.

### 🔗 Buy Now

Each product includes a direct purchase link.

### ❌ Product Not Found

If a product is not available in the dataset, ShopIQ displays the supported products so the user can choose another product.

---

## 🧠 How the Recommendation Works

ShopIQ uses a weighted scoring system.

### Price — 50%

Lower prices receive a higher score.

### Rating — 30%

Higher customer ratings receive a higher score.

### Delivery — 20%

Faster delivery receives a higher score.

The product with the highest combined score becomes the **Best Overall** recommendation.

The scoring system is intentionally explainable so users can understand why a product was recommended.

---

## 🤖 Role of AI

The recommendation itself is calculated using a deterministic scoring algorithm.

Gemini AI is then used to generate a natural-language explanation based on the product data and recommendation.

### Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Flask Backend
 │
 ├── Product Dataset
 │
 └── Recommendation Engine
          │
          ▼
      Best Product
          │
          ▼
      Gemini AI
          │
          ▼
   AI Explanation
          │
          ▼
      User

##⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/amantechy/ShopIQ-AI.git
cd ShopIQ-AI

# set up the backend

cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

## configure Gemini AI

$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

## Start the backend

python app.py
The backend will run at
http://127.0.0.1:5000

## Start the frontend
cd frontend
npm install
npm run dev
open the url shown by vite usually
http://localhost:5173