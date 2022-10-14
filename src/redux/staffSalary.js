import * as ActionTypes from "./ActionTypes";

export const salary = (
    state = {
        isLoading: true,
        errMess: null,
        salary: [],
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFSALARY:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                salary: action.payload,
            };
        case ActionTypes.STAFFSALARY_LOADING:
            return { ...state, isLoading: true, errMess: null, salary: [] };
        case ActionTypes.STAFFSALARY_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                salary: [],
            };
        default:
            return state;
    }
};