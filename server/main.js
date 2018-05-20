import { Meteor } from 'meteor/meteor';
import {TieuChuanDB, LoaiSanPhamDB} from "../imports/collections/collections";

Meteor.startup(() => {
    LoaiSanPhamDB.remove({});
    LoaiSanPhamDB.insert({_id: "CH", TenLoaiSanPham: "Cá hộp", Delete: false});
    LoaiSanPhamDB.insert({_id: "CV", TenLoaiSanPham: "Cá viên", Delete: false});
    LoaiSanPhamDB.insert({_id: "CT", TenLoaiSanPham: "Cá tươi", Delete: false});
    let sp = LoaiSanPhamDB.findOne({TenLoaiSanPham: "Cá viên"});
    TieuChuanDB.remove({});
    TieuChuanDB.insert({
        TenTieuChuan: "NTX-12LX",
        MaLoaiSanPham: sp._id,
        NgayBatDauHieuLuc: new Date(2014, 1, 1),
        NgayHetHieuLuc: new Date(2019, 1, 1),
        DanhSachChiTieu :[{
        TenChiTieu: "Hàm lượng Protein",
            LoaiChiTieu: "MORE",
            GioiHanDuoi: "100",
            DonVi: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá"
        },{
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "LESS",
            GioiHanTren: "100",
            DonVi: "mg/hh",
            GhiChu:"Hàm lượng protein không được vượt quá"
        },],
        Delete: false
    });
    console.log(sp._id);
  // code to run on server at startup
});
