import React, { useState } from "react";
import { CardImg, Button, Label, Col, Modal, ModalHeader, ModalBody, Row, Breadcrumb, BreadcrumbItem, CardTitle, CardText } from "reactstrap";
import { Control, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat';


function RenderStaff({ staff, department }) {
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-3">
                    <CardImg width='100%' src={staff.image} alt={staff.name} />
                </div>
                <div className="col-9">
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>
                        Ngày sinh: {dateFormat(staff.doB, 'yyyy - mm - dd')}
                    </CardText>
                    <CardText>
                        Ngày vào công ty: {dateFormat(staff.startDate, 'yyyy - mm - dd')}
                    </CardText>
                    {department.map((department) => {
                        if (department.id === staff.departmentId) {
                            return (
                                <CardText key={department.id}>Phòng ban: {department.name}</CardText>
                            );
                        }
                    })}
                    <CardText> Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText> Số ngày nghỉ: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </div>
            </div>
        </div>

    );
}


function StaffDetail(props) {
    const [isModalOpen, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!isModalOpen);
    };
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
    const handleDeleteStaff = () => {
        console.log('check redux', props.staff)
        props.deleteStaff(props.staff.id);
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/nhanvien'>Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.staff.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row mb-3">
                <RenderStaff staff={props.staff} department={props.department} />
                <div className="row">
                    <div className="col-6">
                        <Button color='success' outline onClick={toggleModal}>Sữa</Button>
                    </div>
                    <div className="col-6">
                        <Button color='danger' outline onClick={() => handleDeleteStaff()}>Xóa</Button>
                    </div>
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
                                        defaultValue={dateFormat(props.staff.doB, 'yyyy-mm-dd')}
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
                                        defaultValue={
                                            dateFormat(props.staff.startDate, 'yyyy-mm-dd')}
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
            </div>
        </div>
    );
}
export default StaffDetail;