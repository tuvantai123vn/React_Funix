import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import StaffDetail from './StaffDetail';
import Department from './DeparmentComponent';
import RenderListSalary from './SalaryComponent';


function Main() {
    const [staff] = useState({
        staffs: STAFFS,
        departments: DEPARTMENTS,
    });
    const StaffWithId = ({ match }) => {
        return (
            <StaffDetail staff={staff.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]} />
        );
    }

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/nhanvien' component={() => <StaffList staffs={staff.staffs} />} />
                <Route path='/nhanvien/:staffId' component={StaffWithId} />
                <Route path='/phongban' component={() => <Department dept={staff.departments} />} />
                <Route path='/luong' component={() => <RenderListSalary salary={staff.staffs} />} />
            </Switch>
            <Footer />
        </div>
    );
}
export default Main