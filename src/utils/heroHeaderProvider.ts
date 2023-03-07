
export default async function getImage(userInput: string): Promise<string | never> {
    try {    
        const imageData = await fetchImageData(userInput);
        return getImageUrlFromData(imageData);
    } catch(error){
        throw Error(String(error));
    }
}

export const SEARCH_API = "https://images-api.nasa.gov/search?media_type=image&page_size=1&q="

type ImageCollection = {
    collection: {
        items: ImageItemData[];
    }
};

type ImageItemData = {
    links: ImageLinks[]
}
type ImageLinks = {
    href: ImageLinks[]
}

async function fetchImageData(userInput: string): Promise<Readonly<ImageCollection | never>>{
    const response = await fetch(getSearchQuery(userInput));
    if (!response.ok) {
        throw new Error(response.statusText);
      }
    return await response.json();
}

async function getImageUrlFromData(data: ImageCollection): Promise<Readonly<string | never>> {
    if (data.collection.items.length && data.collection.items[0].links[0].href){
        return String(data.collection.items[0].links[0].href);
    } else {
        throw new Error('no results');
    }
}

export function getSearchQuery(userInput: string): string {
    return SEARCH_API.concat(encodeURI(userInput));
}