import { 
    Object3D,
    Color
} from 'three';

import { ScatterPoint } from './ScatterPoint';

import { Series } from '../Series';
import { ISeriesData } from '../../data/series/ISeriesData';

export class ScatterSeries extends Series {
    private _scatterPoints: Array<ScatterPoint>;

    private _color: Color;

    constructor(index: number, seriesData: ISeriesData, color: Color) {
        super(index, seriesData);

        this._scatterPoints = [];

        this._color = color;
    };

    // ----- Getters

    public get minX(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            const dataValue = this._scatterPoints[i].x;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxX(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            const dataValue = this._scatterPoints[i].x;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minY(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            const dataValue = this._scatterPoints[i].y;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            const dataValue = this._scatterPoints[i].y;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minZ(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            let dataValue = this._scatterPoints[i].z;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxZ(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._scatterPoints.length; i++) {
            let dataValue = this._scatterPoints[i].z;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get width(): number {
        const maxX = this.maxX;
        const minX = this.minX;

        if (maxX && minX) return maxX-minX;
        else return 0;
    };

    public get length(): number {
        const maxZ = this.maxZ;
        const minZ = this.minZ;

        if (maxZ && minZ) return maxZ-minZ;
        else return 0;
    };

    // ----- Public Methods

    public addScatterPoint(linePoint) {
        this._scatterPoints.push(linePoint);
    }

    public draw(graphMinX: number, graphMinY: number, graphMinZ: number): Object3D {    
        const seriesObject = new Object3D();

        for (let i=0; i<this._scatterPoints.length; i++) {
            seriesObject.add(this._scatterPoints[i].draw(this._color));
        }

        seriesObject.position.x -= graphMinX;
        seriesObject.position.z -= graphMinZ;

        return seriesObject;
    };
}