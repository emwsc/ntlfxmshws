import fetchMock from "fetch-mock";
import { MYSHOWS_API_URL } from "../../constants";
import { search } from "..";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    CLIENTID: "",
    CLIENTSECRET: "",
  },
}));

describe("myshows", () => {
  beforeEach(() => {
    fetchMock.reset();
  });
  describe("search", () => {
    it("search success", () => {
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
      const expectedShows = [mockSearchResult[0]];
      fetchMock.mock(MYSHOWS_API_URL, {
        result: mockSearchResult,
      });
      return search("Narcos: Mexico").then((shows) => {
        expect(shows).toEqual(expectedShows);
      });
    });
  });
});
