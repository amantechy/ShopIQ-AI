import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }

    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;