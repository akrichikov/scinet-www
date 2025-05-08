import { createContext, useContext } from "react";
import { PodcastContextType } from "@/lib/types/podcastContext";

export const PodcastContext = createContext<PodcastContextType | null>(null);

export const usePodcastContext = () => {
  const podcastContext = useContext(PodcastContext);

  if (!podcastContext) {
    throw new Error(
      "usePodcastContext must be used within a PodcastContextProvider"
    );
  }

  return podcastContext;
};