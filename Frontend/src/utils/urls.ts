import type { UrlItem } from "../types/types";
const BASE = import.meta.env.VITE_API_BASE_URL ;

function cleanUrlValue(value: string) {
    return value.replace(/\s+/g, "");
}

function normalizeUrlItem(item: UrlItem): UrlItem {
    return {
        ...item,
        originalUrl: cleanUrlValue(item.originalUrl),
        shortUrl: cleanUrlValue(item.shortUrl),
        code: item.code.trim(),
    };
}

export async function createUrl(longurl: string): Promise<UrlItem | {error: string}> {
const res = await fetch(BASE,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify({ url: cleanUrlValue(longurl) })
});
const data = await res.json();
return "error" in data ? data : normalizeUrlItem(data);
}

export async function getUrls(): Promise<UrlItem[]> {
    const res =  await fetch (BASE);
    const data = await res.json();
    return data.map(normalizeUrlItem);
}

export async function getUrlStats(code: string): Promise<UrlItem> {
    const res = await fetch(`${BASE}/${code.trim()}`)
    const data = await res.json();
    return normalizeUrlItem(data);
}

export async function deleteUrl(code: string): Promise<void>{
    await fetch(`${BASE}/${code.trim()}`, {method: 'DELETE' });
}
 
