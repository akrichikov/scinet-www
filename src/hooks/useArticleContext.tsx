import { createContext, useContext } from "react";
import { ArticleContextType } from "@/lib/types/articleContext";

export const ArticleContext = createContext<ArticleContextType | null>(null);

export const useArticleContext = () => {
  const articleContext = useContext(ArticleContext);

  if (!articleContext) {
    throw new Error(
      "useArticleContext must be used within an ArticleContextProvider"
    );
  }

  return articleContext;
};