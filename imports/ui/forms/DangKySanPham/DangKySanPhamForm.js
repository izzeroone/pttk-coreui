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
import DangKySanPhamController from './Controller'
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";

class DangKySanPhamForm extends Component {
    constructor(props) {
        super(props);

        this.dummyDangKySanPham = {
            MaCoSoSanXuat : "",
            TenSanPham: "",
            MaLoaiSanPham: "CH",
            NgayDangKy: moment().format("YYYY-MM-DD"),
            NgayHetHan: moment().format("YYYY-MM-DD"),
            SoLuongDangKy: 0,
            Delete: false
        };

        this.state = {
            addedDangKySanPhamIndex: null,
            addedDangKySanPhamUpdated: true,
            deleteModalShown: false,
            currentDangKySanPhamIndex: null,
            currentDangKySanPham: null,
            currentTieuChuan: null,
            currentTieuChuanIndex: null,
            danhSachCoSoSanXuat: null,
            danhSachDangKySanPham: null,
            danhSachLoaiSanPham: null,
            danhSachTieuChuan: null
        };
    }

    componentWillMount = () => {
        Tracker.autorun(() => {
            this.setState({
                danhSachTieuChuan: DangKySanPhamController.getTatCaTieuChuan(),
                danhSachCoSoSanXuat: DangKySanPhamController.getTatCaCoSoSanXuat(),
                danhSachLoaiSanPham: DangKySanPhamController.getTatCaLoaiSanPham(),
                danhSachDangKySanPham: DangKySanPhamController.getTatCaDangKySanPham(),
            })

        })
    }

    renderDeleteModal = () => {
        if (this.state.currentDangKySanPham === null || this.state.currentDangKySanPham === undefined ) {
            return
        }

        let toggleDeleteModal = () => {
            this.setState({deleteModalShown: !this.state.deleteModalShown})
        }

        return (<Modal isOpen={this.state.deleteModalShown} toggle={toggleDeleteModal}
                       className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn chắc chắn có muốn xóa sản
                phẩm {this.state.currentDangKySanPham.TenSanPham}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    DangKySanPhamController.deleteDangKySanPham(this.state.currentDangKySanPham._id);
                    if(this.state.currentDangKySanPhamIndex === this.state.addedDangKySanPhamIndex){
                        this.setState({
                            addedDangKySanPhamUpdated: true
                        })
                    }
                    this.setState({currentDangKySanPham: null,
                        currentDangKySanPhamIndex: null})
                    toggleDeleteModal()
                }}>Xóa</Button>{' '}
                <Button color="secondary" onClick={() => toggleDeleteModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }

