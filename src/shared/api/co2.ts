import type { CountriesData } from '../types/country';

export async function fetchCountryData(
  onProgress?: (progress: number) => void
): Promise<CountriesData | null> {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );

    if (!response.ok) {
      throw new Error('response error');
    }

    const contentLength = response.headers.get('content-length');
    const totalSize = contentLength ? parseInt(contentLength) : 0;

    if (!response.body) {
      throw new Error('ReadableStream not supported');
    }

    const reader = response.body.getReader();
    let receivedLength = 0;
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      if (onProgress && totalSize > 0) {
        const progress = Math.round((receivedLength / totalSize) * 100);
        onProgress(progress);
      }
    }

    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    const result = new TextDecoder('utf-8').decode(chunksAll);
    const data: CountriesData = JSON.parse(result);
    return data;
  } catch {
    console.log('error');
    return null;
  } finally {
    console.log('finally');
  }
}
