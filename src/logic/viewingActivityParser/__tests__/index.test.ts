import { parse, parseChunking } from "../parse";

const textContent = `Title,Date
    "Narcos: Mexico: Season 2: Alea lacta Est","6/7/20"
    "Narcos: Mexico: Season 2: Salva El Tigre","6/7/20"
    "Narcos: Season 2: Al Fin Cayó!","6/7/20"
    "Narcos: Season 3: Going Back to Cali","6/7/20"
    "Narcos: Season 3: The Kingpin Strategy","6/7/20"
    "Kingdom: Season 2: Episode 6","6/6/20"
    "Kingdom: Season 2: Episode 5","6/6/20"
    "Kingdom: Season 2: Episode 4","6/6/20"
    "Kingdom: Season 2: Episode 3","6/4/20"
    "Kingdom: Season 2: Episode 2","5/31/20"
    "Kingdom: Season 2: Episode 1","5/31/20"
    "How I Met Your Mother: Season 5: Slapsgiving 2: Revenge of the Slap","3/19/19"
    `;

describe("viewingActivityParser", () => {
  it("should parse succesful", () => {
    const expectedResult = {
      content: [
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
      ],
      status: "SUCCESS",
    };

    const parseResult = parse(textContent);
    expect(parseResult).toEqual(expectedResult);
  });

  it("should parse failed", () => {
    const parseResult = parse(undefined);
    expect(parseResult).toEqual({ status: "ERROR", content: [] });
  });

  it("should parse by chunks success", () => {
    const expectedResult = {
      content: [
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
      ],
      status: "SUCCESS",
    };
    jest.useFakeTimers();
    const cbProgress = jest.fn();
    const promise = parseChunking(textContent, cbProgress).then((result) => {
      expect(result).toEqual(expectedResult);
    });
    jest.runAllTimers();
    return promise;
  });
});
