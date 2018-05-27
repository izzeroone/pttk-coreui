import { Meteor } from 'meteor/meteor';
import {TieuChuanDB, LoaiSanPhamDB} from "../imports/collections/collections";

Meteor.startup(() => {
    // Insert sample data
    LoaiSanPhamDB.remove({});
    LoaiSanPhamDB.insert({_id: "CH", TenLoaiSanPham: "Cá hộp", Delete: false});
    LoaiSanPhamDB.insert({_id: "CV", TenLoaiSanPham: "Cá viên", Delete: false});
    LoaiSanPhamDB.insert({_id: "CT", TenLoaiSanPham: "Cá tươi", Delete: false});
    let sp = LoaiSanPhamDB.findOne({TenLoaiSanPham: "Cá viên"});
    TieuChuanDB.remove({});
    TieuChuanDB.insert({
        TenTieuChuan: "NTX-12LX",
        MaLoaiSanPham: sp._id,
        NgayBatDauHieuLuc: moment("20140202").format("YYYY-MM-DD"),
        NgayHetHieuLuc: moment("20190202").format("YYYY-MM-DD"),
        DanhSachChiTieu :[{
        TenChiTieu: "Hàm lượng Protein",
            LoaiChiTieu: "VQ",
            GioiHanDuoi: "100",
            DonViDo: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá"
        },{
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "KVQ",
            GioiHanTren: "100",
            DonViDo: "mg/hh",
            GhiChu:"Hàm lượng protein không được vượt quá"
        },{
            TenChiTieu: "SOMEHING",
            LoaiChiTieu: "MT",
            MoTa: "Mo ta cai gi do",
            GhiChu:"Hàm lượng protein không được vượt quá"
        },],
        Delete: false
    });

});
