/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Row,
    Col,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !Number.isNaN(Number(val));
const numRange = (val) => val > 0 && val < 4;

class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            isModalOpen: false,
            name: "",
            doB: "",
            salaryScale: "",
            startDate: "",
            departmentId: "",
            annualLeave: "",
            overTime: "",
            salary: "",
            image: "/asset/images/alberto.png",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    // Hàm tạo đóng mở form thêm nhân viên
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    // sự kiện handleSubmit khi người dùng thêm nhân viên
    handleSubmit(value) {
        const newStaff = {
            id: this.props.staffList.length,
            name: value.name,
            doB: value.doB,
            departmentId: value.departmentId,
            salaryScale: value.salaryScale,
            startDate: value.startDate,
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            image: "/asset/images/alberto.png",
        };

        // Đièu kiện người dùng nhập đầy đủ các trường
        if (newStaff.name === "") {
            alert("Vui lòng nhập các trường");
        } else {
            this.props.postStaff(newStaff);
        }
    }

    render() {
        return (
            <>
                {/* Form thêm nhân viên */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(value) => {
                                this.handleSubmit(value);
                            }}
                        >
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>
                                    Họ tên
                                </Label>
                                <Col md={7}>
                                    <Control.text
                                        model=".name"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="từ 5 - 30 kí tự"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(30),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "",
                                            minLength: "Yêu cầu nhập nhiều hơn 3 ký tự",
                                            maxLength: "Yêu cầu nhập ít hơn 30 ký tự",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>
                                    Ngày sinh
                                </Label>
                                <Col md={7}>
                                    <Control
                                        type="date"
                                        model=".doB"
                                        className="form-control"
                                        id="doB"
                                        name="doB"
                                        validators={{
                                            required,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu bắt buộc",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>
                                    Ngày vào công ty
                                </Label>
                                <Col md={7}>
                                    <Control
                                        type="date"
                                        model=".startDate"
                                        className="form-control"
                                        id="startDate"
                                        name="startDate"
                                        validators={{
                                            required,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu bắt buộc",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <Control.select
                                        model=".departmentId"
                                        className="form-control"
                                        name="departmentId"
                                    >
                                        <option value="Dept00">Chọn Phòng Ban</option>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>
                                    Hệ số lương
                                </Label>
                                <Col md={7}>
                                    <Control
                                        type="text"
                                        model=".salaryScale"
                                        className="form-control"
                                        id="salaryScale"
                                        name="salaryScale"
                                        placeholder="1.0 -> 3.0"
                                        validators={{ isNumber, numRange }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            isNumber: "Yêu cầu bắt buộc phải là số",
                                            numRange: "Yêu cầu nhập số từ 1.0 - 3.0",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>
                                    Số ngày nghỉ còn lại
                                </Label>
                                <Col md={7}>
                                    <Control
                                        type="text"
                                        model=".annualLeave"
                                        className="form-control"
                                        id="annualLeave"
                                        name="annualLeave"
                                        placeholder="ex: 1.5"
                                        validators={{
                                            isNumber,
                                        }}
                                    />
                                    <Errors
                                        model=".annualLeave"
                                        show="touched"
                                        className="text-danger"
                                        messages={{
                                            isNumber: "Yêu cầu nhập số ",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>
                                    Số ngày đã làm thêm
                                </Label>
                                <Col md={7}>
                                    <Control
                                        type="text"
                                        model=".overTime"
                                        className="form-control"
                                        id="overTime"
                                        name="overTime"
                                        placeholder="ex: 1.5"
                                        validators={{
                                            isNumber,
                                        }}
                                    />
                                    <Errors
                                        model=".overTime"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            isNumber: "Yêu cầu nhập số ",
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col className="col-7 offset-5">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        onClick={this.toggleModal}
                                    >
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <FormGroup className="add">
                    <Button onClick={this.toggleModal}>
                        <span className="fa fa-plus" aria-hidden="true"></span>
                    </Button>
                </FormGroup>
            </>
        );
    }
}

export default AddStaff;