import { useEffect, useState } from 'react'
import type { UrlItem } from './types/types';
import { getUrls } from './utils/urls';
import UrlForm from './components/UrlForm';
import UrlTable from './components/UrlTable';


function App() {
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState<UrlItem[]>([]);
  async function load() {
    setLoading(true);
    
    const data = await getUrls();
    setUrls(data);
    setLoading(false);
  }

  async function triggerUpdate() {
    setLoading(true);
    const data = await getUrls();
    setUrls(data);
    setLoading(false);
  }

  useEffect(() =>{
    load();
  },[])

  return (
     <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef2f7_100%)]">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-start px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">URL Shortener</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Simple URL Management
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Create and manage short links without the clutter.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Paste a long URL, generate a short link, and manage your saved entries from one focused dashboard.
          </p>
        </section>

        <section className="mt-8">
          <UrlForm onAdded={load} />
        </section>

        <section className="mt-8">
          {loading ? (
            <p className="text-sm font-medium text-slate-500">Loading your URLs...</p>
          ) : (
            <UrlTable urls={urls} refresh={load} update={triggerUpdate} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
