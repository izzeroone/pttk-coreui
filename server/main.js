import { Meteor } from 'meteor/meteor';
import {TieuChuanDB, LoaiSanPhamDB} from "../imports/collections/collections";

Meteor.startup(() => {
    LoaiSanPhamDB.remove({});
    LoaiSanPhamDB.insert({TenLoaiSanPham: "Cá hộp"});
    LoaiSanPhamDB.insert({TenLoaiSanPham: "Cá viên"});
    LoaiSanPhamDB.insert({TenLoaiSanPham: "Cá tươi"});
    let sp = LoaiSanPhamDB.findOne({TenLoaiSanPham: "Cá hộp"});
    TieuChuanDB.remove({});
    TieuChuanDB.insert({
        TenTieuChuan: "NTX-12LX",
        MaLoaiSanPham: sp._id,
        NgayBatDauHieuLuc: new Date(),
        NgayHetHieuLuc: new Date(),
        ChiTieu :[{
        TenChiTieu: "Hàm lượng Protein",
            LoaiChiTieu: "Không vượt quá",
            GioiHanTren: "100",
            DonVi: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá"
        },{
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "Không vượt quá",
            GioiHanTren: "100",
            DonVi: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá"
        },]
    });
    console.log(sp._id);
  // code to run on server at startup
});
