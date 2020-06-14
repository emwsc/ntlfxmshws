import { MYSHOWS_API_URL } from "../constants";
import { getToken } from '../../auth';

const prepareSearchRequestBody = (showId: number, episodes: number[]) => {
  const data = {
    jsonrpc: "2.0",
    method: "manage.SyncEpisodes",
    params: {
      showId: showId,
      episodeIds: episodes,
    },
    id: 1,
  };     
  return data;
};

export const syncEpisodes = async (showId: number, episodes: number[]): Promise<boolean> => {
  try {
    const reqBody = prepareSearchRequestBody(showId, episodes);
    const response = await fetch(MYSHOWS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().access_token}`,
      },
      body: JSON.stringify(reqBody),
    });
    const {result, error} = await response.json();
    return !error && result;
  } catch (e) {
    return false;
  }
};
