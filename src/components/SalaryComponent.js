import React, { useState } from 'react';
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, CardText, CardBody, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent'

const LuongCB = 3000000;
const LuongLT = 200000;

function RenderSalary({ salary }) {
    return (
        <Card>
            <CardTitle>{salary.name}</CardTitle>
            <CardBody>
                <CardText>Mã nhân viên: {salary.id}</CardText>
                <CardText>hệ số lương: {salary.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {salary.overTime}</CardText>
                <CardText className='bg-light -2 shadow'>Lương: {(salary.salaryScale * LuongCB + salary.overTime * LuongLT).toFixed(0)}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderListSalary(props) {
    const [sortSalary, setSortSalary] = useState(false);
    const salary = props.salary.staffs.sort((a, b) => sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale).map((salary) => {
        return (
            <div className='col-12 col-mb-6 col-lg-4 mt-2 mb-2' key={salary.id}>
                <RenderSalary salary={salary} />
            </div>
        );
    })

    if(props.Loading)
    return(
     <div className="container">
         <div className="row">
             <Loading />
         </div>
     </div>
 );
 else if(props.ErrMess)
 return(
     <div className="container">
         <div className="row">
             <h4>{this.props.staffsErrMess}</h4>
         </div>
     </div>
 );
 else
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/nhanvien'>Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Lương</BreadcrumbItem>

                </Breadcrumb>
                <div className="col-12">
                    <h3>Lương</h3>
                    <hr />
                </div>
                <Button color="primary" onClick={() => setSortSalary(!sortSalary)}>Sắp xếp theo hệ số</Button>
            </div>
            <div className="row mb-3">
                {salary}
            </div>
        </div>
    );
}
export default RenderListSalary;
