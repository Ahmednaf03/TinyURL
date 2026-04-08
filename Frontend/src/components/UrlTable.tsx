import { deleteUrl } from "../utils/urls";
import type { UrlItem } from "../types/types";
import {  useNavigate } from "react-router-dom";


export default function UrlTable({ urls, refresh, update }: { urls: UrlItem[]; refresh: () => void, update: () => void }) {
  const navigate = useNavigate();
 
 
  async function handleDelete(code: string) {
    await deleteUrl(code);
    refresh();
  }

  if (!urls.length)
    return (
      <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500">
        No URLs yet. Add one above.
      </div>
    );

  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_40px_-35px_rgba(15,23,42,0.35)]">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-slate-200 text-slate-800">
          <tr>
            <th className="w-[26%] border-b border-slate-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.18em]">Short URL</th>
            <th className="w-[38%] border-b border-slate-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.18em]">Original URL</th>
            <th className="w-[12%] border-b border-slate-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.18em]">Visits</th>
            <th className="w-[24%] border-b border-slate-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.18em]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {urls.map((u) => (
            <tr key={u.code} className="align-top transition hover:bg-slate-50/80">
              <td className="px-4 py-3.5">
                <a
                  href={u.shortUrl}
                  target="_self"
                  className="block break-words font-medium text-blue-700 transition hover:text-blue-800 hover:underline"
                  onClick={update}
                >
                  {u.shortUrl}
                </a>
              </td>

              <td className="px-4 py-3.5">
                <div className="truncate text-slate-600" title={u.originalUrl}>
                  {u.originalUrl}
                </div>
              </td>

              <td className="px-4 py-3.5">
                <span className="inline-flex min-w-10 justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {u.visitCount}
                </span>
              </td>

              <td className="px-4 py-3.5">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(u.shortUrl)}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => navigate(`/code/${u.code}`)}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                  >
                    Stats
                  </button>

                  <button
                    onClick={() => handleDelete(u.code)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
