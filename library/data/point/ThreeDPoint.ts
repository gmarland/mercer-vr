import { IPoint } from "./IPoint";

export class ThreeDPoint {
    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._y;
    }
}