import * as ActionTypes from "./ActionTypes";

export const department = (
    state = {
        isLoading: true,
        errMess: null,
        department: [],
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENT:
            return { ...state, isLoading: false, errMess: null, department: action.payload };
        case ActionTypes.DEPARTMENT_LOADING:
            return { ...state, isLoading: true, errMess: null, department: [] };
        case ActionTypes.DEPARTMENT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, department: [] };
        default:
            return state;
    }
};