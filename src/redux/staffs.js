import * as ActionTypes from './ActionTypes';
export const Staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFF:
            return {
                ...state, isLoading: false, errMess: null, staffs: action.payload
            }
        case ActionTypes.STAFF_LOADING:
            return {
                ...state, isLoading: true, errMess: null, staffs: []
            }
        case ActionTypes.STAFF_FAILED:
            return {
                ...state, isLoading: false, errMess: action.payload, staffs: []
            }
        default:
            return state;
    }
}