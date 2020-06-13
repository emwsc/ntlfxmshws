import { viewingActivityContent, ShowWithViewingActivity } from "../../logic";

export type STAGES = "PARSING" | "SEARCHING" | "SENDING";

export type ProcessorProps = {
  textContent: string;
};

type Progress = {
  current: number;
  max: number;
};

export type ProcessorStateProps = Progress & {
  children: React.ReactNode;
};

export type State = {
  textContent: string;
  stage: STAGES;
  parsingStatistic: Progress;
  searchingStatistic: Progress;
  foundStatistic: Progress;
  viewingActivityContent: viewingActivityContent[] | null;
  processedShows: ShowWithViewingActivity[];
};

export type SetStatistic = {
  type: "SET_STATISTIC";
  payload: {
    statistic: Progress;
    prop: "foundStatistic" | "parsingStatistic" | "searchingStatistic";
  };
};
export type SwitchStage = { type: "SWITCH_STAGE"; payload: STAGES };
export type SetViewingActivityContent = {
  type: "SET_VIEWING_ACTIVITY_CONTENT";
  payload: viewingActivityContent[];
};
export type AddProcessedShow = { type: "ADD_PROCESSED_SHOW", payload: ShowWithViewingActivity };

export type Action = SetStatistic | SwitchStage | SetViewingActivityContent | AddProcessedShow;
