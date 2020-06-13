import { Action, State } from "./types";

export const getInitialState = (textContent: string): State => {
  return {
    textContent,
    stage: "PARSING",
    viewingActivityContent: null,
    parsingStatistic: {
      parsedCount: 0,
      totalRecords: 0,
    },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PARSING_STATISTIC": {
      return { ...state, parsingStatistic: { ...action.payload } };
    }
    case "SWITCH_STAGE": {
      return { ...state, stage: action.payload };
    }
    case 'SET_VIEWING_ACTIVITY_CONTENT': {
      return {...state, viewingActivityContent: action.payload}
    }
    default:
      return state;
  }
};
