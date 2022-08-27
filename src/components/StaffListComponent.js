import React from 'react';
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';



function RenderListStaff({ staff }) {
    return (
        <Card>
            <Link to={`/nhanvien/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle>
                    {staff.name}
                </CardTitle>
            </Link>
        </Card>
    );
}
function StaffList(props) {
    const Liststaffs = props.staffs.map((staff) => {
        return (
            <div key={staff.id}>
                <div className='col-12 m-2'>
                    <RenderListStaff staff={staff} />
                </div>
            </div>
        );
    });

    return (
        <div className='container'>
            <div className='row'>
                {Liststaffs}
            </div>
        </div>
    );
}

export default StaffList;