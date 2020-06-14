import { MYSHOWS_API_URL } from "../constants";
import { getToken } from "../../auth";

import { ShowStatus, Episode } from "../types";

const prepareSearchRequestBody = (showId: number) => {
  const data = {
    jsonrpc: "2.0",
    method: "profile.Episodes",
    params: {
      showId,
    },
    id: 1,
  };
  return data;
};

export const episodes = async (showId: number): Promise<Episode[]> => {
  try {
    const reqBody = prepareSearchRequestBody(showId);
    const response = await fetch(MYSHOWS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().access_token}`,
      },
      body: JSON.stringify(reqBody),
    });
    const { result } = await response.json();
    return result;
  } catch (e) {
    return [];
  }
};
