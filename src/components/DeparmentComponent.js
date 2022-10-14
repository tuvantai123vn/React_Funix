import React from 'react';
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function RenderDept({ dept }) {
    return (
        <Card>
            <Link to={`/phongban/${dept.id}`}>
                <CardTitle>{dept.name}</CardTitle>
                <CardBody>
                    <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

function Department(props) {
    const department = props.dept.map((department) => {
        return (
            <div className='col-12 col-md-6 col-lg-4 mt-2 mb-2' key={department.id}>
                <RenderDept dept={department} />
            </div>
        );
    })
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