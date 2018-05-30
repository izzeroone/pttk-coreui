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
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";

class TieuChuanForm extends Component {
    constructor(props) {
        super(props);

        this.dummyTieuChuan = {
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
        };

        this.dummyChiTieu = {
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "KVQ",
            GioiHanTren: "100",
            DonViDo: "mg/hh",
            GhiChu:"Hàm lượng sắt không được vượt quá"
        };

        this.state = {
            addedTieuChuanIndex: null,
            addedTieuChuanUpdated: true,
            addedChiTieuIndex: null,
            addedChiTieuUpdated: true,
            deleteModalShown: false,
            deleteTieuChuanIndex: false,
            chiTieuModalShown: false,
            currentTieuChuanIndex: null,
            currentTieuChuan: null,
            currentChiTieuIndex: null,
            currentLoaiChiTieu: null,
            currentDanhSachChiTieu: null,
            danhSachTieuChuan: null,
            danhSachLoaiSanPham: null,
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
        if (this.state.deleteTieuChuanIndex === false) {
            return
        }

        let toggleDeleteModal = () => {
            this.setState({deleteModalShown: !this.state.deleteModalShown})
        }

        let deleteTieuChuan = this.state.danhSachTieuChuan[this.state.deleteTieuChuanIndex];

        return (<Modal isOpen={this.state.deleteModalShown} toggle={toggleDeleteModal}
                       className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn chắc chắn có muốn xóa tiêu
                chuẩn {deleteTieuChuan.TenTieuChuan}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    TieuChuanController.deleteTieuChuan(deleteTieuChuan._id)
                    if (this.state.deleteTieuChuanIndex=== this.state.addedTieuChuanIndex) {
                        this.setState({
                            addedTieuChuanUpdated: true
                        })
                    }
                    this.setState({currentTieuChuan: null,
                        currentTieuChuanIndex: null})
                    toggleDeleteModal()
                }}>Xóa</Button>{' '}
                <Button color="secondary" onClick={() => toggleDeleteModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }

    toggleChiTieuModal = () => {
        this.setState({chiTieuModalShown: !this.state.chiTieuModalShown})
    }

    renderChiTieuModal = () => {
        return (
            <div>
                <Label value="Stupid label"/>
                <Modal isOpen={this.state.chiTieuModalShown} toggle={this.toggleChiTieuModal}
                       className={'modal-success'} id={"ChiTieuModal"}
                       onOpened={() => this.selectChiTieu(this.state.currentChiTieuIndex)}>
                    <ModalHeader toggle={this.toggleDanger}>Cập nhật chỉ tiêu</ModalHeader>
                    <ModalBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.updateTieuChuan}>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="text-input">Tên chỉ tiêu</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" id="txtTenChiTieu" name="text-input" ref="txtTenChiTieu"/>
                                    <FormText color="muted">Nhập tên của chỉ tiêu</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="select">Phân loại chỉ tiêu</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="select" name="select" id="cbLoaiChiTieu" onChange={(e) => {
                                        this.setState({currentLoaiChiTieu: e.target.value})
                                        this.displayRelevantChiTieuInfo(e.target.value)}}>
                                        <option value={"MT"}>Mô tả</option>
                                        <option value={"NG"}>Nằm giữa</option>
                                        <option value={"VQ"}>Vượt quá</option>
                                        <option value={"KVQ"}>Không vượt quá</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row id="fgMoTa">
                                <Col md="3">
                                    <Label htmlFor="date-input">Mô tả</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" id="txtMoTa" name="text-input"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row id="fgGioiHanTren">
                                <Col md="3">
                                    <Label htmlFor="date-input">Giới hạn trên</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="number" step="1" id="txtGioiHanTren" name="number-input"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row id="fgGioiHanDuoi">
                                <Col md="3">
                                    <Label htmlFor="date-input">Giới hạn dưới</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="number" step="1" id="txtGioiHanDuoi" name="number-input"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row id="fgDonViDo">
                                <Col md="3">
                                    <Label htmlFor="date-input">Đơn vị đo</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" id="txtDonViDo" name="text-input"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="date-input">Ghi chú</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" id="txtGhiChu" name="text-input"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={(e) => {this.updateChiTieu(e); this.toggleChiTieuModal();}}>Cập nhật</Button>
                        <Button color="secondary" onClick={() => this.toggleChiTieuModal()}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>)

    }


