import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, Form, FormGroup, Label, Input, Col, FormFeedback, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from "../shared/staffs";
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const maxLenght = (len) => (val) => !(val) || (val.length <= len);
const minLenght = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameS: '',
            isModalOpen: false,
            doB: '',
            startDate: '',
            touched: {
                doB: false,
                startDate: false,
            }
        }
        this.timnhanvien = this.timnhanvien.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (value) => {
        const department = DEPARTMENTS.find(
            (department) => department.id === value.department
        );
        const newStaff = {
            name: value.name,
            doB: this.state.doB,
            salaryScale: value.salaryScale,
            startDate: this.state.startDate,
            department: department,
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            salary: 30000,
            image: '/assets/images/alberto.png',
        };
        if (!this.state.doB || !this.state.startDate)
            this.setState({
                touched: { doB: true, startDate: true }
            });
        else
            this.props.onAdd(newStaff);
    }

    handleBlur = (field) => (evt) => {
        this.setState(
            {
                touched: { ...this.state.touched, [field]: true }
            }
        );
    }

    validate(doB, startDate) {
        const errors = {
            doB: '',
            startDate: '',
        };
        if (this.state.touched.doB && doB.length < 1)
            errors.doB = 'Vui lòng nhập';
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Vui lòng nhập';
        return errors;
    }
    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    timnhanvien = (event) => {
        event.preventDefault();
        const nameS = event.target.nameS.value;
        this.setState({ nameS: nameS })
        console.log(nameS);
    };
    render() {

        const errors = this.validate(this.state.doB, this.state.startDate);

        // console.log(this.props.staff);
        const Liststaffs = this.props.staffs.filter((val) => {
            if (this.state.nameS === '') return val;
            else if (val.name.toLowerCase().includes(this.state.nameS.toLowerCase()))
                return val;
            return 0;
        }).map((staff) => {
            return (
                <div key={staff.id}>
                    <div className='col-12 m-2'>
                        <Card>
                            <Link to={`/nhanvien/${staff.id}`} >
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardTitle>
                                    {staff.name}
                                </CardTitle>
                            </Link>
                        </Card>
                    </div>
                </div>
            );
        })

        return (
            <div className='container'>
                <div className='row'>

                    <div className="col-3 col-md-3">
                        <h3>Nhân viên</h3>
                    </div>
                    <div className='col-3 col-auto'>
                        <Button outline onClick={this.toggle}>
                            <span className='fa fa-plus fa-lg'></span>
                        </Button>
                    </div>
                    <div className='col-6 col-md-6'>
                        <Form onSubmit={this.timnhanvien}>
                            <FormGroup row>
                                <Col>
                                    <Input type="text" id="nameS" name="nameS"
                                        placeholder="Tìm kiếm"
                                    />
                                </Col>
                                <Button color="primary" type='submit'>
                                    Tìm
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <hr />
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="name">Tên:</Label>
                                <Col>
                                    <Control.text className='form-control' md={8} id="name" model='.name' name="name"
                                        validators={{
                                            required,
                                            minLenght: minLenght(3),
                                            maxLenght: maxLenght(30)
                                        }}
                                    />
                                    <Errors model={'.name'} className='text-danger' show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLenght: 'Nhập nhiều hơn 3 ký tự',
                                            maxLenght: 'Yêu cầu nhập ít hơn 30 ký tự'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="doB">Ngày sinh:</Label>
                                <Col>
                                    <Input md={8} type="date" id="doB" name="doB"
                                        value={this.state.doB}
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="startDate">Ngày vào công ty:</Label>
                                <Col>
                                    <Input md={8} type="date" id="startDate" name="startDate"
                                        value={this.state.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="department">Phòng ban:</Label>
                                <Col >
                                    <Control.select className='form-control' model='.department' md={8} id="department" name="department">
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Control.text className='form-control' md={8} model='.salaryScale' id="salaryScale" name="salaryScale"
                                        validators={{
                                            required, isNumber
                                        }}
                                    />
                                    <Errors model={'.salaryScale'} className='text-danger' show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập', isNumber: 'Yêu cầu nhập số'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="overTime" md={4}>Số ngày còn lại:</Label>
                                <Col md={8}>
                                    <Control.text className='form-control' md={8} model='.overTime' id="overTime" name="overTime"
                                        validators={{
                                            required, isNumber
                                        }}
                                    />
                                    <Errors model={'.overTime'} className='text-danger' show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            isNumber: 'Yêu cầu nhập số'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="annualLeave" md={4}>Số ngày làm thêm:</Label>
                                <Col md={8}>
                                    <Control.text className='form-control' md={8} model='.annualLeave' id="annualLeave" name="annualLeave"
                                        validators={{
                                            required, isNumber
                                        }}
                                    />
                                    <Errors model={'.annualLeave'} className='text-danger' show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập', isNumber: 'Yêu cầu nhập số'
                                        }} />
                                </Col>
                            </Row>
                            <Button color="primary">Thêm</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <div className='row'>
                    {Liststaffs}
                </div>
            </div>
        )
    }
}
export default StaffList;