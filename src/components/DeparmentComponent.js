import React from 'react';
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

function RenderDept({ dept }) {
    return (
        <Card>
            <CardTitle>{dept.name}</CardTitle>
            <CardBody>
                <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
            </CardBody>
        </Card>
    );
}

function Department(props) {
    console.log(props)
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