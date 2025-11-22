import { useState } from "react";
import { createUrl } from "../utils/urls";

export default function UrlForm({ onAdded }: { onAdded: () => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) return setError("Please enter a long URL");

    setLoading(true);
    const result = await createUrl(url);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
    } else {
      setUrl("");
      onAdded();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded-xl shadow">
      <input
        className="w-full p-3 border rounded-lg"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
