export class Series {
    private _index: number;

    private _id: string;

    constructor(index: number, dataRow) {
        this._index = index;

        this._id = dataRow.id.toString();
    }

    public get index(): number {
        return this._index;
    };
    
    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }
}