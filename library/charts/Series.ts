import { 
    Object3D
} from 'three';

import { ISeriesData } from "../data/series/ISeriesData";

export abstract class Series {
    private _index: number;

    private _id: string;

    private _seriesData: ISeriesData;

    constructor(index: number, seriesData: ISeriesData) {
        this._index = index;

        this._id = index.toString();

        this._seriesData = seriesData;
    }

    public get index(): number {
        return this._index;
    };
    
    public get id(): string {
        return this._id;
    }

    public get seriesData(): ISeriesData {
        return this._seriesData;
    }


    // ----- Getters

    public abstract get minX(): number;

    public abstract get maxX(): number;

    public abstract get minY(): number;

    public abstract get maxY(): number;

    public abstract get minZ(): number;

    public abstract get maxZ(): number;

    public abstract get width(): number;

    public abstract get length(): number;

    public abstract draw(graphMinX, graphMinY, graphMinZ): Object3D;
}