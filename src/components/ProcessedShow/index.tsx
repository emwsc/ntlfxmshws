import React, { useEffect, useState, useCallback } from "react";

import { LottieIcon } from "../LottieIcon";
import { HoverLottieIcon } from "../HoverLottieIcon";

import {
  ShowWithViewingActivity,
  setShowStatus,
  syncEpisodes,
  Episode,
} from "../../logic";
import { HOVER_ICON_STYLE, STATUS_COLOR, MY_SHOWS_SHOW_URL, MY_SHOWS_WATCHING_STATUS } from "./constants";

import { CHANGE_STATUS_SHOW_STATES } from "./types";
import { ProcessorState } from "../Processor/types";

import acitivtyLottieIcon from "./assets/activity.json";
import checkmarkLottieIcon from "./assets/checkmark.json";

const compareEpisodeTitles = (title: string, seasonNumber: number, ep: Episode) => {
  const sameTitle = title === ep.title;
  if (sameTitle) {
    return true;
  }
  try {
    const episodeNumber = parseInt(title.toLowerCase().replace("episode", "").trim());
    return ep.episodeNumber === episodeNumber && ep.seasonNumber === seasonNumber;
  } catch (e) {
    return false;
  }
};

const findNotMarkedEpisodes = (
  viewingActivity: ShowWithViewingActivity["viewingActivity"],
  myShowsEpisodes: ShowWithViewingActivity["episodes"],
  profileEpisodes: ShowWithViewingActivity["profileEpisodes"]
) => {
  return myShowsEpisodes.filter((myShowsEpisode) => {
    const alreadyWatched = !!profileEpisodes.find(
      (watchedEpisode) => watchedEpisode.id === myShowsEpisode.id
    );
    if (alreadyWatched) {
      return false;
    }
    return viewingActivity.seasons.some(({ episodes, number }) => {
      return episodes.some((title) =>
        compareEpisodeTitles(title, number, myShowsEpisode)
      );
    });
  });
};

const ChangingState = () => (
  <>
    <div>Загружаем на MyShows</div>
    <div className="show__icon">
      <LottieIcon animationData={acitivtyLottieIcon} />
    </div>
  </>
);


const ProcessedShowStates: { [key in CHANGE_STATUS_SHOW_STATES]: React.FC } = {
  INIT: () => null,
  CHANGING: () => <ChangingState />,
  SUCCESS: () => (
    <span>Найденные серии помечены и статус шоу изменен на "Смотрю"</span>
  ),
  FAILED: () => (
    <span>
      Что-то пошло не так. Возможно серии уже помечены как просмотренные.
    </span>
  ),
  EPISODES_NOT_MATCHING: () => (
    <span>
      Названия эпизодов на <span className="bold">Netflix</span> не совпадают с
      названиями на MyShows либо просмотренные эпизоды уже отмечены
    </span>
  ),
  SAME_WATCHED_COUNT: () => (
    <span>
      Количество просмотренных на <span className="netflix">Netflix</span>{" "}
      совпадает с количеством просмотренных на MyShows
    </span>
  ),
};

