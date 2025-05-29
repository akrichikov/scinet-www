export type ArticleType = {
    id: number;
    author: string;
    job: string;
    city: string;
    avatar: string;
    imgAlt: string;
    slug: string;
    articles: Array<{
        title: string;
        popular: boolean;
        popularity: number;
        description: string;
        date: string;
        read: string;
        label: string;
        img: string;
        imgAlt: string;
        slug: string;
        content: Array<{
            img: string;
            summary: string;
            section1: string;
            quote: Array<string>;
            summary2: string;
            section2: string;
        }>;
    }>;
};