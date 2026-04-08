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
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-[24px] border border-slate-200/80 bg-white px-4 py-4 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.4)] sm:px-5"
    >
      <input
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
