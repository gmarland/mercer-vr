import { 
    Geometry,
    LineBasicMaterial,
    Object3D,
    Vector3,
    Line,
    Color
} from 'three';

import { Series } from '../Series';

import { LinePoint } from './LinePoint';
import { ISeriesData } from '../../data/series/ISeriesData';

export class LineSeries extends Series {
    private _linePoints: Array<LinePoint>;

    private _barWidth: number;

    private _pointSpace: number;

    private _color: Color;

    private _lineWidth: number;

    constructor(index: number, seriesData: ISeriesData, color: Color, pointSpace: number, width: number) {
        super(index, seriesData);

        this._linePoints = new Array<LinePoint>();

        this._color = color;

        this._pointSpace = pointSpace;
        this._color = color;
        this._lineWidth = width;
    }

    // ----- Getters

    public get minX(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].x;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxX(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].x;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    }

    public get minY(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].y;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxY(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].y;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    }

    public get minZ(): number | null {
        return 0;
    }

    public get maxZ(): number | null {
        return 0;
    }

    public get width(): number {
        const maxX = this.maxX;
        const minX = this.minX;

        if (maxX && minX) return maxX-minX;
        else return 0;
    }

    public get length(): number {
        return this._lineWidth;
    }

    // ----- Public Methods

    addLinePoint(linePoint) {
        this._linePoints.push(linePoint);
    }

    draw(graphMinX: number, graphMinY: number, graphMinZ: number) {    
        const lineObject = new Object3D();

        // Generate the outline
        const lineGeometry = new Geometry();
        for (let i=0; i<this._linePoints.length; i++) {
            lineGeometry.vertices.push(new Vector3(this._linePoints[i].x, this._linePoints[i].y-graphMinY, (this._lineWidth/2)));
        }

        const areaLine = new Line(lineGeometry, new LineBasicMaterial({
            color: this._color
        }));

        lineObject.add(areaLine);

        lineObject.position.x -= graphMinX;

        return lineObject;
    };
}