    renderDanhSachDangKySanPham = () => {
        let shownDeleteModal = (index) => {
            this.setState({
                deleteModalShown: !this.state.deleteModalShown,
                currentDangKySanPhamIndex: index,
                currentDangKySanPham: this.state.danhSachDangKySanPham[index]
            })
        };
        if (this.state.danhSachDangKySanPham && this.state.danhSachDangKySanPham.length != 0) {
            return this.state.danhSachDangKySanPham.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{DangKySanPhamController.getCoSoSanXuat(item.MaCoSoSanXuat) !== undefined ?
                            DangKySanPhamController.getCoSoSanXuat(item.MaCoSoSanXuat).TenCoSoSanXuat : ""}</td>
                        <td>{item.TenSanPham}</td>
                        <td>
                            {(moment().isBefore(item.NgayDangKy)) ?
                                <Badge className="mr-1" color="warning" pill>Chưa hiệu lực</Badge> :
                                moment().isAfter(item.NgayHetHan) ?
                                    <Badge className="mr-1" color="danger" pill>Hết hiệu lực</Badge> :
                                    <Badge className="mr-1" color="success" pill>Đang hiệu lực</Badge>
                            }
                        </td>
                        <td>
                            <Button size="sm" color="primary" className="btn-pill"
                                    onClick={() => this.selectDangKySanPham(index)}><span
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
        if (this.state.currentDangKySanPham && this.state.currentDangKySanPham.MaCoSoSanXuat && this.state.danhSachLoaiSanPham) {
            let coSoSanXuat = this.state.danhSachCoSoSanXuat.find((item) => {
                return item._id === this.state.currentDangKySanPham.MaCoSoSanXuat;
            })
            //Khong tim ra thi return
            if(coSoSanXuat === undefined){
                return;
            }

            return this.state.danhSachLoaiSanPham.map((item, index) => {
                if (coSoSanXuat.DanhSachMaLoaiSanPham.find((maLoaiSanPham) =>{
                    return maLoaiSanPham === item._id
                })){
                    return (<option value={item._id} key={item._id}>{item.TenLoaiSanPham}</option>)
                }
            });
        }
    }

    renderDangKySanPham = () => {
        if (this.state.currentDangKySanPham === null) {
            return (
                <Card>
                    <CardHeader>
                        <strong>Chi tiết đăng ký sản phẩm</strong>
                    </CardHeader>
                    <CardBody>
                        <strong>Chưa có đăng ký sản phẩm được chọn</strong>
                    </CardBody>
                </Card>
            )
        }

        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết đăng ký sản phảm</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"
                          onSubmit={this.updateDangKySanPham}
                          onReset={this.resetCurrentDangKySanPham}>
                        <FormGroup row>
                            <Col md="3">
                                <Label>ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <p id="txtMaDangKySanPham" className="form-control-static"></p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Cơ sở sản xuất</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbMaCoSoSanXuat">
                                    {this.renderDanhSachCoSanXuat()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Tên sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtTenSanPham" name="text-input"/>
                                <FormText color="muted">Nhập tên của sản phẩm</FormText>
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
                                <Label htmlFor="date-input">Ngày đăng ký </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayDangKy" name="date-input" defaultValue={moment().format("YYYY-MM-DD")}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày hết hạn</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayHetHan" name="date-input" defaultValue={moment().format("YYYY-MM-DD")}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Tiêu chuẩn đăng ký</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbMaTieuChuan" onChange={(e) => {this.selectTieuChuan(e.target.value)}}>
                                    {this.renderDanhSachTieuChuan()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Card>
                                <CardHeader>
                                    Danh sách chỉ tiêu
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
                                            <th>Thực tế</th>
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
        //Chua co chi tieu thi khong co chon]
        if(this.state.currentTieuChuan === null || this.state.currentTieuChuan === undefined){
            return;
        }
        let danhSachChiTieu = this.state.currentTieuChuan.DanhSachChiTieu;
        let chiTieuThucTe = this.state.currentDangKySanPham.DanhSachChiTieu;
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
                            {item.LoaiChiTieu != "MT" ?
                                <Input id ={"ThucTeChiTieu_" + index} type="number" defaultValue={chiTieuThucTe[index] !== undefined ? chiTieuThucTe[index].ThucTe : null}/>
                                :
                                <p>
                                    <Input id ={"ThucTeChiTieu_" + index} type="checkbox" defaultValue={chiTieuThucTe[index] !== undefined ? chiTieuThucTe[index].ThucTe : null}/>
                                    <p>Đạt</p>
                                </p>
                            }
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
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách sản phẩm đăng ký
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"
                                            onClick={() => this.addDangKySanPham()}><span
                                        style={{fontSize: "4"}}>Thêm</span></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Cơ sở sản xuất</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Tình trạng</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderDanhSachDangKySanPham()}
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

    selectDangKySanPham = (index) => {
        let currentDangKySanPham = this.state.danhSachDangKySanPham[index];

        if(currentDangKySanPham === undefined){
            return;
        }

        let currentTieuChuan = this.state.danhSachTieuChuan.find(tieuChuan => {
            return tieuChuan._id === currentDangKySanPham.MaTieuChuan
        });

        if(currentTieuChuan === undefined){
            return;
        }

        this.setState({
            currentDangKySanPhamIndex: index,
            currentDangKySanPham: lodash.cloneDeep(currentDangKySanPham),
            currentTieuChuan: lodash.cloneDeep(currentTieuChuan)
        });
        console.log(`San pham thu ${index} da duoc chon`);
        $("#txtMaDangKySanPham").val(currentDangKySanPham._id);
        $("#txtMaCoSoSanXuat").val(currentDangKySanPham.MaCoSoSanXuat);
        $("#txtTenSanPham").val(currentDangKySanPham.TenSanPham);
        $("#txtMaLoaiSanPham").val(currentDangKySanPham.MaLoaiSanPham);
        $("#dpNgayDangKy").val(currentDangKySanPham.NgayDangKy);
        $("#dpNgayHetHan").val(currentDangKySanPham.NgayHetHan);
        $("#cbMaTieuChuan").val(currentDangKySanPham.MaTieuChuan);
        if(this.state.addedDangKySanPhamIndex === index) {
            this.selectTieuChuan(currentDangKySanPham.MaTieuChuan);
        }
    };

    selectChiTieu = (index) => {
        console.log(`Chi tieu thu ${index} da duoc chon`);
        let currentChiTieu = this.state.currentChiTieu.DanhSachChiTieu[index];

        if(currentChiTieu === undefined){
            return;
        }

        this.setState({
            currentChiTieu: currentChiTieu.LoaiChiTieu
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

    selectTieuChuan = (MaTieuChuan) => {
        this.setState({
            currentTieuChuan: DangKySanPhamController.getTieuChuan(MaTieuChuan)
        })
    }


    addDangKySanPham = () => {
        //Thêm mới mà chưa cập nhật thì ko cho thêm
        if (this.state.addedDangKySanPhamUpdated === false) {
            this.notify("Bạn chưa cập nhật sản phẩm mới thêm", "warning");
            return;
        }
        this.setState({
            addedDangKySanPhamUpdated: false,
            addedDangKySanPhamIndex: this.state.danhSachDangKySanPham.length
        });
        console.log(DangKySanPhamController.addDangKySanPham(this.dummyDangKySanPham));
    }


    updateDangKySanPham = (e) => {
        e.preventDefault();

        let currentDangKySanPham = this.state.currentDangKySanPham;
        currentDangKySanPham.MaCoSoSanXuat = e.target.cbMaCoSoSanXuat.value;
        currentDangKySanPham.TenSanPham = e.target.txtTenSanPham.value;
        currentDangKySanPham.MaLoaiSanPham = e.target.cbMaLoaiSanPham.value;
        currentDangKySanPham.NgayDangKy = e.target.dpNgayDangKy.value;
        currentDangKySanPham.NgayHetHan = e.target.dpNgayHetHan.value;
        currentDangKySanPham.MaTieuChuan = e.target.cbMaTieuChuan.value;

        let upsertable = true;
        let danhSachChiTieu = this.state.currentTieuChuan.DanhSachChiTieu;
        let chiTieuThucTe =[];
        let thucTe = null;
        danhSachChiTieu.forEach((item, index) => {
            thucTe = $("#ThucTeChiTieu_" + index).val();
            let chiTieuAddable = true;
            //Kiem tra dieu kien
            switch (item.LoaiChiTieu    ){
                case "MT":
                    thucTe = $("#ThucTeChiTieu_" + index)[0].checked;
                    if(thucTe !== true){
                        this.notify("Sản phẩm không đạt chuẩn chỉ tiêu thứ " + index, "warning");
                        upsertable = false;
                        return;
                    }
                    break;
                case "NG":
                    if(thucTe < item.GioiHanDuoi || thucTe > item.GioiHanTren){
                        this.notify("Sản phẩm không đạt chuẩn chỉ tiêu thứ " + index, "warning");
                        upsertable = false;
                        return;
                    }
                    break;
                case "VQ":
                    if(thucTe < item.GioiHanDuoi){
                        this.notify("Sản phẩm không đạt chuẩn chỉ tiêu thứ " + index, "warning");
                        upsertable = false;
                        return;
                    }
                    break;
                case "KVQ":
                    if (thucTe > item.GioiHanTren) {
                        this.notify("Sản phẩm không đạt chuẩn chỉ tiêu thứ " + index, "warning");
                        upsertable = false;
                        return;
                    }
                    break;

            }
            //Them vao danh sach
            chiTieuThucTe.push({MaChiTieu : item.MaTieuChuan, ThucTe: thucTe})
        });
        if(upsertable){
            currentDangKySanPham.DanhSachChiTieu = chiTieuThucTe;
            DangKySanPhamController.upsertDangKySanPham(currentDangKySanPham);
            this.notify("Cập nhật thành công", "success");
        }
    };


    notify = (message = "message", type = "success") => {
        this.refs.notify.notificationAlert({
            place: 'br',
            message: message,
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 4
        })
    };

    resetCurrentDangKySanPham = () => {
        this.selectDangKySanPham(this.state.currentDangKySanPhamIndex);
    };


    renderDanhSachCoSanXuat = () => {
        if (this.state.danhSachCoSoSanXuat) {
            return this.state.danhSachCoSoSanXuat.map((item, index) => {
                return (<option value={item._id} key={item._id}>{item.TenCoSoSanXuat}</option>)
            });
        }
    }

    renderDanhSachTieuChuan = () => {
        if (this.state.currentDangKySanPham && this.state.currentDangKySanPham.MaTieuChuan && this.state.danhSachTieuChuan) {
            return this.state.danhSachTieuChuan.map((item, index) => {
                if(item._id === this.state.currentDangKySanPham.MaTieuChuan){
                    return (<option value={item._id} key={item._id}>{item.TenTieuChuan}</option>)
                }
            });
        }
    }
}

export default DangKySanPhamForm;