import { 
    Object3D,
    Geometry,
    LineBasicMaterial,
    MeshLambertMaterial,
    Face3,
    Vector3,
    Mesh,
    Line,
    Color,
    DoubleSide
} from 'three';

import { Series } from '../Series';

import { AreaPoint } from './AreaPoint';

export class AreaSeries extends Series {
    private _areaPoints: Array<AreaPoint>;

    private _barWidth: number;

    private _pointSpace: number;

    private _color: Color;

    private _areaWidth: number;

    constructor(index, dataRow, pointSpace, width) {
        super(index, dataRow);

        this._areaPoints = new Array<AreaPoint>();

        this._pointSpace = pointSpace;
        this._color = dataRow.color;
        this._areaWidth = width;
    };

    // ----- Getters

    public get minX(): number {
        var min = -1;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].x;

            if ((min === -1) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxX(): number {
        var max = -1;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].x;

            if ((max === -1) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minY(): number {
        var min = -1;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].y;

            if ((min === -1) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY(): number {
        var max = -1;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].y;

            if ((max === -1) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minZ(): number {
        return 0;
    };

    public get maxZ(): number {
        return 0;
    };

    public get width(): number {
        return this.maxX-this.minX;
    };

    public get length(): number {
        return this._areaWidth;
    };

    // ----- Public Methods

    public addAreaPoint(areaPoint) {
        this._areaPoints.push(areaPoint);
    }

    public draw(graphMinX, graphMinY, graphMinZ) {    
        var areaObject = new Object3D();

        const frontVertices = new Array<Vector3>();
        const backVertices = new Array<Vector3>();

        var areaGeometry = new Geometry();

        // create the front verticies

        for (var i=0; i<this._areaPoints.length; i++) {
            frontVertices.push(new Vector3(this._areaPoints[i].x, 0, (this._areaWidth/2)));
            frontVertices.push(new Vector3(this._areaPoints[i].x, this._areaPoints[i].y-graphMinY, (this._areaWidth/2)));
            backVertices.push(new Vector3(this._areaPoints[i].x, 0, (this._areaWidth/2)*-1));
            backVertices.push(new Vector3(this._areaPoints[i].x, this._areaPoints[i].y-graphMinY, (this._areaWidth/2)*-1));
        }

        for (var i=0; i<frontVertices.length; i++) {
            areaGeometry.vertices.push(frontVertices[i]);
        }

        for (var i=0; i<backVertices.length; i++) {
            areaGeometry.vertices.push(backVertices[i]);
        }

        // Add the front face
        for (var i=0; i<frontVertices.length-2; i+=2) {
            areaGeometry.faces.push( new Face3( i, (i+1), (i+3) ) );
            areaGeometry.faces.push( new Face3( i, (i+2), (i+3) ) );
        }

        // Add the back face
        for (var i=frontVertices.length; i<(frontVertices.length+backVertices.length)-2; i+=2) {
            areaGeometry.faces.push( new Face3( i, (i+1), (i+3) ) );
            areaGeometry.faces.push( new Face3( i, (i+2), (i+3) ) );
        }
            
        // add the opening face
        areaGeometry.faces.push( new Face3( 0, (frontVertices.length), (frontVertices.length+1) ) );
        areaGeometry.faces.push( new Face3( 0, 1, (frontVertices.length+1) ) );

        // Add the joining face
        for (var i=0; i<frontVertices.length-2; i+=2) {
            areaGeometry.faces.push( new Face3( (i+1), (i+3), (i+(frontVertices.length+3)) ) );
            areaGeometry.faces.push( new Face3( (i+1), (i+(frontVertices.length+1)), (i+(frontVertices.length+3)) ) );
        }

        // add the end face
        areaGeometry.faces.push( new Face3( (frontVertices.length-2), (frontVertices.length-1), (frontVertices.length+backVertices.length-2) ) );
        areaGeometry.faces.push( new Face3( (frontVertices.length-1), (frontVertices.length+backVertices.length-1), (frontVertices.length+backVertices.length-2) ) );

        areaGeometry.computeFaceNormals();

        var areaMesh = new Mesh(areaGeometry, new MeshLambertMaterial({
            color: this._color, 
            side: DoubleSide,
            transparent: true,
            opacity: 0.65
        }));

        areaObject.add(areaMesh);

        // Generate the outline
        var areaLineGeometry = new Geometry();
        for (var i=0; i<this._areaPoints.length; i++) {
            areaLineGeometry.vertices.push(new Vector3(this._areaPoints[i].x, this._areaPoints[i].y-graphMinY, (this._areaWidth/2)));
        }

        var areaLine = new Line(areaLineGeometry, new LineBasicMaterial({
            color: this._color
        }));

        areaObject.add(areaLine);

        areaObject.position.x -= graphMinX;

        return areaObject;
    };
}