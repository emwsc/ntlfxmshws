import { viewingActivityContent } from "../viewingActivityParser"

export type Episode = {
    id: string;
    title: string;
    seasonNumber: number;
    episodeNumber: number;
    shortName: number;
    showId: number;
    image: string;
}

export type Network = {
    id: string;
    title: string;
}

export type Show = {
    titleOriginal: string;
    id: string;
    episodes: Episode[];
    network: Network;
    image: string;
}

export type ShowWithViewingActivity = Show & {
    viewingActivity: viewingActivityContent
}