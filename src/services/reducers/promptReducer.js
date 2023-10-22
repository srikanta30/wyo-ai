import {ActionType} from '../constants';
const initState = {};
export default function promptReducer(state=initState, action){

    switch (action.type) {
        case ActionType.UPDATE_LEVEL_STAGE:
            return {
                ...state,
                stage: action.payload
            }
            break;
        case ActionType.UPDATE_PROMPT_DATA:
            return {
                ...state,
                prePromptData: action.payload
            }
            break;

        case ActionType.SET_THEME_DATA:
            return {
                ...state,
                theme_id: action.payload
            }
            break;
        case ActionType.SET_REQ_TIME:
            return {
                ...state,
                currReqTime: action.payload
            }
            break;

        default:
            return state;
            break;
    }
     
}