    renderDanhSachTieuChuan = () => {
        let shownDeleteModal = (index) => {
            this.setState({
                deleteModalShown: !this.state.deleteModalShown,
                deleteTieuChuanIndex: index,
            })
        };
        if (this.state.danhSachTieuChuan && this.state.danhSachTieuChuan.length != 0) {
            return this.state.danhSachTieuChuan.map((item, index) => {
                return (
                    <tr key={index}>
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
                            <Button size="sm" color="primary" className="btn-pill"
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
                return (<option value={item._id} key={item._id}>{item.TenLoaiSanPham}</option>)
            });
        }
    }

    renderTieuChuan = () => {
        if (this.state.currentTieuChuan === null) {
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
        let TieuChuan = this.state.currentTieuChuan;
        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết tiêu chuẩn</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"
                          onSubmit={this.updateTieuChuan}
                          onReset={this.resetCurrentTieuChuan}>
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
                                <Input type="text" id="txtTenTieuChuan" name="text-input"/>
                                <FormText color="muted">Nhập tên của tiêu chuẩn</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Loại sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbMaLoaiSanPham">
                                    {this.renderDanhSachLoaiSanPham()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày bắt đầu hiệu lực </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayBatDauHieuLuc" name="date-input"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày hết hiệu lực</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayHetHieuLuc" name="date-input"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Card>
                                <CardHeader>
                                    Danh sách chỉ tiêu
                                    <div className="card-header-actions">
                                        <Button size="sm" color="success" className="btn-pill"
                                                onClick={() => this.addChiTieu()}><span
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
                                        {this.renderDanhSachChiTieu()}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
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

    renderDanhSachChiTieu = () => {
        let danhSachChiTieu = this.state.currentDanhSachChiTieu;
        if (Array.isArray(danhSachChiTieu)) {
            return danhSachChiTieu.map((item, index) => {
                let TenLoaiChiTieu = null;
                let GiaTriChiTieu = null;
                let DonViDo = null;
                switch (item.LoaiChiTieu) {
                    case "MT":
                        TenLoaiChiTieu = "Mô tả"
                        GiaTriChiTieu = item.MoTa
                        DonViDo = "Không có"
                        break;
                    case "NG":
                        TenLoaiChiTieu = "Nằm giữa"
                        GiaTriChiTieu = ">=" + item.GioiHanDuoi + "\n" + "<=" + item.GioiHanTren;
                        DonViDo = item.DonViDo;
                        break;
                    case "KVQ":
                        TenLoaiChiTieu = "Không vượt quá"
                        GiaTriChiTieu = "<=" + item.GioiHanTren;
                        DonViDo = item.DonViDo;
                        break;
                    case "VQ":
                        TenLoaiChiTieu = "Vượt quá"
                        GiaTriChiTieu = ">=" + item.GioiHanDuoi;
                        DonViDo = item.DonViDo;
                        break;
                }
                return (
                    <tr key={index}>
                        <td>{item.TenChiTieu}</td>
                        <td>{TenLoaiChiTieu}</td>
                        <td>{GiaTriChiTieu}</td>
                        <td>{DonViDo}</td>
                        <td>{item.GhiChu}</td>
                        <td>
                            <Button size="sm" color="primary" className="btn-pill"
                                    onClick={() => {
                                        this.setState({
                                            currentChiTieuIndex: index,
                                            chiTieuModalShown: true
                                        })
                                    }}><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                                    onClick={() => {
                                        this.state.currentTieuChuan.DanhSachChiTieu.splice(index, 1);
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
                <NotificationAlert ref="notify" />
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
            currentTieuChuanIndex: index,
            currentTieuChuan: lodash.cloneDeep(modifiedTieuChuan),
            currentDanhSachChiTieu: lodash.cloneDeep(modifiedTieuChuan.DanhSachChiTieu)
        });
        console.log(`Tien chuan thu ${index} da duoc chon`);
        $("#txtTenTieuChuan").val(modifiedTieuChuan.TenTieuChuan);
        $("#cbMaLoaiSanPham").val(modifiedTieuChuan.MaLoaiSanPham);
        $("#dpNgayBatDauHieuLuc").val(modifiedTieuChuan.NgayBatDauHieuLuc);
        $("#dpNgayHetHieuLuc").val(modifiedTieuChuan.NgayHetHieuLuc);
    };

    selectChiTieu = (index) => {
        console.log(`Chi tieu thu ${index} da duoc chon`);
        let currentChiTieu = this.state.currentDanhSachChiTieu[index];
        this.setState({
            currentLoaiChiTieu: currentChiTieu.LoaiChiTieu,
            currentChiTieuIndex: index
        });
        //Get element render before dom
        this.displayRelevantChiTieuInfo(currentChiTieu.LoaiChiTieu);

        $("#txtTenChiTieu").val(currentChiTieu.TenChiTieu);
        $("#cbLoaiChiTieu").val(currentChiTieu.LoaiChiTieu);
        $("#txtMoTa").val(currentChiTieu.MoTa);
        $("#txtGioiHanTren").val(currentChiTieu.GioiHanTren);
        $("#txtGioiHanDuoi").val(currentChiTieu.GioiHanDuoi);
        $("#txtDonViDo").val(currentChiTieu.DonViDo);
        $("#txtGhiChu").val(currentChiTieu.GhiChu);
    };

    displayRelevantChiTieuInfo = (LoaiChiTieu) => {
        console.log(this.state.currentLoaiChiTieu);
        switch (LoaiChiTieu){
            case "MT":
                $("#fgMoTa").show();
                $("#fgGioiHanTren").hide();
                $("#fgGioiHanDuoi").hide();
                $("#fgDonViDo").hide();
                break;
            case  "NG":
                $("#fgMoTa").hide();
                $("#fgGioiHanTren").show();
                $("#fgGioiHanDuoi").show();
                $("#fgDonViDo").show();
                break;
            case "VQ":
                $("#fgMoTa").hide();
                $("#fgGioiHanTren").hide();
                $("#fgGioiHanDuoi").show();
                $("#fgDonViDo").show();
                break;
            case "KVQ":
                $("#fgMoTa").hide();
                $("#fgGioiHanTren").show();
                $("#fgGioiHanDuoi").hide();
                $("#fgDonViDo").show();
                break;
        }
    }

    addTieuChuan = () => {
        //Thêm mới mà chưa cập nhật thì ko cho thêm
        if (this.state.addedTieuChuanUpdated === false) {
            this.notify("Bạn chưa cập nhật tiêu chuẩn mới thêm", "warning");
            return;
        }
        this.setState({
            addedTieuChuanUpdated: false,
            addedTieuChuanIndex: this.state.danhSachTieuChuan.length
        });
        console.log(TieuChuanController.addTieuChuan(this.dummyTieuChuan));
    }

    notify(message, type) {
        this.refs.notify.notificationAlert({
            place: 'br',
            message: message,
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 4
        })
    }

    addChiTieu = () => {
        //Thêm mới mà chưa cập nhật thì ko cho thêm
        if (this.state.addedChiTieuUpdated === false) {
            this.notify("Bạn chưa cập nhật chỉ tiêu mới thêm", "warning");
            return;
        }
        this.setState({
            addedChiTieuUpdated: false,
            addedChiTieuIndex: this.state.currentTieuChuan.DanhSachChiTieu.length
        });
        this.state.currentDanhSachChiTieu.push(this.dummyChiTieu);
    };

    updateChiTieu = (e) => {
        let ChiTieu = {};
        ChiTieu.TenChiTieu = $("#txtTenChiTieu").val();
        ChiTieu.LoaiChiTieu = $("#cbLoaiChiTieu").val();
        ChiTieu.GhiChu = $("#txtGhiChu").val();
        ChiTieu.MoTa = $("#txtMoTa").val();
        ChiTieu.GioiHanTren = $("#txtGioiHanTren").val();
        ChiTieu.GioiHanDuoi = $("#txtGioiHanDuoi").val();
        ChiTieu.DonViDo = $("#txtDonViDo").val();

        let danhSachChiTieu = this.state.currentDanhSachChiTieu;
        danhSachChiTieu[this.state.currentChiTieuIndex] = ChiTieu;
        this.setState({
            currentDanhSachChiTieu : danhSachChiTieu
        })
    }

    updateTieuChuan = (e) => {
        e.preventDefault();

        let currentTieuChuan = this.state.currentTieuChuan;

        currentTieuChuan.TenTieuChuan = e.target.txtTenTieuChuan.value;
        currentTieuChuan.MaLoaiSanPham = e.target.cbMaLoaiSanPham.value;
        currentTieuChuan.NgayBatDauHieuLuc = e.target.dpNgayBatDauHieuLuc.value;
        currentTieuChuan.NgayHetHieuLuc = e.target.dpNgayHetHieuLuc.value;
        currentTieuChuan.DanhSachChiTieu = this.state.currentDanhSachChiTieu;

        if(this.state.addedTieuChuanIndex === this.state.currentTieuChuanIndex){
            this.setState({
                addedTieuChuanUpdated: true
            });
        }
        TieuChuanController.upsertTieuChuan(this.state.currentTieuChuan);
        this.notify("Cập nhật thành công", "success");
    };


    resetCurrentTieuChuan = () => {
        this.selectTieuChuan(this.state.currentTieuChuanIndex);
    };

    resetCurrentChiTieu = () => {
        this.selectChiTieu(this.state.currentChiTieuIndex);
    }
}

export default TieuChuanForm;