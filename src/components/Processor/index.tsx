import React, { useEffect, useReducer } from "react";

import { ProcessorProps, STAGES, State } from "./types";

import { parseChunking, search } from "../../logic";
import {
  setParsingStatistic,
  switchStage,
  setViewingActivityContent,
} from "./actions";
import { reducer, getInitialState } from "./reducer";

import { styleProcessorStages } from "./styles";

export const STAGES_COMPONENTS: { [key in STAGES]: React.FC<State> } = {
  PARSING: ({ parsingStatistic }: State) => (
    <>
      <p className="title processor__title">
        {
          <span>
            Парсим данные с <span className="netflix">Netflix</span>
          </span>
        }
      </p>
      <p className="text processor__stats">
        Обработано {parsingStatistic.parsedCount} из{" "}
        {parsingStatistic.totalRecords}
      </p>
      <style jsx>{styleProcessorStages}</style>
    </>
  ),
  SEARCHING: ({ viewingActivityContent }: State) => (
    <>
      <p className="title text text_centered processor__title">
        Ищем сериалы на <img className="myshows-logo" alt="MyShows" src={"/icons/myshows_logo.png"} />
      </p>
      <p className="text processor__stats">
        Ваша история просмотров на <span className="netflix bold">Netflix</span> составляет {viewingActivityContent.length} шоу
      </p>
      <style jsx>{styleProcessorStages}</style>
      <style jsx>{`
        .myshows-logo {
          display: inline-block;
          margin-left: 5px;
        }
        .bold{
          font-weight: bold;
        }
      `}</style>
    </>
  ),
  SENDING: () => <span>Загружаем на MyShows</span>,
};

/**
 * Component that shows show parsing viewing activity, searching and uploading to myshows goes
 * @todo Show erros when parsing goes wrong
 */
export const Processor = ({ textContent }: ProcessorProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(textContent));

  const { parsingStatistic, stage } = state;
  const { parsedCount, totalRecords } = parsingStatistic;

  useEffect(() => {
    parseChunking(textContent, (parsedCount, totalRecords) => {
      dispatch(setParsingStatistic({ parsedCount, totalRecords }));
    }).then(({ content, status }) => {
      if (!content || status !== "SUCCESS") {
        return;
      }
      dispatch(setViewingActivityContent(content));
      dispatch(switchStage("SEARCHING"));
      const keys = Object.keys(content);
      const chunks = keys.slice(0, 10);
      const promises = chunks.map(chunk => search(content[chunk].showTitle))
      Promise.all(promises).then(results => {
        debugger;
      })
    });
  }, []);

  const percentage = (parsedCount * 100) / totalRecords;
  const StageComponent = STAGES_COMPONENTS[stage];

  return (
    <div className="processor">
      <div className="processor__content">
        <StageComponent {...state} />
      </div>
      <style jsx>{`
        .processor {
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
          color: var(--graish);
        }

        .processor__content {
          position: relative;
          z-index: 2;
        }

        .processor:after {
          content: "";
          position: absolute;
          z-index: 1;
          left: 0;
          top: 0;
          width: ${percentage}%;
          height: 100%;
          border-radius: 20px;
          background: var(--bluish);
          transition: all 0.25s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
      `}</style>
    </div>
  );
};
