import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/site/api/content";
import { CURRENT_TENANT_NAME } from "@/constants";
import { ArticleType } from "@/site/types/article";

// Define a local type for author data
export interface AuthorType {
  id: number;
  author: string;
  slug: string;
  avatar: string;
  imgAlt: string;
  job: string;
  city: string;
}

export default async function Authors() {
  const data: AuthorType[] = await getArticles(CURRENT_TENANT_NAME);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-48 max-w-[95rem] w-full mx-auto border border-black border-collapse">
      {data.map((article) => (
        <article
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-12 p-4 md:p-8 border border-black"
          key={article.id}
        >
          <Link href={`authors/${article.slug}`}>
            <Image
              className="w-[9.375rem] h-[9.375rem] object-cover rounded-full hover:scale-105 transition"
              src={article.avatar}
              alt={article.imgAlt}
              width={150}
              height={150}
            />
          </Link>
          <article>
            <p className="heading3-title mb-4">
              <Link href={`/authors/${article.slug}`}>{article.author}</Link>
            </p>
            <div className="flex gap-8">
              <span className="flex">
                <p className="font-semibold pr-2">Job</p>
                <p className="">{article.job}</p>
              </span>
              <span className="flex">
                <p className="font-semibold pr-2">City</p>
                <p className="">{article.city}</p>
              </span>
            </div>
          </article>
        </article>
      ))}
    </div>
  );
}
