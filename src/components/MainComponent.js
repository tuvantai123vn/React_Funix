import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DeparmentComponent';
import RenderListSalary from './SalaryComponent';
import StaffDept from './DeparmentDetail';
import { fetchStaffs, postStaff, fetchDepartment, addDepartment, fetchStaffSalary, addSalary, updateStaff, deleteStaff } from '../redux/ActionCreators';
import { Transition, CSSTransition } from 'react-transition-group';

// Khai báo state reducer
const mapStateToProps = (state) => {
    return {
        staffs: state.staffs,
        department: state.department.department,
        salary: state.salary,
    };
};


const mapDispatchToProps = (dispatch) => ({
    postStaff: (staff) => {
        dispatch(postStaff(staff));
    },
    fetchStaffs: () => {
        dispatch(fetchStaffs());
    },
    fetchDepartment: () => {
        dispatch(fetchDepartment());
    },
    addDepartment: (department) => {
        dispatch(addDepartment(department));
    },
    addSalary: (salary) => {
        dispatch(addSalary(salary));
    },
    fetchStaffSalary: () => {
        dispatch(fetchStaffSalary());
    },
    updateStaff: (staff) => {
        dispatch(updateStaff(staff));
    },
    deleteStaff: (id) => {
        dispatch(deleteStaff(id))
    }

});

class Main extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartment();
        this.props.fetchStaffSalary();
    }
    postStaff = (newStaff) => {
        this.setState({ staffs: [...this.props.staffs.staff, newStaff] });
    };

    DeptstaffId = ({ match }) => {
        return(
        <StaffDept dept={this.props.department.filter((dept) => dept.id === match.params.deptId)[0]}
        staff={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.deptId)}
        />);
        
    }
    StaffWithId = ({ match }) => {
        return (
            <StaffDetail staff={this.props.staffs.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]}
                department={this.props.department}
                updateStaff={this.props.updateStaff}
                deleteStaff={this.props.deleteStaff}
            />
        );
    }
    render() {
        return (
            <div>
                <Header />
                <Transition>
                    <CSSTransition classNames='page' timeout={300}>
                        <Switch>
                            <Route exact path='/nhanvien' component={() => <StaffList onAdd={this.addStaff} staffs={this.props.staffs}
                                staffsLoading={this.props.staffs.isLoading}
                                staffsErrMess={this.props.staffs.errMess}
                                postStaff={this.props.postStaff}
                            />} />
                            <Route path='/nhanvien/:staffId' component={this.StaffWithId} />
                            <Route path='/phongban' component={() => <Department dept={this.props.department} staff={this.props.staffs.staffs} />} />
                            <Route path='/phongban/:deptId' component={this.DeptstaffId} />
                            <Route path='/luong' component={() => <RenderListSalary salary={this.props.staffs} />} />
                            <Redirect to='/nhanvien' />
                        </Switch>
                    </CSSTransition>
                </Transition>
                <Footer />
            </div >
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));