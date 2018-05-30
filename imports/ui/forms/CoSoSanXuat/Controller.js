import {CoSoSanXuatDB, LoaiChiTieuDB, LoaiSanPhamDB, TieuChuanDB} from "../../../collections/collections";

class Controller {
    addCoSoSanXuat(CoSoSanXuat){
        return CoSoSanXuatDB.insert(CoSoSanXuat);
    }
    getAllCoSoSanXuat(){
        return CoSoSanXuatDB.find({Delete: false}).fetch();
    }
    upsertCoSoSanXuat(CoSoSanXuat){
        return CoSoSanXuatDB.upsert(CoSoSanXuat._id, CoSoSanXuat);
    }
    deleteCoSoSanXuat(MaCoSoSanXuat) {
        return CoSoSanXuatDB.update(MaCoSoSanXuat, {Delete: true});
    }
    getAllLoaiSanPham(){
        return LoaiSanPhamDB.find({Delete: false}).fetch();
    }
    getLoaiSanPham(MaLoaiSanPham){
        return LoaiSanPhamDB.findOne(MaLoaiSanPham);
    }
}

export default CoSoSanXuatController = new Controller();

