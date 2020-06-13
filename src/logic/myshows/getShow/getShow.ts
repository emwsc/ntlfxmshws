import { MYSHOWS_API_URL } from "../constants";

import { Show } from "../search";

const prepareSearchRequestBody = (showId: number) => {
  const data = {
    jsonrpc: "2.0",
    method: "shows.GetById",
    params: {
      showId: showId,
      withEpisodes: true,
    },
    id: 1,
  };
  return data;
};

export const getShow = async (showId: number): Promise<Show | null> => {
  try {
    const reqBody = prepareSearchRequestBody(showId);
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
    return null
  }
};
