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

export class LineSeries extends Series {
    private _linePoints: Array<LinePoint>;

    private _barWidth: number;

    private _pointSpace: number;

    private _color: Color;

    private _lineWidth: number;

    constructor(index: number, dataRow, pointSpace, width) {
        super(index, dataRow);

        this._linePoints = new Array<LinePoint>();

        this._pointSpace = pointSpace;
        this._color = dataRow.color;
        this._lineWidth = width;
    }

    // ----- Getters

    public get minX(): number {
        let min = -1;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].x;

            if ((min === -1) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxX(): number {
        let max = -1;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].x;

            if ((max === -1) || (dataValue > max)) max = dataValue;
        }

        return max;
    }

    public get minY(): number {
        let min = -1;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].y;

            if ((min === -1) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxY(): number {
        let max = -1;

        for (let i=0; i<this._linePoints.length; i++) {
            const dataValue = this._linePoints[i].y;

            if ((max === -1) || (dataValue > max)) max = dataValue;
        }

        return max;
    }

    public get minZ(): number {
        return 0;
    }

    public get maxZ(): number {
        return 0;
    }

    public get width(): number {
        return this.maxX-this.minX;
    }

    public get length(): number {
        return this._lineWidth;
    }

    // ----- Public Methods

    addLinePoint(linePoint) {
        this._linePoints.push(linePoint);
    }

    draw(graphMinX, graphMinY, graphMinZ) {    
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