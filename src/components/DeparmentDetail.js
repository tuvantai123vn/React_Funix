import React from "react";
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, } from "reactstrap";
import { Link } from 'react-router-dom'
import {Loading} from './LoadingComponent'

function RenderStaffInDept({ staff }) {
    return (
        
        <div className="col-12 m-2">
        <Card>
        <Link to={`/nhanvien/${staff.id}`} >
            <CardImg width="100%" src={staff.image} alt={staff.image} />
            <div>
                <CardTitle>{staff.name}</CardTitle>
            </div>
            </Link>
        </Card>
        </div>
        
    );
}

function StaffDept(props) {
    
    const listDept = props.staff.map((staff) => {
        return(
        <div key={staff.id}>
        <RenderStaffInDept staff={staff} />
        </div>
        )
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
                    <Link to='/phongban'>Phòng ban</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{ (props.dept !== undefined ? props.dept.name : '') }</BreadcrumbItem>
                </Breadcrumb>
        </div>
        <div className="row">
            {listDept}
        </div>
        </div>
    )
}

export default StaffDept;