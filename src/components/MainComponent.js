import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DeparmentComponent';
import RenderListSalary from './SalaryComponent';
import { STAFFS, DEPARTMENTS } from "../shared/staffs";

// Khai báo state reducer
const mapStateToProps = state => {
    return {
        departments: state.departments,
        staffs: state.staffs,
    }
}
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            department: DEPARTMENTS,
        };
        this.addStaff = this.addStaff.bind(this);
    }

    addStaff(staff) {
        const id = Math.floor(Math.random() * 10001);
        const newStaff = { id, ...staff };
        this.setState({
            staffs: [...this.props.staffs, newStaff]
        })
        console.log(newStaff);
        console.log(this.props.staffs);
    }
    StaffWithId = ({ match }) => {
        return (
            <StaffDetail staff={this.props.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]} />
        );
    }


    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/nhanvien' component={() => <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />} />
                    <Route path='/nhanvien/:staffId' component={this.StaffWithId} />
                    <Route path='/phongban' component={() => <Department dept={this.props.departments} />} />
                    <Route path='/luong' component={() => <RenderListSalary salary={this.props.staffs} />} />
                    <Redirect to='/nhanvien' />
                </Switch>
                <Footer />
            </div >
        );
    }
}
export default (withRouter(connect(mapStateToProps)(Main)));