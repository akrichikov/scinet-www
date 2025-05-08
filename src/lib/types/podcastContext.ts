import { PodcastType } from "./podcast";

export type PodcastContextType = {
    data: PodcastType[];
    setData: React.Dispatch<React.SetStateAction<PodcastType[]>>;
};