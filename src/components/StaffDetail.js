/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-undef */
import React, { useState } from "react";
import dateFormat from "dateformat";
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Row,
    Col,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../redux/ActionCreactors";
import { Control, LocalForm } from "react-redux-form";

function RenderStaff({ staff, departmentId }) {
    if (staff != null)
        return (
            <Stagger in>
                <Fade in>
                    <div className=" row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <img
                                className="img"
                                src={staff.image}
                                style={{ width: "100%" }}
                                alt={staff.name}
                            />
                        </div>
                        <div key={staff.id} className="col-lg-9 col-md-8 col-12">
                            <h3> {staff.name} </h3>
                            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                            <p>
                                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                            </p>
                            {departmentId.map((department) => {
                                if (department.id === staff.departmentId) {
                                    return (
                                        <p key={department.id}>Phòng ban: {department.name}</p>
                                    );
                                }
                            })}
                            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                            <p>Số ngày đã làm thêm: {staff.overTime}</p>
                        </div>
                    </div>
                </Fade>
            </Stagger>
        );
    else return <div></div>;
}
function StaffDetail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [isModalOpen, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!isModalOpen);
    };

    function handleDeleteStaff() {
        dispatch(deleteStaff(id));
        props.history.push("/staff");
    }

    const handleUpdateStaff = (values) => {
        const updateStaff = {
            id: props.staff.id,
            name: values.name,
            doB: values.doB,
            startDate: values.startDate,
            departmentId: values.departmentId,
            salaryScale: values.salaryScale,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
        };

        props.updateStaff(updateStaff);
        toggleModal();
    };
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.staff != null)
        return (
            <>
                <div>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/staff">Nhân Viên</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="">
                        <RenderStaff
                            staff={props.staff}
                            departmentId={props.department.department}
                        />
                    </div>
                    <Button type="button" color="info" outline onClick={toggleModal}>
                        Cập nhật thông tin
                    </Button>
                    <Button
                        type="button"
                        color="danger"
                        value="delete"
                        outline
                        onClick={handleDeleteStaff}
                    >
                        Xóa
                    </Button>
                </div>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader>Chỉnh sửa nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleUpdateStaff(values)}>
                            <Row className="form-group">
                                <Label md={3}>Tên</Label>
                                <Col md={9}>
                                    <Control.text
                                        className="form-control"
                                        model=".name"
                                        placeholder="Nhập tên đầy đủ"
                                        name="name"
                                        defaultValue={props.staff.name}
                                    ></Control.text>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Ngày sinh</Label>
                                <Col md={9}>
                                    <Control
                                        className="form-control"
                                        model=".doB"
                                        type="date"
                                        name="doB"
                                        defaultValue={props.staff.doB}
                                    ></Control>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Ngày vào công ty</Label>
                                <Col md={9}>
                                    <Control
                                        className="form-control"
                                        model=".startDate"
                                        type="date"
                                        name="startDate"
                                        defaultValue={props.staff.startDate}
                                    ></Control>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Phòng Ban</Label>
                                <Col md={9}>
                                    <Control.select
                                        className="form-control"
                                        model=".departmentId"
                                        name="departmentId"
                                        defaultValue={props.staff.departmentId}
                                    >
                                        <option value="" disabled selected>
                                            Chọn phòng ban
                                        </option>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Hệ số lương</Label>
                                <Col md={9}>
                                    <Control
                                        className="form-control"
                                        model=".salaryScale"
                                        type="number"
                                        name="salaryScale"
                                        defaultValue={props.staff.salaryScale}
                                    ></Control>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Số ngày nghỉ còn lại</Label>
                                <Col md={9}>
                                    <Control
                                        className="form-control"
                                        model=".annualLeave"
                                        type="number"
                                        name="annualLeave"
                                        defaultValue={props.staff.annualLeave}
                                    ></Control>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3}>Số ngày đã làm thêm</Label>
                                <Col md={9}>
                                    <Control
                                        className="form-control"
                                        model=".overTime"
                                        type="number"
                                        name="overTime"
                                        defaultValue={props.staff.overTime}
                                    ></Control>
                                </Col>
                            </Row>
                            <Button type="submit" color="primary" block>
                                Chỉnh sửa
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    else return <div></div>;
}

export default StaffDetail;