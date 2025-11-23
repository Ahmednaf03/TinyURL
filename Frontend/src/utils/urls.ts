import type { UrlItem } from "../types/types";
const BASE = import.meta.env.VITE_API_BASE_URL ;

export async function createUrl(longurl: string): Promise<UrlItem | {error: string}> {
const res = await fetch(BASE,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify({ url: longurl })
});
return res.json();
}

export async function getUrls(): Promise<UrlItem[]> {
    const res =  await fetch (BASE);
    return res.json();
}

export async function getUrlStats(code: string): Promise<UrlItem> {
    const res = await fetch(`${BASE}/${code}`)
    return res.json();
}

export async function deleteUrl(code: string): Promise<void>{
    await fetch(`${BASE}/${code}`, {method: 'DELETE' });
}
 
