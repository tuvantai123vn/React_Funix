import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import StaffDetail from './StaffDetail';
import Department from './DeparmentComponent';
import RenderListSalary from './SalaryComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,
        }
        this.addStaff = this.addStaff.bind(this);
    }

    addStaff = (staff) => {
        const id = Math.floor(Math.random() * 10001);
        const newStaff = { id, ...staff };
        this.setState({
            staffs: [...this.state.staffs, newStaff]
        })
        console.log(newStaff);
        console.log(this.state.staffs);
    }
    StaffWithId = ({ match }) => {
        return (
            <StaffDetail staff={this.state.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]} />
        );
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/nhanvien' component={() => <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />} />
                    <Route path='/nhanvien/:staffId' component={this.StaffWithId} />
                    <Route path='/phongban' component={() => <Department dept={this.departments} />} />
                    <Route path='/luong' component={() => <RenderListSalary salary={this.staffs} />} />
                    <Redirect to='/nhanvien' />
                </Switch>
                <Footer />
            </div >
        );
    }
}
export default Main