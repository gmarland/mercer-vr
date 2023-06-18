import { 
    Geometry,
    LineBasicMaterial,
    Object3D,
    Vector3,
    Line
} from 'three';

export class LineSeries {
    constructor(row, dataRow, pointSpace, width) {
        this._id = dataRow.id.toString();
        this._row = row;

        this._linePoints = [];

        this._pointSpace = pointSpace;
        this._color = dataRow.color;
        this._lineWidth = width;
    }

    // ----- Getters

    public get row() {
        return this._row;
    };

    public get minX() {
        var min = null;

        for (var i=0; i<this._linePoints.length; i++) {
            var dataValue = this._linePoints[i].getX();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxX() {
        var max = null;

        for (var i=0; i<this._linePoints.length; i++) {
            var dataValue = this._linePoints[i].getX();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minY() {
        var min = null;

        for (var i=0; i<this._linePoints.length; i++) {
            var dataValue = this._linePoints[i].getY();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY() {
        var max = null;

        for (var i=0; i<this._linePoints.length; i++) {
            var dataValue = this._linePoints[i].getY();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minZ() {
        return 0;
    };

    public get maxZ() {
        return 0;
    };

    public get width() {
        return this.maxX-this.minX;
    };

    public get length() {
        return this._lineWidth;
    };

    // ----- Public Methods

    addLinePoint(linePoint) {
        this._linePoints.push(linePoint);
    }

    draw(graphMinX, graphMinY, graphMinZ) {    
        var lineObject = new Object3D();

        // Generate the outline
        var lineGeometry = new Geometry();
        for (var i=0; i<this._linePoints.length; i++) {
            lineGeometry.vertices.push(new Vector3(this._linePoints[i].getX(), this._linePoints[i].getY()-graphMinY, (this._lineWidth/2)));
        }

        var areaLine = new Line(lineGeometry, new LineBasicMaterial({
            color: this._color
        }));

        lineObject.add(areaLine);

        lineObject.position.x -= graphMinX;

        return lineObject;
    };
}