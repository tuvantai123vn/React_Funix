import React, { useState } from "react";
import { Card, CardImg, CardTitle, Form, Input, Button } from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import AddStaff from "./AddStaffComponent";
import { Loading } from "./LoadingComponent";

function RenderStaffList({ staff, onClick, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return <h4>{errMess}</h4>;
    } else
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: "scale(0.5) translateY(-50%)",
                }}
            >
                <Card>
                    <Link to={`/staff/${staff.id}`}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <div>
                            <CardTitle>{staff.name}</CardTitle>
                        </div>
                    </Link>
                </Card>
            </FadeTransform>
        );
}

const StaffList = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchStaff, setSearchStaff] = useState(props.staff);

    // Lấy kết quả từ input
    const submitSearch = (e) => {
        e.preventDefault();
        searchName(searchInput);
    };

    //Tìm kiếm nhân viên
    const searchName = (value) => {
        const sName = value;
        if (sName !== "") {
            const result = props.staff.filter((s) =>
                s.name.toLowerCase().match(sName.toLowerCase())
            );
            if (result.length > 0) {
                setSearchStaff(result);
            } else {
                alert("Không tìm thấy kết quả");
            }
        } else {
            setSearchStaff([...props.staff]);
        }
    };

    // Thêm nhân viên mới từ main truyền dữ liệu sang
    const postStaff = (staff) => {
        props.postStaff(staff);
    };

    // Duyệt các phần tử trong mảng
    const staff1 = searchStaff.staff.map((staff) => {
        return (
            <div className="col-lg-2 col-md-4 col-6" key={staff.id}>
                <RenderStaffList
                    staff={staff}
                    onClick={props.onClick}
                    isLoading={props.staffLoading}
                    errMess={props.staffErrMess}
                />
            </div>
        );
    });

    if (props.staff.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.staff.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.staff.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    // Trả về kết quả hiển thị
    else
        return (
            <div className="container">
                <div key={props.id} className="row">
                    <div className="row col-12 col-md-6 col-lg-4">
                        <h3 className="staff ">Nhân Viên</h3>
                        <AddStaff staffList={props.staff.staff} postStaff={postStaff} />
                    </div>
                    {/* Form tìm kiếm nhân viên */}
                    <div className=" col-12 col-md-6 col-lg-8">
                        <Form onSubmit={submitSearch} className="form">
                            <Input
                                type="text"
                                id="search"
                                name="search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Nhập tên nhân viên muốn tìm"
                            />
                            <Button
                                type="submit"
                                value="name"
                                color="primary"
                                className="search"
                            >
                                Tìm
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="row" key={props.id}>
                    {staff1}
                </div>
            </div>
        );
};
export default StaffList;