export const ProcessedShow = ({
  titleOriginal,
  image,
  viewingActivity,
  id,
  uploadAllState,
  status,
  episodes,
  profileEpisodes,
}: ShowWithViewingActivity & {
  uploadAllState: ProcessorState["uploadAllState"];
}) => {
  const [showStatus, changeShowStatus] = useState<CHANGE_STATUS_SHOW_STATES>(
    "INIT"
  );

  const viewedEpisodes = viewingActivity.seasons.reduce(
    (total, season) => [...total, ...season.episodes],
    []
  );

  useEffect(() => {
    if (uploadAllState === "UPLOADING_AS_IT_IS") {
      handleOnMarkAsWatchClick();
    }
  }, [uploadAllState]);

  const handleOnMarkAsWatchClick = useCallback(async () => {
    changeShowStatus("CHANGING");
    if (viewedEpisodes.length === profileEpisodes.length) {
      return changeShowStatus("SAME_WATCHED_COUNT");
    }
    const notMarkedEpisodes = findNotMarkedEpisodes(
      viewingActivity,
      episodes,
      profileEpisodes
    );
    if (notMarkedEpisodes.length === 0) {
      return changeShowStatus("EPISODES_NOT_MATCHING");
    }
    const syncEpisodesSuccess = await syncEpisodes(
      id,
      notMarkedEpisodes.map((ep) => ep.id)
    );
    if (!syncEpisodesSuccess) {
      changeShowStatus("FAILED");
      return;
    }
    const setShowStatusSuccess = await setShowStatus(id, "watching");
    changeShowStatus(setShowStatusSuccess ? "SUCCESS" : "FAILED");
  }, []);

  const State = ProcessedShowStates[showStatus];

  return (
    <div className="show">
      <div className="show__content">
        <div className="title show__title">{titleOriginal}</div>
        <div className="text show__episodes">
          <p className="text">
            Просмотрено эпизодов на{" "}
            <span className="netflix bold">Netflix</span>{" "}
            {viewedEpisodes.length}.
          </p>
          <p className="text">
            Просмотрено эпизодов на MyShows {profileEpisodes.length} из{" "}
            {episodes.length}.
          </p>
        </div>
        <div className="show__myshows-state">
          {MY_SHOWS_WATCHING_STATUS[status]}
        </div>
        <div className="show__buttons">
          <button
            className="button show__btn"
            onClick={handleOnMarkAsWatchClick}
          >
            <HoverLottieIcon
              style={HOVER_ICON_STYLE}
              iconHeight="15px"
              iconWidth="15px"
              animationData={checkmarkLottieIcon}
            >
              Отметить эпизоды на MyShows
            </HoverLottieIcon>
          </button>
          <a
            target="__blank"
            href={`${MY_SHOWS_SHOW_URL}${id}`}
            className="link show__btn"
          >
            Открыть на MyShows
          </a>
        </div>
        <div className="show__state">
          <State />
        </div>
      </div>
      <div className="show__status-color" />
      <style jsx>{`
        .show {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 900px;
          height: 200px;
          border-radius: 20px;
          box-shadow: 0 0.8px 2.2px rgba(0, 0, 0, 0.02),
            0 1.7px 5.3px rgba(0, 0, 0, 0.028),
            0 2.9px 10px rgba(0, 0, 0, 0.035),
            0 4.2px 17.9px rgba(0, 0, 0, 0.042),
            0 6.1px 33.4px rgba(0, 0, 0, 0.05), 0 11px 80px rgba(0, 0, 0, 0.07);
          position: relative;
          background-color: var(--graish);
          color: var(--white);
          margin: 10px auto;
        }

        .show__btn {
          height: 100%;
          width: 100%;
          margin-top: 5px;
          font-size: var(--font-size-s);
        }

        .show__icon {
          width: 30px;
          height: 30px;
        }

        .show__content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 0.5fr;
          grid-template-areas: "title state" "episodes state" "myshows state" "buttons state";
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 25px;
          box-sizing: border-box;
          border-radius: 20px;
          height: 100%;
        }

        .show__myshows-state {
          grid-are: myshows;
          width: fit-content;
          font-size: var(--font-size-s);
        }

        .show__status-color {
          border-radius: 0 20px 20px 0;
          position: absolute;
          width: 100%;
          height: 100%;
          background: ${STATUS_COLOR[showStatus]};
        }

        .show__title {
          grid-area: title;
        }

        .show__episodes {
          grid-area: episodes;
          font-size: var(--font-size-s);
        }
        .show__state {
          grid-area: state;
          display: flex;
          font-size: var(--font-size-s);
          align-items: center;
          justify-content: space-between;
        }

        .show__buttons {
          grid-area: buttons;
          display: grid;
          align-items: center;
          grid-gap: 10px;
          grid-template-columns: repeat(auto-fit, 240px);
          grid-row: 30px;
        }

        .show::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 20px;
          width: 100%;
          height: 100%;
          background-image: url(${image});
          background-color: var(--graish);
          background-size: cover;
          background-position: top;
          background-repeat: no-repeat;
          opacity: 0.25;
        }
      `}</style>
    </div>
  );
};
