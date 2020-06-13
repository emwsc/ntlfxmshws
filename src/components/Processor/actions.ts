import {
  SetStatistic,
  ProcessorState,
  STAGES,
  SwitchStage,
  SetViewingActivityContent,
  AddProcessedShow,
  ChangeUploadAllState,
} from "./types";
import { viewingActivityContent, Show, ShowWithViewingActivity } from "../../logic";

export const setStatistic = (
  prop: SetStatistic["payload"]["prop"],
  statistic: ProcessorState["parsingStatistic"]
): SetStatistic => ({
  type: "SET_STATISTIC",
  payload: {
    prop,
    statistic,
  },
});

export const switchStage = (payload: STAGES): SwitchStage => ({
  type: "SWITCH_STAGE",
  payload,
});

export const setViewingActivityContent = (
  payload: viewingActivityContent[]
): SetViewingActivityContent => ({
  type: "SET_VIEWING_ACTIVITY_CONTENT",
  payload,
});

export const addProcessedShow = (payload: ShowWithViewingActivity): AddProcessedShow => ({
  type: "ADD_PROCESSED_SHOW",
  payload,
});

export const changeUploadAllState = (payload: ProcessorState['uploadAllState']): ChangeUploadAllState => ({
  type: 'CHANGE_UPLOAD_ALL_STATE',
  payload
})