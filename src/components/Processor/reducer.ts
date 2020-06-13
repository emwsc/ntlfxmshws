import { Action, ProcessorState } from "./types";

const initialProgress = {
  current: 0,
  max: 0,
}

export const getInitialState = (textContent: string): ProcessorState => {
  return {
    textContent,
    stage: "PARSING",
    viewingActivityContent: null,
    parsingStatistic: initialProgress,
    searchingStatistic: initialProgress,
    foundStatistic: initialProgress,
    processedShows: [],
    uploadAllState: 'INIT'
  };
};

export const reducer = (state: ProcessorState, action: Action): ProcessorState => {
  switch (action.type) {
    case 'CHANGE_UPLOAD_ALL_STATE': {
      return {...state, uploadAllState: action.payload}
    }
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
