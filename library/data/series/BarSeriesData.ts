import { BarPoint } from "../point/BarPoint";

import { ISeriesData } from "./ISeriesData";

export class BarSeriesData implements ISeriesData {
    private _name: string;

    private _color: string;

    private _data: Array<BarPoint>;

    constructor(name: string, color: string, data: Array<BarPoint>) {
        this._name = name;

        this._color = color;

        this._data = data;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }

    public get data(): Array<BarPoint> {
        return this._data;
    }
    public set data(value: Array<BarPoint>) {
        this._data = value;
    }
}