import React from "react";

import { ShowWithViewingActivity } from "../../../logic";

export const ProcessedShow = ({
  titleOriginal,
  image,
  viewingActivity,
}: ShowWithViewingActivity) => {
  const viewedEpisodes = viewingActivity.seasons.reduce(
    (total, season) => total + season.episodes.length,
    0
  );
  return (
    <div className="show">
      <div className="show__content">
        <div className="title">{titleOriginal}</div>
        <p className="text">Просмотрено эпизодов: {viewedEpisodes}</p>
      </div>
      <style jsx>{`
        .show {
          padding: 25px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 50vw;
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
