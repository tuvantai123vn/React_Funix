import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { staffs } from "./staffs";
import { department } from "./departments";
import { salary } from "./staffSalary";

//tạo store lưu trữ với reducer ban đầu
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: staffs,
            department: department,
            salary: salary,
        }),
        applyMiddleware(thunk, logger))
    return store;
};