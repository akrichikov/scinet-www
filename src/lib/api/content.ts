import { ArticleType } from "@/lib/types/content/article";
import { PodcastType } from "@/lib/types/content/podcast";


export const getArticles = async (tnt: string): Promise<ArticleType[]> => {
    const res: Response = await fetch(`/_tnt/${tnt}/json/articles.json`);

    if (!res.ok) {
        throw new Error("Failed to fetch article data");
    }

    const data: ArticleType[] = await res.json();
    return data as ArticleType[];
};

export const getNews = async (tnt: string): Promise<string[]> => {
    const res: Response = await fetch(`/_tnt/${tnt}/json/news.json`);

    if (!res.ok) {
        throw new Error("Failed to fetch news data");
    }

    const data: string[] = await res.json();
    return data;
};

export const getPodcasts = async (tnt: string): Promise<PodcastType[]> => {
    const res: Response = await fetch(`/_tnt/${tnt}/json/podcasts.json`);

    if (!res.ok) {
        throw new Error("Failed to fetch podcast data");
    }

    const data: PodcastType[] = await res.json();
    return data;
};