import { ThreeDPoint } from "../point/ThreeDPoint";

import { ISeriesData } from "./ISeriesData";

export class ThreeDSeriesData implements ISeriesData {
    private _name: string;

    private _data: Array<ThreeDPoint>;

    constructor(name: string, data: Array<ThreeDPoint>) {
        this._name = name;

        this._data = data;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get data(): Array<ThreeDPoint> {
        return this._data;
    }
    public set data(value: Array<ThreeDPoint>) {
        this._data = value;
    }
}