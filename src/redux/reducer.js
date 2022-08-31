import { DEPARTMENTS, STAFFS } from '../shared/staffs'
export const initialState = {
    departments: DEPARTMENTS,
    staffs: STAFFS,
};

export const Reducer = (state = initialState, action) => {
    return state;
};