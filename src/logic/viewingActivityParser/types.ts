export type ParsedMeta = {
  episode: string;
  seasonNumber: number;
  showTitle: string;
}

export type Season = {
  name?: string;
  number: number;
  episodes: string[];
}

export type viewingActivityContent = {
    showTitle: string;
    seasons: Season[];
};

export type viewingActivityParseResponse = {
  status: "SUCCESS" | "ERROR" | "BAD_FILE";
  content: viewingActivityContent[];
};
