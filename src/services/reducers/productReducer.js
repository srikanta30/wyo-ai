import {ActionType} from '../constants';
const initState = {};
export default function productReducer(state=initState, action){

    switch (action.type) {
        case ActionType.PRODUCT_VIEW_SWITCH:
            return {
                ...state,
                parentSKU: action.payload
            }
            break;

            case ActionType.PRODUCT_ATTRIBUTE:
                return {
                    ...state,
                    attributes: action.payload
                }
                break;

            case ActionType.PRODUCT_COLOR:
                return {
                    ...state,
                    color: action.payload
                }
                break;
         

        default:
            return state;
            break;
    }
     
}