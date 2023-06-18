import { 
    SphereGeometry,
    MeshLambertMaterial,
    DoubleSide,
    Mesh
} from 'three';

import { Point } from "../Point";

export class ScatterPoint extends Point {
    private _z: number;
    
    private _pointSize: number;

    constructor(x: number, y: number, z: number, pointSize: number) {
        super(x, y)
    }

    public get z(): number {
        return this._z;
    }

    public get pointSize(): number {
        return this._pointSize;
    }
    
    public draw(color): void {
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