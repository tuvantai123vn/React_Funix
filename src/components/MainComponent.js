/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import StaffDetail from "../components/StaffdetailComponent";
import { connect } from "react-redux";
import Header from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import StaffList from "../components/StaffsListComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Department from "./DepartmentComponent";
import SalaryTable from "./SalaryTableComponent";
import StaffDept from "./StaffInDeptComponent";
import {
    postStaff,
    fetchStaff,
    fetchDepartment,
    addDepartment,
    fetchStaffSalary,
    addSalary,
    updateStaff,
    deleteStaff,
} from "../redux/ActionCreactors";

// Khai báo state reducer
const mapStateToProps = (state) => {
    return {
        staffs: state.staffs,
        department: state.department,
        salary: state.salary,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postStaff: (staff) => {
        dispatch(postStaff(staff));
    },
    fetchStaff: () => {
        dispatch(fetchStaff());
    },
    addDepartment: (department) => {
        dispatch(addDepartment(department));
    },
    fetchDepartment: () => {
        dispatch(fetchDepartment());
    },
    addSalary: (salary) => {
        dispatch(addSalary(salary));
    },
    fetchStaffSalary: () => {
        dispatch(fetchStaffSalary());
    },
    deleteStaff: (id) => {
        dispatch(deleteStaff(id));
    },
    updateStaff: (staff) => {
        dispatch(updateStaff(staff));
    },
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepartment();
        this.props.fetchStaffSalary();
    }

    postStaff = (newStaff) => {
        this.setState({ staffs: [...this.props.staffs.staff, newStaff] });
    };

    render() {
        const StaffId = ({ match, history }) => {
            return (
                <StaffDetail
                    staff={
                        this.props.staffs.staff.filter(
                            (staff) => staff.id === parseInt(match.params.id, 10)
                        )[0]
                    }
                    department={this.props.department}
                    updateStaff={this.props.updateStaff}
                    history={history}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location.key}
                        classNames="page"
                        timeout={300}
                    >
                        <Switch location={this.props.location}>
                            <Route
                                exact
                                path="/staff"
                                component={() => (
                                    <StaffList
                                        staff={this.props.staffs}
                                        onAddStaff={this.onAddStaff}
                                        postStaff={this.props.postStaff}
                                    />
                                )}
                            />

                            <Route exact path="/staff/:id" component={StaffId} />
                            <Route
                                exact
                                path="/department"
                                component={() => (
                                    <Department department={this.props.department} />
                                )}
                            />
                            <Route
                                path="/department/:deptId"
                                component={() => <StaffDept />}
                            />
                            <Route
                                path="/salary"
                                component={() => <SalaryTable staffList={this.props.staffs} />}
                            />
                            <Redirect to="/staff" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));