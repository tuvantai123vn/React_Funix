import * as ActionTypes from "./ActionTypes";

export const staffs = (state = { isLoading: true, errmess: null, staffs: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return { ...state, isLoading: false, errmess: null, staffs: action.payload };
        case ActionTypes.STAFF_LOADING:
            return { ...state, isLoading: true, errmess: null, staffs: [] };
        case ActionTypes.STAFF_FAILED:
            return { ...state, isLoading: false, errmess: action.payload.staffs };
        default:
            return state;
    }
};