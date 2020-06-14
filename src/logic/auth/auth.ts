import getConfig from "next/config";

import { Token } from "./types";

const { publicRuntimeConfig } = getConfig();

const TOKEN_LOCAL_STORAGE_KEY = "ntlfxmshws";
let TOKEN_CACHE: Token | null = null;

/**
 * @todo I'm to lazy to automatically refresh token.
 */
export const getToken = (): Token | null => {
  if (TOKEN_CACHE) {
    return TOKEN_CACHE;
  }
  const value = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (!value || value === "") {
    return null;
  }
  TOKEN_CACHE = JSON.parse(value);
  return TOKEN_CACHE;
};

export const saveToken = (value: Token) => {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(value));
};

const AUTH_LINK = "https://myshows.me/oauth/token";

const getAuthBody = (login: string, pwd: string) => {
  return `grant_type=password&client_id=${publicRuntimeConfig.CLIENTID}&client_secret=${publicRuntimeConfig.CLIENTSECRET}&username=${login}&password=${pwd}`;
};

export const loginIntoMyshows = async (login: string, pwd: string): Promise<Token> => {
  try {
    const response = await fetch(AUTH_LINK, {
      body: getAuthBody(login, pwd),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const json = await response.json();
    const now = new Date().getTime();
    return {...json, initTime: now};
  } catch (e) {
    return null;
  }
};
