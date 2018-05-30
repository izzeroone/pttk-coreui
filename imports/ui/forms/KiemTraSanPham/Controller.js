import {
    TieuChuanDB,
    LoaiSanPhamDB,
    LoaiChiTieuDB,
    CoSoSanXuatDB,
    DangKySanPhamDB
} from "../../../collections/collections";

class Controller {
    getTatCaTieuChuan = () => {
        return TieuChuanDB.find({Delete: false}).fetch();
    }
    getTatCaCoSoSanXuat = () => {
        return CoSoSanXuatDB.find({Delete: false}).fetch();
    }
    getTatCaDangKySanPham = () => {
        return DangKySanPhamDB.find({Delete: false}).fetch();
    }
    deleteDangKySanPham = (MaDangKySanPham) => {
        DangKySanPhamDB.update(MaDangKySanPham, {Delete: true});
    }
    addDangKySanPham = (DangKySanPham) => {
        return DangKySanPhamDB.insert(DangKySanPham);
    }
    getCoSoSanXuat = (MaCoSoSanXuat) => {
        return CoSoSanXuatDB.findOne(MaCoSoSanXuat);
    }
    getTatCaLoaiSanPham = () => {
        return LoaiSanPhamDB.find({Delete: false}).fetch();
    }
    getTenSanPham = (MaSanPham) => {
        return LoaiSanPhamDB.findOne(MaSanPham);
    }
    getTieuChuan = (MaTieuChuan) => {
        return TieuChuanDB.findOne(MaTieuChuan);
    }
    upsertDangKySanPham = (DangKySanPham) => {
        return DangKySanPhamDB.upsert(DangKySanPham._id, DangKySanPham);
    }


}

export default DangKySanPhamController = new Controller();