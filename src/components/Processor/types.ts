import { ViewingAcitivityContent } from "../../logic/viewingActivityParser/types";

export type STAGES = 'PARSING' | 'SEARCHING' | 'SENDING';

export type ProcessorProps = {
    textContent: string;
}

export type State = {
    textContent: string,
    stage: STAGES,
    parsingStatistic: {
        parsedCount: number;
        totalRecords: number;
    }
    viewingActivityContent: ViewingAcitivityContent[] | null;
}

export type SetParsingStatistic = {type: 'SET_PARSING_STATISTIC', payload: State["parsingStatistic"] }
export type SwitchStage = {type: 'SWITCH_STAGE', payload: STAGES}
export type SetViewingActivityContent = {type: 'SET_VIEWING_ACTIVITY_CONTENT', payload: ViewingAcitivityContent[]}

export type Action = SetParsingStatistic | SwitchStage | SetViewingActivityContent;