import React, { useEffect, useReducer, Fragment } from "react";

import { ProcessedShow } from "../ProcessedShow";

import { ProcessorProps, State, ProcessorStateProps } from "./types";

import { parseChunking, searchByChunks } from "../../logic";
import {
  setStatistic,
  switchStage,
  setViewingActivityContent,
  addProcessedShow,
} from "./actions";
import { reducer, getInitialState } from "./reducer";

import { styleProcessorStages } from "./styles";

const ProcessorState = ({ children, current, max }: ProcessorStateProps) => (
  <div className="processor">
    <div className="processor__content">{children}</div>
    <style jsx>{`
      .processor {
        padding: 25px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 900px;
        height: 120px;
        border-radius: 20px;
        box-shadow: 0 0.8px 2.2px rgba(0, 0, 0, 0.02),
          0 1.7px 5.3px rgba(0, 0, 0, 0.028), 0 2.9px 10px rgba(0, 0, 0, 0.035),
          0 4.2px 17.9px rgba(0, 0, 0, 0.042),
          0 6.1px 33.4px rgba(0, 0, 0, 0.05), 0 11px 80px rgba(0, 0, 0, 0.07);
        position: relative;
        background: var(--graish);
        color: var(--white);
      }

      .processor__content {
        position: relative;
        z-index: 3;
      }

      .processor:before {
        content: "";
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: ${(current * 100) / max}%;
        height: 100%;
        border-radius: 20px;
        background: var(--cornflower);
        transition: width 0.1s linear;
      }
    `}</style>
  </div>
);

const ParsingState = ({
  parsingStatistic,
}: Pick<State, "parsingStatistic">) => (
  <ProcessorState current={parsingStatistic.current} max={parsingStatistic.max}>
    <p className="title processor__title">
      {
        <span>
          Парсим данные с <span className="netflix">Netflix</span>
        </span>
      }
    </p>
    <p className="text processor__stats">
      Обработано {parsingStatistic.current} из {parsingStatistic.max}
    </p>
    <style jsx>{styleProcessorStages}</style>
  </ProcessorState>
);

const SearchingState = ({
  viewingActivityContent,
  searchingStatistic,
  foundStatistic,
}: Pick<
  State,
  "viewingActivityContent" | "searchingStatistic" | "foundStatistic"
>) => (
  <ProcessorState
    current={searchingStatistic.current}
    max={searchingStatistic.max}
  >
    <p className="title text text_centered processor__title">
      Ищем сериалы на{" "}
      <img
        className="myshows-logo"
        alt="MyShows"
        src={"/icons/myshows_logo.png"}
      />
    </p>
    <p className="text processor__stats">
      Ваша история просмотров на <span className="netflix bold">Netflix</span>{" "}
      составляет {viewingActivityContent.length} шоу
    </p>
    <p className="text processor__stats">
      Обработано {searchingStatistic.current} из {searchingStatistic.max} •
      Найдено на MyShows{" "}
      <span className="bold netflix">{foundStatistic.current}</span> из{" "}
      {foundStatistic.max}
    </p>
    <style jsx>{styleProcessorStages}</style>
    <style jsx>{`
      .myshows-logo {
        display: inline-block;
        margin-left: 5px;
        margin-top: 4px;
      }
    `}</style>
  </ProcessorState>
);

/**
 * Component that shows show parsing viewing activity, searching and uploading to myshows goes
 * @todo Show erros when parsing goes wrong
 */
export const Processor = ({ textContent }: ProcessorProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(textContent));

  const {
    parsingStatistic,
    viewingActivityContent,
    searchingStatistic,
    foundStatistic,
    processedShows,
  } = state;

  useEffect(() => {
    parseChunking(textContent, (current, max) => {
      dispatch(setStatistic("parsingStatistic", { current, max }));
    }).then(({ content, status }) => {
      if (!content || status !== "SUCCESS") {
        return;
      }
      dispatch(setViewingActivityContent(content));
      dispatch(switchStage("SEARCHING"));
      let foundShowsCount = 0;
      let maxShow = content.length;
      searchByChunks(
        [...content],
        (current, max) => {
          dispatch(setStatistic("searchingStatistic", { current, max }));
        },
        (foundShows) => {
          foundShowsCount += foundShows.length;
          dispatch(
            setStatistic("foundStatistic", {
              current: foundShowsCount,
              max: maxShow,
            })
          );
          foundShows.forEach((show) => {
            dispatch(addProcessedShow(show));
          });
        }
      ).then(() => {
        dispatch(switchStage("SENDING"));
      });
    });
  }, []);

  return (
    <div className="container">
      <ParsingState parsingStatistic={parsingStatistic} />
      {viewingActivityContent && (
        <SearchingState
          foundStatistic={foundStatistic}
          searchingStatistic={searchingStatistic}
          viewingActivityContent={viewingActivityContent}
        />
      )}
      {processedShows.length > 0 && (
        <>
          <h2>Найденные шоу</h2>
          <button className="button button_inverse">Автоматически загрузить все данные о просмотренных шоу как получится</button>
          <button className="button button_inverse">Пометить все как посмотренные целиком</button>
          {processedShows.map((show) => (
            <Fragment key={show.id}>
              <ProcessedShow {...show} />
            </Fragment>
          ))}
        </>
      )}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: repeat(auto-fit, 120px);
          grid-gap: 10px;
          margin: 50px 0;
          width: 100%;
          justify-items: center;
        }
      `}</style>
    </div>
  );
};
