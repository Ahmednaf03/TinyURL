import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUrlStats} from "../utils/urls";
import type { UrlItem } from "../types/types";

export default function StatusPage() {
  const { code } = useParams();
  const [stats, setStats] = useState<UrlItem | null>(null);
  const [error, setError] = useState("");

  const originalUrl = stats?.originalUrl.trim() ?? "";
  const shortUrl = stats?.shortUrl.trim() ?? "";

  useEffect(() => {
    if (!code) return;
    getUrlStats(code).then((data) => {
      if ("error" in data) setError(data.error as string);
      else setStats(data);
    });
  }, [code]);

  if (error)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-[24px] border border-rose-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
          <p className="mb-3 text-sm font-medium text-rose-600">{error}</p>
          <Link to="/" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Back
          </Link>
        </div>
      </div>
    );

  if (!stats)
    return (
      <p className="mt-10 text-center text-sm font-medium text-slate-500">Loading stats...</p>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef2f7_100%)] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Link details</h2>
          <p className="text-sm text-slate-500">
            Short code:
            <span className="ml-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{code}</span>
          </p>
        </div>

        <div className="mt-6 space-y-4 text-sm text-slate-700 sm:text-base">
          <p>
            <span className="mr-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Original URL
            </span>
            <a href={originalUrl} className="break-all text-blue-700 hover:underline">
              {originalUrl}
            </a>
          </p>

          <p>
            <span className="mr-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Short URL
            </span>
            <a href={shortUrl} className="break-all text-blue-700 hover:underline">
              {shortUrl}
            </a>
          </p>

          <p>
            <span className="mr-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Visits
            </span>
            {stats.visitCount}
          </p>

          <p>
            <span className="mr-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Created
            </span>
            {new Date(stats.createdAt).toLocaleString()}
          </p>
        </div>

        <Link to="/" className="mt-8 inline-flex text-sm font-semibold text-blue-700 hover:underline">
          ← Back
        </Link>
      </div>
    </div>
  );
}
