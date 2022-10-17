import React from "react";
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, } from "reactstrap";
import { Link } from 'react-router-dom'
import {Loading} from './LoadingComponent'

function RenderStaffInDept({ staff }) {
    return (
        <div key={staff.id}>
        <div className="col-12 m-2">
        <Card>
            <CardImg width="100%" src={staff.image} alt={staff.image} />
            <div>
                <CardTitle>{staff.name}</CardTitle>
            </div>
        </Card>
        </div>
        </div>
    );
}

function StaffDept(props) {
    console.log(props);
    const listDept = props.staff.map((staff) => {
        return(
        <RenderStaffInDept staff={staff} />
        )
    })
    if(props.staffsLoading)
    return(
     <div className="container">
         <div className="row">
             <Loading />
         </div>
     </div>
 );
 else if(props.staffsErrMess)
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
                    <Link to='/phongban'>Phòng ban</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div className="row">
            {listDept}
        </div>
        </div>
    )
}

export default StaffDept;