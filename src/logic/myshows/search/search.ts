import { MYSHOWS_API_URL, NETFLIX_NETWORK } from "../constants";

import { Show, ShowWithViewingActivity } from "../types";
import { viewingActivityContent } from "../../viewingActivityParser/types";
import { showStatuses } from "../showStatuses";
import { episodes } from "../episodes";
import { getShow } from "../getShow";

const prepareSearchRequestBody = (query: string) => {
  const data = {
    jsonrpc: "2.0",
    method: "shows.Search",
    params: {
      query,
    },
    id: 1,
  };
  return data;
};

const searchMyshows = async (query: string): Promise<Show[]> => {
  try {
    const reqBody = prepareSearchRequestBody(query);
    const response = await fetch(MYSHOWS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const { result } = await response.json();
    return result;
  } catch (e) {
    return [];
  }
};

const filterShows = (shows: Show[], query: string) => {
  const netflixShows =
    shows.length === 1
      ? shows
      : shows.filter(
          (show) =>
            !!show.network &&
            show.network.title === NETFLIX_NETWORK &&
            show.titleOriginal === query
        );
  return netflixShows;
};

export const search = async (query: string): Promise<Show[]> => {
  const shows = await searchMyshows(query);
  const netflixShows = filterShows(shows, query);
  return netflixShows;
};

export const searchByChunks = async (
  content: viewingActivityContent[],
  onSearchProgress: (current: number, max: number) => void,
  onFoundProgress: (shows: ShowWithViewingActivity[]) => void
): Promise<void> => {
  return new Promise((resolve) => {
    const max = content.length;
    let current = 0;
    const next = async () => {
      if (content.length === 0) {
        return resolve();
      }
      const foundShows: ShowWithViewingActivity[] = [];
      const chunks = content.splice(
        0,
        content.length < 10 ? content.length : 10
      );
      const searchPromises = chunks.map((chunk) => search(chunk.showTitle));
      const searchResults = await Promise.all(searchPromises);
      searchResults.forEach((shows, index) => {
        shows.forEach((show) =>
          foundShows.push({ ...show, viewingActivity: { ...chunks[index] } })
        );
      });
      const showEpisodePromises = foundShows.map(show => getShow(show.id))
      const profileEpisodesPromises = foundShows.map(show => episodes(show.id))
      const profileEpisodes = await Promise.all(profileEpisodesPromises);
      const statuses = await showStatuses(foundShows.map((show) => show.id));
      const showEpisodes = await Promise.all(showEpisodePromises);
      foundShows.forEach((show, index) => {
        const status = statuses.find(({ showId }) => show.id === showId);
        show.status = status ? status.watchStatus : "none";
        show.profileEpisodes = profileEpisodes[index]
        show.episodes = showEpisodes[index].episodes;
      })
      current += chunks.length;
      onSearchProgress(current, max);
      onFoundProgress(foundShows);
      next();
    };
    next();
  });
};
