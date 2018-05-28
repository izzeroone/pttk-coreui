import { Meteor } from 'meteor/meteor';
import {TieuChuanDB, LoaiSanPhamDB, CoSoSanXuatDB, DangKySanPhamDB, SanPhamDatChuanDB} from "../imports/collections/collections";

Meteor.startup(() => {
    // Insert sample data
    LoaiSanPhamDB.remove({});
    LoaiSanPhamDB.insert({_id: "CH", TenLoaiSanPham: "Cá hộp", Delete: false});
    LoaiSanPhamDB.insert({_id: "CV", TenLoaiSanPham: "Cá viên", Delete: false});
    LoaiSanPhamDB.insert({_id: "CT", TenLoaiSanPham: "Cá tươi", Delete: false});
    let sp = LoaiSanPhamDB.findOne({TenLoaiSanPham: "Cá viên"});
    //Tieu chuan database
    TieuChuanDB.remove({});
    TieuChuanDB.insert({
        _id: "ABCXYZ",
        TenTieuChuan: "NTX-12LX",
        MaLoaiSanPham: sp._id,
        NgayBatDauHieuLuc: moment("20140202").format("YYYY-MM-DD"),
        NgayHetHieuLuc: moment("20190202").format("YYYY-MM-DD"),
        DanhSachChiTieu :[{
        TenChiTieu: "Hàm lượng Protein",
            LoaiChiTieu: "VQ",
            GioiHanDuoi: 100,
            DonViDo: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá"
        },{
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "KVQ",
            GioiHanTren: 100,
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

    //Co so san xuat database
    CoSoSanXuatDB.remove({});
    CoSoSanXuatDB.insert({
        _id: "ABCXYZ",
        TenCoSoSanXuat: "Xuong san xuat abc xyz",
        ChuCoSo: "Nguyen Van A",
        DiaChi: "24 Pham Van Dong",
        DanhSachSoDienThoai : ["1212312", "23432312321"],
        DanhSachMaLoaiSanPham : ["CH", "CV"],
        Delete: false
    })

    let cssx = CoSoSanXuatDB.findOne({ChuCoSo: "Nguyen Van A"});
    let tc = TieuChuanDB.findOne({TenTieuChuan: "NTX-12LX"});

    //Phieu Dang ky
    DangKySanPhamDB.remove({});
    DangKySanPhamDB.insert({
        MaCoSoSanXuat : cssx._id,
        TenSanPham: "Cá hộp Bacasa 100g/l",
        MaLoaiSanPham: sp._id,
        NgayDangKy: moment("20140202").format("YYYY-MM-DD"),
        NgayHetHan: moment("20190202").format("YYYY-MM-DD"),
        SoLuongDangKy: 12,
        MaTieuChuan : tc._id,
        DanhSachChiTieu :[{
            TenChiTieu: "Hàm lượng Protein",
            LoaiChiTieu: "VQ",
            GioiHanDuoi: 100,
            DonViDo: "mg/hh",
            MoTa:"Hàm lượng protein không được vượt quá",
            ThucTe: "122"
        },{
            TenChiTieu: "Hàm lượng Sắt",
            LoaiChiTieu: "KVQ",
            GioiHanTren: 100,
            DonViDo: "mg/hh",
            GhiChu:"Hàm lượng protein không được vượt quá",
            ThucTe : "1121"
        },{
            TenChiTieu: "SOMEHING",
            LoaiChiTieu: "MT",
            MoTa: "Mo ta cai gi do",
            GhiChu:"Hàm lượng protein không được vượt quá",
            ThucTe: true,
        },],
        Delete: false
    })



});
