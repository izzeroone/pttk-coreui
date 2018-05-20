import {TieuChuanDB} from "../../../collections/collections";

class Controller {
    addTieuChuan(TieuChuan){
        TieuChuanDB.insert(TieuChuan);
    }
    getAllTieuChuan(){
        return TieuChuanDB.find().fetch();
    }
}

export default TieuChuanController = new Controller();

