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

  useEffect(() =>{
    load();
  },[])

  return (
     <div className="min-h-screen">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">URL Shortener</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <UrlForm onAdded={load} />

        {loading ? (
          <p className="mt-6 text-sm text-gray-500">Loading...</p>
        ) : (
          <UrlTable urls={urls} refresh={load} />
        )}
      </main>
    </div>
  )
}

export default App
