import { actionTypes } from 'react-redux-form'
import { DEPARTMENTS } from '../shared/staffs'

export const Departments = (state = DEPARTMENTS, action) => {
    switch (action.types) {
        default:
            return state;
    }
}