import {ActionType} from '../constants';


export const updateProductViewStatus = (data)=>{
    return{
        type: ActionType.PRODUCT_VIEW_SWITCH,
        payload: data
    }
}

export const updateProductAttributes = (data)=>{
    return{
        type: ActionType.PRODUCT_ATTRIBUTE,
        payload: data
    }
}

export const updateSelectedProductColor = (data)=>{
    return{
        type: ActionType.PRODUCT_COLOR,
        payload: data
    }
}
 

