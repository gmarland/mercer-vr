import { 
    SphereGeometry,
    MeshLambertMaterial,
    DoubleSide,
    Mesh
} from 'three';

import { Point } from "../../data/point/Point";

export class ScatterPoint {
    private _x: number;
    private _y: number;
    private _z: number;
    
    private _pointSize: number;

    constructor(x: number, y: number, z: number, pointSize: number) {
        this._x = x;
        this._y = y;
        this._z = z;
        
        this._pointSize = pointSize;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public get pointSize(): number {
        return this._pointSize;
    }
    
    public draw(color): Mesh {
        const pointGeometry = new SphereGeometry(this._pointSize, 100, 100),
            pointMaterial = new MeshLambertMaterial({
                color: color,
                side: DoubleSide, 
                transparent: true,
                opacity: 0.8
            });

        const pointMesh = new Mesh(pointGeometry, pointMaterial)

        pointMesh.position.x = this.x;
        pointMesh.position.y = this.y;
        pointMesh.position.z = this.z;

        return pointMesh;
    }
}