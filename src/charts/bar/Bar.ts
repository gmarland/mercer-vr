import { 
    Vector3,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Box3,
    Object3D,
    DoubleSide,
    Color,
    BufferGeometry,
    BufferAttribute
} from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { GeometryUtils } from '../../utils/GeometryUtils';
import { BarPoint } from '../../data/point/BarPoint';

export class Bar {
    private _index;
    private _barWidth: number;
    private _color: Color;
    private _opacity: number;
    private _dataValue: BarPoint;
    private _indexSpace: number;
    private _showLabels: boolean;

    private _font: Font;
    private _labelSize: number;
    private _labelColor: Color;

    private _height: number;

    private _barObject: Object3D;

    constructor(index: number, 
                barWidth: number, 
                dataValue: BarPoint, 
                categorySpace: number, 
                color: Color, 
                opacity: number, 
                showLabels: boolean,
                font: Font, 
                labelSize: number, 
                labelColor: Color) {
        this._index = index;
        this._barWidth = barWidth;
        this._color = color;
        this._opacity = opacity;
        this._dataValue = dataValue;
        this._indexSpace = categorySpace;
        this._showLabels = showLabels;
        this._font = font;
        this._labelSize = labelSize;
        this._labelColor = labelColor;
    }

    // ----- Getters

    public getDataValue(): BarPoint {
        return this._dataValue;
    };

    public getHeight(): number {
        return this._height;
    };

    public getBarWidth(): number {
        return this._barWidth;
    };

    public getBarObject(): Object3D {
        return this._barObject;
    }

    // ----- Public Methods

    public draw(graphMinY: number, barWidth: number): Object3D {
        this._barObject = new Object3D();

        // Calculate the bar geometry
        const xPos = ((this._index*this._indexSpace) + (this._index*barWidth)) + (barWidth/2);

        this._height = (this._dataValue.value-graphMinY);

        const barGeometry = new BufferGeometry();

        // Get the verticies
        const vertices = this.getBarVertices(xPos, 0, this._height, barWidth);

        const barPoints = new Array<number>();

        for (let i=0; i<vertices.length; i++) {
            barPoints.push(vertices[i].x);
            barPoints.push(vertices[i].y);
            barPoints.push(vertices[i].z);
        }

        barGeometry.setAttribute('position', new BufferAttribute(new Float32Array(barPoints), 3));

        const barMesh = new Mesh(barGeometry, new MeshLambertMaterial({
            color: this._color, 
            side: DoubleSide,
            transparent: true,
            opacity: this._opacity
        }));
        barMesh.name = "bar";

        this._barObject.add(barMesh);

        const barOutline = new Object3D();
        barOutline.name = "outline";

        // Generate the outlines

        barOutline.add(this.getOutlineMesh("front", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("back", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("left", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("right", xPos, 0, this._height, barWidth, this._color));

        this._barObject.add(barOutline);

        if (this._showLabels) {
            const valueGeometry = new TextGeometry(this._dataValue.name, {
                font: this._font,
                size: this._labelSize,
                height: .2
            });
            
            const valueMesh = new Mesh(valueGeometry, new MeshBasicMaterial({
                color: this._labelColor
            }));

            const valueArea = new Box3().setFromObject(valueMesh);
            const valueBox = GeometryUtils.getBoxSize(valueArea)

            valueMesh.position.x = xPos-(valueBox.x/2);
            valueMesh.position.y = this._height + 2;
            valueMesh.position.z = 0;

            this._barObject.add(valueMesh);
        }

        return this._barObject;
    }

    // ----- Private Methods

    private getBarVertices(xPos: number, zPos: number, height: number, width: number): Array<Vector3> {
        const vertices = new Array<Vector3>();

        vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
        vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));

        vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
        vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));

        vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
        vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));

        vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
        vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));

        return vertices;
    }

    private getLineGeometry(type: string, xPos: number, zPos: number, height: number, width: number): Array<Vector3> {
        const vertices = new Array<Vector3>();

        switch(type) {
            case "front":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));
                break;
            case "back":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
                break;
            case "left":
                vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
                break;
            case "right":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
                break;
        }

        return vertices;
    };

    private getOutlineMesh(type: string, xPos: number, zPos: number, height: number, width: number, color: Color) {
        const outlineGeometry = new BufferGeometry();

        var vertices = this.getLineGeometry(type, xPos, zPos, height, width);

        const outlinePoints = new Array<number>();

        for (let i=0; i<vertices.length; i++) {
            outlinePoints.push(vertices[i].x);
            outlinePoints.push(vertices[i].y);
            outlinePoints.push(vertices[i].z);
        }
        
        outlineGeometry.setAttribute('position', new BufferAttribute(new Float32Array(outlinePoints), 3));

        const outline = new Line(outlineGeometry, new LineBasicMaterial({
            color: color
        }));

        outline.name = type;

        return outline;
    };
}