import fetch from 'node-fetch';

export async function getImageBufferFromURL(imageURL: string): Promise<Buffer> {
  try {
    const response = await fetch(imageURL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    throw new Error(`Error fetching image: ${error}`);
  }
}