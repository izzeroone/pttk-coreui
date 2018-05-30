import {Mongo} from 'meteor/mongo'

export const TieuChuanDB = new Mongo.Collection("TieuChuan");
export const LoaiSanPhamDB = new Mongo.Collection("LoaiSanPham");
export const CoSoSanXuatDB = new Mongo.Collection("CoSoSanXuat");
export const DangKySanPhamDB = new Mongo.Collection("PhieuDangKyChatLuong");
export const SanPhamDatChuanDB = new Mongo.Collection("SanPhamDatChuan");
export const KiemTraSanPhamDB = new Mongo.Collection("KiemTraSanPham")
export const LichKiemTraDB = new Mongo.Collection("LichKiemTra")

export var LoaiChiTieuDB = new Mongo.Collection(null);
LoaiChiTieuDB.insert({_id: "MT", TenLoaiChiTieu: "Mô tả"});
LoaiChiTieuDB.insert({_id: "NG", TenLoaiChiTieu: "Nằm giữa"});
LoaiChiTieuDB.insert({_id: "KVQ", TenLoaiChiTieu: "Không vượt quá"});
LoaiChiTieuDB.insert({_id: "VQ", TenLoaiChiTieu: "Vượt quá"});


