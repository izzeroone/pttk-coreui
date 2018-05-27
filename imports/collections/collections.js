import {Mongo} from 'meteor/mongo'

export const TieuChuanDB = new Mongo.Collection("TieuChuanForm");
export const LoaiSanPhamDB = new Mongo.Collection("LoaiSanPham");

export var LoaiChiTieuDB = new Mongo.Collection(null);
LoaiChiTieuDB.insert({_id: "MT", TenLoaiChiTieu: "Mô tả"});
LoaiChiTieuDB.insert({_id: "NG", TenLoaiChiTieu: "Nằm giữa"});
LoaiChiTieuDB.insert({_id: "KVQ", TenLoaiChiTieu: "Không vượt quá"});
LoaiChiTieuDB.insert({_id: "VQ", TenLoaiChiTieu: "Vượt quá"});


