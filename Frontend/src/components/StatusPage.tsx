import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUrlStats} from "../utils/urls";
import type { UrlItem } from "../types/types";

export default function StatusPage() {
  const { code } = useParams();
  const [stats, setStats] = useState<UrlItem | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;
    getUrlStats(code).then((data) => {
      if ("error" in data) setError(data.error as string);
      else setStats(data);
    });
  }, [code]);

  if (error)
    return (
      <div className="p-4 max-w-lg mx-auto">
        <p className="text-red-500 text-sm mb-3">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          ← Back
        </Link>
      </div>
    );

  if (!stats)
    return (
      <p className="text-center text-gray-500 mt-6">Loading stats…</p>
    );

  return (
    <div className="p-6 max-w-lg mx-auto space-y-3 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold">Stats for: {code}</h2>

      <p>
        <span className="font-medium">Original URL:</span>{" "}
        <a href={stats.originalUrl} className="text-blue-600 hover:underline">
          {stats.originalUrl}
        </a>
      </p>

      <p>
        <span className="font-medium">Short URL:</span>{" "}
        <a href={stats.shortUrl} className="text-blue-600 hover:underline">
          {stats.shortUrl}
        </a>
      </p>

      <p>
        <span className="font-medium">Visits:</span> {stats.visitCount}
      </p>

      <p>
        <span className="font-medium">Created:</span>{" "}
        {new Date(stats.createdAt).toLocaleString()}
      </p>

      <Link to="/" className="text-blue-600 text-sm hover:underline">
        ← Back
      </Link>
    </div>
  );
}
