import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import dateFormat from 'dateformat';

const classChange = { cot2: 'col-md-6 mt-1', cot3: 'col-md-4 mt-1', cot4: 'col-md-3 mt-1', cot6: 'col-md-2 mt-1' }
let { cot2, cot3, cot4, cot6 } = classChange;
class StaffListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onselectedStaff: null,
            columDefault: 'col-12 col-md-6 col-lg-4 mt-3'
        };
    }
    onselectedStaff(staff) {
        this.setState({
            selectedStaff: staff
        });
    }
    onColumSelect(col) {
        this.setState({
            columDefault: col
        })
    }
    renderStaff(staff) {
        if (staff != null) {
            return (
                <div className="col-12">
                    <Card>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardTitle>Họ và tên: {staff.name}</CardTitle>
                            <CardText>
                                Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}
                            </CardText>
                            <CardText>
                                Ngày vào công ty: {dateFormat(staff.starDate, 'dd/mm/yyyy')}
                            </CardText>
                            <CardText>
                                Phòng ban: {staff.department.name}
                            </CardText>
                            <CardText>
                                Số ngày nghỉ còn lại: {staff.annualLeave}
                            </CardText>
                            <CardText>
                                Số ngày đã làm thêm: {staff.overTime}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
    render() {
        const StaffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className={this.state.columDefault}>
                    <Card onClick={() => this.onselectedStaff(staff)}>
                        <CardBody>
                            <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row m-3">
                    <Button onClick={() => this.onColumSelect(cot2)} color="primary">
                        2
                    </Button>
                    <Button onClick={() => this.onColumSelect(cot3)} color="primary">
                        3
                    </Button>

                    <Button onClick={() => this.onColumSelect(cot4)} color="primary">
                        4
                    </Button>
                    <Button onClick={() => this.onColumSelect(cot6)} color="primary">
                        6
                    </Button>
                </div>
                <div className='row'>
                    {StaffList}
                </div>
                <div className='row mt-5'>
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );
    }
}

// export default StaffListComponent;