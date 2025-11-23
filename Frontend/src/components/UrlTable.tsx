import { deleteUrl } from "../utils/urls";
import type { UrlItem } from "../types/types";
import { useNavigate } from "react-router-dom";

export default function UrlTable({ urls, refresh }: { urls: UrlItem[]; refresh: () => void }) {
  const navigate = useNavigate();
  urls.map((u)=>{
    console.log(u.shortUrl);
    
  })
  async function handleDelete(code: string) {
    await deleteUrl(code);
    refresh();
  }

  if (!urls.length)
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow text-center text-sm text-gray-500">
        No URLs yet. Add one above.
      </div>
    );

  return (
    <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Short URL</th>
            <th className="p-3">Original URL</th>
            <th className="p p-3">Visits</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            
            
            
            <tr key={u.code} className="border-b">
              <td className="p-3">
                <a href={u.shortUrl} target="_blank" className="text-blue-600 hover:underline">
                  {u.shortUrl}
                </a>
              </td>

              <td className="p-3 max-w-md">
                <div className="truncate" title={u.originalUrl}>
                  {u.originalUrl}
                </div>
              </td>

              <td className="p-3">{u.visitCount}</td>

              <td className="p-3 text-right">
                <button
                  onClick={() => navigator.clipboard.writeText(u.shortUrl)}
                  className="text-blue-600 text-xs hover:underline mr-3"
                >
                  Copy
                </button>

                <button
                  onClick={() => navigate(`/code/${u.code}`)}
                  className="text-green-600 text-xs hover:underline mr-3"
                >
                  Stats
                </button>

                <button
                  onClick={() => handleDelete(u.code)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
