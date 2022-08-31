import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, Form, FormGroup, Label, Input, Col, FormFeedback, Modal, ModalHeader, ModalBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from "../shared/staffs";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameS: '',
            isModalOpen: false,
            name: '',
            doB: '',
            salaryScale: 1,
            startDate: '',
            department: 'Sale',
            annualLeave: 0,
            overTime: 0,
            salary: 30000,
            image: '/assets/images/alberto.png',
            touched: {
                name: false,
                doB: false,
                salaryScale: false,
                startDate: false,
                department: false,
                annualLeave: false,
                overTime: false,
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

    handleSubmit = () => {
        const department = DEPARTMENTS.find(
            (department) => department.id === this.state.department
        );
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: this.state.image
        };
        this.props.onAdd(newStaff);
    }

    handleBlur = (field) => (evt) => {
        this.setState(
            {
                touched: { ...this.state.touched, [field]: true }
            }
        );
    }
    validate(name, department, salaryScale, annualLeave, overTime, doB, startDate) {
        const errors = {
            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: '',
            annualLeave: '',
            overTime: '',
        };
        if (this.state.touched.name && name.length < 3)
            errors.name = 'Tên phải> = 3 ký tự';
        else if (this.state.touched.name && name.length > 50)
            errors.name = 'Tên phải =< 50 ký tự';
        if (this.state.touched.department && department.length < 1)
            errors.lastname = 'Vui lòng nhập';
        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = 'Vui lòng nhập';
        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = 'Vui lòng nhập';
        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime = 'Vui lòng nhập';
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
        const errors = this.validate(this.state.name, this.state.department, this.state.salaryScale, this.state.annualLeave, this.state.overTime, this.state.doB, this.state.startDate);

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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label md={4} htmlFor="name">Tên:</Label>
                                <Col>
                                    <Input md={8} type="text" id="name" name="name"
                                        placeholder="Họ và tên"
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
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
                            </FormGroup>
                            <FormGroup row>
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
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="department">Phòng ban:</Label>
                                <Col >
                                    <Input md={8} type="select" id="department" name="department"
                                        value={this.state.department}
                                        valid={errors.department === ''}
                                        invalid={errors.department !== ''}
                                        onBlur={this.handleBlur('department')}
                                        onChange={this.handleInputChange}>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Input>
                                    <FormFeedback>{errors.department}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="text" id="salaryScale" name="salaryScale"
                                        value={this.state.salaryScale}
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        onBlur={this.handleBlur('salaryScale')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.salaryScale}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày còn lại:</Label>
                                <Col md={8}>
                                    <Input type="text" id="overTime" name="overTime"
                                        value={this.state.overTime}
                                        valid={errors.overTime === ''}
                                        invalid={errors.overTime !== ''}
                                        onBlur={this.handleBlur('overTime')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.overTime}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày làm thêm:</Label>
                                <Col md={8}>
                                    <Input type="text" id="annualLeave" name="annualLeave"
                                        placeholder="First Name"
                                        value={this.state.annualLeave}
                                        valid={errors.annualLeave === ''}
                                        invalid={errors.annualLeave !== ''}
                                        onBlur={this.handleBlur('annualLeave')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.annualLeave}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <Button color="primary">Thêm</Button>
                        </Form>
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