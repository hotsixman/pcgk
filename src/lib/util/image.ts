const imageMap = new Map<string, HTMLImageElement>();

export function getImage(url: string): HTMLImageElement {
    const cache = imageMap.get(url);
    if(cache){
        return cache;
    }

    const img = document.createElement('img');
    img.src = url;
    imageMap.set(url, img);
    return img;
}