import { MYSHOWS_API_URL } from "../constants";
import { getToken } from '../../auth';

import { SHOW_STATUSES } from "../types";

const prepareSearchRequestBody = (showId: number, status: SHOW_STATUSES) => {
  const data = {
    jsonrpc: "2.0",
    method: "manage.SetShowStatus",
    params: {
      id: showId.toString(),
      status,
    },
    id: 1,
  };
  return data;
};

export const setShowStatus = async (showId: number, status: SHOW_STATUSES): Promise<boolean> => {
  try {
    const reqBody = prepareSearchRequestBody(showId, status);
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
