import { MYSHOWS_API_URL } from "../constants";
import { getToken } from "../../auth";

import { ShowStatus } from "../types";

const prepareSearchRequestBody = (showIds: number[]) => {
  const data = {
    jsonrpc: "2.0",
    method: "profile.ShowStatuses",
    params: {
      showIds,
    },
    id: 1,
  };
  return data;
};

export const showStatuses = async (showIds: number[]): Promise<ShowStatus[]> => {
  try {
    const reqBody = prepareSearchRequestBody(showIds);
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
