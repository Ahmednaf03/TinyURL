import { useState } from 'react'
import type { UrlItem } from './types/types';
import { getUrls } from './utils/urls';
import UrlForm from './components/UrlForm';


function App() {
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState<UrlItem[]>([]);
  async function load() {
    setLoading(true);
    const data = await getUrls();
    setUrls(data);
    setLoading(false);
  }

  return (
    <>
      <UrlForm onAdded={load}/>
    </>
  )
}

export default App
