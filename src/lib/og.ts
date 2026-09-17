import ogs from "open-graph-scraper";

export interface OpenGraphMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

export async function fetchOpenGraph(url: string): Promise<OpenGraphMetadata> {
  try {
    const options = {
      url,
      timeout: 10000, // 10 seconds timeout
      fetchOptions: {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    };

    const { result } = await ogs(options);

    return {
      title: result.ogTitle || null,
      description: result.ogDescription || null,
      image: (result.ogImage && result.ogImage.length > 0) ? result.ogImage[0].url : null,
      siteName: result.ogSiteName || null,
      favicon: result.favicon || null,
    };
  } catch (error) {
    console.error(`Failed to fetch Open Graph metadata for ${url}:`, error);
    return {
      title: null,
      description: null,
      image: null,
      siteName: null,
      favicon: null,
    };
  }
}
