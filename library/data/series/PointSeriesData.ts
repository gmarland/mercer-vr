import { Point } from "../point/Point";

import { ISeriesData } from "./ISeriesData";

export class PointSeriesData implements ISeriesData {
    private _name: string;

    private _data: Array<Point>;

    constructor(name: string, data: Array<Point>) {
        this._name = name;

        this._data = data;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get data(): Array<Point> {
        return this._data;
    }
    public set data(value: Array<Point>) {
        this._data = value;
    }
}