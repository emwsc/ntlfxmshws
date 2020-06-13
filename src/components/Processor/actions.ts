import {
  SetStatistic,
  State,
  STAGES,
  SwitchStage,
  SetViewingActivityContent,
  AddProcessedShow,
} from "./types";
import { viewingActivityContent } from "../../logic/viewingActivityParser/types";
import { Show } from "../../logic/myshows/types";

export const setStatistic = (
  prop: SetStatistic["payload"]["prop"],
  statistic: State["parsingStatistic"]
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

export const addProcessedShow = (payload: Show): AddProcessedShow => ({
  type: "ADD_PROCESSED_SHOW",
  payload,
});
