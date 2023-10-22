import {ActionType} from '../constants';


export const updatePrePromptData = (data)=>{
    return{
        type: ActionType.UPDATE_PROMPT_DATA,
        payload: data
    }
}

export const setThemeId = (data)=>{
    return{
        type: ActionType.SET_THEME_DATA,
        payload: data
    }
}

export const updateLevelStage = (data)=>{
    return{
        type: ActionType.UPDATE_LEVEL_STAGE,
        payload: data
    }
}


export const setReqTime = (data)=>{
    return{
        type: ActionType.SET_REQ_TIME,
        payload: data
    }
}