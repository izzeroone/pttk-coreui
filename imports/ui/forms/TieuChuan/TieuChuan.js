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
import TieuChuanController from './Controller'

class TieuChuan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdded: false,
            deleteModalShown: false,
            tieuChiModalShown: false,
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
        if(this.state.selectedTieuChuan === null){
            return
        }

        let toggleDeleteModal = () => {
            this.setState({deleteModalShown: !this.state.deleteModalShown})
        }

        return (<Modal isOpen={this.state.deleteModalShown} toggle={toggleDeleteModal}
                       className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn chắc chắn có muốn xóa tiêu
                chuẩn {this.state.danhSachTieuChuan[this.state.selectedTieuChuan].TenTieuChuan}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    TieuChuanController.deleteTieuChuan(this.state.danhSachTieuChuan[this.state.selectedTieuChuan]._id)
                    this.setState({selectedTieuChuan : null})
                    toggleDeleteModal()
                }}>Xóa</Button>{' '}
                <Button color="secondary" onClick={() => toggleDeleteModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }

    renderDanhSachTieuChuan = () => {
        let shownDeleteModal = (index) => {
            this.setState({deleteModalShown: !this.state.deleteModalShown,
            selectedTieuChuan: index})
        };
        let now = new Date();
        if (this.state.danhSachTieuChuan && this.state.danhSachTieuChuan.length != 0) {
            return this.state.danhSachTieuChuan.map((item, index) => {
                return (
                    <tr>
                        <td>{item.TenTieuChuan}</td>
                        <td>{TieuChuanController.getTenSanPham(item.MaLoaiSanPham).TenLoaiSanPham}</td>
                        <td>
                            {(now < item.NgayBatDauHieuLuc) ?
                                <Badge className="mr-1" color="warning" pill>Chưa hiệu lực</Badge> :
                                now > item.NgayHetHieuLuc ?
                                    <Badge className="mr-1" color="danger" pill>Hết hiệu lực</Badge> :
                                    <Badge className="mr-1" color="success" pill>Đang hiệu lực</Badge>
                            }
                        </td>
                        <td>
                            <Button size="sm" color="warning" className="btn-pill"
                                    onClick={() => this.selectTieuChuan(index)}><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                            onClick={() => shownDeleteModal(index)}><span
                                style={{fontSize: "4"}}>Xóa</span></Button>
                        </td>
                    </tr>
                )
            });
        }
        return (<tr>
            Không có tiêu chuẩn.
        </tr>)
    }

    renderDanhSachLoaiSanPham = () => {
        if (this.state.danhSachLoaiSanPham) {
            return this.state.danhSachLoaiSanPham.map((item, index) => {
                return (<option value={item._id}>{item.TenLoaiSanPham}</option>)
            });
        }
    }

    renderTieuChuan = () => {
        if (this.state.selectedTieuChuan === null) {
            return (
                <Card>
                    <CardHeader>
                        <strong>Chi tiết tiêu chuẩn</strong>
                    </CardHeader>
                    <CardBody>
                        <strong>Chưa có tiêu chuẩn được chọn</strong>
                    </CardBody>
                </Card>
            )
        }
        let TieuChuan = this.state.danhSachTieuChuan[this.state.selectedTieuChuan];
        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết tiêu chuẩn</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label>ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <p className="form-control-static">{TieuChuan._id}</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Tên tiêu chuẩn</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text"
                                       defaultValue={TieuChuan.TenTieuChuan}/>
                                <FormText color="muted">Nhập tên của tiêu chuẩn</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Loại sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" defaultValue={TieuChuan.MaLoaiSanPham}>
                                    {this.renderDanhSachLoaiSanPham()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày bắt đầu hiệu lực </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="date-input" name="date-input" placeholder="date"
                                       defaultValue={TieuChuan.NgayBatDauHieuLuc}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày hết hiệu lựcx`</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="date-input" name="date-input" placeholder="date"
                                       defaultValue={TieuChuan.NgayHetHieuLuc}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary"><i
                        className="fa fa-dot-circle-o"></i> Cập nhật</Button>
                    <Button type="reset" size="sm" color="danger"><i
                        className="fa fa-ban"></i> Làm trống</Button>
                </CardFooter>
            </Card>)
    }

    renderDanhSachChiTieu = (danhSachChiTieu) => {
        if (Array.isArray(danhSachChiTieu)) {
            return danhSachChiTieu.map((item, index) => {
                let TenLoaiChiTieu = null;
                let GiaTriChiTieu = null;
                let DonVi = null;
                switch (item.LoaiChiTieu) {
                    case 'TEXT':
                        TenLoaiChiTieu = "Mô tả"
                        GiaTriChiTieu = item.MoTa
                        DonVi = "Không có"
                        break;
                    case 'BETWEEN':
                        TenLoaiChiTieu = "Nằm giữa"
                        GiaTriChiTieu = ">=" + item.GioHanDuoi + "\n" + "<=" + item.GioiHanTren;
                        DonVi = item.DonVi
                        break;
                    case 'LESS':
                        TenLoaiChiTieu = "Không vượt quá"
                        GiaTriChiTieu = "<=" + item.GioiHanTren;
                        DonVi = item.DonVi
                        break;
                    case 'MORE':
                        TenLoaiChiTieu = "Vượt trên"
                        GiaTriChiTieu = ">=" + item.GioiHanDuoi;
                        DonVi = item.DonVi
                        break;

                }
                return (
                    <tr>
                        <td>{item.TenChiTieu}</td>
                        <td>{TenLoaiChiTieu}</td>
                        <td>{GiaTriChiTieu}</td>
                        <td>{DonVi}</td>
                        <td>{item.GhiChu}</td>
                        <td>
                            <Button size="sm" color="warning" className="btn-pill"
                                    onClick={() => this.selectTieuChuan(index)}><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"><span
                                style={{fontSize: "4"}}>Xóa</span></Button>
                        </td>
                    </tr>
                )
            })
        }

    }

    render() {
        return (
            <div className="animated fadeIn">
                {this.renderDeleteModal()}
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách tiêu chuẩn
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"
                                    onClick={() => this.addTieuChuan()}><span
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
                        {this.renderTieuChuan()}
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

    addTieuChuan = () => {
        TieuChuanController.addTieuChuan({
            TenTieuChuan: "Tên tiêu chuẩn",
            MaLoaiSanPham: "CH",
            NgayBatDauHieuLuc: new Date(),
            NgayHetHieuLuc: new Date(),
            DanhSachChiTieu :[{
            TenChiTieu: "Tên chỉ tiêu",
            LoaiChiTieu: "LESS",
            GioiHanDuoi: "100",
            DonVi: "mg/hh",
            MoTa:"Mô tả chỉ tiêu"
        }],
            Delete: false})
        //Set the last
        this.setState({
            isAdded: true,
            selectedTieuChuan: this.state.danhSachTieuChuan.length - 1
        })
    }
}

export default TieuChuan;
