import {TieuChuanDB, LoaiSanPhamDB} from "../../../collections/collections";
import TieuChuan from "./TieuChuan";

class Controller {
    x = 123;
    getTatCaTieuChuan = () => {
        return TieuChuanDB.find({Delete: false}).fetch();
    }
    deleteTieuChuan = (MaTieuChuan) => {
        TieuChuanDB.update(MaTieuChuan, {Delete: true});
    }
    addTieuChuan = (TieuChuan) => {
        TieuChuanDB.insert(TieuChuan);
    }
    getTatCaLoaiSanPham = () => {
        return LoaiSanPhamDB.find({Delete: false}).fetch();
    }
    getTenSanPham = (MaSanPham) => {
        return LoaiSanPhamDB.findOne(MaSanPham);
    }
    deleteTieuChuan = (MaTieuChuan) => {
        TieuChuanDB.update(MaTieuChuan, {Delete: true});
    }
}

export default TieuChuanController = new Controller();