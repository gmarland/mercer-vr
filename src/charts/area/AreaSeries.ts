import { 
    Object3D,
    BufferGeometry,
    BufferAttribute,
    LineBasicMaterial,
    MeshLambertMaterial,
    Vector3,
    Mesh,
    Line,
    Color,
    DoubleSide
} from 'three';

import { Series } from '../Series';

import { AreaPoint } from './AreaPoint';

import { ISeriesData } from '../../data/series/ISeriesData';

export class AreaSeries extends Series {
    private _areaPoints: Array<AreaPoint>;

    private _barWidth: number;

    private _pointSpace: number;

    private _color: Color;

    private _areaWidth: number;

    constructor(index: number, dataRow: ISeriesData, color: Color, pointSpace: number, width: number) {
        super(index, dataRow);

        this._areaPoints = new Array<AreaPoint>();

        this._pointSpace = pointSpace;
        this._color = color;
        this._areaWidth = width;
    };

    // ----- Getters

    public get minX(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._areaPoints.length; i++) {
            const dataValue = this._areaPoints[i].x;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxX(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._areaPoints.length; i++) {
            const dataValue = this._areaPoints[i].x;

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    }

    public get minY(): number | null {
        let min: number | null = null;

        for (let i=0; i<this._areaPoints.length; i++) {
            const dataValue = this._areaPoints[i].y;

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    }

    public get maxY(): number | null {
        let max: number | null = null;

        for (let i=0; i<this._areaPoints.length; i++) {
            const dataValue = this._areaPoints[i].y;

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
        return this._areaWidth;
    }

    // ----- Public Methods

    public addAreaPoint(areaPoint: AreaPoint) {
        this._areaPoints.push(areaPoint);
    }

    public draw(graphMinX: number, 
                xScale: number, 
                graphMinY: number,
                yScale: number, 
                graphMinZ: number, 
                zScale: number): Object3D {  
        const areaObject = new Object3D();

        const frontVertices = new Array<Vector3>();
        const backVertices = new Array<Vector3>();

        const areaGeometry = new BufferGeometry();

        frontVertices.push(new Vector3((this._areaPoints[0].x-graphMinX)/xScale, 0, (this._areaWidth/2)));
        backVertices.push(new Vector3((this._areaPoints[0].x-graphMinX)/xScale, 0, (this._areaWidth/2)*-1));
        
        // create the front verticies

        for (let i=0; i<this._areaPoints.length; i++) {
            frontVertices.push(new Vector3((this._areaPoints[i].x-graphMinX)/xScale, (this._areaPoints[i].y-graphMinY)/yScale, (this._areaWidth/2)));

            backVertices.push(new Vector3((this._areaPoints[i].x-graphMinX)/xScale, (this._areaPoints[i].y-graphMinY)/yScale, (this._areaWidth/2)*-1));
        }

        const bufferVertices = new Array<number>();

        for (let i=0; i<frontVertices.length; i++) {
            bufferVertices.push(frontVertices[i].x);
            bufferVertices.push(frontVertices[i].y);
            bufferVertices.push(frontVertices[i].z);
        }

        /*for (let i=0; i<backVertices.length; i++) {
            bufferVertices.push(backVertices[i].x);
            bufferVertices.push(backVertices[i].y);
            bufferVertices.push(backVertices[i].z);
        }*/

        areaGeometry.setAttribute( 'position', new BufferAttribute(new Float32Array(bufferVertices), 3));

        const areaMesh = new Mesh(areaGeometry, new MeshLambertMaterial({
            color: this._color, 
            side: DoubleSide,
            transparent: true,
            opacity: 0.65
        }));

        areaObject.add(areaMesh);

        // Generate the outline
        const areaLineGeometry = new BufferGeometry();

        const lineVertices = new Array<number>();

        for (let i=0; i<this._areaPoints.length; i++) {
            lineVertices.push(this._areaPoints[i].x);
            lineVertices.push(this._areaPoints[i].y-graphMinY);
            lineVertices.push((this._areaWidth/2));
        }
        
        areaLineGeometry.setAttribute( 'position', new BufferAttribute(new Float32Array(lineVertices), 3));

        const areaLine = new Line(areaLineGeometry, new LineBasicMaterial({
            color: this._color
        }));

        areaObject.add(areaLine);

        areaObject.position.x -= graphMinX;

        return areaObject;
    };
}