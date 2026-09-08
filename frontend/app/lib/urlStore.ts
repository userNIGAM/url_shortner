const urlStore = new Map<string, string>();

export function saveUrl(shortCode: string, orginalUrl: string){
    urlStore.set(shortCode, orginalUrl)
}

export function getOrginalUrl(shortCode : string){
    return urlStore.get(shortCode)
}

export function shortCodeExists(shortCode : string){
    return urlStore.has(shortCode)
}