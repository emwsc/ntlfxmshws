import {SetParsingStatistic, State, STAGES, SwitchStage, SetViewingActivityContent} from './types'
import { ViewingAcitivityContent } from '../../logic/viewingActivityParser/types'

export const setParsingStatistic = (payload: State["parsingStatistic"]): SetParsingStatistic => ({
    type: 'SET_PARSING_STATISTIC',
    payload
})

export const switchStage = (payload: STAGES): SwitchStage => ({
    type: 'SWITCH_STAGE',
    payload
})

export const setViewingActivityContent = (payload: ViewingAcitivityContent[]): SetViewingActivityContent => ({
    type: 'SET_VIEWING_ACTIVITY_CONTENT',
    payload
})