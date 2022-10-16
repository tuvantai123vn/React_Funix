import React from "react";
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, } from "reactstrap";
import { Link } from 'react-router-dom'

function RenderStaffInDept({ staff }) {
    return (
        <Card>
            <CardImg width="100%" src={"/asset/images/alberto.png"} alt={staff.image} />
            <div>
                <CardTitle>{staff.name}</CardTitle>
            </div>
        </Card>
    );
}

function StaffDept(props) {
    console.log(props);
    return (
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/phongban'>Nhân viên</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
            <RenderStaffInDept staff={props.staff} />
        </div>
    )
}

export default StaffDept;