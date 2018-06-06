import React, {Component} from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Label,
    Input,
    Form,
    FormText,
    CardFooter,
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap';
import {Tracker} from 'meteor/tracker'
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";

class KiemTraSanPhamForm extends Component {
    constructor(props) {
        super(props);
    }

  

  
    

    renderDangKySanPham = () => {

        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết kiểm tra sản phảm</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text">Mã nhân viên</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text">Tên nhân viên</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text">Mật khẩu</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Chức vụ</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select"/>
                            </Col>
                        </FormGroup>

                        <Button type="submit" size="sm" color="primary"><i
                            className="fa fa-dot-circle-o"></i> Cập nhật</Button>
                        <Button type="reset" size="sm" color="danger"><i
                            className="fa fa-ban"></i>Đặt lại</Button>
                    </Form>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>)
    }

    

    render() {
        return (
            <div className="animated fadeIn">
                <NotificationAlert ref="notify" />
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách nhân viên
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"><span
                                        style={{fontSize: "4"}}>Thêm</span></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Mã nhân viên</th>
                                        <th>Tên nhân viên</th>
                                        <th>Chức vụ</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>longpv</td>
                                        <td>Phan Văn Long</td>
                                        <td>Giám đốc</td>
                                        <td>  <Button size="sm" color="primary" className="btn-pill"
                                   ><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                                    ><span
                                style={{fontSize: "4"}}>Xóa</span></Button></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col ls="2">
                        {this.renderDangKySanPham()}
                    </Col>
                </Row>
            </div>
        );
    }

   

    notify = (message = "message", type = "success") => {
        this.refs.notify.notificationAlert({
            place: 'br',
            message: message,
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 4
        })
    };

}

export default KiemTraSanPhamForm;