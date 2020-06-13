import { viewingActivityContent, ShowWithViewingActivity } from "../../logic";

export type STAGES = "PARSING" | "SEARCHING" | 'DONE';

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

export type ProcessorState = {
  textContent: string;
  stage: STAGES;
  parsingStatistic: Progress;
  searchingStatistic: Progress;
  foundStatistic: Progress;
  viewingActivityContent: viewingActivityContent[] | null;
  processedShows: ShowWithViewingActivity[];
  uploadAllState: 'INIT' | 'UPLOADING_AS_IT_IS' | 'MARK_ALL_AS_WATCHED' | 'DONE' 
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
export type ChangeUploadAllState = {type: "CHANGE_UPLOAD_ALL_STATE", payload: ProcessorState['uploadAllState']}

export type Action = SetStatistic | SwitchStage | SetViewingActivityContent | AddProcessedShow | ChangeUploadAllState;
