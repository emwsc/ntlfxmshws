import React, { useEffect, useState, useCallback } from "react";

import { LottieIcon } from "../LottieIcon";
import { HoverLottieIcon } from "../HoverLottieIcon";

import {
  ShowWithViewingActivity,
  getShow,
  Episode,
  setShowStatus,
  syncEpisodes,
} from "../../logic";

import { CHANGE_STATUS_SHOW_STATES } from "./types";

import acitivtyLottieIcon from "./assets/activity.json";
import checkmarkLottieIcon from "./assets/checkmark.json";


const STATUS_COLOR: {[key in CHANGE_STATUS_SHOW_STATES]: string} = {
  'INIT': 'transparent',
  'CHANGING': 'transparent',
  'SUCCESS': 'linear-gradient(90deg, rgba(247,203,21,0) 0%, rgba(50,150,93,0.6446779395351891) 60%, rgba(50,150,93,1) 75%);',
  'FAILED': 'linear-gradient(90deg, rgba(247,203,21,0) 0%, rgba(229,9,20,1) 60%, rgba(229,9,20,1) 75%);'
}

const hoverIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const ChangingState = () => (
  <>
    <div>Загружаем на MyShows</div>
    <div className="show__icon">
      <LottieIcon animationData={acitivtyLottieIcon} />
    </div>
  </>
);

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
          <button
            className="button show__check-btn"
            onClick={handleOnMarkAsWatchClick}
          >
            <HoverLottieIcon
              style={hoverIconStyle}
              iconHeight="15px"
              iconWidth="15px"
              animationData={checkmarkLottieIcon}
            >
              Отметить шоу на MyShows
            </HoverLottieIcon>
          </button>
        </div>
        <div className="show__state">
          {showStatus === "CHANGING" && <ChangingState />}
          {showStatus === "SUCCESS" &&
            'Найденные серии помечены и статус шоу изменен на "Смотрю"'}
          {showStatus === "FAILED" &&
            "Что-то пошло не так. Возможно серии уже помечены как просмотренные."}
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
          height: 140px;
          border-radius: 20px;
          box-shadow: 0 0.8px 2.2px rgba(0, 0, 0, 0.02),
            0 1.7px 5.3px rgba(0, 0, 0, 0.028),
            0 2.9px 10px rgba(0, 0, 0, 0.035),
            0 4.2px 17.9px rgba(0, 0, 0, 0.042),
            0 6.1px 33.4px rgba(0, 0, 0, 0.05), 0 11px 80px rgba(0, 0, 0, 0.07);
          position: relative;
          background-color: var(--graish);
          color: var(--white);
        }

        .show__check-btn {
          height: 30px;
          width: 210px;
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
          grid-template-areas: "title state" "episodes state" "buttons state";
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 25px;
          box-sizing: border-box;
          border-radius: 20px;
          height: 100%;
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
      `}</style>
    </div>
  );
};
