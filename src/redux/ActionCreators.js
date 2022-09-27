import * as ActionType from './ActionType';
import { baseUrl } from '../shared/baseUrl';

export const addStaffSuccess = (staff) => ({
    type: ActionType.ADD_STAFF_SUCCESS,
    payload: staff
});
export const addStaff = (staff) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(staff),
        headers: {
            'content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(res => {
        if (res.ok) {
            return res;
        } else {
            var error = new Error('Error ' + res.status + ': ' + res.statusText);
            error.res = res;
            throw error;
        }
    },
        error => {
            throw error;
        })
        .then(res => res.json())
        .then(res => dispatch(addComment(res)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); })
};
