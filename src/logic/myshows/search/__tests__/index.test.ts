import fetchMock from "fetch-mock";

import { MYSHOWS_API_URL } from "../../constants";
import { search } from "..";
import { detailedSearchByChunks } from "../search";

import * as episodesFn from "../../episodes";
import * as getShowFn from "../../getShow";
import * as showStatusesFn from "../../showStatuses";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    CLIENTID: "",
    CLIENTSECRET: "",
  },
}));

jest.mock("../../getShow");
jest.mock("../../episodes");
jest.mock("../../showStatuses");

const mockSearchResult = [
  {
    id: 58622,
    title: "Нарко: Мексика",
    titleOriginal: "Narcos: Mexico",
    description:
      "<p>В 1980-х годах Феликс Галлардо решил объединить разрозненных и независимых производителей и дилеров наркотиков Мексики и построить собственную криминальную империю. В это же время агент Управления по борьбе с наркотиками Кики Камарена, получив повышение, переезжает с женой и маленьким сыном из Калифорнии в Гвадалахару. На новом месте он сталкивается с сильнейшим противником, и их противостояние затягивается на долгие годы.</p>",
    totalSeasons: 2,
    status: "TBD/On The Bubble",
    country: "US",
    countryTitle: "США",
    started: "Nov/16/2018",
    ended: null,
    year: 2018,
    kinopoiskId: 1173983,
    kinopoiskRating: 7.907,
    kinopoiskVoted: 5946,
    kinopoiskUrl: "http://www.kinopoisk.ru/film/1173983/",
    tvrageId: 37787,
    imdbId: 8714904,
    imdbRating: 8.4,
    imdbVoted: 53467,
    imdbUrl: "https://www.imdb.com/title/tt8714904/",
    watching: 7645,
    watchingTotal: 659837,
    voted: 2531,
    rating: 4.36,
    runtime: 60,
    runtimeTotal: "",
    image:
      "https://media.myshows.me/shows/normal/2/2c/2c0b6627642af45b94c96e853bec9624.jpg",
    genreIds: [4, 28, 6],
    network: {
      id: 603,
      title: "Netflix",
      country: "US",
    },
    episodes: null,
    onlineLinks: [],
    onlineLinkExclusive: null,
  },
  {
    id: 58622,
    title: "NOT NETFLIX Нарко: Мексика",
    titleOriginal: "Narcos: Mexico",
    description:
      "<p>В 1980-х годах Феликс Галлардо решил объединить разрозненных и независимых производителей и дилеров наркотиков Мексики и построить собственную криминальную империю. В это же время агент Управления по борьбе с наркотиками Кики Камарена, получив повышение, переезжает с женой и маленьким сыном из Калифорнии в Гвадалахару. На новом месте он сталкивается с сильнейшим противником, и их противостояние затягивается на долгие годы.</p>",
    totalSeasons: 2,
    status: "TBD/On The Bubble",
    country: "US",
    countryTitle: "США",
    started: "Nov/16/2018",
    ended: null,
    year: 2018,
    kinopoiskId: 1173983,
    kinopoiskRating: 7.907,
    kinopoiskVoted: 5946,
    kinopoiskUrl: "http://www.kinopoisk.ru/film/1173983/",
    tvrageId: 37787,
    imdbId: 8714904,
    imdbRating: 8.4,
    imdbVoted: 53467,
    imdbUrl: "https://www.imdb.com/title/tt8714904/",
    watching: 7645,
    watchingTotal: 659837,
    voted: 2531,
    rating: 4.36,
    runtime: 60,
    runtimeTotal: "",
    image:
      "https://media.myshows.me/shows/normal/2/2c/2c0b6627642af45b94c96e853bec9624.jpg",
    genreIds: [4, 28, 6],
    network: {
      id: 603,
      title: "NOT Netflix",
      country: "US",
    },
    episodes: null,
    onlineLinks: [],
    onlineLinkExclusive: null,
  },
];

describe("search", () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it("should search success", () => {
    const expectedShows = [mockSearchResult[0]];
    fetchMock.mock(MYSHOWS_API_URL, {
      result: mockSearchResult,
    });
    return search("Narcos: Mexico").then((shows) => {
      expect(shows).toEqual(expectedShows);
    });
  });

  it("should detailedSearchByChunks success", async () => {
    const content = [
      {
        seasons: [
          {
            episodes: ["Alea lacta Est", "Salva El Tigre"],
            number: 2,
          },
        ],
        showTitle: "Narcos: Mexico",
      },
      {
        seasons: [
          {
            episodes: ["Al Fin Cayó!", "Going Back to Cali"],
            number: 2,
          },
          {
            episodes: ["The Kingpin Strategy"],
            number: 3,
          },
        ],
        showTitle: "Narcos",
      },
      {
        seasons: [
          {
            episodes: [
              "Episode 6",
              "Episode 5",
              "Episode 4",
              "Episode 3",
              "Episode 2",
              "Episode 1",
            ],
            number: 2,
          },
        ],
        showTitle: "Kingdom",
      },
      {
        seasons: [
          {
            episodes: ["Slapsgiving 2: Revenge of the Slap"],
            number: 5,
          },
        ],
        showTitle: "How I Met Your Mother",
      },
    ];

    fetchMock.mock(MYSHOWS_API_URL, {
      result: mockSearchResult,
    });

    getShowFn.getShow = jest.fn().mockResolvedValue({
      episodes: [
        {
          id: 123,
          episodeNumber: 2,
          seasonNumber: 2,
          title: "Al Fin Cayó!",
          showId: 58622,
        },
      ],
    });
    episodesFn.episodes = jest.fn().mockResolvedValue([
      {
        id: 123,
        episodeNumber: 2,
        seasonNumber: 2,
        title: "Al Fin Cayó!",
        showId: 58622,
      },
    ]);
    showStatusesFn.showStatuses = jest.fn().mockResolvedValue([
      {
        showId: 58622,
        watchStatus: "watching",
      },
    ]);

    const total = [];
    await detailedSearchByChunks(
      [...content],
      () => {},
      (items) => {
        items.forEach((item) => total.push(item));
      }
    );
    expect(total).toEqual([
      {
        ...mockSearchResult[0],
        status: "watching",
        viewingActivity: {
          seasons: [
            {
              episodes: ["Alea lacta Est", "Salva El Tigre"],
              number: 2,
            },
          ],
          showTitle: "Narcos: Mexico",
        },
        profileEpisodes: [
          {
            id: 123,
            episodeNumber: 2,
            seasonNumber: 2,
            title: "Al Fin Cayó!",
            showId: 58622,
          },
        ],
        episodes: [
          {
            id: 123,
            episodeNumber: 2,
            seasonNumber: 2,
            title: "Al Fin Cayó!",
            showId: 58622,
          },
        ],
      },
    ]);
  });
});
