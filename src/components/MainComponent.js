import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DeparmentComponent';
import RenderListSalary from './SalaryComponent';
import { fetchStaff, postStaff, fetchDepartment } from '../redux/ActionCreators';

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
    fetchDepartment: () => {
        dispatch(fetchDepartment());
    },

});

class Main extends Component {
    constructor(props) {
        super(props);
        this.addStaff = this.addStaff.bind(this);
    }

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepartment();
        // this.props.fetchStaffSalary();
    }
    addStaff(staff) {
        const id = Math.floor(Math.random() * 10001);
        const newStaff = { id, ...staff };
        this.setState({
            staffs: [...this.props.staffs, newStaff]
        })
        console.log(this.props.staffs);
    }


    StaffWithId = ({ match }) => {
        return (
            <StaffDetail staff={this.props.staffs.staff.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]}
                department={this.props.department} />
        );
    }
    render() {
        console.log(this.props.staffs);
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/nhanvien' component={() => <StaffList onAdd={this.addStaff} staffs={this.props.staffs} />} />
                    <Route path='/nhanvien/:staffId' component={this.StaffWithId} />
                    <Route path='/phongban' component={() => <Department dept={this.props.department} />} />
                    <Route path='/luong' component={() => <RenderListSalary salary={this.props.staffs} />} />
                    <Redirect to='/nhanvien' />
                </Switch>
                <Footer />
            </div >
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));