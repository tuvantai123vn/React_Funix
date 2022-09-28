import * as ActionTypes from "./ActionTypes";

export const StaffInDept = (
    state = {
        isLoading: true,
        errMess: null,
        dept: [],
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFINDEPT:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                dept: action.payload,
            };
        case ActionTypes.STAFFINDEPT_LOADING:
            return { ...state, isLoading: true, errMess: null, dept: [] };
        case ActionTypes.STAFFINDEPT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dept: [] };
        default:
            return state;
    }
};