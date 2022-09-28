import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { Salary } from "./staffSalary";
import { StaffInDept } from "./staffDep";

//tạo store lưu trữ với reducer ban đầu
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            salary: Salary,
            staffInDept: StaffInDept,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};