import React from 'react';
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import {Loading} from './LoadingComponent'

function RenderDept({ dept, staffNo }) {
    // console.log(dept)
    // console.log(staffNo)
    return (
        <Card>
            <Link to={`/phongban/${dept.id}`}>
                <CardTitle>{dept.name}</CardTitle>
                <CardBody>
                    <CardText>Số lượng nhân viên: {staffNo.length}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

function Department(props) {
    const department = props.dept.map((department) => {
        return (
            <div className='col-12 col-md-6 col-lg-4 mt-2 mb-2' key={department.id}>
                <RenderDept dept={department} staffNo={props.staff.filter((staff) => staff.departmentId === department.id)}/>
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
        <div className='container'>
            <div className="col-12">
                <h3>Phòng ban</h3>
                <hr />
            </div>
            <div className='row shadow m-3'>
                {department}
            </div>
        </div>
    );
}
export default Department