/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffInDept } from "../redux/ActionCreactors";
import { useParams } from "react-router-dom";

function RenderStaffInDept({ x }) {
    return (
        <Card>
            <CardImg width="100%" src={"/asset/images/alberto.png"} alt={x.image} />
            <div>
                <CardTitle>{x.name}</CardTitle>
            </div>
        </Card>
    );
}

function StaffDept() {
    const { deptId } = useParams(); //get params in url
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStaffInDept(deptId)); //dispatch action in actioncreator with use dispatch
    }, []);

    const dept = useSelector((state) => state.staffInDept); // access store and get state saffInDept in store.

    const renderEachStaffInDept = dept.dept.map((department) => {
        return (
            <div className="col-6 col-md-4 col-lg-2">
                <RenderStaffInDept x={department} />
            </div>
        );
    });

    return <div className="row">{renderEachStaffInDept}</div>;
}

export default StaffDept;