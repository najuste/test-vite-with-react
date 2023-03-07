export const SEARCH_API = 'https://images-api.nasa.gov/search?media_type=image&page_size=1&q='

export default async function getImage (userInput: string): Promise<string | never> {
  try {
    const imageData = await fetchImageData(userInput)
    return await getImageUrlFromData(imageData)
  } catch (error) {
    throw Error(String(error))
  }
}
interface ImageCollection {
  collection: {
    items: ImageItemData[]
  }
}

interface ImageItemData {
  links: ImageLinks[]
}
interface ImageLinks {
  href: ImageLinks[]
}

async function fetchImageData (userInput: string): Promise<Readonly<ImageCollection | never>> {
  const response = await fetch(getSearchQuery(userInput))
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}

async function getImageUrlFromData (data: ImageCollection): Promise<Readonly<string | never>> {
  if ((data.collection.items.length > 0) && (data.collection.items[0].links.length > 0)) {
    return String(data.collection.items[0].links[0].href)
  } else {
    throw new Error('no results')
  }
}

export function getSearchQuery (userInput: string): string {
  return SEARCH_API.concat(encodeURI(userInput))
}
