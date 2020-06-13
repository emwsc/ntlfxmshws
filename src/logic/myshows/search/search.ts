import { MYSHOWS_API_URL, NETFLIX_NETWORK } from "../constants";

import { Show, ShowWithViewingActivity } from "./types";
import { viewingActivityContent } from "../../viewingActivityParser/types";


const prepareSearchRequestBody = (query: string) => {
  const data = {
    jsonrpc: "2.0",
    method: "shows.Search",
    params: {
      query
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
        "Content-Type": "application/json"
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
          (show) => !!show.network && show.network.title === NETFLIX_NETWORK && show.titleOriginal === query
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
    const next = () => {
      if (content.length === 0) {
        return resolve();
      }
      const foundShows: ShowWithViewingActivity[] = [];
      const chunks = content.splice(
        0,
        content.length < 10 ? content.length : 10
      );
      const promises = chunks.map((chunk) => search(chunk.showTitle));
      Promise.all(promises).then((results) => {
        results.forEach((shows, index) => {
          filterShows(shows, chunks[index].showTitle).forEach((show) =>
            foundShows.push({ ...show, viewingActivity: { ...chunks[index] } })
          );
        });
        current += chunks.length;
        onSearchProgress(current, max);
        onFoundProgress(foundShows);
        next();
      });
    };
    next();
  });
};
