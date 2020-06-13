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

export type ViewingAcitivityContent = {
    showTitle: string;
    seasons: Season[];
};

export type ViewingAcitivityParseResponse = {
  status: "SUCCESS" | "ERROR" | "BAD_FILE";
  content: ViewingAcitivityContent[];
};
