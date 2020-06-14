import { viewingActivityContent } from "../viewingActivityParser"

export type Episode = {
    id: number;
    title: string;
    seasonNumber: number;
    episodeNumber: number;
    shortName: number;
    showId: number;
    image: string;
}

export type Network = {
    id: number;
    title: string;
}

export type Show = {
    titleOriginal: string;
    id: number;
    episodes: Episode[];
    profileEpisodes: Episode[];
    network: Network;
    image: string;
    status: SHOW_STATUSES;
}

export type ShowWithViewingActivity = Show & {
    viewingActivity: viewingActivityContent
}

export type SHOW_STATUSES = 'watching' | 'none' | 'cancelled' | 'later' | 'finished';

export type ShowStatus = {
    showId: number;
    watchStatus: SHOW_STATUSES;
}