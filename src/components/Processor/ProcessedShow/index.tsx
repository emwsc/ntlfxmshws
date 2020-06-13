import React, { useEffect, useState, useCallback } from "react";

import { ShowWithViewingActivity, getShow, Episode } from "../../../logic";
import { setShowStatus, syncEpisodes } from "../../../logic";

import { CHANGE_STATUS_SHOW_STATES } from "./types";

export const ProcessedShow = ({
  titleOriginal,
  image,
  viewingActivity,
  id,
}: ShowWithViewingActivity) => {
  const [showStatus, changeShowStatus] = useState<CHANGE_STATUS_SHOW_STATES>(
    "INIT"
  );

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const viewedEpisodes = viewingActivity.seasons.reduce(
    (total, season) => [...total, ...season.episodes],
    []
  );

  useEffect(() => {
    getShow(id).then(({ episodes }) => {
      setEpisodes(episodes);
    });
  }, []);

  const handleOnMarkAsWatchClick = useCallback(() => {
    changeShowStatus("CHANGING");
    const onError = () => changeShowStatus("FAILED");
    const foundEpisodes = episodes.filter((ep) =>
      viewedEpisodes.some((title) => title === ep.title)
    );
    if (foundEpisodes.length === 0) {
      return onError();
    }
    syncEpisodes(
      id,
      foundEpisodes.map((ep) => ep.id)
    ).then((result) => {
      if (!result) {
        changeShowStatus("FAILED");
        return;
      }
      setShowStatus(id, "watching").then((result) => {
        changeShowStatus(result ? "SUCCESS" : "FAILED");
      });
    });
  }, [episodes]);

  return (
    <div className="show">
      <div className="show__content">
        <div className="title show__title">{titleOriginal}</div>
        <div className="text show__episodes">
          Просмотрено эпизодов {viewedEpisodes.length}
          {episodes.length > 0 ? ` из ${episodes.length}` : ""}
        </div>
        <div className="show__buttons">
          <button onClick={handleOnMarkAsWatchClick}>
            Отметить все просмотренные эпизоды
          </button>
        </div>
        <div className="show__state">
          {showStatus === "CHANGING" && <div></div>}
          {showStatus === "SUCCESS" && 'Статус шоу изменен на "Смотрю"'}
          {showStatus === "FAILED" &&
            "Не удалось изменить статус шоу на MyShows"}
        </div>
      </div>
      <style jsx>{`
        .show {
          padding: 25px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 900px;
          height: 120px;
          border-radius: 20px;
          box-shadow: 0 0.8px 2.2px rgba(0, 0, 0, 0.02),
            0 1.7px 5.3px rgba(0, 0, 0, 0.028),
            0 2.9px 10px rgba(0, 0, 0, 0.035),
            0 4.2px 17.9px rgba(0, 0, 0, 0.042),
            0 6.1px 33.4px rgba(0, 0, 0, 0.05), 0 11px 80px rgba(0, 0, 0, 0.07);
          position: relative;
          background-color: var(--graish);
          color: var(--white);
          opacity: 0;
          animation: fadeIn 0.25s ease;
          animation-delay: 0.2s;
          animation-fill-mode: forwards;
        }

        .show__content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr 0.5fr;
          grid-template-areas: "title buttons state" "episodes buttons state";
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .show__title {
          grid-area: title;
        }

        .show__episodes {
          grid-area: episodes;
        }
        .show__state {
          grid-area: state;
        }

        .show__buttons {
          grid-area: buttons;
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
          opacity: 0.45;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
