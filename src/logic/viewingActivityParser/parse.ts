import { SHOW_META_SPLIT_LENGTH, SEASON_SLUGS, CHUNK_SIZE } from "./constants";

import {
  ParsedMeta,
  ViewingAcitivityContent,
  ViewingAcitivityParseResponse,
} from "./types";

const splitLine = (line: string) => {
  const split: string[] = line.split(",");
  const date = split.pop();
  return {
    date,
    show: split.join(","),
  };
};

const cleanupEpisodeName = (name: string) =>
  name.trim().substr(0, name.length - 2);

const cleanupShowTitleName = (name: string) =>
  name.trim().substr(1, name.length);

const cleanupSeasonMeta = (meta: string) => meta.trim();

const parseSeasonNumber = (seasonMeta: string) => {
  const regex = /\d+/gm;
  const match = regex.exec(seasonMeta);
  if (match === null) {
    return 1;
  }
  return parseInt(match[0]);
};

const isSeason = (seasonMeta: string) => {
  return SEASON_SLUGS.some((slug) => seasonMeta.indexOf(slug) > -1);
};

const parseMeta = (showMeta: string): ParsedMeta | null => {
  const split = showMeta.split(":");
  if (split.length < SHOW_META_SPLIT_LENGTH) {
    return null;
  }
  let episode = split.pop();
  let seasonMeta = split.pop();
  while (split.length > 1) {
    if (isSeason(seasonMeta)) {
      break;
    }
    episode = seasonMeta + ":" + episode;
    seasonMeta = split.pop();
  }
  return {
    episode: cleanupEpisodeName(episode),
    seasonNumber: parseSeasonNumber(cleanupSeasonMeta(seasonMeta)),
    showTitle: cleanupShowTitleName(split.join(":")),
  };
};

const parseChunk = (lines: string[]) => {
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const meta = splitLine(lines[i]);
    const parsedMeta = parseMeta(meta.show);
    if (parsedMeta === null) {
      continue;
    }
    result.push(parsedMeta);
  }
  return result;
};

export const parse = (text: string): ViewingAcitivityParseResponse => {
  try {
    const lines = text.split("\n");
    const result: { [key: string]: ViewingAcitivityContent } = {};
    for (let i = 1; i < lines.length; i++) {
      const meta = splitLine(lines[i]);
      const parsedMeta = parseMeta(meta.show);
      if (parsedMeta === null) {
        continue;
      }
      const { showTitle, seasonNumber, episode } = parsedMeta;
      if (!result[showTitle]) {
        result[showTitle] = {
          showTitle: showTitle,
          seasons: [
            {
              number: seasonNumber,
              episodes: [],
            },
          ],
        };
      }
      const seasonsCount = result[showTitle].seasons.length;
      if (result[showTitle].seasons[seasonsCount - 1].number !== seasonNumber) {
        result[showTitle].seasons.push({
          number: seasonNumber,
          episodes: [],
        });
      }
      result[showTitle].seasons[seasonsCount - 1].episodes.push(episode);
    }
    return {
      content: Object.keys(result).map(key => result[key]),
      status: "SUCCESS",
    };
  } catch {
    return {
      content: [],
      status: "ERROR",
    };
  }
};

const chunk = (array: any[], start: number) => {
  const chunk = [];
  for (let i = start; chunk.length < CHUNK_SIZE && i < array.length; i++) {
    chunk.push(array[i]);
  }
  return chunk;
};

export const parseChunking = (
  text: string,
  onProgress: (current: number, max: number) => void
): Promise<ViewingAcitivityParseResponse> => {
  return new Promise((resolve, reject) => {
    const lines = text.split("\n");
    let processedCounter = 1;
    const totalItems = [];
    const nextChunk = () => {
      try {
        const currentChunk = chunk(lines, processedCounter);
        parseChunk(currentChunk).forEach((item) => totalItems.push(item));
        processedCounter += currentChunk.length;
        if (currentChunk.length !== 0) {
          onProgress(processedCounter, lines.length);
          setTimeout(nextChunk);
        } else {
          const totalResult = totalItems.reduce(
            (result, { showTitle, seasonNumber, episode }) => {
              if (!result[showTitle]) {
                result[showTitle] = {
                  showTitle: showTitle,
                  seasons: [
                    {
                      number: seasonNumber,
                      episodes: [],
                    },
                  ],
                };
              }
              const seasonsCount = result[showTitle].seasons.length;
              if (
                result[showTitle].seasons[seasonsCount - 1].number !==
                seasonNumber
              ) {
                result[showTitle].seasons.push({
                  number: seasonNumber,
                  episodes: [],
                });
              }
              result[showTitle].seasons[seasonsCount - 1].episodes.push(
                episode
              );
              return result;
            },
            {}
          );
          resolve({
            content: Object.keys(totalResult).map(key => totalResult[key]),
            status: "SUCCESS",
          });
        }
      } catch(e) {
        reject({
          content: [],
          status: "ERROR"
        })
      }
    };
    nextChunk();
  });
};
