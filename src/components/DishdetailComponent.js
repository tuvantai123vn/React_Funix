import React, { useState } from "react";
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Col, Row, Label, Button } from "reactstrap";
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from 'react-redux-form';


function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}
function handleSubmit(value) {
    console.log('Current State is: ' + JSON.stringify(value));
    alert("Current State is: " + JSON.stringify(value));
}
function RenderComments({ comments }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const required = (val) => val && val.length;
    const maxLenght = (len) => (val) => !(val) || (val.length <= len);
    const minLenght = (len) => (val) => (val) && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9_%+-] + @[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </li>
                        )
                    })}
                    <Button outline onClick={toggle}>
                        <span className='fa fa-pencil'></span> Submit Comments
                    </Button>
                    <Modal isOpen={isOpen} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                                <Row className='form-group'>
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor="yourname" md={12}>First Name</Label>
                                    <Col md={12}>
                                        <Control.text model='.yourname' id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className='form-control' validators={{
                                                required, minLenght: minLenght(3), maxLenght: maxLenght(15)
                                            }} />
                                        <Errors className='text-danger' model='.yourname' show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLenght: 'Must be greater than 2 characters',
                                                maxLenght: 'Must be 15 character or less'
                                            }} />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor="message" md={12}>Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model='.message' id="message" name="message"
                                            rows="12" className='form-control'></Control.textarea>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={9}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </ul>
            </div>
        );
    else
        return (<div></div>)
}

const DishDetail = (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    )
}

export default DishDetail;