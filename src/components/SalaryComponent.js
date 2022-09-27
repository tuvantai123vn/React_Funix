import React, { useState } from "react";
import {
    Button,
    Card,
    CardText,
    Jumbotron,
    BreadcrumbItem,
    Breadcrumb,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

const RenderSalary = ({ staff, salary, isLoading, errMess }) => {
    const formatDecimal = require("format-decimal");
    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return <h4>{errMess}</h4>;
    } else
        return (
            <Jumbotron>
                <h2 className="py-3">{staff.name}</h2>
                <p>Mã nhân viên: {staff.id}</p>
                <p>Hệ số lương: {staff.salaryScale}</p>
                <p>Số giờ làm thêm: {staff.overTime}</p>
                <Card className="p-1">
                    <CardText>
                        Lương:{" "}
                        {formatDecimal(salary, {
                            decimal: ".",
                            thousands: ",",
                            precision: 0,
                        })}{" "}
                        VND
                    </CardText>
                </Card>
            </Jumbotron>
        );
};

function SalaryTable(props) {
    const [staffList, setStaffList] = useState(props.staffList);
    function salaryCalc(salaryScale, overTime) {
        const basicSalary = 3000000;
        const overTimeSalary = 200000;
        return salaryScale * basicSalary + overTime * overTimeSalary;
    }

    function sortSalary(sorttype) {
        let sortedStaffList = [...staffList];
        let salaryA = 0;
        let salaryB = 0;

        if (sorttype === "increase") {
            sortedStaffList.sort(function (a, b) {
                salaryA = salaryCalc(a.salaryScale, a.overTime);
                salaryB = salaryCalc(b.salaryScale, b.overTime);
                return salaryA - salaryB;
            });
        }

        if (sorttype === "decrease") {
            sortedStaffList.sort(function (a, b) {
                salaryA = salaryCalc(a.salaryScale, a.overTime);
                salaryB = salaryCalc(b.salaryScale, b.overTime);
                return salaryB - salaryA;
            });
        }

        setStaffList(sortedStaffList);
    }

    const staff = staffList.staff.map((staff) => {
        return (
            <div className="col-12 col-md-6 col-lg-4" key={staff.id}>
                <RenderSalary
                    staff={staff}
                    salary={salaryCalc(staff.salaryScale, staff.overTime)}
                />
            </div>
        );
    });

    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/staff">Nhân Viên</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
            </Breadcrumb>
            <div id="sort" className="row">
                <div className="col-12">
                    <h5>Sắp Xếp Theo Lương</h5>
                </div>
                <div className="col-12">
                    <Button onClick={() => sortSalary("increase")}>
                        <span className="fa fa-sort-amount-asc"></span> Lương Thấp
                    </Button>

                    <Button onClick={() => sortSalary("decrease")}>
                        <span className="fa fa-sort-amount-desc"></span> Lương Cao
                    </Button>
                </div>
            </div>
            <div className="row">{staff}</div>
        </div>
    );
}

export default SalaryTable;