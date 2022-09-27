import * as ActionTypes from "./ActionTypes";

export const Staffs = (
    state = {
        errmess: null,
        staff: [],
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFF:
            return {
                ...state,
                isLoading: false,
                errmess: null,
                staff: action.payload.staff,
            };
        case ActionTypes.STAFF_LOADING:
            return { ...state, isLoading: true, errmess: null, staff: [] };
        case ActionTypes.STAFF_FAILED:
            return { ...state, isLoading: false, errmess: action.payload.staff };
        default:
            return state;
    }
};