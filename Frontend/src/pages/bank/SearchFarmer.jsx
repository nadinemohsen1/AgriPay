import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchFarmerPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/bank/search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    if (!res.ok) {
        const text = await res.text();
        console.error("Search failed:", text);
        alert("Search failed. Check backend or login.");
        setLoading(false);
        return;
    }
      const data = await res.json();

      if (data.length === 0) {
        alert("No farmer found");
      } else {
        // Redirect automatically to dashboard of first match
        navigate(`/bank/dashboard/${data[0]._id}`);}

    } catch (err) {
      console.error("Search error:", err);
      alert("Search failed. Check backend or login.");
    }
      setLoading(false);
  };

  return (
    <div className="page">
      <h2>Search Farmer</h2>

      <form onSubmit={search}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}
