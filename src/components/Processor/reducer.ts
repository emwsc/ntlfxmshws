import { Action, State } from "./types";

const initialProgress = {
  current: 0,
  max: 0,
}

export const getInitialState = (textContent: string): State => {
  return {
    textContent,
    stage: "PARSING",
    viewingActivityContent: null,
    parsingStatistic: initialProgress,
    searchingStatistic: initialProgress,
    foundStatistic: initialProgress,
    processedShows: []
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PROCESSED_SHOW':{
      const nextProcessedShows = [...state.processedShows];
      nextProcessedShows.push({...action.payload});
      return {...state, processedShows: nextProcessedShows}
    }
    case "SET_STATISTIC": {
      const nextState = {...state};
      const {prop, statistic} = action.payload;
      nextState[prop]={...statistic};
      return nextState;
    }
    case "SWITCH_STAGE": {
      return { ...state, stage: action.payload };
    }
    case 'SET_VIEWING_ACTIVITY_CONTENT': {
      return {...state, viewingActivityContent: [...action.payload]}
    }
    default:
      return state;
  }
};
