import {TieuChuanDB, LoaiSanPhamDB, LoaiChiTieuDB} from "../../../collections/collections";
import TieuChuanForm from "./TieuChuanForm";

class Controller {
    getTatCaTieuChuan = () => {
        return TieuChuanDB.find({Delete: false}).fetch();
    }
    deleteTieuChuan = (MaTieuChuan) => {
        TieuChuanDB.update(MaTieuChuan, {Delete: true});
    }
    addTieuChuan = (TieuChuan) => {
        return TieuChuanDB.insert(TieuChuan);
    }
    getTatCaLoaiSanPham = () => {
        return LoaiSanPhamDB.find({Delete: false}).fetch();
    }
    getTenSanPham = (MaLoaiSanPham) => {
        return LoaiSanPhamDB.findOne(MaLoaiSanPham);
    }
    deleteTieuChuan = (MaTieuChuan) => {
        TieuChuanDB.update(MaTieuChuan, {Delete: true});
    }
    upsertTieuChuan = (TieuChuan) => {
        TieuChuanDB.upsert(TieuChuan._id, TieuChuan);
    }
    getTenLoaiChiTieu = (MaLoaiChiTieu) => {
        return LoaiChiTieuDB.findOne(MaLoaiChiTieu);
    }
}

export default TieuChuanController = new Controller();