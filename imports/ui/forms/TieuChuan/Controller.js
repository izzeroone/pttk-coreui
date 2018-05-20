import {TieuChuanDB, LoaiSanPhamDB} from "../../../collections/collections";

class Controller {
    x = 123;
    getTatCaTieuChuan = () => {
        return TieuChuanDB.find().fetch();
    }
    getTatCaLoaiSanPham = () => {
        return LoaiSanPhamDB.find().fetch();
    }
    getTenSanPham = (MaSanPham) => {
        return LoaiSanPhamDB.findOne(MaSanPham);
    }
}

export default TieuChuanController = new Controller();