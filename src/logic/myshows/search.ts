import { MYSHOWS_API_URL, NETFLIX_NETWORK } from "./constants";

import { Show } from "./types";

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
        Authorization: `Bearer ${process.env.BEARERTESTCODE}`,
      },
      body: JSON.stringify(reqBody),
    });
    const { result } = await response.json();
    return result;
  } catch (e) {
    return [];
  }
};

export const search = async (query: string): Promise<Show[]> => {
  const shows = await searchMyshows(query);
  const netflixShows =  shows.filter(show => show.network.title === NETFLIX_NETWORK);
  return netflixShows;
};
