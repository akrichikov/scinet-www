"use client";

import { useArticleContext } from "@/hooks/useArticleContext";
import { Button } from "./ui/button";
import { ArticleContextType } from "@/lib/types/articleContext";


const ArticleFilterButtons = () => {
  const { data }: ArticleContextType = useArticleContext();

  const labels: string[] = [
    "All",
    ...new Set<string>(
      data.flatMap((article) => article.articles.map((item) => item.label))
    ),
  ];

  console.log(labels);
  return (
    <>
      {data && (
        <div className="flex gap-2">
          {labels.map((label: string, index: number) => (
            <Button
              className="px-3 py-2 bg-white text-black hover:bg-black hover:text-white border border-black rounded-full"
              key={index}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleFilterButtons;