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

class TieuChuanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addedIndex: -1,
            deleteModalShown: false,
            chiTieuModalShown: false,
            modifiedTieuChuanIndex: null,
            modifiedTieuChuan: null,
            selectedChiTieuIndex: null,
            danhSachTieuChuan: null,
            danhSachLoaiSanPham: null,
            dumbTieuChuan: {
                TenTieuChuan: "Tên tiêu chuẩn",
                MaLoaiSanPham: "CH",
                NgayBatDauHieuLuc: moment("20140202").format("YYYY-MM-DD"),
                NgayHetHieuLuc: moment("20190202").format("YYYY-MM-DD"),
                DanhSachChiTieu: [{
                    TenChiTieu: "Tên chỉ tiêu",
                    LoaiChiTieu: "LESS",
                    GioiHanTren: "100",
                    DonVi: "mg/hh",
                    MoTa: "Mô tả chỉ tiêu"
                }],
                Delete: false
            }
        };
    }

    componentWillMount = () => {
        Tracker.autorun(() => {
            this.setState({
                danhSachTieuChuan: TieuChuanController.getTatCaTieuChuan(),
                danhSachLoaiSanPham: TieuChuanController.getTatCaLoaiSanPham()
            })

        })
    }


    renderDeleteModal = () => {
        if (this.state.modifiedTieuChuan === null) {
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
                chuẩn {this.state.modifiedTieuChuan.TenTieuChuan}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    TieuChuanController.deleteTieuChuan(this.state.modifiedTieuChuan._id)
                    this.setState({modifiedTieuChuan: null,
                        modifiedTieuChuanIndex: null})
                    toggleDeleteModal()
                }}>Xóa</Button>{' '}
                <Button color="secondary" onClick={() => toggleDeleteModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }

    renderChiTieuModal = () => {
        let toggleChiTieuModal = () => {
            this.setState({chiTieuModalShown: !this.state.chiTieuModalShown})
        }
        return (<Modal isOpen={this.state.chiTieuModalShown} toggle={toggleChiTieuModal}
                       className={'modal-success ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Cập nhật chỉ tiêu</ModalHeader>
            <ModalBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.updateTieuChuan}>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Tên chỉ tiêu</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtTenChiTieu" name="text-input" placeholder="Text"/>
                            <FormText color="muted">Nhập tên của chỉ tiêu</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="select">Phân loại chỉ tiêu</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="select" name="select" id="cbMaLoaiSanPham">
                                <option>Mô tả</option>
                                <option>Nằm giữa</option>
                                <option>Vượt quá</option>
                                <option>Không vượt quá</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="date-input">Mô tả</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtTenChiTieu" name="text-input" placeholder="Text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="date-input">Giới hạn trên</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtGioiHanTren" name="text-input" placeholder="Text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="date-input">Giới hạn dưới</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtGioiHanDuoi" name="text-input" placeholder="Text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="date-input">Đơn vị đo</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtDonViDo" name="text-input" placeholder="Text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="date-input">Ghi chú</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" id="txtGhiChu" name="text-input" placeholder="Text"/>
                        </Col>
                    </FormGroup>
                    <Button type="submit" size="sm" color="primary"><i
                        className="fa fa-dot-circle-o"/> Cập nhật</Button>
                    <Button type="reset" size="sm" color="danger"><i
                        className="fa fa-ban"/> Làm trống</Button>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => {}}>Xóa</Button>
                <Button color="secondary" onClick={() => toggleChiTieuModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }

    renderDanhSachTieuChuan = () => {
        let shownDeleteModal = (index) => {
            this.setState({
                deleteModalShown: !this.state.deleteModalShown,
                modifiedTieuChuanIndex: index
            })
        };
        if (this.state.danhSachTieuChuan && this.state.danhSachTieuChuan.length != 0) {
            return this.state.danhSachTieuChuan.map((item, index) => {
                return (
                    <tr>
                        <td>{item.TenTieuChuan}</td>
                        <td>{TieuChuanController.getTenSanPham(item.MaLoaiSanPham).TenLoaiSanPham}</td>
                        <td>
                            {(moment().isBefore(item.NgayBatDauHieuLuc)) ?
                                <Badge className="mr-1" color="warning" pill>Chưa hiệu lực</Badge> :
                                moment().isAfter(item.NgayHetHieuLuc) ?
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
        if (this.state.modifiedTieuChuan === null) {
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
        let TieuChuan = this.state.modifiedTieuChuan;
        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết tiêu chuẩn</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.updateTieuChuan}>
                        <FormGroup row>
                            <Col md="3">
                                <Label>ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <p id="txtMaTieuChuan" className="form-control-static">{TieuChuan._id}</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Tên tiêu chuẩn</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtTenTieuChuan" name="text-input" placeholder="Text"
                                       defaultValue={TieuChuan.TenTieuChuan}/>
                                <FormText color="muted">Nhập tên của tiêu chuẩn</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Loại sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbMaLoaiSanPham" defaultValue={TieuChuan.MaLoaiSanPham}>
                                    {this.renderDanhSachLoaiSanPham()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày bắt đầu hiệu lực </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayBatDauHieuLuc" name="date-input" placeholder="date"
                                       defaultValue={TieuChuan.NgayBatDauHieuLuc}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày hết hiệu lực</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayHetHieuLuc" name="date-input" placeholder="date"
                                       defaultValue={TieuChuan.NgayHetHieuLuc}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Card>
                                <CardHeader>
                                    Danh sách chỉ tiêu
                                    <div className="card-header-actions">
                                        <Button size="sm" color="success" className="btn-pill"
                                                onClick={() => this.setState({
                                                    chiTieuModalShown: true
                                                })}><span
                                            style={{fontSize: "4"}}>Thêm</span></Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table hover bordered striped responsive size="sm" id="tbDanhSachChiTieu">
                                        <thead>
                                        <tr>
                                            <th>Tên chỉ tiêu</th>
                                            <th>Phân loại</th>
                                            <th>Giá trị</th>
                                            <th>Đơn vị</th>
                                            <th>Ghi chú</th>
                                            <th>Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderDanhSachChiTieu(TieuChuan.DanhSachChiTieu)}
                                        </tbody>
                                    </Table>
                                    {/*<nav>*/}
                                        {/*<Pagination>*/}
                                            {/*<PaginationItem><PaginationLink previous*/}
                                                                            {/*tag="button">Prev</PaginationLink></PaginationItem>*/}
                                            {/*<PaginationItem active>*/}
                                                {/*<PaginationLink tag="button">1</PaginationLink>*/}
                                            {/*</PaginationItem>*/}
                                            {/*<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                                            {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                                            {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                                            {/*<PaginationItem><PaginationLink next*/}
                                                                            {/*tag="button">Next</PaginationLink></PaginationItem>*/}
                                        {/*</Pagination>*/}
                                    {/*</nav>*/}
                                </CardBody>
                            </Card>
                        </FormGroup>
                        <Button type="submit" size="sm" color="primary"><i
                            className="fa fa-dot-circle-o"></i> Cập nhật</Button>
                        <Button type="reset" size="sm" color="danger"><i
                            className="fa fa-ban"></i> Làm trống</Button>
                    </Form>
                </CardBody>
                <CardFooter>

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
                    case 'Mô tả':
                        TenLoaiChiTieu = "Mô tả"
                        GiaTriChiTieu = item.MoTa
                        DonVi = "Không có"
                        break;
                    case 'Nằm giữa':
                        TenLoaiChiTieu = "Nằm giữa"
                        GiaTriChiTieu = ">=" + item.GioHanDuoi + "\n" + "<=" + item.GioiHanTren;
                        DonVi = item.DonVi
                        break;
                    case 'Không vượt quá':
                        TenLoaiChiTieu = "Không vượt quá"
                        GiaTriChiTieu = "<=" + item.GioiHanTren;
                        DonVi = item.DonVi
                        break;
                    case 'Vượt quá':
                        TenLoaiChiTieu = "Vượt quá"
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
                                    onClick={() => this.setState({
                                        selectedChiTieuIndex: index,
                                        chiTieuModalShown: true
                                    })}><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                            onClick={() => {
                                this.state.modifiedTieuChuan.DanhSachChiTieu.splice(index, 1);
                                this.forceUpdate()}}><span
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
                {this.renderChiTieuModal()}
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
        let modifiedTieuChuan = this.state.danhSachTieuChuan[index];
        this.setState({
            modifiedTieuChuanIndex: index,
            modifiedTieuChuan: modifiedTieuChuan
        });
        document.getElementById("txtTenTieuChuan").value = modifiedTieuChuan.TenTieuChuan;
        document.getElementById("cbMaLoaiSanPham").value = modifiedTieuChuan.MaLoaiSanPham;
        document.getElementById("dpNgayBatDauHieuLuc").value = modifiedTieuChuan.NgayBatDauHieuLuc;
        document.getElementById("dpNgayHetHieuLuc").value = modifiedTieuChuan.NgayHetHieuLuc;
    };

    addTieuChuan = () => {
        //Thêm mới mà chưa cập nhật thì ko cho thêm
        if (this.state.addedIndex != -1) {
            return;
        }
        this.setState({
            isAdded: this.state.danhSachTieuChuan.length
        });
        console.log(TieuChuanController.addTieuChuan(this.state.dumbTieuChuan));
        //Set the last
    }

    updateTieuChuan = (e) => {
        e.preventDefault();
        this.state.modifiedTieuChuan.TenTieuChuan = e.target.txtTenTieuChuan.value;
        this.state.modifiedTieuChuan.MaLoaiSanPham = e.target.cbMaLoaiSanPham.value;
        this.state.modifiedTieuChuan.NgayBatDauHieuLuc = e.target.dpNgayBatDauHieuLuc.value;
        this.state.modifiedTieuChuan.NgayHetHieuLuc = e.target.dpNgayHetHieuLuc.value;
        if(this.state.addedIndex === this.state.modifiedTieuChuanIndex){
            this.setState({
                isAdded: -1
            });
        }
        TieuChuanController.upsertTieuChuan(this.state.modifiedTieuChuan);
    };
}

export default TieuChuanForm;
