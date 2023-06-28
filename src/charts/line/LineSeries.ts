import { 
    Object3D,
    Color,
    BufferGeometry,
    BufferAttribute,
    Mesh
} from 'three';

import { Series } from '../Series';

import { LinePoint } from './LinePoint';
import { ISeriesData } from '../../data/series/ISeriesData';

const MeshLine = require('three.meshline').MeshLine;
const MeshLineMaterial = require('three.meshline').MeshLineMaterial;

export class LineSeries extends Series {
    private _linePoints: Array<LinePoint>;

    private _color: Color;

    private _lineWidth: number;

    private _seriesSpace: number;

    constructor(index: number, seriesData: ISeriesData, color: Color, width: number, seriesSpace: number) {
        super(index, seriesData);

        this._linePoints = new Array<LinePoint>();

        this._color = color;

        this._color = color;
        this._lineWidth = width;

        this._seriesSpace = seriesSpace;
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

    public addLinePoint(linePoint: LinePoint): void {
        this._linePoints.push(linePoint);
    }

    public draw(graphMinX: number, 
                xScale: number, 
                graphMinY: number,
                yScale: number, 
                graphMinZ: number, 
                zScale: number): Object3D {    
        const lineObject = new Object3D();

        // Generate the outline
        const lineGeometry = new BufferGeometry();

        const points = new Array<number>();

        for (let i=0; i<this._linePoints.length; i++) {
            points.push((this._linePoints[i].x-graphMinX)/xScale);
            points.push((this._linePoints[i].y-graphMinY)/yScale);
            points.push((this.index*this._seriesSpace) + (this._lineWidth/2));
        }
        
        lineGeometry.setAttribute( 'position', new BufferAttribute(new Float32Array(points), 3));
        
        const meshLine = new MeshLine();
        meshLine.setGeometry(lineGeometry);

        const line = new Mesh(meshLine, new MeshLineMaterial({
            color: this._color,
            lineWidth: this._lineWidth
        }));

        lineObject.add(line);

        return lineObject;
    };
}