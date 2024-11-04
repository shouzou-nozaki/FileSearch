export class SearchResult{
    
    public _id : string = ""; // id
    public _path:string = ""; // パス
    public _type:string = ""; // 種類

    // id
    public get get_id() : string {
        return this._id;
    }
    public set set_id(v : string) {
        this._id = v;
    }

    // パス
    public get get_path() : string {
        return this._id;
    }
    public set set_path(v : string) {
        this._id = v;
    }

    // 種類
    public get get_type() : string {
        return this._id;
    }
    public set set_type(v : string) {
        this._id = v;
    }

}