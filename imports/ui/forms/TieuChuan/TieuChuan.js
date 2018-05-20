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
    ButtonGroup
} from 'reactstrap';
import {Tracker} from 'meteor/tracker'
import TieuChuanController from './Controller'

class TieuChuan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTieuChuan: null,
            danhSachTieuChuan: null,
            danhSachLoaiSanPham: null
        };
    }

    componentWillMount = () => {
        console.log(TieuChuanController);
        Tracker.autorun(() => {
            this.setState({
                danhSachTieuChuan: TieuChuanController.getTatCaTieuChuan(),
                danhSachLoaiSanPham: TieuChuanController.getTatCaLoaiSanPham()
            })

        })
    }

    renderDeleteModal = () => {

    }

    renderDanhSachTieuChuan = () => {
        let now = new Date();
        if (this.state.danhSachTieuChuan) {
            return this.state.danhSachTieuChuan.map((item, index) => {
                return (
                    <tr>
                        <td>{item.TenTieuChuan}</td>
                        <td>{TieuChuanController.getTenSanPham(item.MaLoaiSanPham).TenLoaiSanPham}</td>
                        <td>
                        {(now < item.NgayBatDauHieuLuc) ?
                            <Badge className="mr-1" color="warning" pill>Chưa hiệu lực</Badge> :
                            now > item.NgayBatDauHieuLuc ?
                                <Badge className="mr-1" color="danger" pill>Hết hiệu lực</Badge> :
                                <Badge className="mr-1" color="success" pill>Đang hiệu lực</Badge>
                        }
                        </td>
                        <td>
                            <Button size="sm" color="warning" className="btn-pill"><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"><span
                                style={{fontSize: "4"}}>Xóa</span></Button>
                        </td>
                    </tr>
                )
            });
        }
        return(<tr>
            Không có tiêu chuẩn.
        </tr>)
    }

    renderDanhSachLoaiSanPham = () => {
        if (this.state.danhSachLoaiSanPham) {
            return this.state.danhSachLoaiSanPham.map((item, index) => {
                return (<option value={index}>{item.TenLoaiSanPham}</option>)
            });
        }
    }

    renderTieuChuan(){

    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách tiêu chuẩn
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"><span
                                        style={{fontSize: "4"}}>Thêm</span></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Sản phẩm</th>
                                        <th>Tình trạng</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderDanhSachTieuChuan()}
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem><PaginationLink previous
                                                                        tag="button">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink tag="button">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next
                                                                        tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col ls="2">
                        <Card>
                            <CardHeader>
                                <strong>Tên tiêu chuẩn</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>ID</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <p className="form-control-static">ID</p>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Tên tiêu chuẩn</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="text-input" name="text-input" placeholder="Text"/>
                                            <FormText color="muted">Nhập tên của tiêu chuẩn</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Loại sản phẩm</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="select" id="select">
                                                {this.renderDanhSachLoaiSanPham()}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="date-input">Ngày bắt đầu hiệu lực </Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="date" id="date-input" name="date-input" placeholder="date"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="date-input">Ngày hết hiệu lựcx`</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="date" id="date-input" name="date-input" placeholder="date"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Danh sách tiêu chuẩn</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Card>
                                                <CardHeader>
                                                    Chỉ tiêu
                                                    <div className="card-header-actions">
                                                        <Button size="sm" color="success" className="btn-pill"><span
                                                            style={{fontSize: "4"}}>Thêm</span></Button>
                                                    </div>
                                                </CardHeader>
                                                <CardBody>
                                                    <Table hover bordered striped responsive size="sm">
                                                        <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Tên</th>
                                                            <th>Sản phẩm</th>
                                                            <th>Tình trạng</th>
                                                            <th>Hành động</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>Vishnu Serghei</td>
                                                            <td>2012/01/01</td>
                                                            <td>Member</td>
                                                            <td>
                                                                <Badge color="success">Active</Badge>
                                                            </td>
                                                            <th>
                                                                <Button size="sm" color="warning"
                                                                        className="btn-pill"><span
                                                                    style={{fontSize: "4"}}>Sửa</span></Button>
                                                                <Button size="sm" color="danger"
                                                                        className="btn-pill"><span
                                                                    style={{fontSize: "4"}}>Xóa</span></Button>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td>Zbyněk Phoibos</td>
                                                            <td>2012/02/01</td>
                                                            <td>Staff</td>
                                                            <td>
                                                                <Badge color="danger">Banned</Badge>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Einar Randall</td>
                                                            <td>2012/02/01</td>
                                                            <td>Admin</td>
                                                            <td>
                                                                <Badge color="secondary">Inactive</Badge>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Félix Troels</td>
                                                            <td>2012/03/01</td>
                                                            <td>Member</td>
                                                            <td>
                                                                <Badge color="warning">Pending</Badge>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Aulus Agmundr</td>
                                                            <td>2012/01/21</td>
                                                            <td>Staff</td>
                                                            <td>
                                                                <Badge color="success">Active</Badge>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                    <nav>
                                                        <Pagination>
                                                            <PaginationItem><PaginationLink previous
                                                                                            tag="button">Prev</PaginationLink></PaginationItem>
                                                            <PaginationItem active>
                                                                <PaginationLink tag="button">1</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem><PaginationLink
                                                                tag="button">2</PaginationLink></PaginationItem>
                                                            <PaginationItem><PaginationLink
                                                                tag="button">3</PaginationLink></PaginationItem>
                                                            <PaginationItem><PaginationLink
                                                                tag="button">4</PaginationLink></PaginationItem>
                                                            <PaginationItem><PaginationLink next
                                                                                            tag="button">Next</PaginationLink></PaginationItem>
                                                        </Pagination>
                                                    </nav>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </FormGroup>
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="email-input">Email Input</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="email" id="email-input" name="email-input"*/}
                                    {/*placeholder="Enter Email" autoComplete="email"/>*/}
                                    {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="password-input">Password</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="password" id="password-input" name="password-input"*/}
                                    {/*placeholder="Password" autoComplete="new-password"/>*/}
                                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="disabled-input">Disabled Input</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="text" id="disabled-input" name="disabled-input"*/}
                                    {/*placeholder="Disabled" disabled/>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="textarea-input">Textarea</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="textarea" name="textarea-input" id="textarea-input" rows="9"*/}
                                    {/*placeholder="Content..."/>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="select">Select</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="select" name="select" id="select">*/}
                                    {/*<option value="0">Please select</option>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="selectLg">Select Large</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9" size="lg">*/}
                                    {/*<Input type="select" name="selectLg" id="selectLg" bsSize="lg">*/}
                                    {/*<option value="0">Please select</option>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="selectSm">Select Small</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="select" name="selectSm" id="SelectLm" bsSize="sm">*/}
                                    {/*<option value="0">Please select</option>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*<option value="4">Option #4</option>*/}
                                    {/*<option value="5">Option #5</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="disabledSelect">Disabled Select</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="select" name="disabledSelect" id="disabledSelect" disabled*/}
                                    {/*autoComplete="name">*/}
                                    {/*<option value="0">Please select</option>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="multiple-select">Multiple select</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col md="9">*/}
                                    {/*<Input type="select" name="multiple-select" id="multiple-select" multiple>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*<option value="4">Option #4</option>*/}
                                    {/*<option value="5">Option #5</option>*/}
                                    {/*<option value="6">Option #6</option>*/}
                                    {/*<option value="7">Option #7</option>*/}
                                    {/*<option value="8">Option #8</option>*/}
                                    {/*<option value="9">Option #9</option>*/}
                                    {/*<option value="10">Option #10</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label>Radios</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col md="9">*/}
                                    {/*<FormGroup check className="radio">*/}
                                    {/*<Input className="form-check-input" type="radio" id="radio1"*/}
                                    {/*name="radios" value="option1"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="radio1">Option*/}
                                    {/*1</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check className="radio">*/}
                                    {/*<Input className="form-check-input" type="radio" id="radio2"*/}
                                    {/*name="radios" value="option2"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="radio2">Option*/}
                                    {/*2</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check className="radio">*/}
                                    {/*<Input className="form-check-input" type="radio" id="radio3"*/}
                                    {/*name="radios" value="option3"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="radio3">Option*/}
                                    {/*3</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label>Inline Radios</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col md="9">*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="radio" id="inline-radio1"*/}
                                    {/*name="inline-radios" value="option1"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-radio1">One</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="radio" id="inline-radio2"*/}
                                    {/*name="inline-radios" value="option2"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-radio2">Two</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="radio" id="inline-radio3"*/}
                                    {/*name="inline-radios" value="option3"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-radio3">Three</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3"><Label>Checkboxes</Label></Col>*/}
                                    {/*<Col md="9">*/}
                                    {/*<FormGroup check className="checkbox">*/}
                                    {/*<Input className="form-check-input" type="checkbox" id="checkbox1"*/}
                                    {/*name="checkbox1" value="option1"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="checkbox1">Option*/}
                                    {/*1</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check className="checkbox">*/}
                                    {/*<Input className="form-check-input" type="checkbox" id="checkbox2"*/}
                                    {/*name="checkbox2" value="option2"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="checkbox2">Option*/}
                                    {/*2</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check className="checkbox">*/}
                                    {/*<Input className="form-check-input" type="checkbox" id="checkbox3"*/}
                                    {/*name="checkbox3" value="option3"/>*/}
                                    {/*<Label check className="form-check-label" htmlFor="checkbox3">Option*/}
                                    {/*3</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label>Inline Checkboxes</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col md="9">*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="checkbox"*/}
                                    {/*id="inline-checkbox1" name="inline-checkbox1" value="option1"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-checkbox1">One</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="checkbox"*/}
                                    {/*id="inline-checkbox2" name="inline-checkbox2" value="option2"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-checkbox2">Two</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup check inline>*/}
                                    {/*<Input className="form-check-input" type="checkbox"*/}
                                    {/*id="inline-checkbox3" name="inline-checkbox3" value="option3"/>*/}
                                    {/*<Label className="form-check-label" check*/}
                                    {/*htmlFor="inline-checkbox3">Three</Label>*/}
                                    {/*</FormGroup>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="file-input">File input</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="file" id="file-input" name="file-input"/>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="file-multiple-input">Multiple File input</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="file" id="file-multiple-input" name="file-multiple-input"*/}
                                    {/*multiple/>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row hidden>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label className="custom-file" htmlFor="custom-file-input">Custom file*/}
                                    {/*input</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Label className="custom-file">*/}
                                    {/*<Input className="custom-file" type="file" id="custom-file-input"*/}
                                    {/*name="file-input"/>*/}
                                    {/*<span className="custom-file-control"></span>*/}
                                    {/*</Label>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary"><i
                                    className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i
                                    className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    selectTieuChuan = (index) => {
        this.setState({
            selectedTieuChuan: index
        });
    }
}

export default TieuChuan;
